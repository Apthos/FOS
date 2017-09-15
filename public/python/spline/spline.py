from __future__ import division
from __future__ import print_function

import numpy
import numpy as np

import scipy.sparse.linalg as linalg
from scipy.sparse import csc_matrix
import scipy.stats as stats

import bspline
import splinelab

import math
import sys

def main():

    """
        Intake Parameters:
        [
        x,       | float array
        y,       | float array
        knots,   | integer
        sides    | integer
        ]
    """

    x = [float(frag) for frag in sys.argv[1].split(',')]
    y = [float(frag) for frag in sys.argv[2].split(',')]
    knots = int(sys.argv[3])
    sides = int(sys.argv[4])

    points = []

    mx = 0
    my = 0

    for i in range(0, x.__len__()):
        mx = mx + x[i]
        my = my + y[i]

    mx = mx / x.__len__()
    my = my / y.__len__()

    sdx = numpy.std(x)
    sdy = numpy.std(y)

    x = stats.zscore(x)  # Turns x values into z-scores
    y = stats.zscore(y)  # Turns y values into z-scores

    t = []

    for i in range(0, x.__len__()):
        points.append(Point(x[i], y[i], (numpy.arctan2(y[i], x[i]) / (2 * math.pi)) + .5))

    points.sort(key=lambda point: point.t)  # Sorts objects based on T value

    matrix1 = []

    for point in points:
        row = get_basis(point.t, 2, knots)
        new_row = []
        for entry in row:
            # new_row.append(entry)
            if (entry > .01):
                new_row.append(entry)
            else:
                new_row.append(0)
        matrix1.append(new_row)

    matrix1 = csc_matrix(matrix1)

    matrix2x = []

    for point in points:
        matrix2x.append(point.x * sum(get_basis(point.t, 1, knots)))

    cx = linalg.lsqr(matrix1, matrix2x, damp=.5)  # cx is the x coordinates of the control points

    matrix2y = []

    for point in points:
        matrix2y.append(point.y * sum(get_basis(point.t, 1, knots)))

    cy = linalg.lsqr(matrix1, matrix2y, damp=.5)  # cy is the y coordinates of control points

    fcx = []
    fcy = []

    for i in range(0, cx[0].__len__()):
        dis = distance(0, 0, cx[0][i], cy[0][i])
        if not (dis < 0.8 or dis > 10):  # if not (dis < 0.75 or dis > 2.75):
            fcx.append(cx[0][i])
            fcy.append(cy[0][i])

    point_gen = []

    lower_bound = 0
    upper_bound = 1
    points = 1500

    for t in np.linspace(lower_bound, upper_bound, points):
        point_gen.append(get_basis(t, 1, fcx.__len__() - 2))

    splinexs = np.dot(point_gen, fcx)
    splineys = np.dot(point_gen, fcy)

    # ===== Optimal Resize ===== #

    mDisN = 0
    mDisS = 0

    for i in range(0, x.__len__()):
        mDisN += distance(x[i], y[i], 0, 0)
    mDisN = mDisN / x.__len__()

    for i in range(0, splinexs.__len__()):
        mDisS += distance(splinexs[i], splineys[i], 0, 0)
    mDisS = mDisS / splinexs.__len__()

    resize = mDisS / mDisN

    for i in range(0, splinexs.__len__()):
        splinexs[i] = splinexs[i] / resize
        splineys[i] = splineys[i] / resize

    # === convert back to raw ratio === #

    for i in range(0, splinexs.__len__()):
        splinexs[i] = mx + (splinexs[i] * sdx)
        splineys[i] = my + (splineys[i] * sdy)

    PolyPoints = []
    for i in range(0, splinexs.__len__(), int(splinexs.__len__() / sides)):
        PolyPoints.append([splinexs[i], splineys[i]])
        print(str(splinexs[i]) + ':' + str(splineys[i]))
        sys.stdout.flush()


def get_basis(x, pow, k):
    nknots = k
    p = 3

    knots = np.linspace(0, 1, nknots)
    k = splinelab.augknt(knots, p)

    B = bspline.Bspline(k, p)
    f = B.diff(order=0)

    basis_array = f(x)
    basis_squared_array = []

    for basis in basis_array:
        basis_squared_array.append(math.pow(basis, pow))

    return basis_squared_array


def distance(x1, y1, x2, y2):
    return math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2))


class Point(object):
    x = None
    y = None
    t = None

    def __init__(self, x, y, t):
        self.x = x
        self.y = y
        self.t = t


if __name__ == '__main__':
    main()

from __future__ import division
from __future__ import print_function

print('0')

import numpy
import numpy as np

try:
    import scipy.sparse.linalg as linalg
except:
    print("could not load scipy linalg")

print('1.1')
try:
    import scipy.sparse as csc_matrix
except:
    print("could not load scipy csc matrix")
print('1.2')
import scipy.stats as stats

print('2')

import bspline
import splinelab

print('3')

# import csv
import math

print('4')

import sys

print('5')



def main():

    print('Started the fucken program!')
    sys.stdout.flush()

    # plot = plt.subplot(111)

    """
        Intake Parameters:
        [
        x,       | float array
        y,       | float array
        knots,   | integer
        sides    | integer
        }
        """

    x = [float(frag) for frag in sys.argv[1].split(',')]
    y = [float(frag) for frag in sys.argv[2].split(',')]
    knots = int(sys.argv[3])
    sides = int(sys.argv[4])

    print('reading the data!')

    print('x: ' + str(x))
    print('y: ' + str(y))

    points = []

    # first = True
    # -=-=-=-=-=| Data Retrieval |-=-=-=-=-= #
    # with open('data/farm.csv') as csvfile:
    #     reader = csv.reader(csvfile)
    #     for row in reader:
    #         for a in row:
    #             if first:
    #                 y.append(float(a))
    #             else:
    #                 x.append(float(a))
    #
    #         first = False

    # -=-=-=-=-=| Data Processing |-=-=-=-=-= #

    mx = 0
    my = 0

    print('0')
    sys.stdout.flush()

    for i in range(0, x.__len__()):
        print(i)
        sys.stdout.flush()
        mx = mx + x[i]
        my = my + y[i]

    print('mx: ' + str(mx))
    print('my: ' + str(my))

    mx = mx / x.__len__()
    my = my / y.__len__()


    print('calculating the mean')

    # for i in range(0, x.__len__()):
    #     sdx += math.pow(x[i] - mx, 2)
    #     sdy += math.pow(y[i] - my, 2)
    #
    # sdx = sdx / x.__len__() - 1
    # sdy = sdy / x.__len__() - 1

    sdx = numpy.std(x)
    sdy = numpy.std(y)

    print('calculating standard deviation')

    x = stats.zscore(x)  # Turns x values into z-scores
    y = stats.zscore(y)  # Turns y values into z-scores

    print('turning x and y into zscore')

    mzx = 0
    mzy = 0

    for i in range(0, x.__len__()):
        mzx = mzx + x[i]
        mzy = mzy + y[i]

    mzx = mzx / x.__len__()
    mzy = mzy / y.__len__()

    t = []

    for i in range(0, x.__len__()):
        ry = y[i] - mzy
        rx = x[i] - mzx
        points.append(Point(rx, ry, (numpy.arctan2((y[i] - mzy), (x[i] - mzx)) / (2 * math.pi)) + .5))

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
    # print("The cx Matrix " + str(cx[0]))

    matrix2y = []

    for point in points:
        matrix2y.append(point.y * sum(get_basis(point.t, 1, knots)))

    cy = linalg.lsqr(matrix1, matrix2y, damp=.5)  # cy is the y coordinates of control points
    # print("The cy matrix "+str(cy[0]))

    # for i in range(0, matrix2x.__len__()):
    #     plt.plot(matrix2x[i], matrix2y[i], "rs")

    fcx = []
    fcy = []

    for i in range(0, cx[0].__len__()):
        dis = distance(0, 0, cx[0][i], cy[0][i])
        if not (dis < 0.8 or dis > 10):  # if not (dis < 0.75 or dis > 2.75):
            fcx.append(cx[0][i])
            fcy.append(cy[0][i])
    # plt.plot(cx[0][i], cy[0][i], "gd")
    # else:
    # plt.plot(cx[0][i], cy[0][i], "rd")
    point_gen = []

    lower_bound = 0
    upper_bound = 1
    points = 1500

    for t in np.linspace(lower_bound, upper_bound, points):
        point_gen.append(get_basis(t, 1, fcx.__len__() - 2))

    splinexs = np.dot(point_gen, fcx)
    # print("splinexs " + str(fcx[0]))
    splineys = np.dot(point_gen, fcy)
    # print("splineys " + str(fcy[0]))

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
    # plt.plot(splinexs[i], splineys[i], "bo")

    # === convert back to raw ratio === #

    for i in range(0, splinexs.__len__()):
        splinexs[i] = mx + (splinexs[i] * sdx)
        splineys[i] = my + (splineys[i] * sdy)

    PolyPoints = []
    for i in range(0, x.__len__(), int(x.__len__() / sides)):
        PolyPoints.append([x[i], y[i]])

    print ("fuck yeh we reached the end of the program!")



# axcolor = 'lightgoldenrodyellow'
# bar = plt.axes([0.15, 0.15, 0.65, 0.03], axisbg=axcolor)
# rescale = Slider(bar, '', 0, 2, valinit=resize-1)
#
# def update(val):
#     plot.clear()
#     # draw_points(plot, [xx * rescale.val for xx in splinexs], [yy * rescale.val for yy in splineys], "bo")
#     # draw_points(plot, matrix2x, matrix2y, "rs")
#     #poly = create_polygon(plot, [xx * rescale.val for xx in splinexs], [yy * rescale.val for yy in splineys], 50)
#     plot.add_collection(PatchCollection([poly], alpha=0.4))
#
#     #plt.draw()
#
# rescale.on_changed(update)
#
# poly = create_polygon(plot, splinexs, splineys, 50)
# p = PatchCollection([poly], alpha=0.4)
# plot.add_collection(p)
#
# plt.show()


# def draw_points(graph, x, y, color):
#     for i in range(0, x.__len__()):
#         graph.plot(x[i], y[i], color)


# def create_polygon(graph, x, y, sides):
#     points = []
#     for i in range(0, x.__len__(), int(x.__len__() / sides)):
#         points.append([x[i], y[i]])
#     polygon = Polygon(np.array(points), True, edgecolor='Black', linewidth=2)
#     return polygon


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

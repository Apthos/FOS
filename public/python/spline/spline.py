from __future__ import division
from __future__ import print_function

import numpy
import numpy as np

import matplotlib.pyplot as plt
import matplotlib.cm
import matplotlib.colors

import bspline
import splinelab

import csv
import math


def main():
    x = []
    y = []

    points = []

    first = True

    knots = 100

    with open('data/circular.csv') as csvfile:
        reader = csv.reader(csvfile)

        for row in reader:
            for a in row:
                if first:
                    y.append(float(a))
                else:
                    x.append(float(a))

            first = False

        mx = 0
        my = 0

        for i in range(0, x.__len__()):
            mx = mx + x[i]
            my = my + y[i]
            plt.plot(x[i], y[i], "ro")

        mx = mx / x.__len__()
        my = my / y.__len__()

        #plt.plot(mx, my, "db")

        print("mx: " + str(mx) )
        print("my: " + str(my) )

        t = []

        for i in range(0, x.__len__()):
            ry = y[i]-my
            rx = x[i]-mx
            plt.plot(rx, ry, "dg")
            points.append( Point(rx, ry, ( numpy.arctan2((y[i] - my), (x[i] - mx)) /(2*math.pi) ) + .5))

        points.sort(key=lambda p: p.t)

        matrix1 = []

        for point in points:
            row = get_basis(point.t, 2, knots)
            new_row = []
            for entry in row:
                # new_row.append(entry)
                if (entry > .05):
                    new_row.append(entry)
                else:
                    new_row.append(0)

            matrix1.append(new_row)  #Does get_basis give ALL basis functions?  Does matrix1.append add by row?

        print(matrix1.__len__())
        print(matrix1[0].__len__())

        matrix2 = []

        for point in points:
            matrix2.append(point.x * sum(get_basis(point.t, 1, knots)))

        print("matrix 2: " + str(matrix2.__len__()))
        print("matrix 2: " + str(matrix2[0]))

        pmatrix = numpy.linalg.pinv(matrix1)



        print("pmatrix: " + str(pmatrix.__len__()))
        print("pmatrix: " + str(pmatrix.__len__()))
        # for row in pmatrix:
        #     print(row)

        result1 = np.dot(pmatrix, matrix2)

        #print(result1)

        matrix2 = []

        for point in points:
            matrix2.append(point.y * sum(get_basis(point.t, 1, knots)))


        result2 = np.dot(pmatrix, matrix2)

        cx = []
        cy = []

        knots = -2

        for i in range(0, result1.__len__()):
            if not (result1[i] == 0 and result2[i] == 0):
                cx.append(result1[i])
                cy.append(result2[i])
                knots += 1
                print("adding")

        point_gen = []

        lower_bound = 0
        upper_bound = 1
        points = 1000

        for t in np.linspace(lower_bound, upper_bound, points):
            point_gen.append(get_basis(t, 1, knots))

        splinexs = np.dot(point_gen, cx)
        splineys = np.dot(point_gen, cy)

        # print(splinexs)
        # print(splineys)

        for i in range(0, splinexs.__len__()):
            plt.plot(splinexs[i] + mx, splineys[i] + my, "bo")

        plt.show()



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
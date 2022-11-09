import json
import sys
from sklearn.linear_model import LogisticRegression
import numpy as np
import pandas as pd
from collections import defaultdict


def parse(file_name):
    # read in data
    f = open(file_name)
    data = json.load(f)

    # create the input/output vectors
    x, y = [], []

    # parse the data
    for d in data.keys():
        # filter likes
        if d=="Like":
            movie_list = data[d]
            for movie in movie_list:
                x.append(movie.values())
                y.append(1)
        # filter dislikes
        elif d=="Dislike":
            movie_list = data[d]
            for movie in movie_list:
                x.append(movie.values())
                y.append(0)

    # return the built dataset
    df = pd.DataFrame(x, columns=data["Like"][0])
    df = df.drop("title", axis=1)
    return df, y


def map_column(df, file_name, field_name):
    # create empty dictionary
    dct = defaultdict(lambda :0)

    # map data from file
    with open(file_name) as file:
        for i, item in enumerate(file):
            dct[item.lower().strip()] = i+1 # zero is reserved

    # encode the category in dataframe
    df[field_name] = df[field_name].map(lambda x: dct[x.lower()])


def train_model(df, results):
    model = LogisticRegression().fit(df.iloc[:,1:], results)
    return model


# USAGE: python3 evaluate.py <data_file_name>
if __name__=="__main__":
    # load args
    path = sys.argv[0].partition("evaluate.py")[0]
    info_path = path+"info/"
    data_file_name = path+sys.argv[1]

    # create raw dataset
    data_x, data_y = parse(data_file_name)

    # assign categorical data to numerical
    map_column(data_x, info_path+"genres.txt", "genre")
    map_column(data_x, info_path+"leads.txt", "lead")
    print(data_x)

    # train model
    movie_model = train_model(data_x, data_y)

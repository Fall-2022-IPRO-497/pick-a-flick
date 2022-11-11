import json
import sys
from sklearn.neural_network import MLPClassifier
import numpy as np
import pandas as pd
from collections import defaultdict


def parse_rated_movies(file_name):
    # read in data
    with open(file_name) as f:
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
    return df, y


def parse_test_movies(file_name):
    # read in data
    with open(file_name) as f:
        data = json.load(f)

    # create the input vector
    x = []
    
    # parse the data
    for d in data.keys():
        movie_list = data[d]
        for movie in movie_list:
            x.append(movie.values())
    
    # return the built dataset
    df = pd.DataFrame(x, columns=movie_list[0].keys())
    return df


def one_hot_encode(df, file_name, field_name):
    # load all labels
    labels = []
    with open(file_name) as file:
        for item in file:
            labels.append(item.strip().lower()) # zero is reserved

    # encode the category in dataframe
    new_cols = []
    for label in labels:
        new_cols.append(np.where(df[field_name]==label, 1, 0))
    new_df = pd.DataFrame(np.asarray(new_cols).reshape(-1, len(labels)), columns=[f"{field_name}_{l}" for l in labels])
    df = pd.concat([df, new_df], axis=1)

    # drop the original column
    df = df.drop(columns=field_name)

    # export final updated dataframe
    return df


def train_model(df, results):
    model = MLPClassifier(hidden_layer_sizes=(5*len(df),),
                          activation="logistic",
                          learning_rate="adaptive",
                          learning_rate_init=.001,
                          max_iter=2000,
                          random_state=0)
    model = model.fit(df.iloc[:,1:], results)
    return model


# USAGE: python3 evaluate.py <data_file_name> <test_file_name>
if __name__=="__main__":
    # load args
    path = sys.argv[0].partition("evaluate.py")[0]
    info_path = path+"info/"
    data_file_name = path+sys.argv[1]
    test_file_name = path+sys.argv[2] # contains the movies to rank

    # create raw training dataset
    data_x, data_y = parse_rated_movies(data_file_name)
    data_x = data_x.drop("title", axis=1)

    # encode training set
    data_x = one_hot_encode(data_x, info_path+"genres.txt", "genre")
    data_x = one_hot_encode(data_x, info_path+"leads.txt", "lead")

    # train model
    movie_model = train_model(data_x, data_y)

    # create testing dataset
    test_x = parse_test_movies(test_file_name)

    # encode testing set
    test_x = one_hot_encode(test_x, info_path+"genres.txt", "genre")
    test_x = one_hot_encode(test_x, info_path+"leads.txt", "lead")

    # store list of titles and their scores
    rankings = []
    for title in test_x["title"]:
        rankings.append([title, -1]) # initialize score to -1
    test_x = test_x.drop("title", axis=1)    

    # rank movies
    probs = movie_model.predict_proba(test_x.iloc[:,1:])
    for i, prob in enumerate(probs):
        rankings[i][1] = prob[1]

    # show results
    print(rankings)
    

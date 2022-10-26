import json
import random
import sys

def parse(file_name):
    # read in data
    data = json.load(file_name)

    # create the dataset
    x, y = [], []

    # parse the data
    for d in data.keys():
        # filter likes
        if d=="Like":
            lst = data[d]
            for item in lst:
                x.append(item)
                y.append(1)
        # filter dislikes
        elif d=="Dislike":
            lst = data[d]
            for item in lst:
                x.append(item)
                y.append(0)

    # return the built dataset
    return x, y

def train(x, y):
    pass



# USAGE: python3 evaluate.py <data_file_name>
if __name__=="__main__":
    # load args
    args = sys.argv[1:]
    data_file_name = args[0]

    # create raw dataset
    x_data, y_data = parse(data_file_name)
    assert len(x_data) == len(y_data)

    # split into training and testing (80-20)
    random_indices = random.shuffle(range(len(x_data)))
    threshold_idx = int(0.8 * len(x_data))
    train_x = [x_data[x] for x in random_indices[:threshold_idx]]
    train_y = [y_data[y] for y in random_indices[:threshold_idx]]
    test_x = [x_data[x] for x in random_indices[threshold_idx:]]
    test_y = [y_data[y] for y in random_indices[threshold_idx:]]

    # train model
    model = train(train_x, train_y)

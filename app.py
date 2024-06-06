import os
import tensorflow as tf
import numpy as np
from flask import Flask, render_template, request, redirect, url_for


model = tf.keras.models.load_model('models/modelBrainTumorMRI.h5')

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('home.html')

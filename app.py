from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, jsonify, make_response, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = 'abcd1234'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/reset')
def reset_board():
    session['board'] = []
    board = boggle_game.make_board()
    session['board'] = board
    return redirect('/boggle')

@app.route('/boggle')
def display_board():
    board = session['board']
    return render_template('boggle.html', board=board)

@app.route('/words', methods=['POST'])
def display_words():
    guess = request.form['guess']
    word_list = boggle_game.words
    return render_template('words.html', word_list=word_list)

@app.route('/floyd', methods=['POST'])
def show_word():
    board = session['board']
    word = request.args['word']
    answer = Boggle.check_valid_word(board, word)
    return jsonify({'result': answer})
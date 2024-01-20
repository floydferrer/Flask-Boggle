from boggle import Boggle
from flask import Flask, request, render_template, redirect, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = 'abcd1234'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/restart')
def reset_board():
    session['board'] = []
    board = boggle_game.make_board()
    print(board)
    session['board'] = board
    return render_template('boggle.html', board=session['board'], highscore=session['highscore'], nplays=session['nplays'])

@app.route('/boggle')
def display_board():
    try:
        session['board']
    except:
        board = boggle_game.make_board()
        session['board'] = board
        session['highscore'] = 0
        session['nplays'] = 0
    return render_template('boggle.html', board=session['board'], highscore=session['highscore'], nplays=session['nplays'])

@app.route('/check', methods=['GET'])
def show_word():
    board = session['board']
    word = request.args['word']
    answer = boggle_game.check_valid_word(board, word)
    return jsonify({'result': answer})

@app.route('/stats', methods=['POST'])
def update_stats():
    score = request.json['score']
    highscore = session.get('highscore', 0)
    nplays = session.get('nplays', 0)
    session['nplays'] = nplays + 1
    session['highscore'] = max(score, highscore)
    return jsonify(brokeRecord=score > highscore)
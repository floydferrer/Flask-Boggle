from unittest import TestCase
from app import app

class FlaskTests(TestCase):
    def test_view_boggle(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = ''
                session['highscore'] = 0
                session['nplays'] = 0
            res = client.get('/boggle')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1 id="title">Boggle</h1>', html)
    
    def test_restart(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = ''
                session['highscore'] = 0
                session['nplays'] = 0
            res = client.get('/restart')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1 id="title">Boggle</h1>', html)
    
    def test_not_word(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = [["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"]]
            res = client.get('/check?word=abc')
            self.assertEqual(res.json['result'], 'not-word')

    def test_valid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = [["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"]]
            res = client.get('/check?word=cat')
            self.assertEqual(res.json['result'], 'ok')
    
    def test_invalid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = [["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"],
                                    ["C", "A", "T", "T", "T"]]
            res = client.get('/check?word=dog')
            self.assertEqual(res.json['result'], 'not-on-board')
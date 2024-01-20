from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):
    def test_view_boggle(self):
        with app.test_client() as client:
            boggle_game = Boggle()
            board = 'test'
            res = client.get('/boggle')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1 id="title">Boggle</h1>', html)
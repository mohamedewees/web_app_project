# test_app.py
import pytest
from my_app import app

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200
#    assert b"Welcome to my Flask app!" in response.data

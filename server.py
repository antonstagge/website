# server.py
from flask import Flask, render_template, jsonify, request, session
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
import json
import traceback
from send_mail import mail_checker
import sys
import _thread
import MySQLdb
from pyfiglet import Figlet
import random
import string


# The front-end
app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")
app.secret_key = 'vXsB4qbqsfbXS2Ss'

# CORS configuration
# For dev mode only
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# MySQL configuration
mysql = MySQL(app)
app.config['MYSQL_USER'] = 'website'
app.config['MYSQL_PASSWORD'] = 'website'
app.config['MYSQL_DB'] = 'website'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

@app.route("/")
@cross_origin()
def index():
    return render_template("index.html")

@app.route("/api/generate_captcha", methods=['GET', 'POST'])
@cross_origin()
def generate_captcha():
    if request.method == 'GET':
        captcha_key = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        session['key'] = captcha_key
        session.modified = True
        # Create the ascii version of the key
        fig = Figlet(font='georgia11')
        captcha = fig.renderText(captcha_key)
        return jsonify(captcha), 201

    elif request.method == 'POST':
        try:
            payload = request.json
            key = payload['key']
            session_key = session['key']
            if key == session_key:
                return jsonify({}), 200
            else:
                return jsonify({'error': 'Not a match.'}), 403
        except:
            return jsonify({'error': 'No session key set.'}), 404
    else:
        return jsonify({'error': 'Wrong http method.'}), 405


@app.route("/api/get_all_messages")
@cross_origin()
def get_all_messages():
    status_code = 200
    messages = []
    try:
        # Fetch the Messages from the database
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM message;''')
        results = cur.fetchall()

        # Add the Messages to a list
        for result in results:
            messages.append(result)
    except:
        traceback.print_exc()
        status_code = 500

    return jsonify(messages), status_code

@app.route('/api/send_message', methods=['POST'])
@cross_origin()
def send_message():
    status_code = 200
    try:
        payload = request.json
        name = payload['name']
        email = payload['email']
        message = payload['message']

        # Add the message to the database
        # as a safety measure so it's not lost.
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO message(name, email, message) VALUES (%s, %s, %s);''', [name, email, message])
        mysql.connection.commit()

    except:
        traceback.print_exc()
        status_code = 500
    return jsonify({}) , status_code


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) != 2:
        print("specify server gmail addr and password!")
        sys.exit(-1)
    my_mail = args[0]
    password = args[1]
    # Open database connection
    db = MySQLdb.connect("localhost","website","website","website")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    # Start thread to send email every day
    _thread.start_new_thread(mail_checker, (my_mail, password, db, cursor,))
    # Run the app
    app.run()

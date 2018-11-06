# server.py
from flask import Flask, render_template, send_from_directory, jsonify, request, session
# from flask_cors import CORS, cross_origin
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
from weasyprint import HTML, CSS
import os
import base64


# The front-end
app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")
app.secret_key = 'vXsB4qbqsfbXS2Ss'
app.config['UPLOAD_FOLDER'] = app.static_folder + '/upload'

# CORS configuration
# For dev mode only
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
# add @cross_origin() to all routes

# MySQL configuration
mysql = MySQL(app)
app.config['MYSQL_USER'] = 'website'
app.config['MYSQL_DB'] = 'website'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/download", methods=['POST'])
def download():
    if os.path.isfile(os.path.join(app.config['UPLOAD_FOLDER'],'resume.pdf')):
        return send_from_directory(directory=app.config['UPLOAD_FOLDER'], filename="resume.pdf"), 200
    try:
        payload = request.json
        personal = payload['personal']
        resume = payload['resume']
        picture_filepath = os.path.join(app.config['UPLOAD_FOLDER'],'me.jpg')
        with open(picture_filepath, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        personal = personal.replace("IMAGE_PATH", "data:image/jpeg;base64," + encoded_string.decode("utf-8"))
        document = personal + resume
        css_filepath = os.path.join(app.config['UPLOAD_FOLDER'],'main.css')
        output_filepath = os.path.join(app.config['UPLOAD_FOLDER'],'resume.pdf')
        HTML(string=document).write_pdf(output_filepath, stylesheets=[CSS(filename=css_filepath)])
        return send_from_directory(directory=app.config['UPLOAD_FOLDER'], filename="resume.pdf"), 200
    except:
        return jsonify({}), 500


@app.route("/api/generate_captcha", methods=['GET', 'POST'])
def generate_captcha():
    if request.method == 'GET':
        captcha_key = ''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase + string.digits, k=6))
        session['key'] = captcha_key
        session['can_send'] = False
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
                session['can_send'] = True
                return jsonify({}), 200
            else:
                return jsonify({'error': 'Not a match.'}), 403
        except:
            return jsonify({'error': 'No captcha set to session.'}), 403
    else:
        return jsonify({'error': 'Wrong http method.'}), 405


@app.route('/api/send_message', methods=['POST'])
def send_message():
    try:
        if session['can_send'] == True:
            payload = request.json
            name = payload['name']
            email = payload['email']
            message = payload['message']

            # Add the message to the database
            # as a safety measure so it's not lost.
            cur = mysql.connection.cursor()
            cur.execute('''INSERT INTO message(name, email, message) VALUES (%s, %s, %s);''', [name, email, message])
            mysql.connection.commit()

            return jsonify({}) , 200
        else:
            return jsonify({'error': 'You are a robot.'}), 403
    except:
        traceback.print_exc()
        status_code = 403
        return jsonify({'error': 'You are a robot.'}), 403


@app.route("/api/get_all_messages")
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


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) != 3:
        print("specify server gmail addr and password and then databse password!")
        sys.exit(-1)
    my_mail = args[0]
    password = args[1]
    db_pw = args[2]
    app.config['MYSQL_PASSWORD'] = db_pw
    # Open database connection
    db = MySQLdb.connect("localhost","website", db_pw, "website")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    # Start thread to send email every day
    _thread.start_new_thread(mail_checker, (my_mail, password, db, cursor,))
    # Run the app
    app.run(host='0.0.0.0', port=80)

# server.py
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
import json
import traceback
from send_mail import send_mails
import sys
import sched, time
import _thread
import MySQLdb

# for sending mail every day
s = sched.scheduler(time.time, time.sleep)

# The front-end
app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")

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
def index():
    return render_template("index.html")

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


def mail_checker(my_mail, password, db, cursor):
    try:
        # Fetch the Messages from the database
        cursor.execute('''SELECT * FROM message;''')
        results = cursor.fetchall()

        # Add the Messages to a list
        messages = []
        for result in results:
            messages.append(result)

        if len(messages) > 0:
            ok = send_mails(my_mail, password, messages)
            if not ok:
                print("Could not send mail on " + time.strftime("%d/%m/%Y"))
            else:
                cursor.execute('''DELETE FROM message;''')
                db.commit()
    except:
        traceback.print_exc()

    s.enter(86400, 1, mail_checker, argument=(my_mail, password,))
    s.run()

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

# server.py
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
import json
import traceback

app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")

#CORS configuration
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#MySQL configuration
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
        # Fetch the spells from the database
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM message;''')
        results = cur.fetchall()

        # Add the spells to a list
        for result in results:
            messages.append(result)
    except:
        traceback.print_exc()
        status_code = 500

    return jsonify(messages), status_code


if __name__ == "__main__":
    app.run()

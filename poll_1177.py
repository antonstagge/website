import requests
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import config
import os
import codecs
import hashlib
import re

def send_mail(output):
    print("Sending mail...")
    msg = MIMEMultipart()
    msg['Subject'] = "New vaccine times available!!"

    text = url + "\n\n" + output

    msg.attach(MIMEText(text, 'plain'))
    text_msg = msg.as_string()

    server = smtplib.SMTP('smtp.gmail.com', 587)
    try:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(my_mail, pw)

        for mail in to_mails:
            server.sendmail(my_mail, mail, text_msg)
        return True
    except smtplib.SMTPException as e:
        print(str(e))
        return False


my_mail = config.MAIL_ADDR
to_mails = [my_mail, 'cassanoalexandra@gmail.com']
pw = config.MAIL_PWD
url = 'https://www.1177.se/Stockholm/sjukdomar--besvar/lungor-och-luftvagar/inflammation-och-infektion-ilungor-och-luftror/om-covid-19--coronavirus/om-vaccin-mot-covid-19/boka-tid-for-vaccination-mot-covid-19-i-stockholms-lan/'
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}


path = os.path.dirname(os.path.realpath(__file__))
file_name_1 = '/test1.html'
file_name_2 = '/test2.html'

if not os.path.exists(path + file_name_1) or not os.path.exists(path + file_name_2):
    with open(path + file_name_1, 'w'): pass
    with open(path + file_name_2, 'w'): pass

new = requests.get(url, headers=headers).text
new = re.sub(r"(<[a-z]+)\s[^<]*>", r"\1/>\n", new)

writer_new = codecs.open(path + file_name_2, 'w', "utf-8")
writer_new.write(new)
writer_new.close()

reader_current = codecs.open(path + file_name_1, 'r', "utf-8")
current = reader_current.read()
reader_current.close()

reader_new = codecs.open(path + file_name_2, 'r', "utf-8")
new = reader_new.read()
reader_new.close()

hash_current = hashlib.md5(current.encode("utf-8")).hexdigest()
hash_new = hashlib.md5(new.encode("utf-8")).hexdigest()
print(hash_current)
print(hash_new)

if current == "":
    print("First run")
    exit()
if hash_current != hash_new:
    print("Sending")

    bashCommand = "diff %s %s" % (path + file_name_1, path + file_name_2)
    cmd = bashCommand.split()
    import subprocess
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    output, error = process.communicate()
    send_mail(output.decode("utf-8", "ignore"))

writer_next = codecs.open(path + file_name_1, 'w', "utf-8")
writer_next.write(new)
writer_next.close()
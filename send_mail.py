from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import sys

def send_mail(my_mail, pw, from_addr, message):
    msg = MIMEMultipart()
    msg['Subject'] = "Email from " + from_addr + " from website server."
    message = from_addr + " wrote: \n\n" + message
    msg.attach(MIMEText(message, 'plain'))
    text_msg = msg.as_string()

    server = smtplib.SMTP('smtp.gmail.com', 587)
    try:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(my_mail, pw)

        server.sendmail(my_mail, my_mail, text_msg)
        return 250, ""
    except smtplib.SMTPException as e:
        return 500, e

def send_mails(my_mail, pw, messages):
    msg = MIMEMultipart()
    msg['Subject'] = "Email from from website server."
    text = ""
    for one_message in messages:
        text += one_message[1] + " with email: " + one_message[2] + " wrote:\n"
        text += one_message[3] + "\n\n"
    msg.attach(MIMEText(text, 'plain'))
    text_msg = msg.as_string()

    server = smtplib.SMTP('smtp.gmail.com', 587)
    try:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(my_mail, pw)

        server.sendmail(my_mail, my_mail, text_msg)
        return True
    except smtplib.SMTPException:
        return False


if __name__ == "__main__":
    args = sys.argv[1:]
    res = send_mail("antonstagge95@gmail.com", args[0], args[1],args[2])
    print(res)

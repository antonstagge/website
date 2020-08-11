import requests
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import config

def send_mail(subject, new_times):
    print("Sending mail...")
    msg = MIMEMultipart()
    msg['Subject'] = subject
    text = "New times available:\n\n"
    for t in new_times:
        text += t + "\n"
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
    except smtplib.SMTPException as e:
        print(str(e))
        return False

def get_payload(ssn, locationId, typeId):
    return ('{"bookingSession":{"socialSecurityNumber":"%s","licenceId":4,"bookingModeId":0,"ignoreDebt":false,"ignoreBookingHindrance":false,"excludeExaminationCategories":[],"rescheduleTypeId":0,"paymentIsActive":false,"paymentReference":null,"paymentUrl":null},"occasionBundleQuery":{"startDate":"2020-08-11T22:00:00.000Z","locationId":%d,"languageId":13,"vehicleTypeId":1,"tachographTypeId":1,"occasionChoiceId":1,"examinationTypeId":%d}}' % (ssn, locationId, typeId))

my_mail = config.MAIL_ADDR
pw = config.MAIL_PWD
url = 'https://fp.trafikverket.se/Boka/occasion-bundles'
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}

TEST = False

sthlm = 1000140
gillinge_1 = 1000301
gillinge_2 = 1000302
theory = 2
driving = 10
emil_ssn = '19950803-1532'

current_theory_time = datetime.strptime("2020-09-21T18:00:00", "%Y-%m-%dT%H:%M:%S").date()
current_driving_time = datetime.strptime("2020-12-01T18:00:00", "%Y-%m-%dT%H:%M:%S").date()

# Theory
r = requests.post(url, data=get_payload(emil_ssn, sthlm, theory), headers=headers)
data = r.json()['data']
print("Theory status codes:")
print("Status code: %s" % (r.json()['status']))
new_times = []
if len(data) == 0:
    print("No theory times found...")
else:
    print("Earliest found: %s" % (data[0]['occasions'][0]['duration']['start']))
    for day in data:
        occasions = day['occasions']
        for occ in occasions:
            start = occ['duration']['start'][:-6]
            d = datetime.strptime(start, "%Y-%m-%dT%H:%M:%S").date()
            if d < current_theory_time or TEST:
                print(d)
                new_times.append(start)

    if len(new_times) != 0:
        send_mail("New theory times in sthlm!", new_times)

# driving
r = requests.post(url, data=get_payload(emil_ssn, gillinge_1, driving), headers=headers)
r2 = requests.post(url, data=get_payload(emil_ssn, gillinge_2, driving), headers=headers)
data = r.json()['data']
m_data = r2.json()['data']
for d in m_data:
    data.append(d)
print("driving status codes:")
print("Status code: %s" % (r.json()['status']))
print("Status code2: %s" % (r2.json()['status']))
new_times = []
if len(data) == 0:
    print("No driving times found...")
else:
    print("Earliest found: %s" % (data[0]['occasions'][0]['duration']['start']))
    for day in data:
        occasions = day['occasions']
        for occ in occasions:
            start = occ['duration']['start'][:-6]
            d = datetime.strptime(start, "%Y-%m-%dT%H:%M:%S").date()
            if d < current_driving_time or TEST:
                print(d)
                new_times.append(start)

    if len(new_times) != 0:
        send_mail("New driving times at gillinge!", new_times)
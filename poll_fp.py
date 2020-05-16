import requests
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import config

def send_mail(new_times):
    msg = MIMEMultipart()
    msg['Subject'] = "Email from from website server."
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


my_mail = config.MAIL_ADDR
pw = config.MAIL_PWD

TEST = False

url = 'https://fp.trafikverket.se/Boka/occasion-bundles'
# theory
# payload = '{"bookingSession":{"socialSecurityNumber":"19950102-0078","licenceId":4,"bookingModeId":0,"ignoreDebt":false,"ignoreBookingHindrance":false,"excludeExaminationCategories":[],"rescheduleTypeId":0,"paymentIsActive":false,"paymentReference":null,"paymentUrl":null},"occasionBundleQuery":{"startDate":"2020-04-04T22:00:00.000Z","locationId":1000140,"languageId":13,"vehicleTypeId":1,"tachographTypeId":1,"occasionChoiceId":1,"examinationTypeId":2}}'
# driving
payload = '{"bookingSession":{"socialSecurityNumber":"19950102-0078","licenceId":4,"bookingModeId":0,"ignoreDebt":false,"ignoreBookingHindrance":false,"excludeExaminationCategories":[],"rescheduleTypeId":0,"paymentIsActive":false,"paymentReference":null,"paymentUrl":null},"occasionBundleQuery":{"startDate":"2020-04-08T22:00:00.000Z","locationId":1000301,"languageId":13,"vehicleTypeId":1,"tachographTypeId":1,"occasionChoiceId":1,"examinationTypeId":10}}'
payload2 = '{"bookingSession":{"socialSecurityNumber":"19950102-0078","licenceId":4,"bookingModeId":0,"ignoreDebt":false,"ignoreBookingHindrance":false,"excludeExaminationCategories":[],"rescheduleTypeId":0,"paymentIsActive":false,"paymentReference":null,"paymentUrl":null},"occasionBundleQuery":{"startDate":"2020-04-08T22:00:00.000Z","locationId":1000302,"languageId":13,"vehicleTypeId":1,"tachographTypeId":1,"occasionChoiceId":1,"examinationTypeId":10}}'
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
r = requests.post(url, data=payload, headers=headers)
r2 = requests.post(url, data=payload2, headers=headers)
data = r.json()['data']
m_data = r2.json()['data']
for d in m_data:
    data.append(d)
print("Status code: %s" % (r.json()['status']))
print("Status code2: %s" % (r2.json()['status']))
my_current_time = datetime.strptime("2020-09-13T14:00:00", "%Y-%m-%dT%H:%M:%S").date()
new_times = []
if len(data) == 0:
    print("No times found...")
    exit()
print("Earliest found: %s" % (data[0]['occasions'][0]['duration']['start']))
for day in data:
    occasions = day['occasions']
    for occ in occasions:
        start = occ['duration']['start'][:-6]
        d = datetime.strptime(start, "%Y-%m-%dT%H:%M:%S").date()
        if d < my_current_time or TEST:
            print(d)
            new_times.append(start)

if len(new_times) != 0:
    send_mail(new_times)
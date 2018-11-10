# Website template with Flask backend, MySQL db and TypeScript create-react-app frontend - hosted with a nginx web server together with uWSGI.

## Set up server
https://linode.com/docs/getting-started/

## Set up nginx
https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uswgi-and-nginx-on-ubuntu-18-04

Follow the guide up to step 3 continue with this guide until further notice.
## Set up mysql
install mysql

```
sudo apt-get install mysql-server
sudo apt-get install libmysqlclient-dev
```

start mysql service

```
sudo systemctl start mysql
```

launch at boot:

```
sudo systemctl enable mysql
```

### Copy over build files
important to copy to user@server not to root@server!

```
scp -r database/ anton@antonstagge.com:/home/anton/website/
scp -r *.py *.txt anton@antonstagge.com:/home/anton/website/
scp -r client/build/* anton@antonstagge.com:/home/anton/website/client/
```

### Init database:

```
sudo mysql -u root -p < init_database.sql
```

grant privileges and set password for user Website
login with
```
sudo mysql -u root -p
```
then type
```
GRANT ALL PRIVILEGES ON website.* To 'website'@'localhost' IDENTIFIED BY 'yourdatabasepassword';
```

## Install weasyprint
https://weasyprint.readthedocs.io/en/stable/install.html

Mac OS:
`brew install python3 cairo pango gdk-pixbuf libffi`


Ubuntu 16.04 or higher:
```
sudo apt-get install build-essential python3-dev python3-pip python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
```


## Edit the config file
edit the config.py file to contain the nessesary information.
```
MAIL_ADDR=yourmail@gmail.com
MAIL_PWD=yourmailpwdtoken
DB_PWD=yourdatabasepassword
```

## Install all server requirements:
make sure you are in virtual env!
```
pip install -r requirements.txt
```


## Allow gmail account access
Then go and verify the gmail account at:
https://accounts.google.com/b/0/DisplayUnlockCaptcha

## Now go back to the guide
After completing the guide. Follow the steps below to add SSL to the communication.

### HTTPS SSL

https://www.linode.com/docs/security/ssl/install-lets-encrypt-to-create-ssl-certificates/


edit nginx sites-available to look like:

```
server {
    listen 80;
    server_name antonstagge.com www.antonstagge.com;

    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name antonstagge.com www.antonstagge.com;

    ssl_certificate /etc/letsencrypt/live/antonstagge.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/antonstagge.com/privkey.pem;

    location / {
        include uwsgi_params;
        uwsgi_pass unix:/home/anton/website/website.sock;
    }
}
```

Then go to /etc/nginx/sites-available/ and rename default to default.txt or something
Then go to sites-enabled/ and remove default.

## Update certificate and run send_mail script using cron

edit the crontab file using

```
sudo crontab -e
```

to look like this:

```
0 0 1 * * /opt/letsencrypt/letsencrypt-auto renew
0 18 * * * /home/anton/website/websiteenv/bin/python3 /home/anton/website/send_mail.py
```

## You are now done! Congratulations.

After you make any updates, reload by typing

```
sudo systemctl restart website
sudo systemctl restart nginx
```

# Website template with flask server MySQL db and TypeScript create-react-app

### Set up server
https://linode.com/docs/getting-started/

### set up mysql
install mysql

`> sudo apt-get install mysql-server`

start mysql service

`> systemctl start mysql`

launch at boot:

`> systemctl enable mysql`


### Copy over build files

```
scp -r database/ root@176.58.97.219:/home/website/
scp -r requirements.txt server.py send_mail.py root@176.58.97.219:/home/website/
scp -r client/build/ root@176.58.97.219:/home/website/client/
```

### Init database:

`> mysql -u root -p < init_database.sql `

grant privileges and set password for user Website
login with
```
> mysql -u root -p
```
then type
```
GRANT ALL PRIVILEGES ON website.* To 'website'@'localhost' IDENTIFIED BY 'yourdatabasepassword';
```

### install weasyprint
https://weasyprint.readthedocs.io/en/stable/install.html

Mac OS:
`brew install python3 cairo pango gdk-pixbuf libffi`


Ubuntu 16.04 or higher:
`sudo apt-get install build-essential python3-dev python3-pip python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
`

### Start server:

`> sudo apt-get python3-pip`

`> sudo apt-get install libmysqlclient-dev`

`> pip3 install -r requirements.txt`

Then go and verify the gmail account at:
https://accounts.google.com/b/0/DisplayUnlockCaptcha

`> nohup python3 server.py yourmailaddr yourmailtokenpassword yourdatabasepassword > outputs/date.out &`

you are now done!

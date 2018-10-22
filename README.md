# Website template with flask server MySQL db and TypeScript create-react-app
init database:

`> mysql -u root -p < init_database.sql `

grant privileges and set password for user Website
login with
```
> mysql -u root -p
```
then type
```
GRANT ALL PRIVILEGES ON website.* To 'website'@'localhost' IDENTIFIED BY 'yourpassword';
```

build client:

```
> cd client
> npm install
> npm run build
```

start server:

`> pip3 install -r requirements.txt`

`> python3 server.py yourmailaddr yourmailtokenpassword yourdatabasepassword`

you are now done!

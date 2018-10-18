# Website template with flask server MySQL db and TypeScript create-react-app
create database and user:

`> mysql -u root -p < database/create_user.sql`

init database:

`> mysql -u website -p website < init_database.sql `


start server:

`> pip3 install -r requirements.txt`

`> python3 server.py`

build client:

```
> cd client
> npm run build
```

"# MiniDemo-Traveling-Website-Angular-5-PHP-API-MYSQL"
1/ Download and Install :  
https://www.apachefriends.org/download.html
https://nodejs.org/en/download/ 

2/ Rest API
- Run XAMP server first:
![alt text](https://github.com/Heni-ghodbane/MiniDemo-Traveling-Website-Angular-5-PHP-API-MYSQL/blob/master/screenshots/startXAMPP.png)


-Then copy the Rest API project to the folder of the Apache Server  -> C:\xampp\htdocs
- Check if the database was created or not: http://localhost:8080/phpmyadmin
- Import the SQL database file from the folder traveling-rest-api/v1/database/database.sql to phpmyadmin interface to create the tables.
![alt text](https://github.com/Heni-ghodbane/MiniDemo-Traveling-Website-Angular-5-PHP-API-MYSQL/blob/master/screenshots/importDB.png)

3/ Frontend project  -> open with visual studio code

- Run the command line npm install to install all dependencies of this project and then run ng serve to preview the website on the browser.
- To see the website interface go to http://localhost:4200
    Login as an admin : username : admin / password: admin
    Login as a normal user/cleint: username: hani / password: 1990

Some screenshots:
Serach Flights:
![alt text](https://github.com/Heni-ghodbane/MiniDemo-Traveling-Website-Angular-5-PHP-API-MYSQL/blob/master/screenshots/search.png)
login:
![alt text](https://github.com/Heni-ghodbane/MiniDemo-Traveling-Website-Angular-5-PHP-API-MYSQL/blob/master/screenshots/login.png)
Booked Flights:
![alt text](https://github.com/Heni-ghodbane/MiniDemo-Traveling-Website-Angular-5-PHP-API-MYSQL/blob/master/screenshots/bookingflight.png)


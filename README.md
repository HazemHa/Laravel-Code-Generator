

Laravel Code Generator based on Migration Files




Do you have a well migration files and you want to make a Laravel Application on top of it. By using this tool you can generate Models,Requests with rules, route ,controllers,Forms and a Vue components  like router,store modules and theme. So lets start.

How i can use it ?
 1- copy init.php file to your server.
 2- open result.html and select your migration file
       1- single file
       2- select folder
 3-you can choose any properties from table to be exist or not.
 4- click init code
     1- if it is single file will preview it in page and be ready to send to server.
     2- if it is folder will be ready to send to server
 5- click on create files which will start send data to server to create file
 

Note : if you need to convert and element html or js or php code there are file can do this task for you
       fileToString.html.

How it's work ?

 after reading migration  file as a text.
 push this text into listOfFiles array.
 extract column name and type from migration file by regular expression.
 create new  Setting of  extracted data.
  push Setting into Settings array.
  pass Setting element to  componets to create template of file.
  make file ready to send to server.
  Server process request by creates files 

how can i add new file or new Component?
 import your secipt file in result.html
 go to initObject script and decealr your a new file.
 push it into array  filesPHP which use to send request to server


Installation

  Download the project.
```
```
```
[ssh] - git clone /*******github link******/
[https] - git clone /*******github link******/
```




  



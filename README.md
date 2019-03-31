# Laravel Code Generator based on Migration Files
Do you have a well migration files and you want to make a Laravel Application on top of it?
<br>
By using this tool you can generate Models, Requests with Rules, Routes, Controllers, Forms, and Vue components like routers, store modules, and themes.<br>

So lets start.

## Installation
Simply clone the project.


## Usage
1. Copy `init.php` file to your server.
2. Open `result.html` and select your migration file
       1. single file
       2. select folder
3. You can choose the properties you want from the table.
4. Click init code.
     - if it is single file will preview it in page and be ready to send to server.
     - if it is folder will be ready to send to server
 5. Click on create files which will start sending data to the server to create file.
 

> Note : if you need to convert an HTML element or JS or PHP code, `fileToString.html` can do this task for you.

## How does it work ?

1. After reading the migration file as a text. Push this text into `listOfFiles` array.
2. Then extract column name and type from the migration file via regular expressions.
3. Create new Setting from the extracted data, push Setting into Settings array, and pass Setting element to componets to create template of file.
4. Make the file ready to be sent to the server.
5. The server processes the requests by creating the needed files.

## How can I add new File or new Component?
1. Import your secipt file into `result.html`
2. Go to `initObject` script and declare the new imported file.
3. Push it into `filesPHP` array which is used to send requests to the server.

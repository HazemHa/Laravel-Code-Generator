 RouteFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 RouteFile.prototype = {
         GetFileContent: function () {
             return this.componentObject.GenerateCode();
             /*
                   
                 */

         },
         templateRouteFile: function (template) {
                 return "<?php\n" +
             "/*\n" +
             "|\n" + "---------------------------------------------------------\n" + "-----------------\n" +
             "| Web Routes\n" +
             "|\n" + "--------------------------------------------------------------------------\n" +
             "|\n" +
             "| Here is where you can register web routes for your \n" + "application. These\n" +
             "| routes are loaded by the RouteServiceProvider within a \n" + "group which\n" +
             "| contains the web middleware group. Now create \n" + "something great!\n" +
             "|\n" +
             "\n" + template + "\n";
     },
     sendRequestToServer: function (template) {
         let name = "route.php";
         let type = ProjectName+"/Route";
         try {
            if(isRestFulAPi)
            ajaxRequest(name, type, template == undefined ? this.GetFileContent() : this.templateRouteFile(template));

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     },
    
 }
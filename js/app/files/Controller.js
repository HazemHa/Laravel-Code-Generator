 ControllerFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 ControllerFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" +

             "namespace App\\Http\\Controllers;\n" +

             "use Illuminate\\Http\\Request;\n" +
             "use App\\Http\\Requests\\" + this.Setting.RequestName + ";\n" +
             "use Validator;\n" +
             "class " + this.Setting.ControllerName + " extends Controller {\n" +
             this.componentObject.GenerateCode() + "\n" +
             " }\n";

     },
     sendRequestToServer: function () {
         let name = this.Setting.ControllerName + ".php";
         let type = "Controller";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
        
     }
 }
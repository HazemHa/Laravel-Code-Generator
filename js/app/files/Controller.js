 ControllerFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 ControllerFile.prototype = {
     GetFileContent: function () {
         return "<?php\n" +

             "namespace App\\" + this.Setting.ModelName + "\\Http\\Controllers;\n" +

             "use Illuminate\\Http\\Request;\n" +
             "use Illuminate\\Database\\Eloquent\\ModelNotFoundException;\n" +
             "use App\\" + this.Setting.ModelName + "\\Model\\" + this.Setting.ModelName + ";\n" +
             "use App\\" + this.Setting.ModelName + "\\Http\\Requests\\" + this.Setting.RequestName + ";\n" +
             "use Validator;\n" +
             "class " + this.Setting.ControllerName + " extends Controller {\n" +
             this.componentObject.GenerateCode() + "\n" +
             " }\n";

     },
     sendRequestToServer: function () {
         let name = this.Setting.ControllerName + ".php";
         let type = ProjectName + "/app/" + this.Setting.ModelName + "/Http/Controllers";
         try {
             if (isRestFulAPi)
                 ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
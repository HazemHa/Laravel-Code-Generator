 ModelFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 ModelFile.prototype = {
         GetFileContent: function () {
                 return "<?php \n" +
             "namespace App\\"+this.Setting.ModelName+"\\Model\\"+this.Setting.ModelName+";\n" +
             "use Illuminate\\Database\\Eloquent\\Model;\n" +
             "class " + this.Setting.ModelName + " extends Model {\n" +
             this.componentObject.GenerateCode() +
             " }\n";

     },
     sendRequestToServer: function () {
         let name = this.Setting.ModelName + ".php";
         let type = ProjectName+"/app/"+this.Setting.ModelName+"/Model";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
            $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
     }
 }
 GraghQLQueryFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 GraghQLQueryFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" + "namespace App\\"+this.Setting.ModelName+"\\Http\\GraphQL\\Query;\n" + "\n" + 
                 "use App\\" + this.Setting.ModelName + "\\Model\\"+this.Setting.ModelName+";\n" + "use GraphQL;\n" + "use GraphQL\\Type\\Definition\\Type;\n" + "use Rebing\\GraphQL\\Support\\Query;\n" + "\n" + "class " + this.Setting.ModelName + "Query extends Query{\n" +
              this.componentObject.GenerateCode() +
             "\n}\n";
     },
     sendRequestToServer: function () {
         let name = this.Setting.ModelName + "Query.php";
         let type =  ProjectName+"/app/"+this.Setting.ModelName+"/Http/GraphQL/Query";

         try {
            if(isGraphQL)
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
        
     }
 }
 GraghQLTypeFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 GraghQLTypeFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" 
                 + "namespace App\\"+this.Setting.ModelName+"GraphQL\\Type;\n" + "\n" + 
                 "use App\\" + this.Setting.ModelName + "\\Model\\"+this.Setting.ModelName+";\n" 
                 + "use GraphQL\\Type\\Definition\\Type;\n" + "use Rebing\\GraphQL\\Support\\Type as GraphQLType;\n" + "\n" + "class " + this.Setting.ModelName + "Type extends GraphQLType{\n" + this.componentObject.GenerateCode() + "}\n";
     },
     sendRequestToServer: function () {
         let name = this.Setting.ModelName + "Type.php";
         let type =  ProjectName+"/app/"+this.Setting.ModelName+"/Http//GraphQL/Type";
         try {
            if(isGraphQL)
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
              $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
         
     }
 }
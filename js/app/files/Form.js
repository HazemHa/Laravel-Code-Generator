 FromFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 FromFile.prototype = {
     GetFileContent: function () {
         return this.componentObject.GenerateCode();
     },

     sendRequestToServer: function () {
         let name = this.Setting.FormName + ".blade.php";
         let type = ProjectName+"/blade/" + this.Setting.ModelName;
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
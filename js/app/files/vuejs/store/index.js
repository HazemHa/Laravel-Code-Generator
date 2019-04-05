 IndexStore = function (Setting) {
     this.Setting = Setting;
 }
 IndexStore.prototype = {
     GetFileContent: function () {
         return {
             import: 'import ' + this.Setting.ModelName + "Module" +
                 ' from ' +
                 '\'./' + this.Setting.ModelName + "Module" + '\'' +
                 ';\n',
             Module: this.Setting.ModelName.toLowerCase() + ':' + this.Setting.ModelName + "Module"
         };
     },
     sendRequestToServer: function (template) {
         let name = "index.js";
         let type =  ProjectName+"/Vue/store";
         try {
             ajaxRequest(name, type, template == undefined ? this.GetFileContent() : template);

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
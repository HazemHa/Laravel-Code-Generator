 RouterIndex = function (Setting) {
     this.Setting = Setting;
 }
 RouterIndex.prototype = {
     GetFileContent: function () {
         return {
             import: 'import admin' + this.Setting.ModelName + ' from "../components/pages/admin/CURD/' + this.Setting.ModelName + '.vue";\n',
             routeComponent: '{\n' + '        path: "/admin/' + this.Setting.ModelName + '",\n' +
                 'name: "admin' + this.Setting.ModelName +
                 '",\n' + '        component: admin' + this.Setting.ModelName + '\n' + '        },\n'
         };
     },
     sendRequestToServer: function (template) {
         let name = "index.js";
         let type =  ProjectName+"/Vue/router";
         try {
             ajaxRequest(name, type, template == undefined ? this.GetFileContent() : template);

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     },

 }
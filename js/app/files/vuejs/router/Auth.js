 RouterAuth = function (Setting) {
     this.Setting = Setting;
 }
 RouterAuth.prototype = {
     GetFileContent: function () {
         return "import store from '../store'\n" +
             "export default (to, from, next) => {\n" +
             "// check if user Auth continu request\n" +
             "// else convert to login page. .\n" +
             "// it is like middleware for specific component\n" +
             "if (store.getters.isAuth) {\n" +
             "next()\n" +
             "} else {\n" +
             "next('/login')\n" +
             "}\n" +
             "}\n";


     },

     sendRequestToServer: function () {
         let name = "Auth.js";
         let type =  ProjectName+"/Vue/router";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
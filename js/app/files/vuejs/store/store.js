 ActionsForStore = function (Setting, Helper) {
     this.Setting = Setting;
     this.Helper = Helper;
 }
 ActionsForStore.prototype = {
     GetFileContent: function () {

         let template = 'import axios from "axios"\n' +
             'export default {\n' + 'namespaced: true,   \n' + '    state: {},\n' + '    getters: {},\n' + '    mutations: {},\n' + '    actions: {' + '\n';
         if (isRestFulAPi) {
             template += this.Helper.generateActionsVue() + ',';
         }
         if (isGraphQL) {
             template += this.Helper.generateActionsVueGraphQL();
         }
         template += '}' + '}\n';

         return template;

     },
     sendRequestToServer: function () {
         let name = this.Setting.ModelName + "Module.js";
         let type =  ProjectName+"/Vue/store";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
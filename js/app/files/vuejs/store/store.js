 ActionsForStore = function (Setting, Helper) {
     this.Setting = Setting;
     this.Helper = Helper;
 }
 ActionsForStore.prototype = {
     GetFileContent: function () {
         return 'import axios from "axios"\n' +
             'export default {\n' + 'namespaced: true,   \n' + '    state: {},\n' + '    getters: {},\n' + '    mutations: {},\n' + '    actions: {' + '\n' + this.Helper.generateActionsVue() +
             ',' + this.Helper.generateActionsVueGraphQL() +
             '}\n ' + '}\n';
         /*
         return 'import axios from "axios"\n' +
             'export default{\n' +
             this.Helper.generateActionsVue() +
             "," + this.Helper.generateActionsVueGraphQL() +
             "}\n";
             */
     },
     sendRequestToServer: function () {
         let name = this.Setting.ModelName + "Module.js";
         let type = "Vue/store";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
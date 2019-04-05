 AppVueJs = function (Setting) {
     this.Setting = Setting;
 }
 AppVueJs.prototype = {
     GetFileContent: function () {
         return "/***\n" +
             "First we will load all of this project 's" + "JavaScript dependencies which *\n" +
             "includes Vue and other libraries.It is a" + "great starting point when *\n" +
             "building robust, powerful web applications using Vue and Laravel.*/\n" +
             "require('./bootstrap');\n" +
             "import Vue from 'vue'\n" +
             "import router from './router'\n" +
             "import store from './store'\n" +
             "import Vuetify from 'vuetify'\n" +
             "import App from '../views/App.vue'\n" +
             "import 'vuetify/dist/vuetify.min.css'\n" +
             "import Toaster from 'v-toaster'\n" +
             "// You need a specific loader for CSS files \n like https://github.com/webpack/css-loader\n" +
             "import 'v-toaster/dist/v-toaster.css'\n" +
             "/**\n" +
             " * Next, we will create a fresh Vue application \n instance and attach it to" +
             "* the page. Then, you may begin adding components to this application" +
             "* or customize the JavaScript scaffolding to fit your unique needs. */" +
             "Vue.use(Vuetify)\n" +
             "const app = new Vue({\n" +
             "el: '#app',\n" +
             "store,\n" +
             "router,\n" +
             "components: {\n" +
             "App\n" +
             "},\n" +
             " render: h => h(App),\n" +
             "methods: {\n" +
             " }\n" +
             "});\n" +
             ";\n";

     },
     sendRequestToServer: function () {
         let name = "app.js";
         let type = ProjectName+"/Vue";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
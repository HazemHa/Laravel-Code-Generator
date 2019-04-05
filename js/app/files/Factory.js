 FactoryFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 FactoryFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" +
             "use App\\User;\n" +
             "use Illuminate\\Support\\Str;\n" +
             "use Faker\\Generator as Faker;\n" +
             "/*\n" +
             "|\n" + "--------------------------------------------------------------------------\n" +
             "| Model Factories\n" +
             "|\n" + "-------------------------------------------------------------------------\n" +
             "|\n" +
             "| This directory should contain each of the model \n" + "factory definitions for\n" +
             "| your application. Factories provide a convenient way to generate new\n" +
             "| model instances for testing / seeding your \n" + "application's database.\n" +
             "|\n" +
             "*/\n" + this.componentObject.GenerateCode();
     },
     
     sendRequestToServer: function () {
         let name = this.Setting.FactoryName + ".php";
         let type = ProjectName+"/database";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
            $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
        
     }
 }
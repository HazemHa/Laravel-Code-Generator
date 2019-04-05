 UnitTestFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 UnitTestFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" +

        "namespace Tests\\Unit;\n" +
         "use Illuminate\\Foundation\\Testing\\WithFaker;\n" + "\n"+
           
             "use Tests\\TestCase;\n" +
             "use Illuminate\\Foundation\\Testing\\ RefreshDatabase;\n" +
             "use App\\User;\n" +
             "use App\\" + this.Setting.ModelName +";\n" +
             "class " + this.Setting.ModelName + "Test extends TestCase {\n" +
                     " use WithFaker;\n"+
               this.componentObject.GenerateCode() +
             "}\n";

     },
     sendRequestToServer: function () {
         let name = this.Setting.UnitTestName + ".php";
         let type = ProjectName+"/UnitTest";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
            $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
         
     }
 }
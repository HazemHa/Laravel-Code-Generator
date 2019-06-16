 UnitTestFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }

 UnitTestFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" +

        "namespace App\\"+this.Setting.ModelName+"\\Test\\Unit;\n" +
         "use Illuminate\\Foundation\\Testing\\WithFaker;\n" + "\n"+
           
             "use Tests\\TestCase;\n" +
             "use Illuminate\\Foundation\\Testing\\ RefreshDatabase;\n" +
             "use App\\User\\Model\\User;\n" +
             "use App\\" + this.Setting.ModelName +"\\Model\\"+this.Setting.ModelName+";\n" +
             "class " + this.Setting.ModelName + "Test extends TestCase {\n" +
                     " use WithFaker;\n"+
               this.componentObject.GenerateCode() +
             "}\n";

     },
     sendRequestToServer: function () {
         let name = this.Setting.UnitTestName + ".php";
         let type = ProjectName+"/app/"+this.Setting.ModelName+"/Test/Unit";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
            $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
         
     }
 }
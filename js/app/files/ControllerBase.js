 ControllerBaseFile = function () {}

 ControllerBaseFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" +
             "namespace App\\Core\\Http\\Controllers;\n" +
             "use Illuminate\\Foundation\\Bus\\DispatchesJobs;\n" +
             "use Illuminate\\Routing\\Controller as BaseController;\n" +
             "use Illuminate\\Foundation\\Validation\\ValidatesRequests;\n" +
             "use Illuminate\\Foundation\\Auth\\Access\\AuthorizesRequests;\n" +

             "class Controller extends BaseController\n" +
             "{\n" +
             "    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;\n" +
             "public $messgeSuccess = array('success' => 'task completed successfully');\n\n\n" +
             "public $messageError = array('error' => 'task not completed successfully');\n" +

             "public function createResponseMessage($result){\n" +
             "if($result){\n" +
             "return response()->json($this->messgeSuccess);\n" +
             "}\n" +
             "else{\n" +
             "return response()->json($this->messageError);\n" +
             "}\n" +

             "}\n}\n";

     },
     sendRequestToServer: function () {
         let name = "Controller.php";
         let type = ProjectName+"/app/Core/Http/Controllers";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
        
     }
 }
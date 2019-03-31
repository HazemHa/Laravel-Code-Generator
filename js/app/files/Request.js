 RequestFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }
 RequestFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" +

             "namespace App\\Http\\Requests;\n" +

             "use Illuminate\\Foundation\\Http\\FormRequest;\n" +

             "class " + this.Setting.RequestName + " extends FormRequest {\n" +
             "/**\n" +
             "* Determine if the user is authorized to make this request.\n" +
             " *\n" +
             "* @return bool\n" +
             "*/\n" +
             " public function authorize() {\n" +
             "return false;\n" +
             "}\n" +

             "/**\n" +
             " * Get the validation rules that apply to the request.\n" +
             "*\n" +
             "* @return array\n" +
             "*/\n" +
             "public function rules() {\n" +
             this.componentObject.GenerateCode() +
             "}\n" +
             "}";

     },
     
     sendRequestToServer: function () {
         let name = this.Setting.RequestName + ".php";
         let type = "Request";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
           $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
        
     }
 }
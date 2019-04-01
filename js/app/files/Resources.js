 ResourcesFile = function (Setting, componentObject) {
     this.Setting = Setting;
     this.componentObject = componentObject;
 }
 ResourcesFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" +

             "namespace App\\Http\\Resources;\n" +

             "use Illuminate\\Http\\Resources\\Json\\JsonResource;\n" +

             "class " + this.Setting.ResourceName + " extends JsonResource {\n" +
             "/**\n" +
             " * Transform the resource into an array.\n" +
             " *\n" +
             " * @param  \Illuminate\Http\Request  $request\n" +
             " * @return array\n" +
             " */\n" +
             "public function toArray($request) {\n" +
             this.componentObject.GenerateCode() +
             "}\n" +
             "}\n";


     },
    
     sendRequestToServer: function () {
         let name = this.Setting.ResourceName + ".php";
         let type = "Resource";
         try {
            if(isRestFulAPi)
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
            $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
        
     }
 }
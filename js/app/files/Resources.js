 ResourcesFile = function (Setting, componentObject, Helper) {
     this.Setting = Setting;
     this.helper = Helper;
     this.componentObject = componentObject;
     this.content = "";
     this.path = "";
     this.simplePromise();
 }
 ResourcesFile.prototype = {
         GetFileContent: function () {
                 return "<?php\n" +

             "namespace App\\Http\\Resources;\n" +
             this.path+"\n"+
             "use Illuminate\\Http\\Resources\\Json\\JsonResource;\n" +

             "class " + this.Setting.ResourceName + " extends JsonResource {\n" +
             "/**\n" +
             " * Transform the resource into an array.\n" +
             " *\n" +
             " * @param  \Illuminate\Http\Request  $request\n" +
             " * @return array\n" +
             " */\n" +
             "public function toArray($request) {\n" +
             this.content +
             "}\n" +
             "}\n";


     },
     simplePromise:function(){
         this.content = this.componentObject.GenerateCode();
         this.path = this.helper.pathResources;

     },
     sendRequestToServer: function () {
         let name = this.Setting.ResourceName + ".php";
         let type = ProjectName+"/Resource";
         try {
            if(isRestFulAPi)
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
            $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }
        
     }
 }
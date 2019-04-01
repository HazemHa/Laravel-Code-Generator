GraphQLMutationFile = function (Setting, componentObject) {
  this.Setting = Setting;
  this.componentObject = componentObject;
};

GraphQLMutationFile.prototype = {
    GetFileContent: function () {
        return "<?php\n" +
      "\n" +
      "namespace App\\GraphQL\\Mutation;\n" +
      "\n" +
      "use App\\" +
      this.Setting.ModelName +
      ";\n" +
      "use Validator;\n"+
      "use GraphQL;\n" +
      "use GraphQL\\Type\\Definition\\Type;\n" +
      "use Rebing\\GraphQL\\Support\\Mutation;\n" +
      "use Illuminate\\Database\\Eloquent\\ModelNotFoundException;" +
      "\n" +
      "class mutation" +
      this.Setting.ModelName +
      " extends Mutation\n{\n" +
      this.componentObject.GenerateCode() +
      "\n}\n";
  },
  sendRequestToServer: function() {
    let name = "mutation" + this.Setting.ModelName + ".php";
    let type = "GraphQL/Mutation";
    try{
      if(isGraphQL)
     ajaxRequest(name, type, this.GetFileContent());

    }catch(err){
      $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
    }
    
  }
};
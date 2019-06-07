UnitTest = function (Setting, Helper) {
  this.props = Object.keys(Setting.props);
  this.Setting = Setting;
  this.Helper = Helper;
};
UnitTest.prototype = {
  GenerateCode: function () {
    let UnitTestTemplate = "";
    //  UnitTestTemplate += this.generateLogin() + "\n";
    UnitTestTemplate += this.generateUnitTestForRoute() + "\n";
    return UnitTestTemplate;
  },
  generateLogin: function () {
    let template =
      "/**\n" +
      "* A basic test Login.\n" +
      "*\n" +
      "* @return void\n" +
      "*/\n" +
      "public function testLoginTest() {\n";

    template +=
      "$response = $this->json('POST','/" +
      "login', \n[" +
      "'email' => 'cesar39@example.net',\n 'password' " +
      "=> 'secret'\n" +
      "]); \n" +
      "$response->assertOk(); \n";
    template += "}";

    return template;
  },

  generateUnitTestForRoute: function () {
    let template = "";
    let urls = Object.keys(this.Setting.routes);
    let modifiedChange = "";
    for (let url of urls) {
      // key POST GET DELETE PUT
      // result of Key = path
      nameMethod = this.Helper.GetNameForMethod(url);
      modifiedChange = this.Helper.removeUnNeeded(url, "backend");
      template += this.filterRequest(modifiedChange, this.Setting.routes[url], nameMethod);
    }

    return template;
  },
  filterRequest: function (url, type, nameMethod) {
    switch (type) {
      case "post":
        return this.PostRequest(url, nameMethod) + "\n";
      case "put":
        return this.PUTRequest(url, nameMethod) + "\n";
      case "delete":
        return this.DELETERequest(url, nameMethod) + "\n";
      case "get":
        return this.GETRequest(url, nameMethod) + "\n";
      default:
        return "";
    }
  },
  generateRequestWithData: function (url, type, nameMethod) {
    let template = this.functionTemplate(nameMethod);
    template +=
      " $user = User::inRandomOrder()->first(); \n" +
      " $response = $this->actingAs($user, 'api')->json('" +
      type +
      "','" +
      url +
      "', [ \n" +
      this.Helper.generateFakeData() +
      "\n" +
      " ]); \n" +
      " $response->assertOk(); \n";

    template += "}";
    return template;
  },
  PostRequest: function (url, nameMethod) {
    return this.generateRequestWithData(url, "POST", nameMethod);
  },
  PUTRequest: function (url, nameMethod) {
    return this.generateRequestWithData(url, "PUT", nameMethod);
  },
  DELETERequest: function (url, nameMethod) {
    let template = this.functionTemplate(nameMethod);
    template +=
      "\n $user = User::inRandomOrder()->first(); \n" +
      " $record = " +
      this.Setting.ModelName +
      "::inRandomOrder()->first(); \n" +
      " $response = $this->actingAs($user, 'api')->json('delete','" +
      url +
      "'); \n" +
      "$response->assertOk();  \n";

    template += "}";

    return template;
  },
  GETRequest: function (url, nameMethod) {
    let template = this.functionTemplate(nameMethod);

    if (nameMethod != 'Index') {
      template +=
        " $record = " +
        this.Setting.ModelName +
        "::inRandomOrder()->first(); \n";
    }

    template += "\n $response = $this->get('" +
      url +
      "');" +
      "\n $response->assertOk();\n";

    template += "}";

    return template;
  },
  functionTemplate: function (type) {
    return (
      "/***\n" +
      "A " +
      type +
      " test " +
      this.Setting.ModelName +
      ".*\n" +
      "*\n" +
      "@return void \n" +
      " */\n" +
      " public function test" +
      type +
      this.Setting.ModelName +
      "() {\n"
    );
  }
};
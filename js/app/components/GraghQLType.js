GraphQLType = function (Setting, Helper) {
  this.Setting = Setting;
  this.Helper = Helper;
  this.props = Object.keys(Setting.props);
};
GraphQLType.prototype = {
  GenerateCode: function () {
    return (
      this.generateAttributes() +
      "\n" +
      this.generateFields() +
      "\n" +
      this.generateResolveMethod() +
      "\n"
    );
  },
  generateAttributes() {
    return this.attributesHelper();
  },
  generateFields() {
    let template = "public function fields()\n" + "    {\n";
    template += this.fieldsHelper() + "\n";

    template += "}\n";
    return template;
  },
  generateResolveMethod() {
    let template = "";
    for (const iterator of this.props) {
      template +=
        "\n// If you want to resolve the field yourself, you can declare a method\n" +
        "    // with the following format resolve[FIELD_NAME]Field()\n" +
        "    protected function resolve" +
        iterator.charAt(0).toUpperCase() +
        iterator.slice(1) +
        "Field($root, $args)\n" +
        "    {\n" +
        "        return strtolower($root->" +
        iterator +
        ");" +
        "}\n";
    }
    return template;
  },
  fieldsHelper() {
    let Template = "return [";


    Template +=
      "'id' => [\n" +
      "                'type' => Type::nonNull(Type::int()),\n" +
      "                'description' => 'The id of the " +
      this.Setting.ModelName +
      "'],\n";

    for (let i = 0; i < this.props.length; i++) {
      let item = this.props[i];
      Template +=
        "'" +
        item +
        "' => [\n" +
        "                'type' => Type::nonNull(Type::string()),\n" +
        "                'description' => 'The " +
        item +
        " of the " +
        this.Setting.ModelName +
        "'],\n";
    }

    Template += "'updated_at' => [\n" + "                'type' => Type::nonNull(Type::string()),\n" + "                'description' => 'The updated_at of the " + this.Setting.ModelName + "',\n" + "            ],\n" + "            'created_at' => [\n" + "                'type' => Type::nonNull(Type::string()),\n" + "                'description' => 'The created_at of the " + this.Setting.ModelName + "']\n";

    Template += "];";
    return Template;
  },
  attributesHelper() {
    let Template =
      "protected $attributes = [\n" +
      "        'name' => '" +
      this.Setting.ModelName +
      "',\n" +
      "        'description' => 'A " +
      this.Setting.ModelName +
      "',\n" +
      "        'model' => " +
      this.Setting.ModelName +
      "::class,\n";
    Template += "];";

    return Template;
  }
};
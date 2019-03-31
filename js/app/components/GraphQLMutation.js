GraphQLMutation = function (Setting, Helper) {
  this.Setting = Setting;
  this.Helper = Helper;
  this.props = Object.keys(Setting.props);
};
GraphQLMutation.prototype = {
  GenerateCode: function () {
    return (
      this.generateAttributes() +
      "\n" +
      "//" +
      this.generateQueryForMutation() +
      "\n\n" +
      "//" +
      this.Helper.generateQueryMutatonVueJS() +
      "\n\n" +
      this.generateType() +
      "\n" +
      this.generateArgs() +
      "\n" +
      this.generateResolveMethod() +
      "\n" +
      this.generateValidated() +
      "\n" +
      this.generateValidateFieldsNeeded() +
      "\n"
    );
  },
  generateAttributes() {
    return this.attributesHelper();
  },
  generateType() {
    return (
      " public function type()\n" +
      "    {\n" +
      "        return GraphQL::type('" +
      this.Setting.ModelName +
      "');\n}"
    );
  },
  generateArgs() {
    let template = "public function args()\n" + "    {\n";
    template += this.ArgsHelper();
    template += "}";
    return template;
  },
  generateResolveMethod() {

    let template = "public function resolve($root, $args)" + "{\n";
    template +=
      "if ($args['flag'] === 'create') {\n" +
      "$validated = $this->validated($args);\n" + "            if ($validated) {\n" + "                return $validated;\n" + "            }\n" +
      "$" +
      this.Setting.ModelName +
      " = " +
      this.Setting.ModelName +
      "::create(" +
      this.ResolveMethodHelper('create') +
      ");" +
      " return $" +
      this.Setting.ModelName +
      ";\n" +
      "}\n" +
      "else if ($args['flag'] === 'update') {\n" +
      "$validated = $this->validated($args);\n" + "            if ($validated) {\n" + "                return $validated;\n" + "            }\n" +
      "            $" +
      this.Setting.ModelName +
      " = " +
      this.Setting.ModelName +
      "::updateOrCreate(['id'=>$args['id']],\n" +
      this.ResolveMethodHelper('update') +
      "\n" +
      "            );\n" +
      "\n" +
      "            return $" +
      this.Setting.ModelName +
      ";\n" +
      "        } else if ($args['flag'] === 'delete') {\n try {\n" +
      "            $record = " +
      this.Setting.ModelName +
      "::findOrFail($args['id']);\n" +
      "            $isDone =  " +
      this.Setting.ModelName +
      "::destroy($record->id);\n" +
      "            if ($isDone) {\n" +
      "                return $record;\n" +
      "            }\n}\n" +
      "catch (ModelNotFoundException $e) {\n" +
      "return ['id' => '-1'];\n" +
      "}\n" +
      "\n" +
      "}\n";

    template += "}\n";
    return template;
  },
  ArgsHelper() {
    let Template = "return [\n";
    Template +=
      "'id' => [\n" +
      "                'type' => (Type::int()),\n" +
      "                'description' => 'The id of the " +
      this.Setting.ModelName +
      "'],\n";

    Template +=
      "'flag' => [\n" +
      "                'type' => Type::nonNull(Type::string()),\n" +
      "                'description' => 'The flag of the " +
      this.Setting.ModelName +
      " operation'],\n";
    for (let i = 0; i < this.props.length; i++) {
      let item = this.props[i];

      if (i == this.props.length - 1) {
        Template +=
          "'" +
          item +
          "' => [\n" +
          "                'type' => (Type::string()),\n" +
          "                'description' => 'The " +
          item +
          " of the " +
          this.Setting.ModelName +
          "'\n]\n";
      } else {
        Template +=
          "'" +
          item +
          "' => [\n" +
          "                'type' => (Type::string()),\n" +
          "                'description' => 'The " +
          item +
          " of the " +
          this.Setting.ModelName +
          "'\n  \n ],\n";
      }
    }
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
  },
  ResolveMethodHelper(flag = "") {
    let Template = "\n[";
    if (flag != 'create') {
      Template += "\n'id' => $args['id'],\n";

    }
    for (let i = 0; i < this.props.length; i++) {
      let item = this.props[i];
      if (i == this.props.length - 1) {
        Template += "\n'" + item + "' => $args['" + item + "']\n";
      } else {
        Template += "\n'" + item + "' => $args['" + item + "'],\n";
      }
    }
    Template += "]\n";
    return Template;
  },
  generateValidated() {
    return "public function validated($args)\n" + "    {\n" + "        $validate = $this->validateFieldsNeeded($args);\n" + "\n" + "        if ($validate) {\n" + "            return $validate;\n" + "        }\n" + "    }\n";
  },
  generateValidateFieldsNeeded() {
    let template = "";
    template += "public function validateFieldsNeeded($args)\n" + "    {\n" + "\n" + "        $validator = Validator::make($args, [" + this.Helper.generateValidateTemplate() + "]);\n" + "        if ($validator->fails()) {\n" + "            $validator->errors()->add('id', -1);\n" + "            $error =  $validator->errors();\n" + "\n" + "            $" + this.Setting.ModelName + "Error = new " + this.Setting.ModelName + ";\n" + "\n";


    let iteratorProps = this.props.values();
    for (let value of iteratorProps) {
      template +=
        "$" + this.Setting.ModelName + "Error-> " + value + " = $error->messages()['" + value + "'][0];\n";
    }

    template += "\n" + "            return $" + this.Setting.ModelName + "Error;\n" + "        }\n" + "\n" + "        return null;\n" + "    }\n";

    return template;
  },
  generateQueryForMutation() {
    let template = "graphql?query=mutation+" + this.Setting.ModelName + "{mutation" +
      this.Setting.ModelName + "(";

    for (let i = 0; i < this.props.length; i++) {
      let item = this.props[i];
      if (i == this.props.length - 1) {
        template += item + ': "defaultValueFor_' + item + ' "';
      } else {
        template += item + ': "defaultValueFor_' + item + ' ",';
      }
    }

    template += ")";
    template += this.Helper.generateQuery();
    template += "}";
    return template;
  }

};
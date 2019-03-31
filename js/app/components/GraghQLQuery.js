GraphQLQuery = function (Setting, Helper) {
    this.Setting = Setting;
    this.Helper = Helper;
    this.props = Object.keys(Setting.props);

}
GraphQLQuery.prototype = {
    GenerateCode: function () {
        return this.generateAttributes() + "\n" + this.generateType() +
            "\n" +
            "\n//" +
            this.Helper.generateQuery() + "\n" +
            this.generateArgs() +
            "\n" +
            this.generateResolve();

    },
    generateAttributes() {
        return "protected $attributes = [\n" + "        'name' => '" + this.Setting.ModelName + " query'\n" + "    ];\n";
    },
    generateType() {
        return "public function type()\n" + "    {\n" + "        return Type::listOf(GraphQL::type('" + this.Setting.ModelName + "'));\n}\n";
    },
    generateArgs() {
        let Template = "public function args()\n" + "    {\nreturn [\n";
        Template += this.argsHelper();
        Template += "];\n}";

        return Template;

    },
    generateResolve() {
        let Template = "public function resolve($root, $args){\n";
        Template += this.resolveHelper();
        Template += "  return " + this.Setting.ModelName + "::all();\n}\n";

        return Template;

    },
    argsHelper() {
        let Template = "";
        Template += "'id' => ['name' => 'id', 'type' => Type::int()],\n";

        for (let i = 0; i < this.props.length; i++) {
            let item = this.props[i];

            if (i == this.props.length - 1) {
                Template += "'" + item + "' => ['name' => '" + item + "', 'type' => Type::string()]\n";
            } else {
                Template += "'" + item + "' => ['name' => '" + item + "', 'type' => Type::string()],\n";
            }
        }
        return Template;

    },
    resolveHelper() {
        let Template = "";
        Template += "if (isset($args['id'])) {\n" + "            return " + this.Setting.ModelName + "::where('id', $args['id'])->get();\n}\n";

        for (let i = 0; i < this.props.length; i++) {
            let item = this.props[i];

            if (i == this.props.length - 1) {
                Template += "if (isset($args['" + item + "'])) {\n" + "            return " + this.Setting.ModelName + "::where('" + item + "', $args['" + item + "'])->get();\n}\n";
            } else {
                Template += "if (isset($args['" + item + "'])) {\n" + "            return " + this.Setting.ModelName + "::where('" + item + "', $args['" + item + "'])->get();\n}\n";
            }
        }
        return Template;
    }


}
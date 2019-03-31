Resources = function (Setting, Helper) {
    this.Setting = Setting;
    this.Helper = Helper;
    this.props = Object.keys(Setting.props);

}
Resources.prototype = {
    GenerateCode: function () {
        let template = "/* for one record \n" +
            " \n   return new " + this.Setting.ResourceName + "(" + this.Setting.ModelName + "::find($id)); \n" +
            "\n for multi records \n" +
            "\nreturn " + this.Setting.ResourceName + "::collection(" + this.Setting.ModelName + "::all());\n */ \n" +
            "return [\n";

        template += this.Helper.generateResourcesFields();
        template += "'created_at' => $this->created_at,\n";
        template += "'updated_at' => $this->updated_at\n"
        template += "];\n";

        return template;
    }
}
RequestRules = function (Setting, Helper) {
    this.Helper = Helper;
    this.props = Object.keys(Setting.props);

}
RequestRules.prototype = {
    GenerateCode: function () {
        let template = " return [\n";
        template += this.Helper.generateRequestRules();
        template += "];\n";

        return template;
    }
}
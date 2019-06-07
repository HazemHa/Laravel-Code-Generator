DBFactory = function (Setting, Helper) {
    this.props = Object.keys(Setting.props);
    this.Helper = Helper;
    this.ModelName = Setting.ModelName;
}
DBFactory.prototype = {
    GenerateCode: function () {
        let factoryTemplate = "$factory->define(App\\"+this.ModelName+"\\Model\\" + this.ModelName + "::class, function (Faker $faker){" +
            "\nreturn [\n";


        factoryTemplate += this.Helper.generateFakeData();
        factoryTemplate += "];\n});\n";
        return factoryTemplate;
    }
}
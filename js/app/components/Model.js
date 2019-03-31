Model = function (Setting, Helper) {
    this.tableName = Setting.tableName;
    this.Helper = Helper;
    this.props = Object.keys(Setting.props);

}
Model.prototype = {
    GenerateCode: function () {
        return "protected $table = '" + this.tableName + "';\n" +
            "protected $primaryKey  = 'id';\n" +
            "protected $fillable = [" +
            this.formatForFillable() +
            "];\n";
    },
    formatForFillable: function () {
        return this.Helper.generateArray();

    }
}
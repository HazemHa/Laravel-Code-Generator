Model = function (Setting, Helper) {
    this.tableName = Setting.tableName;
    this.Helper = Helper;

}
Model.prototype = {
    GenerateCode: function () {
        return "protected $table = '" + this.tableName + "';\n" +
            "protected $primaryKey  = 'id';\n" +
            "protected $fillable = [" +
            this.formatForFillable() +
            "];\n\n\n" +
            this.createRelationship() + "\n";
    },
    formatForFillable: function () {
        return this.Helper.generateArray();

    },
    createRelationship: function () {
        let template = "";
        for (let index = 0; index < OriginalToForeignTables.length; index++) {
            if ((OriginalToForeignTables[index] instanceof Object) && (OriginalToForeignTables[index] !== null)) {
                let relationship = this.relationship(OriginalToForeignTables[index]);
                if (relationship != undefined) {
                    template += relationship;
                }
            }

        }
        return template;

    },
    relationship: function (foreignObject) {
        if (foreignObject.Table == this.tableName) {
            return this.belongsTo(foreignObject);
        } else if (foreignObject.Reference == this.tableName) {
            return this.hasMany(foreignObject);
        }
        return "";

    },
    hasMany: function (foreignObject) {
        return " public function " + foreignObject.Table.plural(true) + "()\n" +
            "    {\n" +
            "        return $this->hasMany('App\\" + snakeToCamel(foreignObject.Table.plural(true)) + "');\n" +
            "    }\n";
    },
    belongsTo: function (foreignObject) {
        return "public function " + foreignObject.Reference.plural(true) + "()\n" +
            "    {\n" +
            "        return $this->belongsTo('App\\" + snakeToCamel(foreignObject.Reference.plural(true)) + "');\n" +
            "    }\n";
    }
}
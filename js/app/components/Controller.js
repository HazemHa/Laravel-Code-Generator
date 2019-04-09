// this is class to generate controller file
Controller = function (Setting, Helper) {
    this.Setting = Setting;
    this.Helper = Helper;
    this.props = Object.keys(Setting.props);

}
Controller.prototype = {
    GenerateCode: function () {
        var template =
            // generate text for create record
            this.generateCreateNewRecord() + "\n" +
            " // this for update record :\n" +
            // generate text for update record
            this.generateUpdateRecord() + "\n" +
            "// this for destroy record :\n" +
            // generate text for destroy record 
            this.generateDestroy() + "\n";

        return template;
    },
    generateCreateNewRecord: function () {
        let TemplateNewRecord = "/***" +
            "Store a newly created resource in storage.*\n" +
            "*\n" +
            "@param\\Illuminate\\Http\\Request $request *\n" +
            "@return\\Illuminate\\Http\\Response *\n" +
            "*/\n" +
            "public function store(Request $request) {\n";
        // generateValidate => generate validate rule 
        TemplateNewRecord += this.generateValidate() + "\n" +
            this.generateManuallyValidate() + "\n";

        TemplateNewRecord +=
            "// $request->validated(); \n" +
            "$newRecord = new " + this.Setting.ModelName + ";";

        // first Scenario

        TemplateNewRecord += this.Helper.generateNewRecord();
        TemplateNewRecord += "$result =  $newRecord->save();\n\n\n\n";

        // second Scenario
        TemplateNewRecord += "/* \n $newRecord = App\\" + this.ModelName + "::create([";

        TemplateNewRecord += this.Helper.generateCreateRecord();
        TemplateNewRecord += "]); \n\n */ ";
        TemplateNewRecord += this.generateResponseMessage("result");

        TemplateNewRecord += "}\n";
        return TemplateNewRecord;

    },
    generateUpdateRecord: function () {
        let TemplateUpdateRecord = "/***\n" +
            "Update the specified resource in storage.*" +
            "*\n" +
            "@param\\Illuminate\\Http\\Request $request *\n" +
            "@param int $id *\n" +
            "@return\\Illuminate\\Http\\Response *\n" +
            "*/\n" +
            "public function update(Request $request, $id) {\n";

        TemplateUpdateRecord += this.generateValidate() + "\n";
        TemplateUpdateRecord += this.generateManuallyValidate() + "\n";

        TemplateUpdateRecord += "$UpdatedRecord = App\\" + this.Setting.ModelName + "::find($id);\n";
        let iteratorProps = this.props.values();
        for (let value of iteratorProps) {
            TemplateUpdateRecord +=
                "$UpdatedRecord->" + value + " = $request->" + value + ";\n"
        }
        TemplateUpdateRecord += "$result = $UpdatedRecord->save();\n";

        TemplateUpdateRecord += "\n/* \n $result = $UpdatedRecord->update($request->all()); */\n";
        TemplateUpdateRecord += this.generateResponseMessage("result");
        TemplateUpdateRecord += "\n}\n";

        return TemplateUpdateRecord;
    },
    generateDestroy: function () {
        templateRemove = " /***\n" +
            "Remove the specified resource from storage.*\n" +
            " *\n" +
            "@param int $id *\n" +
            " @return\\Illuminate\\Http\\Response \n**/\n" +
            "public function destroy($id) {\n";
        templateRemove +=
            "\n" +
            "try {"+
            "$record = App\\" + this.Setting.ModelName + "::findOrFail($id);\n" +
            "$result =  App\\" + this.Setting.ModelName + "::destroy($record->id);\n" +
            "} catch (ModelNotFoundException $e) {\n"+
                "return ['error' => 'there are no data for this record '];\n"+
            "}\n"+
            this.generateResponseMessage("result");

        templateRemove += "}\n";

        return templateRemove;
    },
    generateManuallyValidate: function () {
        let templateValidate =
            "/* \n$validator = Validator::make($request->all(), [\n";
        templateValidate += this.Helper.generateValidateTemplate();
        templateValidate += "]);\n";

        templateValidate +=
            "if ($validator->fails()) {\n" +
            "return redirect()->back()\n" +
            "->withErrors($validator)\n" +
            "->withInput();\n} \n */ \n";

        return templateValidate;
    },
    generateValidate: function () {
        let templateValidate =
            "/* \n $validatedData = $request->validate([\n";
        templateValidate += this.Helper.generateValidateTemplate();
        templateValidate += "]);\n */ \n";

        return templateValidate;
    },
    generateResponseMessage: function (NameVariable = "result") {

        let templateMessage = "\n return $this->createResponseMessage($" + NameVariable + ");\n";


        return templateMessage;
    }

}
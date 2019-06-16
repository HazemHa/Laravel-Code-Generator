Route = function (Setting) {
    this.Setting = Setting;
}
Route.prototype = {
    GenerateCode: function () {
        let result = "";
        if (UseRouteNormal) {
            result += this.generateResources() + " \n ";
        }
        if (UseRouteResource) {
            result += this.generateRouteMethod() + " \n ";
        }
        return result;
    },
    generateResources: function () {
        let template = "\nRoute::resources([\n" +
            "'/" + this.Setting.ModelName + "' => '" + this.Setting.ControllerName + "'\n" +
            "]);\n\n";
        return template;
    },
    generateRouteMethod: function () {
        let template = "\n " +
            "Route::get('/" + this.Setting.ModelName + "', '" + this.Setting.ControllerName + "@View" + this.Setting.ModelName + "'); \n" +
            "Route::post('/" + this.Setting.ModelName + "', '" + this.Setting.ControllerName + "@Store" + this.Setting.ModelName + "');\n" +
            "Route::put('/" + this.Setting.ModelName + "', '" + this.Setting.ControllerName + "@Update" + this.Setting.ModelName + "');\n" +
            " // Route::patch('/" + this.Setting.ModelName + "', '" + this.Setting.ControllerName + "@Update" + this.Setting.ModelName + "');\n" +
            "Route::delete('/" + this.Setting.ModelName + "', '" + this.Setting.ControllerName + "@Delete" + this.Setting.ModelName + "');\n";

        return template;
    }

}
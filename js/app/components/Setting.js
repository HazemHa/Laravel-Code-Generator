Setting = function (tableName) {


    this.tableName = tableName;
    this.ModelName = this.computeModelName(this.tableName);
    this.ControllerName = this.ModelName + "Controller";
    this.ResourceName = this.ModelName + "Resource";
    this.RequestName = this.ModelName + "Request";
    this.FactoryName = this.ModelName + "Factory";
    this.RouteName = this.ModelName + "Route";
    this.UnitTestName = this.ModelName + "UnitTest";
    this.FormName = this.ModelName + "Form";
    this.props = [];
    this.routes = this.settingRoute();

}

Setting.prototype = {

    settingRoute: function () {
        let arry = [];
        arry["/" + this.ModelName] = "get";
        arry["/" + this.ModelName + "/?"] = "get";
        arry["post/" + this.ModelName] = "post";
        arry["delete/" + this.ModelName + "/?"] = "delete";
        arry["put/" + this.ModelName + "/?"] = "put";
        arry["/" + this.ModelName + "/create"] = "get";
        arry["/" + this.ModelName + "/?/edit"] = "get";
        return arry;


    },
    reset: function () {
        if (this.props.length > 0) {
            delete this.tableName;
            delete this.ModelName;
            delete this.ControllerName;
            delete this.ResourceName;
            delete this.RequestName;
            delete this.props;
        }

    },
    addProps: function (element) {
        this.props.push(element);
    },
    computeModelName: function (TableName) {
        return snakeToCamel(TableName.plural(true));
    },
   

    UpperFirstLetter(string) {
        return string.charAt(0).toUpperCase() +
            string.slice(1);
    },
    ajaxRequest(name, type, content) {
        $.ajax({
            url: "http://127.0.0.1/init.php",
            type: "POST",
            data: {
                name: name,
                type: type,
                content: content
            },
            success: function (res, status) {
                //  $TableResultFromServer
                if (status == 'success') {
                    $TableResultFromServer.append('<tr class="bg-success"><td>' + name + '</td><td>' + status + '</td></tr>');
                } else {
                    $TableResultFromServer.append('<tr class="bg-warning"><td>' + name + '</td><td>' + status + '</td></tr>');
                }
                /*
                toastr.success(name + " created successfully", name);*/
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + textStatus + '</td></tr>');
                /*
                toastr.error(
                name + " There Are an Error but go check your files", name);*/
            }
        });
    }

}
Helper = function (Setting) {
    this.Setting = Setting;
    this.props = Object.keys(Setting.props);
}
Helper.prototype = {
    generateFakeData: function () {
        let temp = "";
        for (let i = 0; i < this.props.length; i++) {
            let item = this.props[i];
            if (i == this.props.length - 1) {
                temp += "'" + item + "'=> $faker->name\n";
            } else {
                temp += "'" + item + "'=> $faker->name,\n";

            }
        }
        return temp;
    },
    generateFakeDataForUnitTest: function () {
        let temp = "";
        for (let i = 0; i < this.props.length; i++) {
            let item = this.props[i];
            if (i == this.props.length - 1) {
                temp += "'" + item + "'=> $this->faker->name\n";
            } else {
                temp += "'" + item + "'=> $this->faker->name,\n";

            }
        }
        return temp;
    },
    generateRequestRules: function () {
        let temp = "";
        for (let i = 0; i < this.props.length; i++) {
            var item = this.props[i];
            if (i == this.props.length - 1) {
                temp += "'" + item + "' => 'required'\n"

            } else {
                temp += "'" + item + "' => 'required',\n"

            }
        }
        return temp;
    },
    generateResourcesFields: function () {
        let temp = "";
        for (let i = 0; i < this.props.length; i++) {
            var item = this.props[i];
            temp += "'" + item + "' => $this->" + item + ",\n"

        }
        return temp;

    },
    generateArray: function () {
        let temp = "";
        for (let i = 0; i < this.props.length; i++) {
            var item = this.props[i];
            if (i == this.props.length - 1) {
                temp += "'" + item + "'"

            } else {
                temp += "'" + item + "',"
            }
        }
        return temp;
    },
    generateValidateTemplate: function () {


        let Template = "";
        for (let i = 0; i < this.props.length; i++) {
            let item = this.props[i];

            if (i == this.props.length - 1) {
                Template += "'" + item + "' => 'required'\n";
            } else {
                Template += "'" + item + "' => 'required',\n";
            }
        }
        return Template;
    },
    generateCreateRecord: function () {
        let TemplateNewRecord = "";
        for (let i = 0; i < this.props.length; i++) {
            let item = this.props[i];

            if (i == this.props.length - 1) {
                TemplateNewRecord += "'" + item + "'=>$request->" + item + "\n"
            } else {
                TemplateNewRecord += "'" + item + "'=>$request->" + item + ",\n"
            }
        }
        return TemplateNewRecord;
    },
    generateNewRecord: function () {
        let TemplateNewRecord = "\n";
        for (let value of this.props) {
            TemplateNewRecord += "$newRecord->" + value + " = $request->" + value + ";\n"
        }
        return TemplateNewRecord;
    },
    generateActionsVue: function () {
        let urls = Object.keys(this.Setting.routes);
        let template = "\n";
        for (let index = 0; index < urls.length; index++) {
            const url = urls[index];
            let modifiedURL = this.removeUnNeeded(url, "vue");
            let NameMethod = this.GetNameForMethod(url);
            if (index == urls.length - 1) {
                template += NameMethod + this.Setting.ModelName +
                    "({commit},data) {\n" + "            return new Promise((resolve, reject) => {\n" + "                axios." + this.Setting.routes[url] + "(this.getters.url +`api" + modifiedURL + "`" + this.setDataForRequest(this.Setting.routes[url]) + ")\n" + "                    .then((res) => {\n" + "                        resolve(res);\n" + "                    }).catch((err) => {\n" + "                        reject(err);\n" + "                    })\n" + "            })}\n";
            } else {
                template += NameMethod + this.Setting.ModelName +
                    "({commit},data) {\n" + "            return new Promise((resolve, reject) => {\n" + "                axios." + this.Setting.routes[url] + "(this.getters.url +`api" + modifiedURL + "`" + this.setDataForRequest(this.Setting.routes[url]) + ")\n" + "                    .then((res) => {\n" + "                        resolve(res);\n" + "                    }).catch((err) => {\n" + "                        reject(err);\n" + "                    })\n" + "            })},\n";

            }

        }
        return template;
    },
    setDataForRequest: function (flag) {
        if (flag == 'put' || flag == 'post') return ",data";

        return "";
    },
    GetNameForMethod: function (url) {
        if (url.match(/^\/\w+$/)) {
            return 'Index';
        } else if (url.match(/^\/\w+\/(\?|(\$record->id))$/)) {
            return 'Show';
        } else if (url.match(/^(post)/)) {
            return 'Store';
        } else if (url.match(/^(delete)/)) {
            return 'Destroy';

        } else if (url.match(/^(put)/)) {
            return 'Update';
        } else if (url.match(/(create)$/)) {
            return 'Create';

        } else if (url.match(/(edit)$/)) {
            return 'Edit';
        }
        return undefined;
    },
    generateActionsVueGraphQL: function () {
        let urls = Object.keys(this.Setting.routes);
        let template = "";
        for (let index = 0; index < urls.length; index++) {
            const url = urls[index];
            if (url.includes("create") || url.includes("edit")) continue;
            const flag = this.setFlagForQueryMutation(url);
            if (flag == undefined) continue;
            if (index == urls.length - 1) {
                template += flag + this.Setting.ModelName +
                    "({commit},data) {\n" + "            return new Promise((resolve, reject) => {\n" + "                axios.get(this.getters.url +" + this.QueryOrMutation(flag) + ")\n" + "                    .then((res) => {\n" + "                        resolve(res);\n" + "                    }).catch((err) => {\n" + "                        reject(err);\n" + "                    })\n" + "            })}\n";
            } else {
                template += flag + this.Setting.ModelName +
                    "({commit},data) {\n" + "            return new Promise((resolve, reject) => {\n" + "                axios.get(this.getters.url +" + this.QueryOrMutation(flag) + ")\n" + "                    .then((res) => {\n" + "                        resolve(res);\n" + "                    }).catch((err) => {\n" + "                        reject(err);\n" + "                    })\n" + "            })},\n";

            }

        }
        return template;
    },
    QueryOrMutation: function (flag) {
        if (flag == 'getSpecific') {
            return "`graphql?query=query+Fetch" + this.Setting.ModelName + "{" + this.generateQuery(true) + "}`";
        } else if (flag == 'get') {
            return "`graphql?query=query+Fetch" + this.Setting.ModelName + "{" + this.generateQuery(false) + "}`";
        } else {
            return this.generateQueryMutatonVueJS(flag)
        }
    },
    generateQueryMutatonVueJS: function (flag = "") {
        let template = "`graphql?query=mutation+" + this.Setting.ModelName + "{mutation" +
            this.Setting.ModelName;

        if (flag == 'create') {
            template += "(flag:\"" + flag + "\",";
        } else if (flag == 'delete') {
            template += "(id:${data.id},flag:\"" + flag + "\"";
        } else {
            template += "(id:${data.id},flag:\"" + flag + "\",";
        }

        for (let i = 0; i < this.props.length; i++) {
            let item = this.props[i];
            if (flag == 'delete') {
                break;
            }
            if (i == this.props.length - 1) {
                template += item + ': "${data.' + item + '}"';
            } else {
                template += item + ': "${data.' + item + '}",';
            }
        }

        template += ")";
        if (flag == 'delete') {
            template += "{id}";
        } else {
            template += this.generateQuery().replace(/^\w+/, "");
        }
        template += "}";

        template += "`";
        return template;
    },
    setFlagForQueryMutation: function (url) {
        if (url.includes('post')) {
            return 'create';
        } else if (url.includes('put')) {
            return 'update';
        } else if (url.includes('delete')) {
            return 'delete';
        } else if (url.match(/\/\w+\/\?/)) {
            return 'getSpecific';
        } else if (url.match(/\/\w+/)) {
            return 'get';
        }
        return undefined;

    },
    removeUnNeeded: function (url, type) {
        if (url.includes('post')) {
            url = url.replace('post', '');
        }
        if (url.includes('put')) {
            url = url.replace('put', '');
        }
        if (url.includes('delete')) {
            url = url.replace('delete', '');
        }

        if (url.includes('?')) {
            if (type == "vue") {
                url = url.replace('?', '${data.id}');
            } else {
                url = url.replace('?', '\'+$record->id+\'');
            }
        }

        return url;
    },
    generateTable: function () {
        let template =
            "<table class='table'> " +
            "<thead >" +
            "<tr>" +
            "<th scope = 'col' > Column </th> " +
            "<th scope = 'col' > type </th>" +
            " <th scope = 'col' > used </th>" +
            "</tr> " +
            "</thead> " +
            "<tbody>";

        return template;
    },
    generateQuery(isSpecific = false) {
        let template = "";

        if (!isSpecific) {
            template = this.Setting.ModelName + "{id,";
        } else {
            template = this.Setting.ModelName + "(id:${data.id}){id,";
        }
        for (let i = 0; i < this.props.length; i++) {
            let item = this.props[i];
            if (i == this.props.length - 1) {
                template += item;
            } else {
                template += item + ',';
            }
        }

        template += "}";
        return template;
    }
}
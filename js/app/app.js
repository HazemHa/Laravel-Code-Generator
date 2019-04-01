var $listFiles;
var $TableResultFromServer;
// refer to migration file i read it as a text
var listOfFiles = [];
Settings = [];
// array of files which they are ready to send to server
filesPHP = [];
// to reset arry to avoid duplicate
var isObjectsReady = false;

let isGraphQL = false;
let isRestFulAPi = false;

/*
function removeComments(text) {
    let regExpr = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
    return this.RemoveWithRegExpr(text, regExpr);
}
*/


function init() {
    var button = document.getElementById("generate");
    let CreateFiles = document.getElementById("CreateFiles");

    let graphql = document.getElementById("graphql");
    let restfulAPI = document.getElementById("restfulAPI");


    graphql.addEventListener('click', function (e) {
        let isChecked = $(e.target).prop('checked');
        isGraphQL = isChecked;
    }, false);

    restfulAPI.addEventListener('click', function (e) {
        let isChecked = $(e.target).prop('checked');
        isRestFulAPi = isChecked;
    }, false);



    CreateFiles.onclick = function (e) {
        e.preventDefault();
        GenerateFiles();
    };
    button.onclick = function (e) {
        e.preventDefault();
        GenerateCode();
        $('#CreateFiles').removeAttr("disabled");
    };

    let inputFile = document.getElementById("file-input");
    inputFile.addEventListener("change", readSingleFile, false)
    inputFile.addEventListener("click", function (e) {
        listOfFiles = [];
    }, false);
    $files = $("#files_input");
    $files.click(function () {
        listOfFiles = [];
    });
    $listFiles = $("#list_of_files");
    $TableResultFromServer = $("#TableResultFromServer");
    $("#files_input").change(function (event) {
        for (const file of event.target.files) {
            listOfFiles.push(file);

        }
        $('#generate').removeAttr("disabled");
        let promise = new Promise(function (resolve, reject) {
            try {
                for (var i = 0, l = listOfFiles.length; i < l; ++i) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        let TableName = GetTableName(e.target.result);
                        let props = GetPropsFromFile(e.target.result);
                        CreateNewSetting(TableName, props);

                    };
                    reader.readAsText(listOfFiles[i]);
                }
                resolve(true);
            } catch (e) {
                reject(false);
            }

        });
        promise.then(function (result) {
            if (result) {
                setTimeout(function () {
                    ShowPropsInTable();
                }, 1000);
            }

        })

    });
}

// active listeners for checkbox
function EventForCheckBox(array) {
    for (const checkbox of array) {
        checkbox.addEventListener('click', function (e) {
            let isChecked = $(e.target).prop('checked');
            let IndexFile = e.target.getAttribute("IndexFile");
            let TypeFiled = e.target.getAttribute("TypeProps");
            let Key = e.target.value;
            if (isChecked) {
                Settings[IndexFile].props[Key] = TypeFiled;
            } else {
                delete Settings[IndexFile].props[Key];
            }
        }, false);
    }

}


// after ready the migration file and get out the props put them into Setting object
function CreateNewSetting(TableName, props) {
    const NewSetting = new Setting(TableName);
    NewSetting.props = props;
    Settings.push(NewSetting);
}


// set preview code in html elements in page
function previewCodeInPage() {
    $("#controllerFormat").val(filesPHP[0].GetFileContent());

    $("#ModelFormat").val(filesPHP[1].GetFileContent());
    $("#FactoryFormat").val(filesPHP[2].GetFileContent());
    $("#ResourcesFormat").val(filesPHP[3].GetFileContent());
    $("#RulesFormat").val(filesPHP[4].GetFileContent());
    $("#FormFormat").val(filesPHP[5].GetFileContent());
    $("#previewForm").html(filesPHP[5].GetFileContent());
    $("#RoutesFormat").val(filesPHP[6].GetFileContent());
    $("#UnitTestFormat").val(filesPHP[7].GetFileContent());

}



// send text to server to create file for all components we set them in array file php
function sendDataToServer(filesPHP) {
    let RouteString = "";
    let RouteImports = "";
    let RouteElement = "";
    let RouteTemplate = "";
    let StoreImportVueJS = "";
    let StoreModuleVueJS = "";
    let StoreTemplate = "";

    for (const filePHP of filesPHP) {
        if (filePHP instanceof RouteFile) {
            RouteString += filePHP.GetFileContent();
        } else if (filePHP instanceof RouterIndex) {
            RouteImports += filePHP.GetFileContent().import+"\n";
            RouteElement += filePHP.GetFileContent().routeComponent + "\n";
        } else if (filePHP instanceof IndexStore) {
            StoreImportVueJS += filePHP.GetFileContent().import+"\n";
            StoreModuleVueJS += filePHP.GetFileContent().Module + ",\n";

        } else {

            filePHP.sendRequestToServer();
        }
    }
    RouteTemplate += RouteImports + "\n export default [" + RouteElement;
    RouteTemplate += "]";

    StoreTemplate += StoreImportVueJS + "\n";

    StoreTemplate += 'const store = new Vuex.Store({\n' + '    plugins: [],\n' + '    modules: {' + StoreModuleVueJS + '}\n' + '});\n' + 'export default store;\n'
    // this is base controller just to return feedback for all controllers functions
    // put it outside loop because we want to create it once
    try {
        let ControllerBase = new ControllerBaseFile();
        let SingleRouteFile = new RouteFile();
        let RouterIndexFile = new RouterIndex();
        let RouterAuthFile = new RouterAuth();
        let IndexStoreFile = new IndexStore();
        let AppVueJsFile = new AppVueJs();
        let AppThemeVueJSFile = new AppThemeVueJS();


        RouterIndexFile.sendRequestToServer(RouteTemplate);
        SingleRouteFile.sendRequestToServer(RouteString);
        IndexStoreFile.sendRequestToServer(StoreTemplate);
        ControllerBase.sendRequestToServer();
        RouterAuthFile.sendRequestToServer();
        AppVueJsFile.sendRequestToServer();
        AppThemeVueJSFile.sendRequestToServer();
    } catch (err) {
        console.log(err);
    }

}

// event when click on generateMyCode put
function GenerateCode() {
    if (isObjectsReady) {
        // if clicked before reset the data to avoid duplicate
        listOfFiles = [];
        Settings = [];
        //   CodeToFileList = [];
        filesPHP = [];
        isObjectsReady = false;
    }
    if (IsSingleFile()) {
        initObjects(Settings[0]);
    } else {
        for (const Setting of Settings) {
            initObjects(Setting);
        }

    }
    isObjectsReady = true;


}

function validation() {
    if (listOfFiles.length == 0) {
        alert("Please load file to get result ");
        return;
    }
    if (!isObjectsReady) {
        alert("Please click on GenerateMyCode Button to init Object first");
        return;
    }

}



// after get our props
// create table to remove any props he dont need it/
function ShowPropsInTable() {
    let TableTemplate;

    for (let index = 0; index < Settings.length; index++) {
        let helper = new Helper(Settings[index]);
        TableTemplate = helper.generateTable();
        $listFiles.append($("<p>" + listOfFiles[index].name + "</p>"));
        for (const iterator of Object.keys(Settings[index].props)) {
            TableTemplate +=
                " <tr>" +
                "<td> " +
                iterator +
                " </td>" +
                "<td> " +
                Settings[index].props[iterator] +
                " </td>" +
                "<td>" +
                "<label class='checkbox - inline '>" +
                "<input type='checkbox' TypeProps='" + Settings[index].props[iterator] + "' IndexFile='" + index + "' value='" +
                iterator + "' checked>" +
                "</label>" +
                "</td> " +
                "</tr>";
            //  $CheckBoxes
            //  CheckBoxes.push();
        }
        TableTemplate += "</tbody>" + "</table>";
        $listFiles.append(TableTemplate);
    }
    const $CheckBoxes = $(":checkbox");
    EventForCheckBox($CheckBoxes);


}

function isArray(array) {
    return array.constructor === Array;
}


// get props from File
// pick up the line first with format $table->string('columnName')
// then filter this is line into array
// to be props['id'] = 'string';
function GetPropsFromFile(text) {
    let result1 = this.GetMyLine(text);
    return this.GetProps(result1);
}
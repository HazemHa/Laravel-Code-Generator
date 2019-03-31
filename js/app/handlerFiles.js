// check is single file for preview the code in tabs before send it into a server to create file
function IsSingleFile() {
    return listOfFiles.length == 1 ? true : false;
}
// make files ready to send them into server
// crate promise to set up object first
// then send file to server
// in another way file(obj) => return file with props
function GenerateFiles() {
    validation();
    let step1 = new Promise(function (resolve, reject) {
        try {
            sendDataToServer(filesPHP);
            resolve(true)
        } catch (e) {
            reject(false);
        }
    });
}

// read single file
function readSingleFile(e) {
    let pushFile = new Promise(function (resolve, reject) {
        try {
            var file = e.target.files[0];
            listOfFiles.push(file);
            $('#generate').removeAttr("disabled");
            if (!file) {
                return;
            }

            var reader = new FileReader();
            reader.onload = function (e) {
                let TableName = GetTableName(e.target.result);
                let props = GetPropsFromFile(e.target.result);
                CreateNewSetting(TableName, props);
            };
            reader.readAsText(file);

            resolve();

        } catch (e) {
            reject(e);
        }
    });

    pushFile.then(setTimeout(function () {
        ShowPropsInTable();
    }, 1000));


}
// some column we don't need theme to handler it so we can pass it by put theme in this array
// also you can handle them manually by checkbox

var Exceptions = ["bigIncrements", "increments", "mediumIncrements", "smallIncrements", "tinyIncrements", "index", "primary", "unique", ];


// apply our regx and get what we want and return result as array
function applyRegExp(array, regExpr, putKeys = true) {
    let resArry = [];
    let OriginalForeign = [];
    for (let value of array) {
        let curMatch;
        if ((curMatch = value.match(regExpr))) {
            if (putKeys) {
                if (Exceptions.includes(curMatch[0])) {
                    continue;
                }
                if (curMatch[0] == "foreign") {
                    let column = {
                        type: curMatch[0],
                        foreignColumn: curMatch[1],
                        OriginalColumn: curMatch[3],
                        Table: GlobalTableName,
                        Reference: curMatch[5]
                    };
                    if (!containsObject(column, OriginalForeign)) {
                        OriginalForeign.push(column);


                   }
                    resArry[curMatch[1]] = column;
                } else
                    resArry[curMatch[1]] = curMatch[0];
            }
        }
    }
    return [resArry,OriginalForeign];
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}


// remove any text with regx
function RemoveWithRegExpr(data, regExpr) {
    if (isArray(data)) {
        let tmpArray = [];
        for (let value of data) {
            value = value.replace(regExpr, "");
            tmpArray.push(value);
        }
        return tmpArray;
    } else if (data.constructor === String) {
        return data.replace(regExpr, "");
    }
}

// get the specific lines of migration file
function GetMyLine(text) {
    let regExpr = /\$(table).*\w+(\(\'\w+)/gm;
    return text.match(regExpr);
}
// get table name
function GetTableName(text) {
    let regExpr = /\w+(?=',\sfunction\s\(Blueprint\s\$table)/gm;
    return text.match(regExpr)[0];
}

// get props from line like that $table->string('sdf');
function GetProps(array) {
    let regExpr = /(?!table)\b\w+/g;
    let result = applyRegExp(array, regExpr, true);
  OriginalToForeignTables = OriginalToForeignTables.concat(result[1]);
    return result[0];
}
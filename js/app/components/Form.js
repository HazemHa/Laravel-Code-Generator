Form = function (Setting) {
    this.attributes = Object.keys(Setting.props);
    this.types = Object.values(Setting.props);
}
Form.prototype = {
    GenerateCode: function () {
        let HTMLForm = "<form>\n";
        for (let index = 0; index < this.attributes.length; index++) {
            HTMLForm += this.filterKeys(this.attributes[index], this.types[index]);
        }
        HTMLForm += this.buttonType();
        HTMLForm += "</form>";


        return HTMLForm;
    },
    filterKeys: function (name, type) {

        if (name == 'password') {
            return this.passwordType();
        } else if (name == 'email') {
            return this.emailType();
        } else if (type == 'increments') {
            return "";
        } else if (type == 'boolean') {
            return this.booleanType(name);
        } else {
            return this.stringType(name);
        }
    },
    booleanType: function (name) {
        let CheckBox = '\n<div class="form-check">\n' +
            '<input type="checkbox" class="form-check-input"  ' + 'id="exampleCheck1"> \n' +
            '<label class="form-check-label" for="exampleCheck1">Check me out</label>\n' +
            '</div>';

        let RadioBox = '<div class="form-check">\n ' +
            '<input class="form-check-input" type="radio" ' + '      name="' + name + '" id="' + name + '"  value="' + name + '" checked>\n' +
            '<label class="form-check-label" for="' + name + '">\n' +
            'Default radio' +
            '</label>\n' +
            '</div>\n' +
            '<div class="form-check">\n' +
            '<input class="form-check-input" type="radio"' + '     name="' + name + '" id="' + name + '"    value="option2">' +
            '<label class="form-check-label" for="' + name + '">\n' +
            'Second default radio' +
            '</label>\n' +
            '</div>\n' +
            '<div class="form-check disabled">\n' +
            '<input class="form-check-input" type="radio"' + 'name="' + name + '" id="' + name + '" value="' + name + '"' + 'disabled>\n' +
            '<label class="form-check-label" for="' + name + '">' +
            'Disabled radio' +
            '</label>\n' +
            '</div>\n';


        return CheckBox + RadioBox;
    },
    stringType: function (name) {
        return '\n<div class="form-group"> \n' +
            ' <label for="' + name + '"> ' + name + '</label>\n' +
            ' <input type="text"  name="' + name + '"               class="form-control"  id="' + name + '"                     placeholder="' + name + '">\n' +
            '</div>\n';
    },
    emailType: function () {
        return '\n<div class="form-group"> \n' +
            ' <label for="email">Email address</label> ' +
            ' <input type="email" class="form-control"  ' + '  id="email"  aria-describedby="emailHelp" ' + 'placeholder="Enter email"> \n' +
            '</div>\n';
    },
    passwordType: function () {
        return '\n<div class="form-group">\n' +
            '<label for="password">Password</label>\n' +
            '<input type="password" class="form-control" ' + 'id="password" placeholder="Password">\n' +
            '</div>\n';
    },
    buttonType: function () {
        return '\n<button type="button" class="btn btn-primary">' +
            'save</button>\n';
    }


};
 helperThemeVueJS = function (Setting) {
     this.Setting = Setting;
     this.propsKey = Object.keys(Setting.props);

 }

 helperThemeVueJS.prototype = {
     generateTDForTable: function () {
         let template = '';
         for (let i = 0; i < this.propsKey.length; i++) {
             let item = this.propsKey[i];
             template += '<td class="text-xs-right">{{ props.item.' + item + '}} </td>\n';
         }

         return template;
     },
     generateHeadersForTable: function () {
         let temp = '';
         for (let i = 0; i < this.propsKey.length; i++) {
             let item = this.propsKey[i];
             if (i == this.propsKey.length - 1) {
                 temp += '{\n' + '          text: ' + '\'' + item + '\'' + ',\n' + '          value: ' + '\'' + item + '\'' + '}\n';
             } else {
                 temp += '{\n' + '          text: ' + '\'' + item + '\'' + ',\n' + '          value: ' + '\'' + item + '\'' + '},\n';

             }
         }
         return temp;
     },
     generateFieldForForm: function () {
         let temp = '';
         temp += '<form>\n';
         for (let i = 0; i < this.propsKey.length; i++) {
             let item = this.propsKey[i];
             temp += '<v-text-field\n' + '      v-model="' + item + '"\n' + '      :error-messages="requriedMessage"\n' + '      label="' + item + '"\n' + '      required\n' + '      @input="$v.requiredField.$touch()"\n' + '      @blur="$v.requiredField.$touch()"></v-text-field>\n';

         }
         temp += '<v-btn @click="submit">submit</v-btn>\n';
         temp += '<v-btn @click="clear">clear</v-btn>\n';
         temp += '</form>\n';

         return temp;
     },
     generateObjectForTable: function () {
         let temp = '';
         for (let i = 0; i < this.propsKey.length; i++) {
             let item = this.propsKey[i];
             if (i == this.propsKey.length - 1) {
                 temp += '{\n' + '        ' + item + ': ' + '\'\'' + '\n';
             } else {
                 temp += '{\n' + '        ' + item + ': ' + '\'\'' + ',\n';

             }
         }
         return temp;

     },
     generateFieldsForEditForm: function () {

         let temp = '';
         for (let i = 0; i < this.propsKey.length; i++) {
             let item = this.propsKey[i];
             temp += '<v-flex xs12 sm6 md4><v-text-field v-model="editedItem.' + item + '" label="' + item + '"></v-text-field></v-flex>\n';
         }
         return temp;
     },
     generatePropsForData: function () {
         let temp = '';
         for (let i = 0; i < this.propsKey.length; i++) {
             let item = this.propsKey[i];
             if (i == this.propsKey.length - 1) {
                 temp += ' ' + item + ': ' + '\'\'' + '\n';
             } else {
                 temp += ' ' + item + ': ' + '\'\'' + ',\n';

             }
         }
         return temp;
     },
     generateSetForProps: function () {
         let temp = '';
         for (let i = 0; i < this.propsKey.length; i++) {
             let item = this.propsKey[i];
             temp += 'this.' + item + ' = \'\';\n';
         }
         return temp;
     },
     generateGetRequest: function () {
         return 'this.$store\n' + '        .dispatch("' + this.Setting.ModelName.toLowerCase() + '/get' + this.Setting.ModelName + '")\n' + '        .then((res) => {\n' + '          this.data = res.' + this.Setting.ModelName + ';\n' + '        })\n' + '        .catch(err => {\n' + '          console.log(err);\n' + '        });\n';

     },
     generateDeleteRequest: function () {
         return 'if (confirm("Are you sure you want to delete this item?")) {\n' + '        this.$store\n' + '          .dispatch("' + this.Setting.ModelName.toLowerCase() + '/delete' + this.Setting.ModelName + '", { id: item.id })\n' + '          .then((res) => {\n' + '            \n' + '            if (res.mutation' + this.Setting.ModelName + '.id == -1) {\n' + '              console.log("cant delete ");\n' + '            } else {\n' + '              this.data.splice(index, 1);\n' + '            }\n' + '          })\n' + '          .catch(err => {\n' + '            console.log(err);\n' + '          });\n' + '      }\n';

     },
     generateCreateAnDUpdateRequest: function () {
         return 'if (this.editedIndex > -1) {\n' + '        // update the record\n' + '        this.$store\n' + '          .dispatch("' + this.Setting.ModelName.toLowerCase() + '/update' + this.Setting.ModelName + '", this.editedItem)\n' + '          .then((res) => {\n' + '            if (res.mutation' + this.Setting.ModelName + '.id == -1) {\n' + '              console.log("cant update ");\n' + '            } else {\n' + '              Object.assign(this.data[this.editedIndex], res.mutation' + this.Setting.ModelName + ');\n' + '            }\n' + '          })\n' + '          .catch(err => {\n' + '            console.log(err);\n' + '          });\n' + '      } else {\n' + '        // create record\n' + '        console.log(this.editedItem);\n' + '        this.$store' + '          .dispatch("' + this.Setting.ModelName.toLowerCase() + '/create' + this.Setting.ModelName + '", this.editedItem)\n' + '          .then((res) => {\n' + '            this.data.push(res.mutation' + this.Setting.ModelName + ');\n' + '          })\n' + '          .catch(err => {\n' + '            console.log(err);\n' + '          });\n' + '      }\n';

     },


 }
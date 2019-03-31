 SimpleFormVueJS = function (Setting, themeHelper) {
     this.Setting = Setting;
     this.themeHelper = themeHelper;
 }

 SimpleFormVueJS.prototype = {
     GetFileContent: function () {
         return '<template>\n' + this.themeHelper.generateFieldForForm() + '</template>\n' + '<script>\n' + '  import { validationMixin } from ' + '\'vuelidate\'' + '\n' + '  import { required} from ' + '\'vuelidate/lib/validators\'' + '\n' + '  export default {\n' + '    mixins: [validationMixin],\n' + '    validations: {\n' + '      requiredField: { required}\n' + '    },\n' + '    data: () => ({\n' + this.themeHelper.generatePropsForData() + '}),\n' + '    computed: {\n' + '      requriedMessage () {\n' + '        const errors = []\n' + '        if (!this.$v.requiredField.$dirty) return errors\n' + '        !this.$v.requiredField.required && errors.push(' + '\'this field is required.\'' + ')\n' + '        return errors\n' + '      }\n' + '    },\n' + '    methods: {\n' + '      submit () {\n' + '        this.$v.$touch()\n' + '      },\n' + '      clear () {\n' + '        this.$v.$reset()\n' + this.themeHelper.generateSetForProps() + '\n' + '      }\n' + '    }\n' + '  }\n' + '</script>\n';
     },
     sendRequestToServer: function () {
         let name = this.Setting.ModelName + ".vue";
         let type = "Vue/Forms";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
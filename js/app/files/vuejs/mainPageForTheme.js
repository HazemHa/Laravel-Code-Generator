 AppThemeVueJS = function (Setting) {
     this.Setting = Setting;
 }
 AppThemeVueJS.prototype = {
     GetFileContent: function () {
         return '<template>\n' + '  <v-app id="inspire" dark>\n' + '    <v-navigation-drawer\n' + '      v-model="drawer"\n' + '      clipped\n' + '      fixed\n' + '      app\n' + '    >\n' + '    <!--\n' + '       <nuser-menu v-show="this.$store.getters.menus.nuser"></nuser-menu>\n' + '       <guser-menu v-show="this.$store.getters.menus.guser"></guser-menu>\n' + '       <admin-menu v-show="this.$store.getters.menus.admin"></admin-menu>\n' + '       -->\n' + '    </v-navigation-drawer>\n' + '    <v-toolbar app fixed clipped-left>\n' + '      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>\n' + '      <v-toolbar-title><router-link :to="{ name: ' + 'home' + '}"  tag="button">Application</router-link></v-toolbar-title>\n' + '      <v-spacer></v-spacer>\n' + '    <v-toolbar-items class="hidden-xs-and-down">\n' + '     <div v-if="!this.$store.getters.isAuth">\n' + '      <router-link :to="{ name: ' + 'login' + '}"><v-btn flat >Login</v-btn></router-link>\n' + '     <router-link :to="{ name: ' + 'register' + '}"> <v-btn flat>Register</v-btn></router-link>\n' + '      </div>\n' + '      <div v-else>\n' + '         <v-menu open-on-hover top offset-y>\n' + '         <v-avatar slot="activator">\n' + '      <img\n' + '        :src="imguser"\n' + '        :alt="name"\n' + '      >\n' + '    </v-avatar>\n' + ' <v-card v-if="this.$store.getters.isAuth"> \n' + '     <v-list>\n' + '        <v-list-tile>\n' + '          <v-list-tile-title> \n' + '            <router-link :to="{ name: ' + 'profile' + '}"  tag="button">\n' + '       profile\n' + '       </router-link>\n' + '       </v-list-tile-title> \n' + '        </v-list-tile>\n' + '         <v-list-tile>\n' + '         <v-list-tile-title  @click="logout">logout</v-list-tile-title>\n' + '        </v-list-tile>\n' + '      </v-list>\n' + '       </v-card>\n' + '     </v-menu>\n' + '    \n' + '      </div>\n' + '    </v-toolbar-items>\n' + '    </v-toolbar>\n' + '    <v-content>\n' + '        <div class="text-xs-center" v-if="this.$store.getters.isloading">\n' + '             <v-progress-circular\n' + '      :size="70"\n' + '      :width="7"\n' + '      color="purple"\n' + '      indeterminate\n' + '    ></v-progress-circular>\n' + '    </div>\n' + '    \n' + '          <router-view v-show="!this.$store.getters.isloading"></router-view>\n' + '    </v-content>\n' + '    <v-footer app fixed>\n' + '      <span>&copy; 2017</span>\n' + '    </v-footer>\n' + '  </v-app>\n' + '</template>\n' + '<script>\n' + '//import AdminMenu from "../js/components/menu/admin.vue";\n' + '//import GuserMenu from "../js/components/menu/goldenUser.vue";\n' + '//import NuserMenu from "../js/components/menu/normalUser.vue";\n' + 'export default {\n' + '  props: ["user_role"],\n' + '  components: {\n' + ' //   AdminMenu: AdminMenu,\n' + ' //   GuserMenu: GuserMenu,\n' + '//    NuserMenu: NuserMenu\n' + '  },\n' + '  data: () => ({\n' + '    drawer: false,\n' + '   \n' + '  }),\n' + '  props: {\n' + '    source: String\n' + '  },\n' + '  created() {\n' + '    this.role_id = this.user_role;\n' + '    this.$store.dispatch(' + 'checkRole' + ');\n' + '  },\n' + '  methods: {\n' + '    logout(){\n' + '         this.$store.dispatch(' + 'logout' + ')\n' + '         .then((res)=>{\n' + '           this.$store.dispatch(' + 'loading' + ',false);\n' + '           this.$router.push({name:' + 'home' + '})\n' + '         }).catch((err)=>{\n' + '         });\n' + '    },\n' + '  },\n' + '  computed:{\n' + '  }\n' + '};\n' + '</script>\n' + '<style lang="stylus" scoped>\n' + '  .v-progress-circular\n' + '    margin: 1rem\n';

     },
     sendRequestToServer: function () {
         let name = "App.vue";
         let type = ProjectName+"/Vue/components";
         try {
             ajaxRequest(name, type, this.GetFileContent());

         } catch (err) {
             $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + err.message + '</td></tr>');
         }

     }
 }
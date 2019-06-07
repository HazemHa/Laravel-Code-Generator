function initObjects(ParaSetting) {
    const helper = new Helper(ParaSetting);
    const Faker = new faker();
    const ControllerObj = new Controller(ParaSetting, helper);
    const ModelObj = new Model(ParaSetting, helper);
    const DBFactoryObj = new DBFactory(ParaSetting, helper);
    const ResourcesObj = new Resources(ParaSetting, helper);
    const RequestRulesObj = new RequestRules(ParaSetting, helper);
    const FormObj = new Form(ParaSetting);
    const RouteObj = new Route(ParaSetting);
    const UnitTestObj = new UnitTest(ParaSetting, helper);


    // Vue js Objects
    const ActionsForStoreFile = new ActionsForStore(ParaSetting, helper);
    const RouterIndexFile = new RouterIndex(ParaSetting);

    const helperThemeVueJSObj = new helperThemeVueJS(ParaSetting);

    const CURDVueJSFile = new CURDVueJS(ParaSetting, helperThemeVueJSObj);

    const SimpleFormVueJSFile = new SimpleFormVueJS(ParaSetting, helperThemeVueJSObj);
    // end Vue js Objects

    const ControllerFileObj = new ControllerFile(ParaSetting, ControllerObj);
    const ModelFileObj = new ModelFile(ParaSetting, ModelObj);
    const RequestFileObj = new RequestFile(ParaSetting, RequestRulesObj);
    const ResourcesFileObj = new ResourcesFile(ParaSetting, ResourcesObj,helper);
    const RouteFileObj = new RouteFile(ParaSetting, RouteObj);
    const IndexStoreFile = new IndexStore(ParaSetting);
    const UnitTestFileObj = new UnitTestFile(ParaSetting, UnitTestObj);
    const FactoryFileObj = new FactoryFile(ParaSetting, DBFactoryObj);
    const FormFileObj = new FromFile(ParaSetting, FormObj);



    const GraphQLQueryObj = new GraphQLQuery(ParaSetting, helper);
    const GraphQLTypeObj = new GraphQLType(ParaSetting);
    const GraphQLMutationObj = new GraphQLMutation(ParaSetting, helper);


    const GraghQLTypeFileObj = new GraghQLTypeFile(ParaSetting, GraphQLTypeObj);
    const GraghQLQueryFileObj = new GraghQLQueryFile(ParaSetting, GraphQLQueryObj);
    const GraphQLMutationFileObj = new GraphQLMutationFile(ParaSetting, GraphQLMutationObj);

    filesPHP.push(ControllerFileObj);
    filesPHP.push(ModelFileObj);
    filesPHP.push(RequestFileObj);
    filesPHP.push(ResourcesFileObj);
    filesPHP.push(RouteFileObj);
    filesPHP.push(FormFileObj);
    filesPHP.push(FactoryFileObj);
    filesPHP.push(UnitTestFileObj);

    filesPHP.push(ActionsForStoreFile);
    filesPHP.push(RouterIndexFile);
    filesPHP.push(IndexStoreFile);

    filesPHP.push(SimpleFormVueJSFile);
    filesPHP.push(CURDVueJSFile);


    filesPHP.push(GraghQLTypeFileObj);
    filesPHP.push(GraghQLQueryFileObj);
    filesPHP.push(GraphQLMutationFileObj);




    if (IsSingleFile()) {
        previewCodeInPage();
    }
}
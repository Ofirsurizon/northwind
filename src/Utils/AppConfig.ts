class AppConfig {

    public readonly productsRoute: string = "/products/"
    public readonly addProductRoute: string = this.productsRoute + "new/";
    public readonly editProductRoute: string = this.productsRoute + "edit/";
    public readonly ProductDetailsRoute: string = this.productsRoute + "details/";
    public readonly HomeRoute: string = "/home";    



    public readonly productsUrlDelayed: string = "http://localhost:3030/api/products/delayed/";
    public readonly productsUrl: string = "http://localhost:3030/api/products/";
    public readonly employeesUrl: string = "http://localhost:3030/api/employees/";
    public readonly registerUrl: string = "http://localhost:3030/api/auth/register/";
    public readonly loginUrl: string = "http://localhost:3030/api/auth/login/";
    public readonly categoriesUrl: string = "http://localhost:3030/api/categories/";
    

}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
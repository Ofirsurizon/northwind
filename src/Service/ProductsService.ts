import axios from "axios";
import ProductModel from "../Models/ProductModel";
import appConfig from "../Utils/AppConfig";
import { ProductsAction, ProductsActionTypes, productsStore } from "../Redux/ProductsState";

class ProductsService {

    public async getAllProducts(): Promise<ProductModel[]> {
        let products = productsStore.getState().products;

        if (products.length === 0) {

            const response = await axios.get(appConfig.productsUrl);

            products = response.data;

            const action: ProductsAction = { type: ProductsActionTypes.SetProducts, payload: products };
            productsStore.dispatch(action);

        }



        return products;




    }

    public async getOneProduct(prodId: number): Promise<ProductModel> {
        // Get product details by prodId into response object
        const response = await axios.get(appConfig.productsUrl + prodId);

        // Extract the product from the response
        const product = response.data;

        // Return product
        return product;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        // Send product to backend
        const response = await axios.post(appConfig.productsUrl, product, options);
        // Extract product from response
        const beProduct = response.data;

        const action: ProductsAction = { type: ProductsActionTypes.AddProduct, payload: beProduct };
        productsStore.dispatch(action)

        console.log(beProduct);
        // return the extracted product.
        return beProduct;
    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }

        const response = await axios.put(appConfig.productsUrl + product.id, product, options);

        const updateProduct = response.data;

        const action: ProductsAction = { type: ProductsActionTypes.UpdateProduct, payload: updateProduct }
        productsStore.dispatch(action)

        console.log(updateProduct);
        return updateProduct;

    }

    public async deleteProduct(prodId: number): Promise<void> {
        await axios.delete(appConfig.productsUrl + prodId);

        const action: ProductsAction = { type: ProductsActionTypes.DeleteProduct, payload: prodId };
        productsStore.dispatch(action);
    }

}


const productsService = new ProductsService();

export default productsService;
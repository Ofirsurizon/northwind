import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";
import { authStore } from "../Redux/AuthState";

class CategoriesService {
  public async getAllCategories(): Promise<CategoryModel[]> {
    const token = authStore.getState().token
    const options = {
      headers: {  "Authorization": `Bearer ${token}` }
    }
    const response = await axios.get(appConfig.categoriesUrl, options);

    const categories = response.data
    
    return categories;
  
  }
}

const categoriesService = new CategoriesService();

export default categoriesService;
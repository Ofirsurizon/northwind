import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {
    public async register(user:UserModel):Promise<void>{
        const response = await axios.post(appConfig.registerUrl,user);
        const token = response.data;
        // console.log(token);

        const action: AuthAction = { type: AuthActionTypes.Register, payload: token };
        authStore.dispatch(action);

    }

    public async login(credentials:CredentialsModel):Promise<void>{
        const response = await axios.post(appConfig.loginUrl,credentials);
        const token = response.data;
        // console.log(token);

        const action: AuthAction = { type: AuthActionTypes.Login, payload: token };
        authStore.dispatch(action);

    }

    public logout():void{
        const action: AuthAction = { type: AuthActionTypes.Logout };
        authStore.dispatch(action);

    }

}
const authService = new AuthService();
export default authService;
import axios from "./axiosConfig";

const LOGIN_API_URL = "http://localhost:8080/login";

class LoginService {

    login(loginRequest) {
        return axios.post(LOGIN_API_URL, loginRequest);
    }

}

export default new LoginService();
import axios from 'axios';

const REGISTEREMAIL_URL = "http://localhost:8080/registroEmail";

class RegisterEmailService {
    static async verifyEmail(email) {
        return axios.post(REGISTEREMAIL_URL,{email});
    }
};

export default RegisterEmailService;
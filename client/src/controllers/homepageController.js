import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';


class HomepageController {
  constructor() {
    this.userId = ref(null);
    this.apiURL = null;
  }
  async login(formData) {
    const API_URL = this.$apiURL + '/auth/api/login';

    try {
      const response = await axios.post(API_URL, formData);
      console.log(response);

      if (response.status === 200) {
        Cookies.set('userId', response.data.userId, { expires: 1 });

        userId.value = response.data.userId;
        return response.data.message;
      }
      else {
        return('Login failed:', response.data.message);
      }
    } catch (error) {
      return('Login failed:', error);
    }
  };

  async register(formData) {
    const API_URL = this.$apiURL + '/auth/api/register';

    try {
      const response = await axios.post(API_URL, formData);
      console.log(response);

      if (response.status === 200) {
        return(response.data.message);
      } else {
        return('Registration failed:', response.data.message);
      }
    } catch (error) {
      return('Registration failed:', error);
    }
  }
  setApiURL(apiURL) {
    this.$apiURL = apiURL;
  }
}


export default new HomepageController;
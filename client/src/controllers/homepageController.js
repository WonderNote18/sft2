import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';


class HomepageController {
  constructor() {
    // Create a reactive reference for the user ID
    this.userId = ref(null);
    this.apiURL = null;
  }
  // Function to handle user login
  async login(formData) {
    const API_URL = this.$apiURL + '/auth/api/login';

    try {
      const response = await axios.post(API_URL, formData);
      console.log(response);

      if (response.status === 200) {
        // Store the user's ID in a cookie
        Cookies.set('userId', response.data.userId, { expires: 1 }); // Expires in 1 day

        // Update the reactive user ID reference
        userId.value = response.data.userId;
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
      // Send a POST request to your API's registration endpoint
      const response = await axios.post(API_URL, formData);
      console.log(response);

      if (response.status === 200) {
        // Registration was successful, you can handle it here
        return(response.data.message);
      } else {
        // Handle registration error here
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
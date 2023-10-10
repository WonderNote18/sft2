import axios from "axios";

class APIController {
  static #apiKey = process.env.VUE_APP_API_ADDRESS + ':' + process.env.VUE_APP_API_PORT;

  static async POST(url, data) {
    try {
      const postUrl = this.#apiKey + url;
      const response = await axios.post(postUrl, data, {
        withCredentials: true
      });
      return response;

    } catch (err) {
      const errResponse = {
        status: 500,
        data: {
          message: "An error has occurred while connecting to the server.",
        }
      };
      return errResponse;
    }
  }
}


export default APIController;
import axios from "axios";

async function post(url, data) {
  try {
    await axios
    .post(url, data)
    .then(function(response) {
      var status = response.status;
      var message = response.message;
      var data = response.data;

      return { status: status, message: message, data: data };
    });
  } catch (err) {
    return {
      status: 500,
      message: "An error has occurred while connecting to the server.",
      data: null
    }
  }
}

export default post;
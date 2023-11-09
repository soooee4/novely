import axios from "axios";

export const getData = async (url, params) => {
  try {
    const response = await axios
      .get(`http://localhost:8080/api/${url}`, {
       params: params,
      });
    if (response.data) {
      return response.data;
    }
  } catch(err) {
    console.log(err);
  }
};

export const postData = async (url, params) => {
  try {
    const response = await axios
      .post(`http://localhost:8080/api/${url}`, params);
    // console.log(response);
    return response.data;

  } catch (err) {
    console.log(err);
  }
};


export const patchData = async (url, params) => {
  try {
    const response = await axios
      .patch(`http://localhost:8080/api/${url}`, params);
      console.log(response.data,3636);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

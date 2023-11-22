/** API 정의 (GET, POST, PATCH, DELETE)  */

import axios from "axios";

export const getData = async (url, params) => {
  console.log(params,66)
	try {
		const response = await axios.get(`http://localhost:8080/api/${url}`, {
			params: params,
		});
		if (response.data) {
			return response.data;
		}
	} catch (err) {
		console.log(err);
	}
};

export const postData = async (url, params) => {
	try {
		const response = await axios.post(
			`http://localhost:8080/api/${url}`,
			params
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const patchData = async (url, params) => {
	try {
		const response = await axios.patch(
			`http://localhost:8080/api/${url}`,
			params
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const deleteData = async (url, params) => {

  try {
    const response = await axios.delete(
			`http://localhost:8080/api/${url}`,
      // delete 요청 시 body에 데이터 담는 법
     { data: params }
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

/** API 정의 (GET, POST, PATCH, DELETE)  */

import axios from "axios";

/** GET */
export const getData = async (url, params) => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_REQUEST_URL}/${url}`, {
			params: params,
		});
		if (response.data) {
			return response.data;
		}
	} catch (err) {
		console.log(err);
	}
};

/** POST */
export const postData = async (url, params) => {

	try {
		const response = await axios.post(
			`${process.env.REACT_APP_REQUEST_URL}/${url}`,
			params
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

/** PATCH */
export const patchData = async (url, params) => {
	try {
		const response = await axios.patch(
			`${process.env.REACT_APP_REQUEST_URL}/${url}`,
			params
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

/** DELETE */
export const deleteData = async (url, params) => {

  try {
    const response = await axios.delete(
			`${process.env.REACT_APP_REQUEST_URL}/${url}`,
      // delete 요청 시 body에 데이터 담는 법
     { data: params }
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

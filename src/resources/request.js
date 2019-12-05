import _axios from "axios";

import api from "../config/api";

const apiUrl = `${api.API_URL}/api`; //Config.API_URL

const axios = _axios.create({
  baseURL: apiUrl,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Headers": "Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Methods",
  },
});

export default async ({
  method,
  url,
  params = undefined,
  data = undefined,
  token = undefined,
  header = undefined,
  onErrorCallBack = undefined,
  onUploadProgress = undefined,
}) => {
  let response;
  try {
    response = await axios({
      method,
      url: url,
      data,
      headers: {
        "Authorization": `JWT ${token ? token : undefined}`,
        ...header,
      },
    });

    if (!response.data.success) {
      throw new Error(response.message || response.data.message);
    }
  } catch (e) {
    if (onErrorCallBack) {
      onErrorCallBack(e);
    } else {
      alert(e.message);
      // DialogInvoker.dialogModal({
      //   title: "Atenção",
      //   text: e.message,
      //   textButton: "Ok",
      //   onActionButton: () => DialogInvoker.unMountCurrentModal(),
      // });
    }
  }
  return response;
};

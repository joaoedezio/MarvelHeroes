import _axios from "axios";

const apiUrl = "https://kitsu.io/api/"; //Config.API_URL

const axios = _axios.create({
  baseURL: apiUrl,
  headers: {
    "Accept": " application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    // "Access-Control-Allow-Headers": "Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Methods",
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
  } catch (e) {
    if (onErrorCallBack) {
      onErrorCallBack(e);
    } else {
      alert(e.message);
    }
  }
  return response;
};

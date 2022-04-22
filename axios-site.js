import axios from "axios";

let app_url = `${process.env.PUBLIC_URL}${process.env.subFolder}`;

if (typeof window != "undefined") {
  app_url = window.location.protocol + "//" + window.location.host + $('html').attr("subfolder")
}

const instance = axios.create({
    baseURL: `${app_url}`
});


export default instance; 
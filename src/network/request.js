import axios from "./axios.js"
// import store from "../store"
let baseUrl;
if (process.env.NODE_ENV == "development") {
  baseUrl = "/api";
} else {
  baseUrl = "../../api/reqRedirect.ashx?action=reqRedirect ";
}
// default tzid
let tzid = 1;


// export function getUserInfo() {
//   let url = baseUrl;
//   let params = {
//     "path": "svr-fcapitalplatform/money/auth",
//     token: store.state.token

//   }
//   return axios.post(url, params);
// }
// 
// 当日汇总
export function getRaiseMoney(obj) {
  let url = baseUrl + "/fundOverview";
  let {
    startTime,
    endTime
  } = obj;
  let params = {
    tzid,
    "userid": "14692",
    startTime,
    endTime,
    "sysno": ""
  }
  return axios.post(url, params);
}

//资金存量
export function getTzlistData(obj) {
  let url = baseUrl + "/statistics";
  let {
    startTime,
    endTime
  } = obj;
  let params = {
    tzid,
    "userid": "14692",
    startTime,
    endTime,
    "sysno": ""
  }
  return axios.post(url, params);
}



// 到账提醒
export function getArriveData(obj) {
  let url = baseUrl + "/arrivalReminder";
  let {
    endTime
  } = obj;
  let params = {
    tzid,
    "userid": "14692",
    endTime,
    "sysno": ""
  }
  return axios.post(url, params);
}

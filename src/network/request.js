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
      // let obj = { startTime: "2021-12-01", endTime: "2021-12-30" };

// getTzlistData(obj).then(da=>{
//   console.log(da);
// })
// export function getMoneyVolation(obj) {
//   let url = baseUrl;
//   let params = {
//     tzid,
//     "date": obj.rangeArr,
//     "brand": obj.tzstate,
//     "path": "svr-fcapitalplatform/money/moneyVolation",
//     token: store.state.token

//   }
//   return axios.post(url, params);
// }



// export function getRemindData(obj) {
//   let url = baseUrl;
//   let params = {

//     tzid,
//     "dayNum": obj.dayNum,
//     "brand": obj.brand,
//     "path": "svr-fcapitalplatform/money/remind",
//     token: store.state.token
//   }
//   return axios.post(url, params);
// }
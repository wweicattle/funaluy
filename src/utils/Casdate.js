// 直接返回一个月份的具体天数
export default class Cas {
    constructor() {

    };
    // 月份有多少天
    getDay(year, month) {
        var tempe = new Date(year, month, 0)
        console.log(tempe);
        return tempe.getDate();
    };
    // 月份第一天是周几
    getStartWeek(year,month){
        var oneday = new Date(year, month-1, 1)
        console.log(oneday);
        return oneday.getDay();
    }


}
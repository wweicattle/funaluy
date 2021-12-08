export  function getDateRange(start,end) {
    let g = +dayjs(end) - (+dayjs(start));
    let timea = g / (24 * 60 * 60 * 1000);
    let arr = [dayjs(start).format("YYYY-MM-DD")];
    for (var i = 0; i < timea; i++) {
        let nextday = dayjs(arr[i]).add(1, "day");
        arr.push(nextday.format("YYYY-MM-DD"))
    }
    return arr;
}
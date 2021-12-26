import {
    useStore
} from '@/store/index.js'


var fragment;
let dayNum = [];
let dom = {
    create(html) {
        let template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    }
}

export default class Calendar {
    constructor(options) {
        let defaluteOptions = {
            element: null,
            startOfWeek: 1,
            strings: {
                week: n => {
                    let map = {
                        0: '日',
                        1: '一',
                        2: '二',
                        3: '三',
                        4: '四',
                        5: '五',
                        6: '六',
                    }
                    return map[n];
                },
                templateDay: `<li class="currentMonth">
                        <span class="day" ></span>
                </li>`
            },
            days: {},
        }
        this.options = Object.assign({}, defaluteOptions, options);
        this.checkOptions()._generateTime()._generateWeekDay()._generatePrevMonth();
    }

    checkOptions() {
        if (!this.options.element) {
            throw new Error('element is request');
        }
        return this;
    }

    _generateTime() {
        let data = new Date(); //时间
        let year = this.options.days.year = data.getFullYear(); //年份
        let month = this.options.days.month = data.getMonth() + 1; //月份
        let day = this.options.days.day = data.getDate(); //日子
        this.options.days.countDay = 0; //日历总日子
        this.options.days.noMonth = data.getMonth() + 1; //不变的月份
        this.options.days.noYear = data.getFullYear(); //不变的年份
        return this;
    }

    _generateCalendar() {
        let ol = document.querySelector('.days');
        let p = document.querySelector('p[data-role="time"]');
        ol.remove();
        p.remove();
        return this;
    }

    //创建星期横轴
    _generateWeekDay() {
        let {
            startOfWeek,
            strings
        } = this.options;
        let calendar = document.querySelector('.calendar');
        let ol = dom.create(`<ol class="weekdays"></ol>`);
        calendar.appendChild(ol);
        let weekIndex = this.createArray(7, startOfWeek).map((day, i) => {
            let li = dom.create(`<li>${strings.week(i)}</li>`);
            //判断是否为今天
            ol.appendChild(li);
        });
        return this;
    }

    //创建当前月份日子
    _generateCurrentDay() {
        let date = this.options.days;
        let getWeek = this._getWeekWeek(date.year, date.month - 1, date.day); //星期几
        let getMonth = this._getMonth(date.year, date.month) //月份天数
        let getMonthDay = this._getWeekDay(); //几号
        let li = document.querySelectorAll('.day');
        //创建当月日子模块
        this.createArray(getMonth, this.options.startOfWeek).map((day, i) => {
            //判断日历起止
            i += date.countDay;
            li[i].textContent = i - date.countDay + 1;
            // dayNum.push((i - date.countDay + 1))
            //判断是否为今天
            if (i == (getMonthDay + date.countDay - 1) && date.noMonth == date.month && date.noYear == date.year) {
                li[i].classList.add('today');
                // li[i].classList.add('state');

            }
        });
        date.countDay += getMonth;

        return this;

    }

    //创建上个月日子
    _generatePrevMonth() {
        // debugger;
        let date = this.options.days;
        let year = date.year;
        let month = date.month;
        let beginWeek = this._getWeekWeek(year, month - 1, 1); //开始星期
        let countMonth = this._getMonth(year, month - 1); //上月月份天数

        let calendar = document.querySelector('.calendar');
        let ol = dom.create(`<ol class="days"></ol>`);
        let li = document.querySelectorAll('.day');
        calendar.appendChild(ol);

        date.countDay = 0;
        beginWeek == 0 ? beginWeek += 7 : ''; //如果月份开头为星期日，会出bug，这是防止
        date.countDay += beginWeek;
        fragment = document.createDocumentFragment();
        this.createArray(42, this.options.startOfWeek).map((day, i) => {
            let li = dom.create(this.options.strings.templateDay);
            li.dataset.month = month
            li.dataset.year = year

            // console.log(li.querySelector(".day"));
            let span = li.querySelector('.day');

            if (i < beginWeek) {
                span.textContent = (countMonth - beginWeek + 1 + i);

            }
            fragment.appendChild(li);
            li.addEventListener("click", (e) => {
                document.querySelectorAll(".day").forEach(val => {
                    if (val.classList.contains("today")) val.classList.remove("today");
                })
                let stateData = useStore();
                stateData.EDIT_SELECTTIME(`${year}-${month}-${span.textContent}`);
                e.target.classList.add("today");
                e.stopPropagation();
                return false;
            }, false)




        });
        ol.appendChild(fragment);

        document.querySelector('.date').appendChild(dom.create(`<p data-role="time">${date.year}-${date.month}</p>`));
        this._generateCurrentDay()._generateNextMonth();
    }

    //创建下个月日子
    _generateNextMonth() {
        let date = this.options.days;
        let year = date.year;
        let month = date.month;
        let beginWeek = this._getWeekWeek(year, month, 1); //开始星期
        let countMonth = this._getMonth(year, month + 1); //下月月份天数
        let li = document.querySelectorAll('.day');
        this.createArray(42 - date.countDay, this.options.startOfWeek).map((day, i) => {
            li[date.countDay + i].textContent = i + 1;
        });
    }

    //创建数组节点
    createArray(length, fill) {
        let array = Array.apply(null, {
            length: length
        }).map(() => fill);
        return array;
    }

    //获取月份天数
    _getMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    //获取星期几
    _getWeekWeek(year, month, day) {
        return new Date(year, month, day).getDay();
    }

    //获取当前月份日子
    _getWeekDay() {
        return new Date().getDate();
    }

    //上一个月
    previousMonth() {
        // this.options.days.month -= 1;
        this.changeMonth('prev');
    }

    //下一个月
    nextMonth() {
        // this.options.days.month += 1;
        this.changeMonth('next');
    }

    //回到今天
    resetMonth() {
        // this._generateTime();
        this.changeMonth('defalut');
    }

    //封装月份dom
    changeMonth(status) {
        let date = this.options.days;
        switch (status) {
            case 'prev': {
                --date.month < 1 ? date.year-- ? date.month = 12 : '' : '';
                break;
            }

            case 'next': {
                ++date.month > 12 ? date.year++ ? date.month = 1 : '' : '';
                break;
            }

            case 'defalut': {
                this._generateTime();
                break;
            }
        }
        this._generateCalendar();
        this._generatePrevMonth();
    }
}


export {
    fragment,
    dayNum
}
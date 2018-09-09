let dateUtil = {};


/* 格式化日期
 * date:需要格式化的日期（Date类型或其他能转换为Date类型的参数）
 * dateSign：分隔日期的符号
 * timeSign：分隔时间的符号
 * startIndex：开始索引号0~5（对应年月日时分秒）默认0--未传入对应参数，startIndex不等于0~5，startIndex>endIndex
 * endIndex：结束索引号0~5（同上）默认5--未传入对应参数，endIndex不等于0~5，startIndex>endIndex
 * 默认情况：
 *
 */
dateUtil.formatDate = function(date, dateSign, timeSign, startIndex, endIndex) {
    //定义变量并初始化
    let dateObj,
        result = "", //返回的字符串
        year,
        month,
        day,
        hour,
        minute,
        second,
        dSign = (dateSign == undefined || typeof dateSign != "string") ? "-" : dateSign,
        tSign = (timeSign == undefined || typeof timeSign != "string") ? ":" : timeSign;
    //修正参数(简化参数列表)：如果dateSign,timeSign是number类型，那么startIndex=dateSign，endIndex=timeSign
    if (typeof dateSign == "number") {
        startIndex = dateSign;
    }
    if (typeof timeSign == "number") {
        endIndex = timeSign;
    }
    //获取有效日期，默认为当前时间
    if (!(date instanceof Date)) {
        try {
            date = new Date(date);
            if (date == "Invalid Date") {
                date = new Date();
            }
        } catch (e) {
            date = new Date();
        }
    }
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    dateObj = [year, dSign, month, dSign, day, " ", hour, tSign, minute, tSign, second];
    //修正startIndex和endIndex
    if (startIndex == undefined || typeof startIndex != "number" || Math.floor(startIndex) < 0 || Math.floor(startIndex) > 5) {
        startIndex = 0;
    }
    if (endIndex == undefined || typeof endIndex != "number" || Math.floor(endIndex) < 0 || Math.floor(endIndex) > 5) {
        endIndex = 5;
    }
    startIndex = Math.floor(startIndex);
    endIndex = Math.floor(endIndex);
    if (startIndex > endIndex) {
        startIndex = 0;
        endIndex = 5;
    }
    //组合字符串
    for (let i = 2 * startIndex; i < 2 * endIndex + 1; i++) {
        result += dateObj[i];
    }
    return result;


}



export default dateUtil;

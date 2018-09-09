let stringUtil = {};

//将形如abc-def的字符串转成驼峰式abcDef，参考jQuery
stringUtil.camelCase = function(string) {
    let rdashAlpha = /-([a-z])/ig;
    return string.replace(rdashAlpha, fcamelCase);
}

let fcamelCase = function(all, letter) {
    return letter.toUpperCase();
};

//解析路由地址，获取id和flag（针对详情页面）
stringUtil.parsePath = function(string) {
    try {
        let param = string.split('/')[2];
        let arr = param.split("_");
        return arr;
    } catch (e) {
        return [0, 0];
    }

}

export default stringUtil;

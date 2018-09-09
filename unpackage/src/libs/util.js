/**
 * Created by aresn on 16/7/18.
 */


let util = {};

util.alert = function(content) {
    window.alert(content);
};

util.selectMenu = function(menus, id) {
    for (var i = 0; i < menus.length; i++) {
        let subMenus = menus[i].subMenus;
        for (var j = 0; j < subMenus.length; j++) {
            let subMenu = subMenus[j];
            if (subMenu.id === id) {
                return subMenu;
            }
        }
    }
};
// 合并对像属性 返回一个新的对像
util.mergeObj = function(obj1, obj2) {
    let obj = {};
    if (obj1 && typeof obj1 == 'object') {
        for (let k in obj1) {
            if (obj1[k] != undefined && obj1[k] != '') {
                obj[k] = obj1[k];
            }
        }
    }
    if (obj2 && typeof obj2 == 'object') {
        for (let k in obj2) {
            if (obj2[k] != undefined && obj2[k] != '') {
                obj[k] = obj2[k];
            }
        }
    }
    return obj;
};

//重置对象
util.resetObject = function(object, exceptions) {
    if (typeof object !== 'object') {
        return "";
    }
    for (var key in object) {
        if (typeof object[key] !== 'object' && !(object[key] instanceof Array)) {
            if (!exceptions || !(exceptions instanceof Array) || !contains(exceptions, key)) {
                object[key] = "";
            }
        }
    }
    return "";

}

util.init = function(object) {
   for(var i in object){
        if(object[i]  instanceof Object && !(object[i]  instanceof Array)){
           for(var j in object[i]){
             object[i][j]=''; 
           }
        }else if(Array.isArray(object[i]) ){
            object[i]=object[i].splice(0,object[i].length); 
        }else{
           object[i]="";
        }
    }
    return object ;
}

util.inputVal = function(type,v) {
    if(type=='phone'){
        if(!(/^1[3456789]\d{9}$/.test(v))) {
            this.$dialog.toast({ 
                mes:'手机号码格式有误，请修改后重试！' ,
                timeout: 500,
                icon: 'error'
            });
        } 
    }
    if(type=='tel'){
         if(!(/^\d{3}-\d{8}|\d{4}-\d{7}$/.test(v))) {
            this.$dialog.toast({ 
                mes:'固定号码格式有误(格式：区号-号码)，请修改后重试！' ,
                timeout: 500,
                icon: 'error'
            });
        } 
    }
    if(type=='number'){
        if(!(/^[0-9]+(.[0-9]{1,2})?$/.test(v))) {
            this.$dialog.toast({ 
                mes:'数字格式有误，请修改后重试！' ,
                timeout: 500,
                icon: 'error'
            });
        } 
    }
    if(type=='account'){
        if(!(/^[\u4E00-\u9FA5\uf900-\ufa2d\w]{2,16}$/.test(v))) {
            this.$dialog.toast({ 
                mes:'输入的内容格式有误(2~16 位)，请修改后重试！' ,
                timeout:500,
                icon: 'error'
            });
        } 
    }
    if(type=='email'){
         if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(v))) {
            this.$dialog.toast({ 
                mes:'邮箱格式有误，请修改后重试！' ,
                timeout: 500,
                icon: 'error'
            });
        } 
    }
    if(type=='price'){
        if(!(/^\d*(.\d{0,2})?$/.test(v))) {
            this.$dialog.toast({ 
                mes:'价格格式有误，请修改后重试！' ,
                timeout: 500,
                icon: 'error'
            });
        } 
    }
  }

export default util;
     
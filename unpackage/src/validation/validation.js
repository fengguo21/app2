import Vue from 'vue'

var validation = new Vue({
	methods: {
		checkNull(param, show) {
			if(param == '' && param !== 0) {
				return show;
			} else {
				return false;
			}
		},
		checkPhone(param, show) {
			let pattern = /^1[34578]\d{9}$/;
			if(!param) {
				return '请输入手机号码！';
			} else if(!pattern.test(param)) {
				return '手机号码有误！';
			} else {
				return false;
			}
		},
		checkPwd(param, show) {
			let pattern = /^[0-9a-zA-Z]{6,12}$/;
			if(!param) {
				return '请输入密码';
			} else if(!pattern.test(param)) {
				return '请输入6-12位的数字或字母';
			} else {
				return false;
			}
		},
//		checkIdNumber(param, show) {
//			let pattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
//			if(!param) {
//				return '请输入手机号码！';
//			} else if(!pattern.test(param)) {
//				return '手机号码有误！';
//			} else {
//				return false;
//			}
//		}
	},
})

export default validation;
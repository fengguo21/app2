import http from '../../libs/httpService'

const state = {
	user: {
		name: "",
		no: ""
	},
	userResult: {
		page: 1,
		pageSize: 15,
		total: 0,
		list: []
	},
	userQueryParam: {},
	clientHeight: '7777777777777777',
	goodAtField: [],
	employeeInfo:{},
	erpBreedList:[],
}

// getters
const getters = {
	user: state => state.user,
	userResult: state => state.userResult,
	userQueryParam: state => state.userQueryParam,
	goodAtField: state => state.goodAtField,
	employeeInfo: state => state.employeeInfo,
	erpBreedList: state => state.erpBreedList,
}

// actions
const actions = {

	userLogin({
		commit,
		state
	}, param) {
		let body = {
			biz_param: param
		};
		let url = http.urlCommon + http.apiUrl.login;
		return new Promise((resolve, reject) => {
			http.commonPost(url, body).then((res) => {

				let result = res.biz_result.employee;
				window.localStorage.KEY = res.biz_result.KEY;
				window.localStorage.SID = res.biz_result.SID;
				window.localStorage.menus = JSON.stringify(res.biz_result.menus);
				window.localStorage.employeeId = result.id;
				window.localStorage.orgid = result.orgid;
				window.localStorage.classify = result.classify;
				window.localStorage.name = param.no;
				window.localStorage.pass = param.password;

				http.KEY = res.biz_result.KEY;
				http.SID = res.biz_result.SID;
				http.getDate();
				commit("setUserInfo", res);
				resolve(res);
			}).catch((err) => {
				reject(err);
			});
		})
	},
	userLogout({
		commit,
		state
	}, param) {
		let resp = {
			result: {
				info: {
					name: "",
					no: ""
				}
			}
		};
		let url = http.urlCommon + http.apiUrl.logout;
		return new Promise((resolve, reject) => {
			http.commonPost(url, {
				param: {}
			}).then((res) => {
				window.localStorage.KEY = "";
				window.localStorage.SID = "";
				commit("setUserInfo", resp);
				resolve(res);
			}).catch((err) => {
				reject(err);
			});
		})
	},
	userQueryList({
		commit,
		state
	}, param) {
		let body = {
			module: 'userService',
			method: 'queryUserList',
			param: param
		};
		let url = http.urlCommon + http.apiUrl.most;
		return new Promise((resolve, reject) => {
			http.commonPost(url, body).then((res) => {
				commit("setUserResult", res);
				resolve(res);
			}).catch((err) => {
				reject(err);
			});
		})
	},
	addEmployProduct({
		commit,
		state
	}, param) {
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_module: "erpEmployProductService",
			biz_method: "addEmployProduct",
			biz_param: param
		};
		return new Promise((resolve, reject) => {
			http.commonPost(url, body)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		})
	},
	queryEmployProductGroupList({
		commit,
		state
	}, param) {
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_module: "erpEmployProductService",
			biz_method: "queryEmployProductGroupList",
			biz_param: param
		};
		return new Promise((resolve, reject) => {
			http.commonPost(url, body)
				.then(res => {
					commit("setGoodAtField", res);
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		})
	},
	queryEmployeeInfo({
		commit,
		state
	}, param) {
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_module: "employService",
			biz_method: "queryEmployeeInfo",
			biz_param: param
		};
		return new Promise((resolve, reject) => {
			http.commonPost(url, body)
				.then(res => {
					commit("setEmployeeInfo",res);
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		})
	},
	addEmployProduct({
		commit,
		state
	},param) {
		let url = http.urlCommon + http.apiUrl.most;
	    let body = {
	        biz_module: "erpEmployProductService",
	        biz_method: "addEmployProduct",
	        biz_param: param
	    };
      	return new Promise((resolve,reject) => {
      		http.commonPost(url,body)
      			.then(res => {
      				resolve(res);
      			})
      			.catch(err=>{
      				reject(err);
      			})
      	})
	},
	queryErpBreedList({
		commit,
		state
	},param) {
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_module: "breedService",
			biz_method: "queryErpBreedList",
			biz_param: param
		};
		return new Promise((resolve,reject)=>{
			http.commonPost(url, body)
			.then(res => {
				commit("setErpBreedList",res);
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		})
	},
	updateEmployeeInfo({
		commit,
		state
	},param) {
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_module: "employService",
			biz_method: "updateEmployeeInfo",
			biz_param: param
		};
		return new Promise((resolve,reject)=>{
			http.commonPost(url, body)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		})
	},
	updatePassword({
		commit,
		state
	},param) {
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_module: "employService",
			biz_method: "updatePassword",
			biz_param: param
		};
		return new Promise((resolve,reject)=>{
			http.commonPost(url, body)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
		})
	}
}

// mutations
const mutations = {

	setUserInfo(state, res) {
		state.user = res.biz_result.employee;
		//      console.log(state.user);
	},
	setUserResult(state, res) {
		//      state.userResult = res.result;
	},
	setGoodAtField(state, res) {
		state.goodAtField=[];
		let productSet = res.biz_result.list[0].employeeProductSet;
		if(productSet) {
			for (let item in productSet){
				state.goodAtField.push(productSet[item].breedName);
			}
		}
	},
	setEmployeeInfo(state, res) {
		state.employeeInfo = res.biz_result;
	},
	setErpBreedList(state, res) {
		state.erpBreedList = [...state.erpBreedList,...res.biz_result.list];
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
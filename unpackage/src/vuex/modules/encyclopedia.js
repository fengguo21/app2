import http from '../../libs/httpService'

const state={
	imgBannerList:[],
	hotDrugList:[],
}

const getters = {
	imgBannerList: state => state.imgBannerList,
	hotDrugList: state => state.hotDrugList,
}

const actions ={
	queryImgBannerList({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
      	let body = {
	        biz_module: "herbBannerService",
	        biz_method: "queryBannerList",
	        biz_param: param
      	};
      	return new Promise((resolve,reject)=>{
      		http
	        .commonPost(url, body)
	        .then(res => {
	          commit("setImgBannerList",res);
	          resolve(res);
	        })
	        .catch(err => {
	        	reject(err);
	        });
	    })
	},
	queryDrugPropertiesInfo({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
      	let body = {
	        biz_module: "breedService",
	        biz_method: "queryDrugPropertiesInfo",
	        biz_param: param
      	};
      	return new Promise((resolve,reject) => {
      		http
      			.commonPost(url,body)
      			.then(res=>{
      				resolve(res);
      			})
      			.catch(err=>{
      				reject(err);
      			})
      	});
	},
	hotDrugPropertiesInfo({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
      	let body = {
	        biz_module: "breedService",
	        biz_method: "hotDrugPropertiesInfo",
	        biz_param: param
      	};
      	return new Promise((resolve,reject)=>{
      		http
      			.commonPost(url,body)
      			.then(res=>{
      				commit("setHotDrugList",res);
      				resolve(res);
      			})
      			.catch(err=>{
      				reject(err);
      			})
      	});
	},
}

const mutations={
	setImgBannerList(state,res){
		state.imgBannerList=res.biz_result.list;
	},
	setHotDrugList(state,res){
		state.hotDrugList = res.biz_result.list;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}

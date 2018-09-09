import http from '../../libs/httpService'

const state = {
	resourceList: [],
	publicList:[],
	offerZoneOfferList:[],
	unitList:[]
}

const getters = {
	resourceList: state => state.resourceList,
	publicList: state => state.publicList,
	offerZoneOfferList: state => state.offerZoneOfferList,
	unitList: state => state.unitList,
}

const actions = {
	queryResourceList({
		commit,
		state
	}, param) {
		let url = http.urlCommon + http.apiUrl.most;
		return new Promise((resolve, reject) => {
			http
				.commonPost(url, param)
				.then(res => {
					if(res.code == "1c01") {
						commit("setResourceList", res);
						resolve(res);
					}
				})
				.catch(err => {
					reject(err);
				});
		})

	},
	queryPublicList({
		commit,
		state
	},param) {
		let url = http.urlCommon + http.apiUrl.most;
		return new Promise((resolve,reject)=>{
			http
				.commonPost(url,param)
				.then(res=>{
					if(res.code == "1c01"){
						commit("setPublicList",res);
						resolve(res);
					}
				})
				.catch(err=>{
					reject(err);
				});
		})
	},
	updateOffer({
		commit,
		state
	},param) {
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
	        biz_module: "erpIntentionOfferService",
	        biz_method: "updateOffer",
	        biz_param: param
      	};
      	return new Promise((resolve,reject)=>{
      		http
      			.commonPost(url,body)
      			.then(res=>{
      				if(res.code=="1c01"){
      					resolve(res);
      				}
      			})
      			.catch(err=>{
      				reject(err);
      			});
      	})
	},
	requestPriceConfirm({
		commit,
		state
	},param) {
		let url = http.addSID(http.urlCommon + http.apiUrl.most);
		let body = {
	        biz_module: "erpIntentionOfferService",
	        biz_method: "confirmPrice",
	        biz_param: param
	  	};
	  	return new Promise((resolve,reject)=>{
	  		http.commonPost(url,body)
	  			.then(res=>{
	  				if(res.code=="1c01"){
	  					resolve(res);
	  				}
	  			})
	  			.catch(err=>{
	  				reject(err);
	  			});
	  	});
	},
	thereSamples({
		commit,
		state
	},param){
		let url = http.addSID(http.urlCommon + http.apiUrl.most);
		let body = {
			biz_module: "erpIntentionOfferService",
	        biz_method: "thereSamples",
	        biz_param: param
		};
		return new Promise((resolve,reject)=>{
			http.commonPost(url,body)
				.then(res=>{
					if(res.code=="1c01"){
						resolve(res);
					}
				})
				.catch(err=>{
					reject(err);
				})
		});
	},
	offerUnable({
		commit,
		state
	},param){
		let url = http.addSID(http.urlCommon + http.apiUrl.most);
      	let body = {
	        biz_module: "erpSampleRequestService",
	        biz_method: "offerUnable",
	        biz_param: param
      	};
      	return new Promise((resolve,reject)=>{
      		http.commonPost(url,body)
      			.then(res=>{
      				if(res.code=="1c01"){
      					resolve(res);
      				}
      			})
      			.catch(err=>{
      				reject(err);
      			})
      	})
	},
	queryOfferList({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_module: 'erpIndentService',
			biz_method: 'queryWaitOfferIndentList',
			biz_param: param
		};
		return new Promise((resolve,reject)=>{
			http.commonPost(url,body)
				.then(res=>{
					if(res.code=="1c01"){
						commit("setOfferList",res);
						resolve(res);
					}
				})
				.catch(err=>{
					reject(err);
				})
		})
	},
	deleteNotOfferIntention({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_method: "deleteNotOfferIntention",
			biz_module: "erpIntentionService",
			biz_param: param
		};
		return new Promise((resolve,reject)=>{
			http.commonPost(url,body)
				.then(res=>{
					if(res.code=="1c01"){
						resolve(res);
					}
				})
				.catch(err=>{
					reject(err);
				});
		})
	},
	queryUnitList({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
			biz_module: 'enumService',
            biz_method: 'queryEnumList',
            biz_param: {
                type:'MU'
            }
		};
		return new Promise((resolve,reject)=>{
			http.commonPost(url, body)
			.then((res) => {
				commit("setUnitList",res);
				resolve(res);
       	 	})
			.catch(err=>reject(err));
		})
	},
	addIntention({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
            biz_module: 'erpIntentionService',
            biz_method: 'addIntention',
            biz_param: param
        };
       	return new Promise((resolve,reject)=>{
       		http.commonPost(url,body)
	       		.then((res)=>{
	       			resolve(res);
	       		})
       			.catch(err=>reject(err));
       	})
	}
	
}

const mutations = {
	setResourceList(state, res) {
		state.resourceList = [...state.resourceList, ...res.biz_result.list];
	},
	setPublicList(state,res) {
		state.publicList = [...state.publicList, ...res.biz_result.list];
	},
	setOfferList(state,res) {
		state.offerZoneOfferList = [...state.offerZoneOfferList, ...res.biz_result.list];
	},
	setUnitList(state,res) {
		state.unitList = res.biz_result.list;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
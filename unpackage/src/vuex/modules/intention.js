import http from '../../libs/httpService'

const state={
	intentionList:[],
	
}
const getters={
	intentionList:state => state.intentionList,
}
const actions={
	queryIntentionList({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
		return new Promise((resolve, reject) => {
			http
				.commonPost(url, param)
				.then(res => {
					if(res.code == "1c01") {
						commit("setIntentionList", res);
						resolve(res);
					}
				})
				.catch(err => {
					reject(err);
				});
		})
	},
	addIndent({
		commit,
		state
	},param){
		let url = http.urlCommon + http.apiUrl.most;
		let body = {
            biz_module: 'erpIndentService',
            biz_method: 'addIndent',
            biz_param: param,
        }
		return new Promise((resolve,reject) =>{
			http.commonPost(url,body)
			    .then(res => {
			    	if(res.code=="1c01"){
			    		resolve(res);
			    	}
			    })
			    .catch(err =>{
			    	reject(err);
			    });
		})
	}
}
const mutations={
	setIntentionList(state,res){
		state.intentionList=[...state.intentionList,...res.biz_result.list];
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}

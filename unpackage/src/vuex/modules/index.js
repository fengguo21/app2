import http from '../../libs/httpService'

const state={
	homeList: [
        {
          title: "我的客户",
          url: "/main/client?id=0",
          active: true,
          icon: "jiaosequnti",
          index: 0,
          badge: 0,
          type: "A"
        },
        {
          title: "我的求购",
          url: "/main/order?id=0",
          active: true,
          icon: "caigou",
          index: 1,
          badge: 0,
          type: "A"
        },
        {
          title: "我的供应商",
          url: "/main/supply?id=6",
          active: true,
          icon: "jiaosequnti",
          index: 0,
          badge: 0,
          type: "B"
        },
        {
          title: "我的报价",
          url: "main/resource?id=4",
          active: true,
          icon: "zhangdan-xianxing",
          index: 3,
          badge: 0,
          type: "B"
        },
        {
          title: "我的订单",
          url: "/main/order?id=0",
          active: true,
          icon: "haiguan-xianxing",
          badge: 0,
          type: "AB"
        }
    ],
    offerList: [
        {
          name: "主营待报价",
          url: "/main/supply?id=6",
          total: 0,
          type: "1"
        },
        {
          name: "主营报价区",
          url: "/main/client?id=0",
          total: 0,
          type: "1"
        },
        {
          name: "全部待报价",
          url: "/main/order?id=0",
          total: 0,
          type: "1"
        },
        {
          name: "全部报价区",
          url: "/main/message",
          total: 0,
          type: "1"
        }
      ],
    orderList: [
        {
          title: "待支付",
          url: "/main/client?id=0",
          badge: 4
        },
        {
          title: "待发货",
          url: "/main/order?id=0",
          badge: 0
        },
        {
          title: "待收货",
          url: "/main/message",
          badge: 0
        },
        {
          title: "待验收",
          url: "/main/supply?id=6",
          badge: 3
        }
    ],
    sampleList: [
        {
          name: "待寄样",
          url: "/main/resource?id=4",
          total: 0,
        },
        {
          name: "待确认价格",
          url: "/main/resource?id=4",
          total: 0,
        }
    ]
}

const getters={
	offerList:state=> state.offerList,
	sampleList:state=> state.sampleList,
	homeList:state=> state.homeList,
	orderList:state=> state.orderList
}

const actions={
	homePageData({
		commit,
		state
	},param){
		let body = {
	        biz_method: "queryHomePageData",
	        biz_module: "erpIntentionService",
	        biz_param: {}
    	};
    	let url = http.urlCommon + http.apiUrl.most;
    	return new Promise((resolve,reject)=>{
    		http
	    	.commonPost(url, body)
	        .then(res => {
	          if (res.code == "1c01") {
				commit("setOfferList",res);
				commit("setSampleList",res);
				resolve(res);
	          }
	        })
	        .catch(err => {
	        	reject(err);
	        });
	    	})
    	
	},
	
}

const mutations={
	setOfferList(state,res){
		state.offerList=res.biz_result.list[0];
	},
	setSampleList(state,res){
		state.sampleList=res.biz_result.list[1];
	}
	
}

export default {
	state,
	getters,
	actions,
	mutations
}

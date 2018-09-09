import Vue from 'vue'

var share = new Vue({
	methods: {
		judgeH5(data) {
			let _self = this;
			if(Vue.prototype.$plus) {
				_self.updateSerivces(data)
			} else {
				_self.$dialog.toast({
					mes: '网页端不支持分享，请从浏览器手动分享',
					timeout: 1000
				});
			}
		},
		updateSerivces(data) {

			let _self = this;
			plus.share.getServices(function(s) {
				data.shares = {};
				for(var i in s) {
					var t = s[i];
					data.shares[t.id] = t;
				}
				_self.shareHref(data);
			}, function(e) {
				_self.$dialog.toast({
					mes: '获取分享服务列表失败' + e.message,
					timeout: 1000
				});
			});
		},
		shareHref(data) {
			let _self = this;
			var shareBts = [];
			// 更新分享列表
			var ss = data.shares['weixin'];
			ss && ss.nativeClient && (shareBts.push({
					title: '微信朋友圈',
					s: ss,
					x: 'WXSceneTimeline'
				}),
				shareBts.push({
					title: '微信好友',
					s: ss,
					x: 'WXSceneSession'
				}));
			ss = data.shares['qq'];
			ss && ss.nativeClient && shareBts.push({
				title: 'QQ',
				s: ss
			});
			// 弹出分享列表
			shareBts.length > 0 ? plus.nativeUI.actionSheet({
				title: '分享链接',
				cancel: '取消',
				buttons: shareBts
			}, function(e) {
				(e.index > 0) && _self.shareAction(shareBts[e.index - 1], true, data);
			}) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
		},
		shareAction(sb, bh, data) {
			let _self = this;
			if(!sb || !sb.s) {
				_self.$dialog.toast({
					mes: '无效的分享服务',
					timeout: 1000
				});
				return;
			}
			var msg = {
				content: data.sharecontent,
				extra: {
					scene: sb.x
				}
			};
			if(bh) {
				msg.href = data.sharehref;
				if(data.sharehrefTitle) {
					msg.title = data.sharehrefTitle;
				}
				if(data.sharehrefDes) {
					msg.content = data.sharehrefDes;
				}
				msg.thumbs = data.thumbs;
			}
			// 发送分享
			if(sb.s.authenticated) {
				_self.shareMessage(msg, sb.s);
			} else {
				_self.$dialog.toast({
					mes: '---未授权---',
					timeout: 1000
				});
			}
		},
		shareMessage(msg, s) {
			let _self = this;
			s.send(msg, function() {
				//				分享成功返回
			}, function(e) {
				//				分享失败返回
			});
		}
	}
});

export default share;

//使用方法

//1、首先引入share.js
//		例如:import share from '../../../libs/share.js'

//2 、变量
//	举例
//	data() {
//			return {
//				shareData:{
//					shares: {},
//					sharecontent:'报价11111111111111111',
//					sharehref:'',
//					sharehrefTitle:'报价',
//					sharehrefDes:'描述---------------',
//					thumbs:['http://ohfmt3i6o.bkt.clouddn.com/logo.png'],
//				}
//			}
//		},

//3、执行方法

//share() {
//	let _self = this;
//	_self.shareData.sharehrefTitle = "【紧急求购】" + _self.info.intention.breedName + "-上【药材买卖网】你报价我就要了！";
//	_self.shareData.sharehref = 'http://192.168.1.142:81/htm5/#/needDetails/' + this.$route.query.id;
//	_self.shareData.sharehrefDes = _self.info.intention.breedName + ',规格:' + _self.info.intention.spec + ',需要' + _self.info.intention.number + '要求：' + _self.info.intention.quality + '。--买卖药材就上药材买卖网！';
//	share.judgeH5(this.shareData)
//},
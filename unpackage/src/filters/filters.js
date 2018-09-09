/**
 * Created by aresn on 16/7/4.
 */

import dateUtil from "../libs/dateUtil.js"

/*-------公用方法，供下面的过滤器调用--------*/
//从对象obj中提取属性key对应的值，如果没有则返回默认值
function commonRet(obj, key) {
	if(key == undefined) {
		key = "undefined";
	}
	let result = obj[key.toString()];
	return result ? result : obj["default_value"];
}

//从对象obj中提取属性key对应的值，如果没有则返回默认值,中英文版本，属性值格式"CN(EN)"
function commonRetI18(obj, key, language) {
	let str = commonRet(obj, key);
	let reg = /([\S]+)\(([\S]+)\)/;
	let result = reg.exec(str);
	return language == "cn" ? result[1] : language == "en" ? result[2] : str;
}

/*---------------------------------------------*/

/**
 * 千位分隔符
 * */
export function amountFormat(value) {
	return value.toString().replace(/\B(?=(\d{3})+$)/g, ',');
}
// 客户端
export function client(value) {
	switch(value) {
		case 0:
			return 'PC';
		case 1:
			return 'PC';
		case 2:
			return 'Android';
		case 3:
			return 'Weixin';
		case 4:
			return 'iOS';
		default:
			return 'Other';
	}
}

// 客户端
export function approve(value) {
	switch(value) {
		case 0:
			return '未认证';
		case 1:
			return '认证中';
		case 2:
			return '已认证';
		case 3:
			return '认证失败';
		default:
			return 'Other';
	}
}

// 客户端
export function auditStatus(value) {
	let obj = {
		"0": "审核未通过",
		"1": "审核已申请",
		"2": "审核已通过",
		"3": "审核未通过",
		"default_value": "未知状态"
	};
	return commonRet(obj, value);
}

// 客户端
export function sourceStatus(value) {
	let obj = {
		"0": "业务员",
		"1": "普通供应商",
		"default_value": "未知状态"
	};
	return commonRet(obj, value);
}

export function indentSource (val) { //采购单来源
    var val = val;
    if (val === 0) {
        return "业务员导入";
    } else if (val == 1) {
        return "web";
    } else if (val == 2) {
        return "android";
    } else if (val == 3) {
        return "weixin";
    } else if (val == 4) {
        return "ios";
    } else {
        return "其他";
    }
}

export function fromStatus(value) {
	let obj = {
		"0": "pc",
		"1": "android",
		"2": "wechart",
		"3": "ios",
		"default_value": "未知状态"
	};
	return commonRet(obj, value);
}

// 客户端
export function acceptStatus(value) {
	let obj = {
		"0": "未处理",
		"1": "已接受",
		"2": "不接受",
		"3": "正在跟进",
		"default_value": "未知状态"
	};
	return commonRet(obj, value);
}

export function moneyRecordWay(value) {
	switch(value) {
		case -1:
			return '短信消费';
		case 1:
			return '支付宝充值';
		case 2:
			return '微信充值';
		default:
			return '其他';
	}
}

export function moneyRecordStatus(value) {
	switch(value) {
		case 0:
			return '初始';
		case 1:
			return '成功';
		case 2:
			return '失败';
		case 3:
			return '未知';
		default:
			return '未知';
	}
}

export function activityAType(value) {
	switch(value) {
		case 'register':
			return '注册';
		case 'firstPay':
			return '首次充值';
		default:
			return '其他';
	}
}

export function activityAwardType(value) {
	switch(value) {
		case 'sms':
			return '免费短信';
		case 'money':
			return '奖励金';
		default:
			return '其他';
	}
}

export function scale(value) {
	value = Number(value);
	let obj = {
		1: "小型",
		2: "中型",
		3: "大型",
		"default_value": "未知"
	};

	return commonRet(obj, value);
}

export function allType(value) {
	let obj = {
		0: "其他",
		1: "合作社",
		2: "药商",
		3: "药厂",
		4: "个体户",
		5: "药店",
		6: "医院",
		7: "贸易公司",
		8: "零售商行",
		9: "药农",
		10: "介绍人",
		11: "药贩子",
		12: "产地药商",
		13: "销地药商",
		14: "诊所",
		15: "化工厂",
		16: "化妆品厂",
		17: "提取物厂",
		18: "食品厂",
		19: "实验室",
		20: "网上电商",
		21: "中成药生产商",
		22: "西成药生产商",
		23: "饮片厂",
		24: "茶类公司",
		25: "种植基地",
		"default_value": "未知"
	};
	return commonRet(obj, value);
}

export function supplierType(value) {
	var val = value;
	if(val == '') {
		return '未选择';
	} else if(val == 1) {
		return '合作社';
	} else if(val == 2) {
		return '药商';
	} else if(val == 4) {
		return '个体户';
	} else if(val == 7) {
		return '贸易公司';
	} else if(val == 8) {
		return '零售商行';
	} else if(val == 9) {
		return '药农';
	} else if(val == 10) {
		return '介绍人';
	} else if(val == 11) {
		return '药贩子';
	} else if(val == 12) {
		return '产地药商';
	} else if(val == 13) {
		return '销地药商';
	} else if(val == 17) {
		return '提取物厂';
	} else if(val == 25) {
		return '种植基地';
	} else {
		return '';
	}
}
export function customerType(value) {
	var val = value;
	if(val == '') {
		return '未选择';
	} else if(val == 3) {
		return '药厂';
	} else if(val == 5) {
		return '药店';
	} else if(val == 6) {
		return '医院';
	} else if(val == 14) {
		return '诊所';
	} else if(val == 15) {
		return '化工厂';
	} else if(val == 16) {
		return '化妆品厂';
	} else if(val == 17) {
		return '提取物厂';
	} else if(val == 18) {
		return '食品厂';
	} else if(val == 19) {
		return '实验室';
	} else if(val == 20) {
		return '网上电商';
	} else if(val == 21) {
		return '中成药生产商';
	} else if(val == 22) {
		return '西成药生产商';
	} else if(val == 23) {
		return '饮片厂';
	} else {
		return '';
	}
}

export function orderstatus(value) { //订单状态
	var val = value;
	if(val == 0) {
		return '新建订单';
	}
	if(val == 10) {
		return '订单处理中';
	}
	if(val == 20) {
		return '等待支付';
	}
	if(val == 30) {
		return '等待审核';
	}
	if(val == 40) {
		return '等待卖家发货';
	}
	if(val == 50) {
		return '等待收货';
	}
	if(val == 60) {
		return '已收货';
	}
	if(val == 70) {
		return '订单已完成';
	}
	if(val == -1) {
		return '订单已取消';
	}
	if(val == -2) {
		return '订单已过期';
	}
}

export function singleImg(value, img) {
	let arr = value.split(",");
	let defaultImg = (!img) ? "/static/images/default.png" : img;
	if(!value) {
		return defaultImg;
	} else {
		return arr[0];
	}
}

//way:"cn"只转化为中文,"en"之转化为英文,否则转化成中英文
export function unit(value, way) {
	let obj = {
		"1": "斤(HKG)",
		"3": "克(G)",
		"63": "公斤(KG)",
		"64": "棵(Tree)",
		"66": "份(份)",
		"69": "朵(Flower)",
		"70": "瓶(Bottle)",
		"71": "吨(T)",
		"72": "株(Plan)",
		"73": "只(Only)",
		"74": "盒(Box)",
		"110": "升(Liter)",
		"112": "20尺柜(GP20T)",
		"113": "40尺柜(GP40)",
		"114": "40高柜(GP40HQ)",
		"default_value": "未定义(undefined)"
	};
	return commonRetI18(obj, value, way);
}

//订单分期付款节点
export function orderDescript(value) {
	let obj = {
		"0": "下单后",
		"10": "下单后",
		"20": "合同签订后",
		"30": "合同签订后",
		"40": "合同签订后",
		"50": "发货后",
		"60": "确认收货后",
		"70": "检验合格后",
		"default_value": "未知状态"
	};

	return commonRet(obj, value);

}

//货币
export function currency(value, language) {
	let obj = {
		"0": "人民币(CNY)",
		"1": "人民币(CNY)",
		"2": "美元(USD)",
		"3": "欧元(EUR)",
		"4": "港币(HKD)",
		"5": "英镑(GBP)",
		"6": "日元(JPY)",
		"7": "韩元(KRW)",
		"8": "加元(CAD)",
		"9": "澳元(AUD)",
		"10": "瑞郎(CHF)",
		"11": "新加坡元(SGD)",
		"12": "马来西亚币(MYR)",
		"13": "印尼(IDR)",
		"14": "新西兰(NZD)",
		"15": "越南(VND)",
		"16": "泰铢(THB)",
		"17": "菲律宾(PHP)",
		"default_value": "未知货币(Unknow Currency)"
	};
	return commonRetI18(obj, value, language);
}

//收付款类型
export function payType(value) {
	let obj = {
		"0": "付款",
		"1": "收款",
		"default_value": "收款"
	};

	return commonRet(obj, value);
}

//订单分期申请状态
export function stageValid(value) {
	let obj = {
		"0": "未申请收款/付款",
		"1": "申请收款/付款中",
		"2": "已收款/付款",
		"3": "审核不通过",
		"default_value": "未知状态"
	};

	return commonRet(obj, value);
}

export function nature(value) {
	switch(value) {
		case -1:
			return '未知';
		case 0:
			return '个人';
		case 1:
			return '民企';
		case 2:
			return '国企';
		case 3:
			return '上市企业';
		default:
			return '未知';

	}
}
export function newOfferAccept(val) { //新报价状态
    var val = val; 
    if (val == 0) {
        return "未审核";
    }else if (val == 10) {
        return "审核通过";
    } else if (val == 11) {
        return "报价不采用";
    } else if (val == 20) {
        return "报价待采用";
    } else if (val == 30) {
        return "报价等待复用确认";
    } else if (val == 100) {
        return "报价被采用";
    } else if (val == 110) {
        return "已申请寄样";
    } else if (val == 111) {
        return "无法寄样";
    } else if (val == 120) {
        return "寄样中";
    } else if (val == 130) {
        return "已寄样";
    } else if (val == 131) {
        return "样品不合格";
    } else if (val == 140) {
        return "样品合格";
    } else if (val == 150) {
        return "价格确认中";
    } else if (val == 151) {
        return "价格有变";
    } else if (val == 160) {
        return "价格已确认";
    } else if (val == 170) {
        return "已成交";
    } else {
        return " ";
    }

};
export function newPurchaseStatus (val) { //新求购状态
    var val = val; 
    if (val == 0) {
        return "未扩散";
    }else if (val == 10) {
        return "询价中";
    } else if (val == 11) {
        return "已终止";
    } else if (val == 100) {
        return "已采用报价";
    } else if (val == 110) {
        return "已申请寄样";
    } else if (val == 111) {
        return "报价无法寄样";
    } else if (val == 120) {
        return "报价寄样中";
    } else if (val == 130) {
        return "已寄样";
    } else if (val == 131) {
        return "样品不合格";
    } else if (val == 140) {
        return "样品合格";
    } else if (val == 150) {
        return "价格确认中";
    } else if (val == 151) {
        return "价格有变化";
    } else if (val == 160) {
        return "价格已确认";
    } else if (val == 170) {
        return "已成交";
    } else {
        return " ";
    }

};
//中国的省份
export function province(value) {
	let obj = {
		"247": "北京",
		"248": "天津",
		"249": "河北",
		"250": "山西",
		"251": "内蒙古",
		"252": "辽宁",
		"253": "吉林",
		"254": "黑龙江",
		"255": "上海",
		"256": "江苏",
		"257": "浙江",
		"258": "安徽",
		"259": "福建",
		"260": "江西",
		"261": "山东",
		"262": "河南",
		"263": "湖北",
		"264": "湖南",
		"265": "广东",
		"266": "广西",
		"267": "海南",
		"268": "重庆",
		"269": "四川",
		"270": "贵州",
		"271": "云南",
		"272": "西藏",
		"273": "陕西",
		"274": "甘肃",
		"275": "青海",
		"276": "宁夏",
		"277": "新疆",
		"278": "台湾",
		"279": "香港",
		"280": "澳门",
		"default_value": "不限"
	};

	return commonRet(obj, value);
}

//开票类型
export function invoiceType(value) {
	let obj = {
		"0": "普票",
		"1": "专票",
		"default_value": "未知类型"
	};

	return commonRet(obj, value);
}

//开票状态
export function invoiceStatus(value) {
	let obj = {
		"0": "初始",
		"1": "审核中",
		"2": "开票中",
		"3": "开票成功",
		"4": "已确认收票",
		"-1": "审核失败",
		"default_value": "未知状态"
	};

	return commonRet(obj, value);
}

//收付款审核状态
export function payValidate(value) {
	let obj = {
		"0": "未审核",
		"1": "审核中",
		"2": "审核通过",
		"3": "审核不通过",
		"default_value": "未知状态"
	};

	return commonRet(obj, value);
}

//补充合同审核状态
export function contractValidate(value) {
	let obj = {
		"0": "初始",
		"1": "申请",
		"2": "审核通过",
		"-1": "取消",
		"-2": "审核不通过",
		"default_value": "未知状态"
	};

	return commonRet(obj, value);
}

//退换货类型
export function afterSalesType(value) {
	let obj = {
		"0": "换货",
		"1": "退货",
		"2": "退/换货",
		"default_value": "未知类型"
	};

	return commonRet(obj, value);
}

//退换货状态
export function afterSalesValidate(value) {
	let obj = {
		"0": "等待审核",
		"1": "售后处理中",
		"2": "售后成功",
		"3": "确认客户收货",
		"-2": "重新申请",
		"default_value": "未知状态"
	};

	return commonRet(obj, value);
}

export function orderTask(taskKey, verifierName, type) {
	var name = verifierName == "" ? "" : verifierName;
	//name = `<span style="color:red">${name}</span>`;
	switch(taskKey) {
		case "order_validate":
			return "待业务员申请审核";
		case "governor_validate":
			return "审核中-需要" + name + "进行主管审核";
		case "law_validate":
			return "审核中-需要" + name + "进行法务审核";
		case "employee_handle":
			return "审核中-审核不通过，需要" + name + "再次确认后重新申请";
		case "supply_validate":
			return "审核中-需要" + name + "进行采购审核";
		case "manager_validate":
			return "审核中-需要" + name + "进行经理审核";
		case "financial_validate":
			return "审核中-需要" + name + "进行财务审核";
		case "order_pay":
			return "订单待支付，需要业务员在订单分期中申请收付款";
		case "order_pay_confirm":
			return "线下支付，需要财务在收付款审核中审核确认";
		case "order_send":
			if(type === 0) {
				return "订单待收货，需要客户发货";
			} else {
				return "订单待发货，需要业务员申请发货";
			}
		case "order_send_governor_validate":
			return "订单发货-需要" + name + "进行主管审核";
		case "order_send_employee_handle":
			return "订单发货-审核不通过，业务员需要再次确认";
		case "order_send_warehouse_validate":
			return "订单发货-需要" + name + "进行仓库发货";
		case "order_send_warehouse":
			return "订单发货-需要" + name + "提醒库管进行仓库发货";
		case "order_receive":
			if(type === 0) {
				//return "订单收货，需要" + name + "确认是否收到商品";
				return "订单收货，需要" + name + "进行入库单审核";

			} else {
				return "订单收货，需要" + name + "确认客户是否收到商品";
			}
		case "order_qa":
			return "订单质检，需要" + name + "确认商品质量";
		case "supplementary_contract_governor_validate":
			return "补充合同-需要" + name + "进行主管审核";
		case "supplementary_contract_employee_handle":
			return "补充合同-审核不通过，需要" + name + "确认后在我的补充合同重新申请";
		case "supplementary_contract_refund":
			return "补充合同-需要退款，请在我的收付款完善信息申请收付款";
		case "after_sales_governor_validate":
			return "订单售后-需要" + name + "进行主管审核";
		case "after_sales_employee_handle":
			return "订单售后-审核不成功，需要" + name + "确认后在我的售后申请重新申请";
		case "after_sales_receipt":
			return "订单售后-需要" + name + "确认收到退回商品";
		case "after_sales_resend":
			return "订单售后-需要" + name + "再次发货";
		case "after_sales_refund":
			return "订单售后-需要财务退款，请在我的收付款完善信息申请收付款";
		case "order_cancel_governor_validate":
			return "订单取消-需要" + name + "进行主管审核";
		case "order_cancel_reapply":
			return "订单取消-审核不通过，需要" + name + "重新确认申请";
		case "order_cancel_receipt":
			return "订单取消-收货，需要" + name + "确认收到退回商品";
		case "order_cancel_refund":
			return "订单取消-退款";
		default:
			return "";
	}
}

//业务类型
export function bizType(value) {
	let obj = {
		"order_validate": "订单审核",
		"order_send": "发货",
		"order_supplementary_contract": "补充合同",
		"order_after_sales": "订单售后",
		"order_cancel": "订单取消",
		"order_invoice_process": "订单开票",
		"default_value": "未知类型"
	};

	return commonRet(obj, value);
}

//任务阶段
export function taskKey(value) {
	let obj = {
		//订单审核
		"governor_validate": "主管审核",
		"employee_handle": "业务员处理",
		"law_validate": "法务审核",
		"supply_validate": "供应部审核",
		"warehouse_validate": "仓库审核",
		"manager_validate": "经理审核",
		"financial_validate": "财务审核",
		//发货审核
		"order_send_governor_validate": "主管审核",
		"order_send_employee_handle": "业务员处理",
		"order_send_warehouse_validate": "仓库审核",
		//补充合同审核
		"supplementary_contract_governor_validate": "主管审核",
		"supplementary_contract_employee_handle": "业务员处理",
		"supplementary_contract_refund": "退款",
		//售后申请
		"after_sales_governor_validate": "主管审核",
		"after_sales_employee_handle": "业务员处理",
		"after_sales_receipt": "收货确认",
		"after_sales_disputed_handle": "业务员异议处理",
		"after_sales_refund": "退款",
		"after_sales_resend": "重新发货",
		//订单取消
		"order_cancel_governor_validate": "主管审核",
		"order_cancel_reapply": "重新申请审核",
		"order_cancel_receipt": "业务员收货  ",
		//开票
		"order_invoice_submit": "提交开票申请",
		"order_invoice_approve": "审核开票申请",
		"order_invoice_drawer": "开票",
		//默认
		"default_value": "未知阶段"

	};

	return commonRet(obj, value);
}

//时间戳转日期,引用了dateUntil工具类的方法
export function timestampToDate(value, isOnlyDate) {
	//isOnlyDate：Boolean-是否只显示日期，或者还显示时间，默认都显示
	let date = dateUtil.formatDate(value);
	if(!!isOnlyDate) {
		date = dateUtil.formatDate(value, 0, 2);
	}
	return date;
}

export function categoryEnter(value) {
	let obj = {
		"0": "手持身份证正面照",
		"1": "身份证正面照",
		"2": "身份证反面照",
		"3": "工商营业执照",
		"4": "组织机构代码证",
		"5": "税务登记证",
		"6": "银行开户许可证",
		"7": "GMP资格证书",
		"8": "GSP资格证书",
		"9": "三证合一",
		"10": "银行开户许可证",
		"11": "GMP资格证书",
		"12": "GSP资格证书",
		"13": "生产许可证",
		"14": "生产许可证",
	};

	return commonRet(obj, value);
}

export function timeForm(value) {
	let val1 = value.split(' ')[0];
	let val2 = value.split(' ')[1];
	let val3 = val2.split(':')[0] + ":" + val2.split(':')[1];
	value = val1 + ' ' + val3;
	return value;
}

export function subTime(val) {
	var val = val;
    if (val) {
        val = val.substring(0, 16);
    } else {
        val = "";
    }
    return val;
}
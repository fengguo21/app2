<template>
	<div class="offerMake">
		<p class="tips">以下带<i>*</i> 均为必填项</p>
		<div>
			<yd-cell-group>
				<yd-cell-item>
					<span slot="left" class="Label"><i>*</i>供应商名称:</span>
					<input slot="left" class="in" type="text" placeholder="输入名称搜索" v-model="param.spplyName" readonly="" @click="addFunc()" />
          <span slot="right" @click='toNewSupplier'>新增</span>
            	</yd-cell-item>
				<yd-cell-item>
					<span slot="left" class="Label"><i>*</i>商品价格:</span>
					<input slot="left" class="in" type="numner" placeholder="裸价，不含税、运费" v-model="param.price" />
					<span slot="right">元/{{intention.unit | unit}}</span>
            	</yd-cell-item>
				<yd-cell-item>
					<span slot="left" class="Label"><i>*</i>实际库存:</span>
					<input slot="left" class="in" type="numner" placeholder="请输入库存数量" v-model="param.number" />
					<span slot="right">{{intention.unit | unit}}</span>
            	</yd-cell-item>
				<yd-cell-item>
					<span slot="left" class="Label"><i>*</i>总运费:</span>
					<input slot="left" class="in" type="numner" placeholder="请输入总运费" v-model="param.incidentals" />
					<span slot="right">元</span>
            	</yd-cell-item>
			</yd-cell-group>

			<yd-cell-group>
				<yd-cell-item>
					<span slot="left" class="Label"><i>*</i>账期预付:</span>
					<input slot="left" class="in" type="numner" placeholder="请输入预付百分比" v-model="advance" />
					<span slot="right">%</span>
            	</yd-cell-item>
				<yd-cell-item v-if="Number(advance) <100 && advance !== ''">
					<span slot="left" class="Label"><i>*</i>余款天数:</span>
					<input slot="left" class="in" type="numner" placeholder="请输入余款天数" v-model="param.paymentDay" />
					<span slot="right">天</span>
            	</yd-cell-item>
				<yd-cell-item>
					<!-- <span slot="left" class="Label"><i>*</i></span> -->
					<input-val slot="left" type="address" :border='false' :param.sync="param.goodsPosition" label="* 货物所在地" placeholder="请选择货物所在地"></input-val>
            	</yd-cell-item>
				<yd-cell-item>
					<!-- <span slot="left" class="Label"><i>*</i></span> -->
					<input-val slot="left" type="time" :border='false' :param.sync="duedate" label="* 报价有效期" placeholder="请选择报价有效期"></input-val>
            	</yd-cell-item>
			</yd-cell-group>
		</div>

		<div style="position: relative;z-index: 0;">
			<yd-cell-group title="* 供应商可否提供加工:">
				<yd-cell-item type="radio">
					<span slot="left">提供加工</span>
					<input slot="right" type="radio" value="1" v-model="param.machine" />
				</yd-cell-item>
				<yd-cell-item type="radio">
					<span slot="left">不提供加工</span>
					<input slot="right" type="radio" value="0" v-model="param.machine" />
				</yd-cell-item>
			</yd-cell-group>

			<yd-cell-group title="* 加工方式" v-if="Number(param.machine) == 1">
				<yd-cell-item>
					<yd-textarea slot="right" placeholder="请填写加工方式" maxlength="100" v-model="param.machinableMode"></yd-textarea>
				</yd-cell-item>
			</yd-cell-group>

			<yd-cell-group title="* 是否符合药典:">
				<yd-cell-item type="radio">
					<span slot="left">符合药典标准</span>
					<input slot="right" type="radio" value="符合药典标准" v-model="param.quality" />
				</yd-cell-item>

				<yd-cell-item type="radio">
					<span slot="left">不符合药典标准</span>
					<input slot="right" type="radio" value="不符合药典标准" v-model="param.quality" />
				</yd-cell-item>
			</yd-cell-group>

			<yd-cell-group title="* 是否包交包退:">
				<yd-cell-item type="radio">
					<span slot="left">是</span>
					<input slot="right" type="radio" value="1" v-model="param.returnGoods" />
				</yd-cell-item>

				<yd-cell-item type="radio">
					<span slot="left">否</span>
					<input slot="right" type="radio" value="0" v-model="param.returnGoods" />
				</yd-cell-item>
			</yd-cell-group>

			<yd-cell-group title="* 退货运费说明:">
				<yd-cell-item type="radio">
					<span slot="left">我方支付</span>
					<input slot="right" type="radio" value="我方支付" v-model="param.incidentalsDesc" />
				</yd-cell-item>

				<yd-cell-item type="radio">
					<span slot="left">供应商支付</span>
					<input slot="right" type="radio" value="供应商支付" v-model="param.incidentalsDesc" />
				</yd-cell-item>
			</yd-cell-group>

			<yd-cell-group title="* 报价备注:">
				<yd-cell-item>
					<yd-textarea slot="right" placeholder="请填写报价备注" maxlength="100" v-model="param.priceDescription"></yd-textarea>
				</yd-cell-item>
			</yd-cell-group>
		</div>

		<div class="renzhengImg">
			<div class="photoList">
				<div class="img_list">
					<p>*药材图片</p>
					<upload-image :multiple="multiple" :imageArray="param.imageArray" @postUrl="getImgUrl" :showCamera="show1"></upload-image>
				</div>
			</div>
		</div>

		<yd-popup v-model="showMenu" position="right" width="70%">
			<supplyChoose :param="param" :showChoose='showChoose' @supply="mainVar"></supplyChoose>
		</yd-popup>
		<div class="btn" @click="checkData()">
			提交
		</div>
		
		

	</div>
</template>

<script>
import { MessageBox,Toast } from 'mint-ui';
import * as store from '../../../../common/localStore';
import inputVal from "../../../../components/com/inputType";
import supplyChoose from "../../../slideBar/supplyChoose.vue";
import http from "../../../../libs/httpService.js";
import uploadImage from "../../../../common/upload/uploadImage.vue";
import validation from "../../../../validation/validation.js";

export default {
  props: ["param", "intention"],
  data() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 2;
    let date = now.getDate();
    if (month == 13) {
      month = 1;
      year = year + 1;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    return {
      show1: false,
      showMenu: false,
      showChoose: "",
      multiple: true,
      advance: "",
      duedate: year + "-" + month + "-" + date + " 00:00"
    };
  },
  components: {
    inputVal,
    supplyChoose,
    uploadImage
  },
  watch: {
    "param.number": {
      handler: (curVal, oldVal) => {
        console.log(curVal, oldVal);
      },
      // 深度观察
      deep: true
    },
    duedate(curVal, oldVal) {
      if (Date.parse(new Date()) > new Date(this.duedate)) {
        this.$dialog.toast({
          mes: "请选择正确的时间(起码今天以后啊)"
        });
        this.duedate = "";
      }
    },
    advance(curVal, oldVal) {
      if (isNaN(curVal)) {
        this.$dialog.toast({
          mes: "请输入正确的预付范围(0-99)"
        });
        this.advance = "";
      } else if (curVal > 100 || curVal < 0) {
        this.$dialog.toast({
          mes: "请输入正确的预付范围(0-99)"
        });
        this.advance = "";
      }
    }
  },
  methods: {
    notifyOther(id){
      let body = {
        biz_method: "readyOfferNotice",
        biz_module: "erpSupplierService",
        biz_param: {
         intentionId: this.intention.id,
         id:id

        }
      };
      http.commonPost(http.urlCommon + http.apiUrl.most, body).then((res)=>{

      })
    },
    toNewSupplier(){
      store.set('currentIntentionId', this.intention.id,)

      this.$router.push({path: '/newSupplier' },)
    },
     openUpload() {
      this.show1 = true;
    },
    checkTime() {
      if (Date.parse(new Date()) > new Date(this.duedate)) {
        return "请选择正确的时间(起码今天以后啊)";
      } else {
        return false;
      }
    },
    getImgUrl(url) {
      this.param.imageArray.push(url);
      this.multiple = this.param.imageArray.length == 5 ? false : true;
    },
    showLocation: function() {
      this.showAdd = true;
    },
    addFunc() {
      this.showChoose = "bizScope";
      this.showMenu = true;
    },
    mainVar(item) {
      let _self = this;
      if(store.get('employeeId') != item.employeeId){
        
        let message =  `<span style='color:#111;font-size:0.8em;'>此供应商为业务员<span style='color:red'>${item.employeeName}</span>名下供应商,是否将此消息告知对方?</span>`
        let title = '不可报价'
        MessageBox.confirm(message,title).then((res)=>{
          _self.notifyOther(item.id)
          Toast({
          message: '通知成功',
          
          duration: 5000
        });
           this.showMenu = false;
           return
        },(reje)=>{
          this.showMenu = false;
        });
         return
      }
      console.log(item);
      console.log(store.get('employeeId'),'id---------------')
      
      _self.param.spplyName = item.name;
      _self.param.customerId = item.id;
      console.log(_self.param);
      this.showMenu = false;
    },
    checkData() {
      let _self = this;
      var checkArr = [];
      let checkspplyName = validation.checkNull(
        _self.param.spplyName,
        "请先选择供应商！"
      );
      checkArr.push(checkspplyName);
      let checkprice = validation.checkNull(
        _self.param.price,
        "请先填写商品价格！"
      );
      checkArr.push(checkprice);
      let checknumber = validation.checkNull(
        _self.param.number,
        "请先填写库存数量！"
      );
      checkArr.push(checknumber);
      let checkincidentals = validation.checkNull(
        _self.param.incidentals,
        "请先填写运费！"
      );
      checkArr.push(checkincidentals);
      let checkAdvance = validation.checkNull(
        _self.advance,
        "请先填写预付百分比！"
      );
      checkArr.push(checkAdvance);
      let checkDuedate = validation.checkNull(
        _self.duedate,
        "请先填写报价有效期！"
      );
      checkArr.push(checkDuedate);
      let checkDuedates = _self.checkTime();
      checkArr.push(checkDuedates);

      let checkgoodsPosition = validation.checkNull(
        _self.param.goodsPosition,
        "请选择货物所在地！"
      );
      checkArr.push(checkgoodsPosition);
      if (Number(_self.param.machine) == 1) {
        let checkmachinableMode = validation.checkNull(
          _self.param.machinableMode,
          "请先选择是否符合药典！"
        );
        checkArr.push(checkmachinableMode);
      }
      let checkquality = validation.checkNull(
        _self.param.quality,
        "请先选择是否符合药典！"
      );
      checkArr.push(checkquality);
      let checkreturnGoods = validation.checkNull(
        _self.param.returnGoods,
        "请先选择是否包交包退！"
      );
      checkArr.push(checkreturnGoods);
      let checkincidentalsDesc = validation.checkNull(
        _self.param.incidentalsDesc,
        "请先选择退货运费说明！"
      );
      checkArr.push(checkincidentalsDesc);
      let checkpriceDescription = validation.checkNull(
        _self.param.priceDescription,
        "请先填写报价备注！"
      );
      checkArr.push(checkpriceDescription);
      let checkimageArray = validation.checkNull(
        _self.param.imageArray.toString(),
        "请先上传药材图片！"
      );
      checkArr.push(checkimageArray);

      for (var i = 0; i < checkArr.length; i++) {
        if (checkArr[i]) {
          _self.$dialog.toast({
            mes: checkArr[i]
          });
          return;
        }
      }
      _self.submitData();
    },

    submitData() {
      let _self = this;
      let url = http.urlCommon + http.apiUrl.most;
      let body = {
        biz_method: "addIndentIntentionOffer",
        biz_module: "erpIntentionOfferService",
        biz_param: {
          advance: _self.advance / 100,
          customerId: _self.param.customerId,
          duedate: Date.parse(new Date(_self.duedate)),
          goodsPosition: _self.param.goodsPosition,
          imageArray: _self.param.imageArray,
          incidentals: _self.param.incidentals,
          incidentalsDesc: _self.param.incidentalsDesc,
          intentionId: _self.intention.id,
          machinableMode: _self.param.machinableMode,
          number: _self.param.number,
          paymentDay: _self.param.paymentDay,
          price: _self.param.price,
          priceDescription: _self.param.priceDescription,
          productId: _self.param.productId,
          quality: _self.param.quality,
          returnGoods: _self.param.returnGoods,
          unit: _self.intention.unit
        }
      };
      if (Number(_self.param.machine) == 1) {
        body.biz_param.machinableMode = _self.param.machinableMode;
      }
      console.log(body);
      http
        .commonPost(url, body)
        .then(res => {
          if (res.code == "1c01") {
            this.$dialog.toast({
              mes: res.msg
            });
            console.log(_self.$router,'-=-=-=-=-===-=--')
            console.log(_self.param.newSupplier)
            if(_self.param.newSupplier == true){
               _self.$router.go(-2)
             }else{
               _self.$router.go(-1)
             }
           // _self.$router.go(-1)
          } else {
            this.$dialog.toast({
              mes: res.msg
            });
          }
        })
        .catch(err => {});
    }
  },
  created() {
    let _self = this;
  }
};
</script>

<style lang="less" scoped>
.offerMake {
  padding: 0 0 50px;
  .tips {
    line-height: 30px;
    padding-left: 10px;
    color: #f00;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    i {
      vertical-align: sub;
      margin: 0 5px;
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 16px;
    text-align: center;
    color: #fff;
    line-height: 50px;
    background-color: #f00;
    z-index: 5;
  }
  .renzhengImg {
    padding: 0 10px;
    .photoList {
      .img_list {
        text-align: center;
        display: inline-block;
        margin-bottom: 10px;
      }
      p {
        margin-bottom: 10px;
        text-align: left;
      }
    }
  }
}
</style>
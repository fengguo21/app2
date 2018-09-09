<template>
	<yd-layout>
		<yd-navbar slot="navbar" :title="title">
			<yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
		</yd-navbar>
		<edit-customer :param="cusInfo"></edit-customer>
		<edit-contact :param="contactList"></edit-contact>
		<main-var :param="cusInfo" ></main-var>
		<yd-button size="large" type="hollow" @click.native="valiSave()">保存</yd-button>
	</yd-layout>
</template>

<script>
import validation from "../../validation/validation.js";
import http from "../../libs/httpService.js";
import editContact from "../../components/supplier/editContact.vue";
import editCustomer from "../../components/customer/editCus.vue";
import mainVar from "../../components/supplier/mainVar.vue";
export default {
  data() {
    return {
      title:
        this.$route.fullPath.split("/")[2] == "add" ? "新建客户" : "编辑客户",
      msg: {
        name: ""
      },
      cusInfo: {
        name: "",
        type: "",
        scale: "",
        nature: "",
        countryName: "",
        country: "",
        provinceName: "",
        province: "",
        cityName: "",
        city: "",
        districtName: "",
        district: "",
        address: "",
        bizScope: []
      },
      contactList: {
        name: "",
        position: "",
        phone: "",
        tel: "",
        wechart: "",
        qq: "",
        email: "",
        facebook: ""
      }
    };
  },

  computed: {},
  components: {
    editCustomer,
    mainVar,
    editContact
  },
  beforeDestroy() {},
  methods: {
    valiSave() {
      console.log("我是路径", this.$route.fullPath);
      let _self = this;
      var checkArr = [];
      let checkName = validation.checkNull(
        _self.cusInfo.name,
        "请输入客户名称"
      );
      checkArr.push(checkName);
      let checkType = validation.checkNull(
        _self.cusInfo.type,
        "请选择客户类型"
      );
      checkArr.push(checkType);
      let checkScale = validation.checkNull(
        _self.cusInfo.scale,
        "请选择客户规模"
      );
      checkArr.push(checkScale);

      let checkNature = validation.checkNull(
        _self.cusInfo.nature,
        "请选择客户性质"
      );
      checkArr.push(checkNature);
      let checkprovince = validation.checkNull(
        _self.cusInfo.provinceName,
        "请选择客户地址"
      );
      checkArr.push(checkprovince);
      let checkAddress = validation.checkNull(
        _self.cusInfo.address,
        "请选择客户详细地址"
      );
      checkArr.push(checkAddress);

      let checkCName = validation.checkNull(
        _self.contactList.name,
        "请输入客户联系人名称"
      );
      checkArr.push(checkCName);
      let checkCPosition = validation.checkNull(
        _self.contactList.position,
        "请填写联系人职位"
      );
      checkArr.push(checkCPosition);
      let checkCPhone = validation.checkPhone(
        _self.contactList.phone,
        "请填写联系人电话"
      );
      checkArr.push(checkCPhone);

      let checkbizScope = validation.checkNull(
        _self.cusInfo.bizScope,
        "请输入客户名称"
      );
      checkArr.push(checkbizScope);

      for (var i = 0; i < checkArr.length; i++) {
        if (checkArr[i]) {
          this.$dialog.toast({
            mes: checkArr[i],
            timeout: 800
          });
          return;
        }
      }
      this.submit();
    },

    submit() {
      let url = http.addSID(http.urlCommon + http.apiUrl.most);
      let body = {
        biz_module: "erpCustomerService",
        biz_method: "addCustomer",
        biz_param: {
          address: this.cusInfo.address,
          bizScope: this.cusInfo.bizScope.join(" "),
          city: this.cusInfo.city,
          cityName: this.cusInfo.cityName,
          contacts: {
            name: this.contactList.name,
            main: 1,
            facebook: this.contactList.facebook,
            email: this.contactList.email,
            qq: this.contactList.wechart,
            phone: this.contactList.phone,
            position: this.contactList.position,
            tel: this.contactList.tel,
            wechart: this.contactList.wechart
          },
          country: this.cusInfo.country,
          countryName: this.cusInfo.countryName,
          district: this.cusInfo.district,
          districtName: this.cusInfo.districtName,
          name: this.cusInfo.name,
          nature: this.cusInfo.nature,
          ownStock: this.cusInfo.ownStock,
          province: this.cusInfo.province,
          provinceName: this.cusInfo.provinceName,
          type: this.cusInfo.type,
          supplier: 0,
          scale: this.cusInfo.scale
        }
      };
      console.log("ddddddddddddddddddddddddd",body);
      body.time = Date.parse(new Date()) + parseInt(http.difTime);
      body.sign = http.getSign(
        "biz_module=" +
          body.biz_module +
          "&biz_method=" +
          body.biz_method +
          "&time=" +
          body.time
      );
      http
        .commonPost(url, body)
        .then(res => {
          if (res.code == "1c01") {
            this.$dialog.toast({
              mes: res.msg
            });
            this.goBack();
          } else {
            this.$dialog.toast({
              mes: res.msg
            });
          }
        })
        .catch(err => {});
    },
    goBack() {
      let _self = this;
      window.history.go(-1);
      console.log("----------------返回-----------------");
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>

</style>
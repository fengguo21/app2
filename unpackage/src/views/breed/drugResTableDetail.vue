<template>
    <yd-layout >
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>
        <div class="drug_table_detail">

            <div class='nav-header'>
                <div class="nav" v-bind:class="{'nav_nor': !todo.show }" v-for="(todo,index) in navArr" @click="tabNav(navArr,todo)">{{todo.name}}</div>
            </div>

            <div class="main" :style="{ height: wrapperHeight + 'px' }">
                <div >
                    
                    <div class="page-loadmore-wrapper" ref="wrapper" >
                        <div class="info_content" v-if="status=='1'">
                            <div class="information" v-if="!navArr[0].show">
                                <div class="image_box" >
                                    <img class :src="obj.icon" />
                                </div>
                                <div class="drug_name">
                                    <div class="main_name">{{obj.herbName}}<span class="pinyin">[{{obj.pinyin}}]</span></div>
                                    <div class="name_type">
                                        <p class="what_name">别&emsp;&emsp;名：{{wrapperHeight}}</p>
                                        <p class="answer_name" v-html="obj.alias"></p>
                                    </div>
                                    <div class="name_type" id="last_name_type">
                                        <p class="what_name">拉丁名称：</p>
                                        <p class="answer_name" v-html="obj.eName"></p>
                                    </div>
                                </div>
                                <div class="drug_effect">
                                    <div class="drug_effect_type">
                                        <p class="what_effect">药&emsp;&emsp;性：</p>
                                        <p class="effect_content" v-html="obj.action">
                                        </p>
                                    </div>
                                </div>
                                <div class="spec">
                                    <div class="spec_type">
                                        <p class="what_spec">产地分布：</p>
                                        <p class="spec_content" v-html="obj.producingArea"></p>
                                    </div>
                                </div>
                                <div class="spec">
                                    <div class="spec_type">
                                        <p class="what_spec">药用部位：</p>
                                        <p class="spec_content" v-html="obj.shape"></p>
                                    </div>
                                </div>
                                <div class="spec">
                                    <div class="spec_type">
                                        <p class="what_spec">基本概述：</p>
                                        <p class="spec_content" v-html="obj.summary"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="information" v-if="!navArr[1].show">
                                <div class="spec">
                                    <div class="spec_type">
                                        <p class="what_spec">形态特征：</p>
                                        <p class="spec_content" v-html="obj.morphology"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="information" v-if="!navArr[2].show">
                                <div class="spec">
                                    <div class="spec_type">
                                        <p class="what_spec">鉴别真伪：</p>
                                        <p class="spec_content" v-html="obj.identify"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="information" v-if="!navArr[3].show">
                                <div class="spec">
                                    <p class="what_spec" id="what_spec">药典标准：</p>
                                    <p class="spec_content" v-html="obj.standard"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- <yd-tab>
                <yd-tab-panel label="选项一">土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。</yd-tab-panel>
                <yd-tab-panel label="选项二">我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。</yd-tab-panel>
                <yd-tab-panel label="选项三">时间是一切财富中最宝贵的财富。</yd-tab-panel>
                <yd-tab-panel label="选项四">真理惟一可靠的标准就是永远自相符合。</yd-tab-panel>
        </yd-tab> -->
        </div>
    </yd-layout>
</template>
<script>
import http from "../../libs/httpService.js";
import {mapActions} from "vuex";
export default {
    data() {
        return {
            title: this.$route.query.name,
      navArr: [
          {
              name: "基本信息",
          show: false
        },
        {
          name: "药材特性",
          show: true
        },
        {
          name: "真伪鉴别",
          show: true
        },
        {
          name: "药典标准",
          show: true
        }
      ],
      param: {
        name: "药材百科",
        appBack: false,
        type: "my"
      },
      wrapperHeight: "",
      status: "0",
      obj: ""
    };
  },
  methods: {
  	...mapActions(["queryDrugPropertiesInfo"]),
    goBack() {
      window.history.go(-1);
    },
    tabNav(todos, todo) {
      for (var i = 0; i < todos.length; i++) {
        todos[i].show = true;
      }
      todo.show = false;
    },
    loadDetail(name) {
      let _self = this;
      _self.obj = {};
      _self.status = "0";

	  let param={
	  	herbName:name
	  }
      this.queryDrugPropertiesInfo(param)
      	  .then(res=>{
      	  	  let result = res.biz_result;

	          _self.status = "1";
	          _self.obj = result;
	          _self.param.name = result.herbName;
      	  })
      	  .catch(err=>{
      	  	
      	  });
    }
  },
  mounted() {
    let _self = this;
    this.$nextTick(function() {
      console.log(document.documentElement.clientHeight);
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top-30;
    });
  },
  created() {
    this.loadDetail(this.$route.query.name);
  }
};
</script>
<style lang="less" scoped>
.drug_table_detail {
  position: relative;
  overflow: hidden;
  .main {
    overflow: auto;
  }
  .nav-header {
    width: 100%;
    z-index: 20000;
    .nav {
      width: 25%;
      height: 40px;
      color: #313232;
      background-color: #f3f3f3;
      display: inline-block;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
    }
    .nav_nor {
      color: #ff8201;
      border-bottom: 2px solid #ff8201;
    }
  }
}
.drug_table_detail .mint-tab-item-label {
  font-size: 0.25rem;
  color: #333333;
}

.drug_table_detail .mint-navbar .mint-tab-item.is-selected {
  color: #ff8201;
  border-bottom: 3px solid #ff8201;
}

.drug_table_detail .drug_name {
  width: 92%;
  text-align: left;
  font-size: 0.28rem;
  border-bottom: 1px solid #c9c9c9;
  padding: 0.5rem 0rem;
  margin-left: 0.3rem;
}

.drug_table_detail .drug_name .main_name {
  font-size: 0.6rem;
  color: black;
  margin-bottom: 0.25rem;
  .pinyin {
    font-size: 14px;
    color: #888;
  }
}

.drug_table_detail .drug_name .name_type {
  word-break: break-all;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  margin-bottom: 0.33rem;
}

.drug_table_detail .what_name {
  font-size: 0.3rem;
  color: #333333;
  /*flex: 2;
		-webkit-box-flex: 2;
		-webkit-flex: 2;
		-ms-flex: 2;*/
  line-height: 0.39rem;
}

.drug_table_detail .answer_name {
  flex: 12;
  -webkit-box-flex: 12;
  -webkit-flex: 12;
  -ms-flex: 12;
  font-size: 0.25rem;
  color: #666666;
  line-height: 0.39rem;
}

.drug_table_detail #last_name_type {
  margin-bottom: 0;
}

.drug_table_detail .drug_effect {
  width: 92%;
  text-align: left;
  font-size: 0.3rem;
  border-bottom: 1px solid #c9c9c9;
  padding: 0.5rem 0rem;
  margin-left: 0.3rem;
}

.drug_table_detail .drug_effect .drug_effect_type {
  word-break: break-all;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  /*margin-bottom: 1.27995rem;*/
}

.drug_table_detail .what_effect {
  font-size: 0.25rem;
  color: #333333;
  /*flex: 2;
		-webkit-box-flex: 2;
		-webkit-flex: 2;
		-ms-flex: 2;*/
  line-height: 0.39rem;
}

.drug_table_detail .effect_content {
  flex: 12;
  -webkit-box-flex: 12;
  -webkit-flex: 12;
  -ms-flex: 12;
  font-size: 0.25rem;
  color: #666666;
  line-height: 0.4rem;
}

.drug_table_detail #last_effect_type {
  margin-bottom: 0;
}

.drug_table_detail .spec {
  width: 92%;
  text-align: left;
  font-size: 0.3rem;
  padding: 0.2rem 0rem;
  margin-left: 0.32rem;
}

.drug_table_detail .spec_type {
  word-break: break-all;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  margin-bottom: 0.32rem;
}

.drug_table_detail .what_spec {
  font-size: 0.3rem;
  color: #333333;
  flex: 2;
  -webkit-box-flex: 2;
  -webkit-flex: 2;
  -ms-flex: 2;
  line-height: 0.4rem;
}

.drug_table_detail .spec_content {
  flex: 7;
  -webkit-box-flex: 7;
  -webkit-flex: 7;
  -ms-flex: 7;
  font-size: 0.25rem;
  color: #666666;
  line-height: 0.4rem;
}

.drug_table_detail #what_spec {
  margin-bottom: 0.5rem;
}

.drug_table_detail .info_content {
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
}

.image_box {
  padding: 0;
  width: 100%;
  height: 200px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  img {
    width: 100%;
    min-height: 200px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}
</style>


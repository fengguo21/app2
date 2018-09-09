<template>
   <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
        </yd-navbar>
        <!-- sdfsadf -->
			<div class="contain">
				<div class="items" v-for="item in hotDrugList" @click="jumpDetail(item.name)">
					<img :src="item.icon" />
					<div class="items_news">
						<p>{{item.name}}<span>[{{item.pinyin}}]</span></p>
						<p>英文：{{item.eName}}</p>
						<p><span style="float: left;">别名：</span><span class="alias" v-html="item.alias"></span></p>
					</div>
					<div class="junpGo">
						<i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i>
					</div>
				</div>
			</div>
		<!-- </div> -->
         <!-- <yd-tabbar slot="tabbar"  class="tabbar" >
        <div class="bottom">
            <p >新增 </p>
        </div>
    </yd-tabbar> -->
   </yd-layout>
</template>
<script>
import http from "../../libs/httpService.js";
import {mapGetters} from "vuex"
export default {
  data() {
    return {
      title: "热门药材",
      pn: 1,
      pSize: 10
    };
  },
  created() {
  },
  computed:{
  	...mapGetters(["hotDrugList"]),
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
    jumpDetail(name) {
      console.log("woshi 跳到详情：",name);
      this.$router.push("/drugResTableDetail?name="+name);
    }
  }
};
</script>
<style lang="less" scoped>
.items {
  height: 110px;
  padding: 10px 20px 10px 10px;
  position: relative;
  border-bottom: 1px solid #ddd;
  & > img {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    // left: 0.7692rem;
  }
  .items_news {
    margin-left: 110px;
    position: absolute;
    p {
      color: #666;
      height: 30px;
      width: 200px;
      line-height: 30px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        color: #000;
        span {
          font-size: 10px;
        }
      }
      span {
        color: #aaa;
      }
      & > .alias {
        width: 200px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        & > span {
          width: 100px !important;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .junpGo {
    margin-left: 285px;
    position: absolute;
    right: 30px;
    i {
        position: relative;
        top: 25px;
        left: 10px;
      font-size: 0.6rem;
      color:#FE7F14
    }
  }
}
</style>


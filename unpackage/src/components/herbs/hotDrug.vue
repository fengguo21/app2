!-- 热门药材滑块-->
<template>
  <div class="hotDrug">
    <p @click="openList">热门药材<span>></span></p>
		<div class="hotDrugSwiper">
      <!-- <ul>
        <li v-for="item in list" class="picList" @click="jumpDetail(item.name)">
          <img :src="item.icon" >
          <p>{{item.name}}</p>
        </li>
      </ul> -->
      <yd-grids-group :rows="4">
        <yd-grids-item v-for="item in hotDrugList" @click.native="jumpDetail(item.name)" :key="item.name">
            <img slot="icon" :src="item.icon">
            <p slot="text">{{item.name}}</p>
        </yd-grids-item>
    </yd-grids-group>

    </div>
	</div>
</template>
<script>
import http from "../../libs/httpService.js";
import {mapGetters,mapActions} from "vuex";
export default {
  data() {
    return {
      pSize: 10,
      pn: 1
    };
  },
  created() {
    this.loadList();
  },
  computed:{
  	...mapGetters(["hotDrugList"]),
  },
  methods: {
  	...mapActions(["hotDrugPropertiesInfo"]),
    loadList() {
    	let param={
    		pSize: this.pSize,
        pn: this.pn
    	}
      this.hotDrugPropertiesInfo(param)
      		.then(res=>{
      			
      		})
      		.catch(err=>{});
    },
    openList() {
      this.$router.push("/hotDrugList");
      console.log("我是热门药材打开详情", this);
    },
    // 跳到热门药材详情页
    jumpDetail(name) {
      console.log("woshi 跳到详情：", name);
      this.$router.push("/drugResTableDetail?name=" + name);
    }
  }
};
</script>
<style lang="less" scoped>
.hotDrug {
  background-color: #f3f3f3;
  padding-top: 10px;
  & > p {
    text-align: left;
    font-size: 0.3rem;
    background-color: #fff;
    padding: 10px 0.2rem;
    border-bottom: 1px solid #eee;
    span {
      float: right;
    }
  }
}
.hotDrugSwiper {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  & > ul {
    display: flex;
    flex-wrap: wrap;
  }
}
.picList {
  // flex: 1;
  display: inline-block;
  margin: 2px;
  // border-radius: 2px;
  // width: 30%;
  height: 100px;
  & > img {
    width: 70px;
    height: 70px;
    // border-radius: 5px;
  }
  & > p {
    position: relative;
    top: -23px;
    text-align: center;
    width: 70px;
    padding:2px;
    // height: 70px;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>



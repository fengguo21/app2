<!-- Created by Weiun on 2017/1/17.-->
<template>
	<div class="index">
		<yd-slider autoplay="3000">
			<yd-slider-item>
				<div @click="goSkip('/video')">
					<img class="slider" src="../../../static/images/video.png">
				</div>
			</yd-slider-item>
		</yd-slider>
		<!--<yd-rollnotice autoplay="2000" style="padding-left:.2rem">
			<yd-rollnotice-item><span class="hot"> 荐 </span>荣耀V9 3月超级钜惠！</yd-rollnotice-item>
			<yd-rollnotice-item><span class="hot"> 荐 </span>3.23京东超级品牌日格力盛典</yd-rollnotice-item>
			<yd-rollnotice-item><span class="hot"> 荐 </span>京东服饰 早春新品低至7折</yd-rollnotice-item>
		</yd-rollnotice>-->
		<!-- 快捷方式 -->
		<!-- <yd-tabbar slot="tabbar">
			<yd-tabbar-item :title="item.title" link="" active v-for="(item,index) in homeList" @click.native="goSkip(item.url)">
				<yd-icon :name="item.icon" slot="icon" custom></yd-icon>
			</yd-tabbar-item>
		</yd-tabbar> -->

		<!-- 待办 -->
		<!--<div class="task">
			<span class="hot"> 待办 </span>订单处理
		</div>-->

		<yd-grids-group :rows="offerList.length" title="报价待处理">
			<yd-grids-item  v-for="(item,index) in offerList" class="offerList" :key="index" @click.native="offerSelect(index)">
				<div slot="text">
					<h1 class="num">{{item.total}}</h1>
					<span>{{item.name}}</span>
				</div>
			</yd-grids-item>
		</yd-grids-group>
		<yd-grids-group :rows="sampleList.length" title="寄样待处理">
			<yd-grids-item  v-for="(item,index) in sampleList" class="offerList" :key="index" @click.native="sampleSelect(index)">
				<div slot="text">
					<h1 class="num">{{item.total}}</h1>
					<span>{{item.name}}</span>
				</div>
			</yd-grids-item>
		</yd-grids-group>
		
		<!--<yd-grids-group :rows="orderList.length" title="订单待处理">
			<yd-grids-item v-for="(item,index) in orderList" :key="index">
				<div slot="text">
					<h1 style="color:#F00;">{{item.badge}}</h1>
					<span>{{item.title}}</span>
				</div>
			</yd-grids-item>
		</yd-grids-group>-->
	</div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import http from "../../libs/httpService.js";
export default {
  data() {
    return {
      name: "asdasdasd",
    };
  },
  computed: {
    ...mapGetters(["layout","homeList","offerList","sampleList","orderList"]),
    
  },
  components: {},
  mounted: function() {
    this.$nextTick(function() {
      // 代码保证 this. 在 document 中
    });
  },
  methods: {
  	...mapActions(["homePageData"]),
    goSkip(link) {
      let _self = this;
      _self.$router.push(link);
    },
    offerSelect(index) {
      let _self = this;
      let url = "/main/resource?id=7&select=" + (Number(index) + 1);
      _self.$router.push(url);
    },
    sampleSelect(index) {
      let url = "/main/resource?id=4&state=" + (Number(index) + 1);//减去数组
      this.$router.push(url);
    },
    loadList() {
    	this.homePageData()
    		.then(res=>{
    			
    		})
    		.catch(err=>{});
    }
  },
  created() {
    let _self = this;
    let classify = localStorage.getItem("classify");
    for (let i = 0; i < _self.homeList.length; i++) {
      if (
        classify.indexOf(_self.homeList[i].type) < 0 &&
        i !== _self.homeList.length - 1
      ) {
        _self.homeList.splice(i, 1);
        i--;
      }
    }
    console.log(_self.homeList);
    _self.loadList();
  }
};
</script>
<style lang="less" scoped>
.hot {
  color: red;
  margin-right: 5px;
}

.task {
  padding-left: 0.2rem;
  margin-top: 0.1rem;
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  background-color: white;
}

.offerList:nth-of-type(odd) {
  .num {
    color: #f00;
  }
}
</style>
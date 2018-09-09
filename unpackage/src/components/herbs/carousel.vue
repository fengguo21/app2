<template>
<yd-slider autoplay="3000" class="navSlider">
        <yd-slider-item v-for="(item,index) in imgBannerList"   >
            <a @click="jumpDetail(item.name)" >
                <img :src="item.appImg">
            </a>
        </yd-slider-item>
    </yd-slider>
</template>
<script>
import http from "../../libs/httpService.js";
import {mapGetters,mapActions} from "vuex";
export default {
  data() {
    return {
    };
  },
  created() {
    this.loadList();
  },
  computed:{
  	...mapGetters(["imgBannerList"]),
  },
  methods: {
  	...mapActions(["queryImgBannerList"]),
    loadList() {
      let param = {
      	type:1,
      }
      this.queryImgBannerList(param)
      	  .then(res =>{
      	  	 
      	  })
      	  .catch(err=>{
      	  	
      	  });
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
.navSlider{
  margin: 10px 0 5px 0;
}
</style>
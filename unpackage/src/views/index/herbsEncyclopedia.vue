<!--药材百科-->
<template>
<div>
    <yd-search v-model="herbName" :on-submit="submitHandler"></yd-search>
    <carousel></carousel>
    <hot-drug></hot-drug>
</div>
 <!-- <div> -->
    <!-- <div  @click.stop="goSearch">搜索</div> -->
    <!-- <div v-if="searchShow">
        <yd-search class="search" v-model="value1" :on-submit="submitHandler"></yd-search>
    </div> -->
    <!-- <iframe src="http://192.168.1.142:81/htm5/#/drugResTable?from=erp"  frameborder="0" class="iframe" scrolling="no"> </iframe> -->
 <!-- </div> -->
</template>
<script>
import carousel from "../../components/herbs/carousel.vue";
import hotDrug from "../../components/herbs/hotDrug.vue";
import hotHerbs from "../../components/herbs/hotherbs.vue";
export default {
  data() {
    return {
      searchShow: true,
      herbName: ""
    };
  },
  components: {
    carousel,
    hotDrug,
    hotHerbs
  },
  methods: {
    goSearch() {
      window.location.assign("http://192.168.1.142:81/htm5/#/releaseSearch");
    },
    // submitHandler() {
    //   this.searchShow = false;
    //   window.location.assign("http://192.168.1.142:81/htm5/#/releaseSearch");
    // },
    submitHandler(){
       console.log("woshi 跳到详情：",this.herbName);
      this.$router.push("/drugResTableDetail?name="+this.herbName);
    }
  },
  created() {
    //   window.location.assign('http://192.168.1.142:81/htm5/#/drugResTable/erp');
    // http://192.168.1.142:81/htm5/#/releaseSearch
  }
};
</script>
<style lang="less" scoped>
.iframe {
  position: absolute;
  top: -8vh;
  width: 100%;
  height: 90vh;
}
.search {
  position: relative;
  z-index: 999999;
  background-color: aqua;
  height: 4vh;
  width: 100%;
}
</style>



<template>
    <yd-layout>
        <div slot='top'>
            <yd-icon  name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
            <yd-search v-model="keyWord.name" slot="left" style="width: 75%;display: inline-block;" :on-submit="submitHandler" placeholder='请输入客户名称'></yd-search>
        </div>
        <yd-backtop></yd-backtop>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-list theme="1" slot="list">
                <div v-if="loading"  style="text-align:center;margin-top:100px">
                    <!-- loading -->
                    <img  src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />	
                </div>
                <div class="supplierBox" v-for="item, key in erpBreedList" :key="key" @click="goDetail(item)">
                    <p><span>品种名称:</span> <span>{{item.name}}</span></p>
                    <p><span>拉丁名:</span> <span>{{item.lName}}</span></p>
                    <p><span>英文名:</span> <span>{{item.eName}}</span></p>
                </div>
            </yd-list>
            <span slot="doneTip">都到底儿啦，拉什么拉~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
        </yd-infinitescroll>
    </yd-layout>
</template>
<script>
import {mapActions,mapGetters} from "vuex";
export default {
  data() {
    return {
      loading: false,
      pn: 1,
      pSize: 15,
      keyWord: {
        searchStatus: false
      }
    };
  },
  props: {},
  computed:{
  	...mapGetters(["erpBreedList"]),
  },
  methods: {
  	...mapActions(["queryErpBreedList"]),
    goBack() {
      this.$emit("close");
      console.log("----------------返回-----------------");
    },
    submitHandler(value) {
      this.pn = 1;
      this.$store.state.user.erpBreedList=[];
      this.keyWord.searchStatus = true;
      this.keyWord.name = value;
      this.loadList();
    },
    goDetail(value) {
      this.$emit("openDetail",value);
    },
    loadList() {
         console.log("localStorage-----------------------",JSON.parse(localStorage.getItem('employeeId')));
      //获取员工数据
      this.loading = true;
      let employee = JSON.parse(localStorage.getItem("employeeId"));
      let param = {
          pn: this.pn,
          pSize: this.pSize,
          name: this.keyWord.searchStatus ? this.keyWord.name : ""
      };
      	this.queryErpBreedList(param)
      		.then(res => {
      			const _list = res.biz_result.list;
      			this.loading = false;
      			if(_list.length<this.pSize){
      				/* 所有数据加载完毕 */
      				this.$refs.infinitescrollDemo.$emit(
              			"ydui.infinitescroll.loadedDone"
            		);
            		return;
      			}
      			/* 单次请求数据完毕 */
          		this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
          		this.pn++;
      		})
      		.catch(err => {
      			this.loading = false;
      		});
    }
  },
  created() {
    this.loadList();
  }
};
</script>
<style lang="less" scoped>
.supplierBox {
  margin: 15px;
  background-color: #ebeef5;
  padding: 10px;
  border-radius: 15px;
  max-width: 80%;
  p {
    line-height: 30px;
    font-size: 12px;
    display: flex;
    span:nth-child(1) {
      display: inline-block;
      width: 30%;
    }
    span:nth-child(2) {
      display: inline-block;
      width: 70%;
    }
  }
}
</style>



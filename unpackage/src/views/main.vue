<!-- -->
<template>
    <yd-layout>
        <yd-navbar slot="navbar" :title="title">
            <yd-icon name="liebiaoshitucaidan" slot="left" size='.5rem' style="margin-right:.2rem" @click.native="openMenus" custom></yd-icon>
            <yd-icon name="shangyiyehoutuifanhui" slot="left" size='.5rem' @click.native="goBack" custom></yd-icon>
            <yd-icon name="shuaxin" slot="right" size='.5rem' style="margin-right:.2rem" @click.native="refresh" custom></yd-icon>
            <yd-icon name="gengduo-shuxiang" slot="right" size='.5rem' v-if="functionList.length>0" @click.native="toggleOperations" custom></yd-icon>
        </yd-navbar>
        <!-- 更多功能 -->
        <transition name="fade">
            <div class="more-function" v-show="showOperation">
                <yd-cell-group>
                    <yd-cell-item v-for="fun in functionList" v-bind:key="fun.key" type='div' @click.native="functionClick(fun.callback)">
                        <yd-icon slot="icon" :name="fun.icon" size=".42rem" custom></yd-icon>
                        <span slot="left">{{fun.title}}</span>
                    </yd-cell-item>
                </yd-cell-group>
            </div>
        </transition>
        <!-- 路由页面 -->
        <router-view></router-view>
        <!-- 侧边菜单 -->
        <yd-popup v-model="showMenu" position="left" width="70%">
            <menus @menu-select="menuSelect" @menu-close="showMenu = false"></menus>
        </yd-popup>
        <yd-tabbar slot="tabbar">
            <yd-tabbar-item v-for="(item,index) in homeList" :key="index" :title="item.title" :link="item.url" :active="item.active" @click.native="tabActive(item)">
                <yd-icon :name="item.icon" slot="icon" custom></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar>
    </yd-layout>
</template>
<script>
import bus from "../libs/bus.js";
import menus from "./slideBar/menus";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      showMenu: false,
      showOperation: false,
      functionList: [],
      homeList: [
        {
          title: "首页",
          url: "/main/index",
          active: true,
          icon: "shouye",
          index: 0
        },
        // {
        //   title: "通知",
        //   url: "/main/message",
        //   active: false,
        //   icon: "lingdang",
        //   index: 3
        // },
        {
          title: "百科",
          url: "/main/herbs",
          active: false,
          icon: "ziyuan",
          index: 1
        },
        {
          title: "个人中心",
          url: "/main/user",
          active: false,
          icon: "yonghu",
          index: 4
        }
      ]
    };
  },
  computed: {
    title() {
      let menus = JSON.parse(localStorage.menus);
      for (let i = 0; i < menus.length; i++) {
        let sub = menus[i].subMenus;
        if (!sub || sub.length == 0) {
          continue;
        }
        for (let j = 0; j < sub.length; j++) {
          if (sub[j].url.replace(/home/, "main") == this.$route.fullPath) {
            console.log(sub[j].cname);
            return sub[j].cname;
          }
        }
      }
      return "主页";
    }
  },
  components: {
    menus: menus
  },

  mounted() {
  /*  let List = document.getElementById('choosable-List');
    let boxHeight= document.body.clientHeight - 165 + 'px';
    List.style.height= boxHeight;
    console.log("啊圣诞节贺卡撒娇的好看撒孔家店好看就是",List)*/
  },
  methods: {
    navClose: function(tab, i) {
      console.log("navClose:" + tab.id);
      this.active_tab = this.tabs[i - 1].id;
      this.comTabsRemove(tab.id);
    },
    openMenus() {
      this.showMenu = true;
    },
    toggleOperations() {
      if (this.functionList.length == 0) {
        this.showOperation = false;
      } else {
        this.showOperation = !this.showOperation;
      }
    },
    functionClick(callback) {
      // 右上角更多功能执行
      callback();
      this.toggleOperations();
    },
    tabActive(tab) {
      //tab跳转
      for (let i of this.homeList) {
        if (i.index == tab.index) {
          i.active = true;
        } else {
          i.active = false;
        }
      }
      this.$router.push(tab.url);
    },
    menuSelect(currentMenu) {
      //this.homeList[currentMenu.index].active = true
      this.showMenu = false;
      if (currentMenu) {
        this.$router.push(currentMenu.url.replace(/home/, "main"));
        console.log("跳转----");
      }
    },
    goBack() {
      let _self = this;
      //_self.$router.push('/login');
      window.history.go(-1);
    },
    refresh() {
      window.location.reload();
    },
    initSelect() {
      let _self = this;
      let info = "";
      for (let i = 0; i < _self.homeList.length; i++) {
        if (this.$route.path == _self.homeList[i].url) {
          info = _self.homeList[i];
        }
      }
      if(info){
        _self.tabActive(info);
      }
    },
    goHerbSearch() {
      window.location.assign("http://192.168.1.142:81/htm5/#/releaseSearch?from=erp");
    //   window.location.assign("http://192.168.1.142:81/htm5/#/releaseSearch");
     
    }
  },
  watch: {},
  created() {
    bus.$on("more-operation", list => {
      console.log("----------------功能设置-----------------");
      this.functionList = list;
    });

    this.initSelect();
  }
};
</script>
<style scoped lang="less">
.top_calss {
  background: #495060;
  border-bottom: 1px solid #dddee1;
}

.more-function {
  position: fixed;
  z-index: 9999;
  width: 30%;
  margin-left: 70%;

}
</style>

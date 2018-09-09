<!-- -->
<template>
    <div class="index">
        <router-view></router-view>
        <yd-popup v-model="updatePopupShow" position="center" width="80%" height="60%" :close-on-masker="false" >
            <div style="padding:0.1rem">
              <yd-navbar title="新的版本">
              </yd-navbar>
              <div style="color:#F00;margin-top: 0.1rem;">
                {{updateContent}}
              </div>
              <yd-button size="large" type="primary" style="margin-top:0.1rem;" @click.native="downAndInstall">{{updateButton}}</yd-button>
            </div>
        </yd-popup>
    </div>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      updatePopupShow: false,
      updateContent: "更新内容",
      updateButton: "更新",
      downUrl: "http://erpapp.image.yaocaimaimai.com/ERP.1.2.0.apk",
      downProgress: 0.0,
      timer:{}
    };
  },
  mounted: function() {
    this.timer = setInterval(this.checkSysUpdate,3000);
  },
  components: {},
  methods: {
    ...mapActions(["checkUpdate"]),
    checkSysUpdate() {
      let _self = this;
      console.log("-------更新检查--------");
      clearInterval(this.timer);
      if (Vue.prototype.$plus) {
        let v = Vue.prototype.$plus.runtime.version.split(".");
        let _self = this;
        this.checkUpdate()
          .then(res => {
            var result = res.biz_result;
            //最低的强制更新版本
            var compel = result.compel.split(".");
            //普通更新版本
            var version = result.version.split(".");
            // 更新内容
            _self.updateContent = result.content;
            // 下载地址
            _self.downUrl = result.downUrl;
            // 检查更新
            if (_self.validate(v,compel) || _self.validate(v,version)) {
              // 需要更新
              _self.updatePopupShow = true;
            }
          })
          .catch(err => {
            Vue.prototype.$toast("更新检查失败！");
          });
      }
    },
    validate(deviceVersion, version) {
      var isUpdate = false;
      if (Number(version[0]) > Number(deviceVersion[0])) {
        isUpdate = true;
        return isUpdate;
      } else if (
        Number(version[0]) === Number(deviceVersion[0]) &&
        Number(version[1]) > Number(deviceVersion[1])
      ) {
        isUpdate = true;
        return isUpdate;
      } else if (
        Number(version[0]) === Number(deviceVersion[0]) &&
        Number(version[1]) === Number(deviceVersion[1]) &&
        Number(version[2]) > Number(deviceVersion[2])
      ) {
        isUpdate = true;
        return isUpdate;
      }
      return isUpdate;
    },
    downAndInstall() {
      //显示进度条
      this.downProgressShow = true;
      let _self = this;
      let plus = Vue.prototype.$plus;
      if (plus) {
        let deviceName = plus.os.name;
        //创建一个蒙层 防止用户不强制更新还继续操作
        if (deviceName === "Android") {
          //创建下载对象
          var dtask = plus.downloader.createDownload(
            _self.downUrl,
            {
              filename: "_doc/update/"
            },
            function(download, status) {
              if (status === 200) {
                //下载成功 执行安装
                plus.runtime.install(
                  download.filename,
                  {
                    force: true
                  },
                  function() {
                    plus.runtime.restart();
                  }
                );
              } else {
                plus.nativeUI.alert("更新失敗！");
              }
            }
          );
          dtask.addEventListener(
            "statechanged",
            function() {
              //计算百分比
              _self.updateButton = "正在下载（"+Math.floor((dtask.downloadedSize / dtask.totalSize) * 10000)/100+"%）";
            },
            false
          );
          dtask.start();
        } else if (deviceName === "iOS") {
          this.updatePopupShow = false;
          //iOS打开地址下载
          plus.runtime.openURL("https://www.pgyer.com/xT7u");
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
address,
blockquote,
body,
button,
caption,
dd,
div,
dl,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
iframe,
input,
legend,
li,
ol,
p,
p,
pre,
select,
table,
td,
textarea,
th,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
  font-family: inherit;
}
body {
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  background: #cccccc;
  color: #555555;
}

.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}
</style>

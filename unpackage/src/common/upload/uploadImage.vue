<!-- 多文件上传 -->
<template>
    <div class="file_list" style="display:inline-block;">
        <div v-for="item, key in imageArray" class="img_show">
            <img :src="item" class="imgClass">
            <div class="cover">
                <i v-if="showdel" class="icon iconfont icon-cuowuguanbiquxiao-xianxingyuankuang" style="font-size:20px" @click="deleteFile(key)"></i>
            </div>
        </div>
            <div class="upload" v-if="(imageArray.length==0||multiple)&& !iosUploadShow">
                <!-- input标签会隐藏 -->
                <input  id="box" type="file" value="上传" accept="image/*" @change="previewImg" multiple="">
                <!-- <div class="camera" @click="openFile"> -->
                <div class="camera" @click="chooseCamera">
                    <i class="icon iconfont icon-shangchuandaochu" style="font-size:20px"></i>
                </div>
            </div>
            <div class="upload" v-if="(imageArray.length==0||multiple)&&iosUploadShow">
                <!-- input标签会隐藏 -->
                <input  id="box" type="file" value="上传" @change="previewImg" multiple><!--ios 用multiple-->
                <!-- <div class="camera" @click="openFile"> -->
                <div class="camera" @click="openFile">
                    <i class="icon iconfont icon-shangchuandaochu" style="font-size:20px"></i>
                </div>
            </div>
         <yd-popup v-model="cameraShow" position="bottom"  height="18vh">
          <div style="position:absolute;bottom:0;width:100%;display:flex;flex-direction: column;height:100%;">
           <yd-button size="large" type="primary" class="noMarginBtn" @click.native="openCamera">拍照上传</yd-button>
           <yd-button size="large" type="primary" class="noMarginBtn" @click.native="openFile">打开相册</yd-button>
          </div>
        </yd-popup>

    </div>
</template>
<script>
import Vue from "vue";
import common from "../../libs/httpService.js";
export default {
  data() {
    return {
      iosUploadShow: false,
      cameraShow: false,
      images:[]
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    param: {
      type: Object,
      default: function() {
        return {
          keyName: "yaocai"
        };
      }
    },
    imageArray: {
       type: Array,
      default: []
    },
    showdel: {
      type: Boolean,
      default: true
    },
    showCamera: ""
  },
  methods: {
    chooseCamera() {
      console.log("我是色和鹅鹅鹅饿");
      this.cameraShow = true;
    },
    openCamera() {
      let _self = this;
      let plus = Vue.prototype.$plus;
      var camera = plus.camera.getCamera(1); //获取摄像头管理对象

      camera.captureImage(function(capturedFile) {
        //打开摄像头
        plus.io.resolveLocalFileSystemURL(capturedFile, function(entry) {
          //解析本地文件url
          entry.file(function(file) {
            //变成file对象
            //读取文件
            let reader = new plus.io.FileReader();
            _self.size = file.size;
            let img = new Image();
            reader.onload = function(e) {
              if (file.size > 204800) {
                //图片大于200kb则压缩
                img.src = e.target.result;
                img.onload = function() {
                  _self.image = _self.compress(img);
                  //   alert("eEEEEEEEEEEEE" + JSON.stringify(_self.image));
                  _self.upload(_self.image);
                  _self.param.url = _self.image;
                };
              } else {
                img.src = e.target.result;
                img.onload = function() {
                  _self.image = e.target.result;
                  _self.param.url = _self.image;
                  _self.upload(_self.image);
                };
              }
            };

            reader.readAsDataURL(file);
            // console.log("$$$$$$$$$$$$$$$$$",JSON.stringify(file));
          });
          // var localurl = entry.toLocalURL();
          //   alert("我是照相机", entry);
        });
      });
      this.cameraShow = false;
    },

    //查看大图
    clickBig(url) {
      this.visible = true;
      this.url = url;
    },
    //删除文件
    deleteFile(index) {
      this.imageArray.splice(index, 1);
    },
    openFile(e) {
      let box = document.getElementById("box");
      box.click();
    },
    //重置上传框，以便上传重复的内容时，也会触发change事件
    resetFile() {
      let box = document.getElementById("box");
      box.value = "";
    },
    previewImg: function(e) {
      let _self = this;
      let input = e.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        _self.size = input.files[0].size;
        let img = new Image();
        reader.onload = function(e) {
          //   if (input.files[0].size > 204800) {
          //     //图片大于200kb则压缩
          //     img.src = e.target.result;
          //     img.onload = function() {
          //       _self.image = _self.compress(img);
          //       _self.upload(_self.image);
          //       _self.param.url = _self.image;
          //     };
          //   } else {
          img.src = e.target.result;
          img.onload = function() {
            _self.image = e.target.result;
            _self.param.url = _self.image;
            _self.upload(_self.image);
          };
          //   }
        };

        reader.readAsDataURL(input.files[0]);
        console.log(input.files[0]);
        // return 1;
        this.cameraShow = false;
      }
    },
    compress: function(img) {
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //如果图片大于四百万像素，计算压缩比并将大小压至50万以下
      let ratio = 1;
      if ((ratio = width * height / 300000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      let ndata = canvas.toDataURL(img.src.split(";")[0].split(":")[1], 1);
      if (ndata.length > 165399) {
        ndata = canvas.toDataURL(
          img.src.split(";")[0].split(":")[1],
          165399 / ndata.length
        );
      }
      canvas.width = canvas.height = 0;
      return ndata;
    },

    upload: function(file) {
      file = file.split(",")[1];
      let _self = this;
      //_self.loading = true;
      let url = common.addSID(common.urlCommon + common.apiUrl.most);
      let body = {
        biz_module: "filesService",
        biz_method: "getQiNiuToken",
        version: 1,
        time: 0,
        sign: "",
        biz_param: {
          bucketName: _self.param.keyName
        }
      };
      body.time = Date.parse(new Date()) + parseInt(common.difTime);
      body.sign = common.getSign(
        "biz_module=" +
          body.biz_module +
          "&biz_method=" +
          body.biz_method +
          "&time=" +
          body.time
      );
      common
        .commonPost(url, body)
        .then(function(res) {
          if (res.code == "1c01") {
            var timestamp = new Date().getTime();
            var pic = file;
            var url = "http://upload.qiniu.com" + "/putb64/-1/" + _self.size;
            var xhr = new XMLHttpRequest();
            var prg = _self.$refs.prg;
            xhr.onreadystatechange = function() {
              if (xhr.readyState == 4) {
                let response = JSON.parse(xhr.response);
                if (response.key) {
                  _self.key = response.key;
                  _self.$emit("postUrl", res.biz_result.url + "/" + _self.key);
                  clearInterval(_self.timer);
                  //_self.$refs.input.value = '';
                  clearTimeout(_self.timerTimOut);
                  _self.timerTimOut = setTimeout(() => {
                    _self.showPrg = false;
                  }, 500);
                } else {
                  clearInterval(_self.timer);
                  _self.$refs.input.value = "";
                  clearTimeout(_self.timerTimOut);
                  _self.timerTimOut = setTimeout(() => {
                    _self.showPrg = false;
                  }, 500);
                }
              }
            };
            console.log(res.biz_result.token);
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader(
              "Authorization",
              "UpToken " + res.biz_result.token
            );
            /*xhr.upload.onprogress = function(ev) {
                                clearInterval(_self.timer);
                                var precent = parseInt(10000 * ev.loaded / ev.total) / 100;
                                prg.style.width = (400 * ev.loaded / ev.total) + 'px';
                                _self.prgText = precent;

                                _self.timer = setInterval(function() {
                                    if (ev.lengthComputable) {
                                        var precent = parseInt(10000 * ev.loaded / ev.total) / 100;
                                        prg.style.width = (400 * ev.loaded / ev.total) + 'px';
                                        _self.prgText = precent;
                                    }
                                }, 100);
                            };*/
            xhr.send(pic);
          } else {
            _self.showPrg = false;
            _self.$message({
              type: "info",
              message: "图片上传失败"
            });
          }
        })
        .catch(function(err) {
          _self.showPrg = false;
          _self.$message({
            type: "info",
            message: "图片上传失败"
          });
          console.log(err);
        });
    }
  },
   watch: {
      imageArray:{
        handler (curVal, oldVal) {
        if(oldVal&&curVal&&oldVal.length==0&&curVal.length>0){
           curVal=curVal.splice(0,curVal.length); 
        }
      },
      // 深度观察
      deep: true,
      immediate:true
      }
  },
  created() {
    let plus = Vue.prototype.$plus;
    if (plus && plus.os.name === "iOS") {
      //   alert("我是ios@！");
      this.iosUploadShow = true;
    } else {
      this.iosUploadShow = false;
      //   alert("我是Andriod@！");
    }
  }
};
</script>
<style scoped>
.file_list {
}
.imgClass {
}
.upload {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  border: 1px dashed #d7dde4;
}

.img_show {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: transparent;
  border-radius: 4px;
  border: 1px solid #d7dde4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 8px;
}

.img_show > img {
  width: 100%;
  height: 100%;
}

.cover {
  position: absolute;
  display: block;
  top: -29px;
  bottom: 0;
  left: 48px;
  right: 0;
  background: rgba(0, 0, 0, 0);
}

.upload > input {
  display: none;
}

.camera {
  position: absolute;
  top: 0;
  left: 0;
  height: 58px;
  width: 58px;
  line-height: 58px;
  text-align: center;
  cursor: pointer;
}
.noMarginBtn{
  margin:0;
  flex:1;
  color:#04BE02;
  font-weight:bold;
  background: #fff;
  border-bottom:1px solid #ccc;
}
</style>

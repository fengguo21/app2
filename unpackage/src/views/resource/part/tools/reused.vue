<!-- /**
 * 复用确认
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-04-03 10:09:00
 * @version $Id$
 */

 -->
 <template>
 <div>
    <detailsLayout :showMore="true" :funcs="funcs" :moreFun="moreFun" :title="title">
        <div>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left" class="Label">供应商信息:</span>
                    <input slot="left" class="in" type="text" placeholder="请选择供应商" v-model="offerDetail.supplier" readonly="" />
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left" class="Label">商品价格:</span>
                    <input slot="left" class="in" type="number" placeholder="裸价，不含税、运费" v-model="offerDetail.price" />
                        <span slot="right">元/{{offerDetail.unit | unit}}</span>
                  
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left" class="Label">实际库存:</span>
                    <input slot="left" class="in" type="number" placeholder="请输入库存数量" v-model="offerDetail.number" />
                    <span slot="right">{{offerDetail.unit | unit}}</span>
                    
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left" class="Label">总运费:</span>
                    <input slot="left" class="in" type="number" placeholder="请输入总运费" v-model="offerDetail.incidentals" />
                    <span slot="right">元</span>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left" class="Label">账期预付:</span>
                    <input slot="left" class="in" type="number" placeholder="请输入预付百分比" readonly=""  v-model="offerDetail.advance" />
                    <span slot="right">%</span>
                </yd-cell-item>
                <yd-cell-item >
                    <span slot="left" class="Label">余款天数:</span>
                    <input slot="left" class="in" type="number" placeholder="请输入余款天数" readonly="" v-model="offerDetail.paymentDay" />
                    <span slot="right">天</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left" class="Label">货物所在地:</span>
                    <input slot="left" class="in" style="width:870vw;" type="text" v-model="offerDetail.goodsPosition" readonly=""  label="* 货物所在地" placeholder="请选择货物所在地"/>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left" class="Label">报价有效期:</span>
                    <input slot="left" class="in" type="text" v-model="offerDetail.duedate" readonly="" label="* 报价有效期" placeholder="请选择报价有效期"/>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <div style="position: relative;z-index: 0;">
            <yd-cell-group title="* 供应商可否提供加工:">
                <yd-cell-item type="radio">
                    <span slot="left">提供加工</span>
                    <input slot="right" type="radio" value="1" disabled="" v-model="offerDetail.isProcess" />
                </yd-cell-item>
                <yd-cell-item type="radio">
                    <span slot="left">不提供加工</span>
                    <input slot="right" type="radio" value="2" disabled="" v-model="offerDetail.isProcess" />
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="* 加工方式" v-if="Number(offerDetail.isProcess) == 1">
                <yd-cell-item>
                    <yd-textarea slot="right" disabled="" placeholder="请填写加工方式" maxlength="100" v-model="offerDetail.machinableMode"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="* 是否符合药典:" v-if="source==1">
                <yd-cell-item type="radio">
                    <span slot="left">符合药典标准</span>
                    <input slot="right" type="radio" disabled="" value="符合药典标准" v-model="offerDetail.quality" />
                </yd-cell-item>

                <yd-cell-item type="radio">
                    <span slot="left">不符合药典标准</span>
                    <input slot="right" type="radio" disabled="" value="不符合药典标准" v-model="offerDetail.quality" />
                </yd-cell-item>
            </yd-cell-group>
             <yd-cell-group title="* 质量:" v-if="source==2">
                <yd-cell-item>
                    <p slot="right" style="text-align:left;padding:.25rem 0;">{{offerDetail.quality}}</p>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="* 是否包交包退:">
                <yd-cell-item type="radio">
                    <span slot="left">是</span>
                    <input slot="right" disabled="" type="radio" value="1" v-model="offerDetail.returnGoods" />
                </yd-cell-item>

                <yd-cell-item type="radio">
                    <span slot="left">否</span>
                    <input slot="right" disabled="" type="radio" value="0" v-model="offerDetail.returnGoods" />
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="* 退货运费说明:"  v-if="source==1">
                <yd-cell-item type="radio">
                    <span slot="left">我方支付</span>
                    <input slot="right" disabled="" type="radio" value="我方支付" v-model="offerDetail.incidentalsDesc" />
                </yd-cell-item>

                <yd-cell-item type="radio">
                    <span slot="left">供应商支付</span>
                    <input slot="right" disabled="" type="radio" value="供应商支付" v-model="offerDetail.incidentalsDesc" />
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="报价备注:">
                <yd-cell-item>
                    <yd-textarea readonly="" slot="right" placeholder="请填写报价备注" maxlength="100" v-model="offerDetail.priceDescription"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <div class="renzhengImg" style="background:#fff;padding-bottom:7vh;">
            <div>
                <p style="color:#666;font-size:.3rem;padding:.25rem;">药材图片</p>
                <div style="padding-left:3vw;">
                    <yd-lightbox  :num="offerPic.length">
                      <yd-lightbox-img v-for="img in offerPic" :src="img" style="width:40px;height:40px;margin:0 0.1rem;"></yd-lightbox-img> 
                    </yd-lightbox>
                </div>
            </div>
        </div>

        <yd-popup v-model="showMenu" position="right" width="70%">
           <!--  <supplyChoose :param="param" :showChoose='showChoose' @supply="mainVar"></supplyChoose> -->
        </yd-popup>
</detailsLayout>
 <yd-button class="searchBtn" style="background:#4BB94B;position:absolute;bottom:0;"  type="primary" size="large"  @click.native="checkData()">确认复用 </yd-button>
    </div>
</template>

<script>
import detailsLayout from "../../../../components/detailsLayout.vue"
import inputVal from "../../../../components/com/inputType";
import supplyChoose from "../../../slideBar/supplyChoose.vue";
import http from "../../../../libs/httpService.js";
import uploadImage from "../../../../common/upload/uploadImage.vue";
import validation from "../../../../validation/validation.js";

export default {
  props: ["param", "intention"],
  data() {
    return {
      title:'报价复用',
      source:'',
      funcs: [],
      offerPic:[],
      moreFun: [],
      offerDetail:{},
      show1: false,
      showMenu: false,
      showChoose: "",
      multiple: true,
      advance: ""
    };
  },
  components: {
    inputVal,
    supplyChoose,
    uploadImage,
    detailsLayout
  },
  methods: {
    checkData() {
        if(this.offerDetail.number==''){
             this.$dialog.toast({
              mes: '请先填写数量！'
            });
        }else if(this.offerDetail.price==''){
             this.$dialog.toast({
              mes: '请先填写价格！'
            });
        }else if(this.offerDetail.incidentals==''&&this.offerDetail.incidentals!=0){
             this.$dialog.toast({
              mes: '请先填写运费！'
            });
        }else{
            this.offerDetail.state=100;
            this.submitData();
        }
    },

    submitData() {
      let _self = this;
      let url = http.urlCommon + http.apiUrl.most;
      let body = {
        biz_module: "erpIntentionOfferService",
        biz_method: "updateOffer",
        biz_param: {
        }
      };
      body.biz_param=Object.assign(this.offerDetail,body.biz_param);
      http.commonPost(url, body).then(res => {
          if (res.code == "1c01") {
            this.$dialog.toast({
              mes: res.msg
            });
            window.history.go(-1);
          } else {
            this.$dialog.toast({
              mes: res.msg
            });
          }
        })
        .catch(err => {});
    },
    getDetail: function() {
         let _self = this;
         let url = http.urlCommon + http.apiUrl.most;
           let body = {
                    biz_module: "erpIntentionOfferService",
                    biz_method: "findOfferById",
                    biz_param:{
                       id:this.$route.query.id
                    }
            }
            http.commonPost(url, body).then(res => {
               this.offerDetail=res.biz_result.offer;
               this.source=res.biz_result.origin;
               this.offerDetail.advance*=100;
               this.offerPic=res.biz_result.offerFiles;
               this.offerDetail.supplier=this.offerDetail.offerCustomerName;
               if(this.offerDetail.machinableMode==''){
                  this.offerDetail.isProcess=2;
                }else{
                  this.offerDetail.isProcess=1;
                }
        }).catch(err => {});
        },
  },
  created() {
    this.getDetail();
  }
};
</script>

<style lang="less" scoped>
.offerMake {
  padding: 0 0 50px;
  overflow:hidden;
  .tips {
    line-height: 30px;
    padding-left: 10px;
    color: #f00;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    i {
      vertical-align: sub;
      margin: 0 5px;
    }
  }
  .button {
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 16px;
    text-align: center;
    color: #fff;
    line-height: 50px;
    background-color: #f00;
    z-index: 5;
  }
  .renzhengImg {
    padding: 0 10px;
    .photoList {
      .img_list {
        text-align: center;
        display: inline-block;
        margin-bottom: 10px;
      }
      p {
        margin-bottom: 10px;
        text-align: left;
      }
    }
  }
}
</style>
<!-- /**
 * 
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-04-02 13:36:58
 * @version $Id$
 */

 -->
   <template>
    <div>
     <yd-popup v-model="param.show" position="center" width="90%" height="65vh" >
            <p style="padding:.2rem 0 ;text-align:center;font-size:.3rem;border-bottom:1px solid #e6e6e6;">
            收样确认      
            </p>
            <p style="padding:.1rem 0;color:#666;height:50vh;overflow-y:auto;">
                 <yd-timeline>
                    <yd-timeline-item v-for="item in list">
                        <p>{{item.context}}</p>
                        <p style="margin-top: 10px;">{{item.time | subTime}}</p>
                    </yd-timeline-item>
                </yd-timeline>
            </p>
            <p class="unable-p" style="text-align:right;padding:.2rem .4rem;border-top:1px solid #e6e6e6;">
                <yd-button  type="warning" class="unable-btn" style="margin-right:.2rem;" @click.native="param.show=false;">取消</yd-button>
                <yd-button  type="primary" class="unable-btn" style="margin-left:.1rem;" @click.native="confirmPrice()">确认</yd-button>
            </p>
     </yd-popup>
    </div>
      

</template>
<script>
    import http from '../../../../libs/httpService.js'
    export default {
        data() {
            return {
               list:[]
            }
        },
        props:['param'],
        computed: {
           
        },
        components: {
          
        },
        mounted() {
           
        },
        beforeDestroy() {

        },
        methods: {
            confirmPrice(){
                this.receivedHttp();
            },
            receivedHttp:function(param){
                let _self = this;
                let url = http.addSID(http.urlCommon + http.apiUrl.most);
                let body = {
                    biz_module: 'erpIntentionOfferService',
                    biz_method: 'receiveSupplierSample',
                    biz_param: {
                        offerId:this.param.id
                    }
                }
                 http.commonPost(url, body).then((res) => {
                     this.$dialog.toast({ mes: res.msg});
                     this.param.show=false;
                     this.$emit("confrim-back",'');
                }).catch((err) => {}); 
           }, 
           logistHttp:function(param){
                let _self = this;
                let url = http.addSID(http.urlCommon + http.apiUrl.most);
                let body = {
                    biz_module: 'intentionOfferService',
                    biz_method: 'queryLogisticsByOfferId',
                    biz_param: {
                        offerId:this.param.id
                    }
                }
                 http.commonPost(url, body).then((res) => {
                    this.list=res.biz_result.data;
                }).catch((err) => {}); 
           }, 

        },
        created(){
            this.logistHttp();
        }

    }
</script>

<style lang="less" scoped>  
</style>
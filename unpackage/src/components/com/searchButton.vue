<!--
 * Filename: e:\git-web\erp_app\unpackage\src\components\com\searchButton.vue
 * Path: e:\git-web\erp_app\unpackage
 * Created Date: Friday, March 30th 2018, 2:36:20 pm
 * Author: wxy
 -->
<template>
 <yd-accordion>
        <yd-accordion-item :title="title">
            <div class="btnBox">
              <div v-for="(item,index) in buttonParam" @click="clickButton(item,index)">
                <div class="btn" v-bind:class="{'active':item.checked}">
                  {{item.name}}
                </div>
              </div>
            </div>  
        </yd-accordion-item>
    </yd-accordion>

</template>
<script>
export default {
  data() {
    return {
      data:''
    };
  },
  props: {
    param:{
       default:''
    },
    buttonParam: {
      type: Array,
      default: []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    title:{
      type:String,
      default:''
    }
  },
  methods: {
    clickButton(item,index){
      let flag = false;
      if(!this.multiple){//如果是单选
        for(let i  in this.buttonParam){
          this.buttonParam[i].checked = false;
          console.log("i",i);
        }
      }//多选
        this.buttonParam[index].checked = !this.buttonParam[index].checked;//点击取消
        this.data=this.buttonParam[index].value;
        this.$emit('update:param', this.data);
        // this.$emit();
      // }
      console.log("######################",this.param);
    }
  },
  watch: {
      param:function(newv,oldv){
        if(newv==''){
            for(let i  in this.buttonParam){
              this.buttonParam[i].checked = false;
              console.log("i",i);
            }
        }
      }
  },
  created() {
    this.data=this.title;
    console.log(this.buttonParam);
  }
};
</script>

<style lang="less" scoped>
.btnBox {
  display: flex;
  // align-content: center;
  align-items: center;
  padding:.1rem 0;
  border: 1px solid #ccc;
  border-left:0;
  border-right:0;
  justify-content: space-between;
  padding:0 .5vw;
  flex-wrap:wrap
}
.btn {
  // flex: 1;
  // display: inline-block;
  text-align: center;
  width: 1.5rem;
  margin: .08rem .05rem;
  font-size: 0.22rem;
  padding: .1rem;
  color: #666;
  border-radius: 4px;
  background-color: rgba(135, 135, 135, .17);
  // background-color: rgba(75, 185, 75, 1);
}
.active{
  background-color: rgba(75, 185, 75, 1);
  color:#fff;
}
</style>


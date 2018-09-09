<template>
    <yd-accordion>
        <yd-accordion-item :title="item.name" v-for="(item,index) in allContacts">
            <div style="padding: .24rem;">
                <p>姓名：{{item.name}}</p>
                <p>职位：{{item.position}}</p>
                <p>手机号：{{item.phone}}</p>
                <p>电话：{{item.tel}}</p>
                <p>邮箱：{{item.email}}</p>
            </div>
        </yd-accordion-item>
    </yd-accordion>  
</template>
<script>
function sdfsdf(){
console.log("33333333333", this.allContacts);

}
export default {
  props: ["allContacts"],
  data() {
    return {};
  },
  methods: {

  },
  created() {
      this.sdfsdf
  }
};
</script>
<style lang="less" scoped>

</style>



<template>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">客户名称：</span>
        <span slot="right">{{customerInfo.name}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">客户类型：</span>
        <span slot="right">{{customerInfo.type | customerType}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">客户规模：</span>
        <span slot="right">{{customerInfo.scale | scale }}</span>
      </yd-cell-item>
    
      <yd-cell-item>
        <span slot="left">客户性质：</span>
        <span slot="right">{{customerInfo.nature | nature}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">地址：</span>
        <span slot="right">{{customerInfo.countryName +" "+ customerInfo.provinceName +" "+  customerInfo.cityName + " " + customerInfo.districtName}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">详细地址：</span>
        <span slot="right">{{customerInfo.address}}</span>
      </yd-cell-item>
    </yd-cell-group>
</template>
<script>
export default {
  props: ["customerInfo"]
};
</script>
<style lang="less" >

</style>



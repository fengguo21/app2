<template>
    <yd-cell-group>
        <div class="mainVarieties">
        <div class="addVarieties" v-for="(item,index) in bizScope"  >{{item}}</div>
        </div>
    </yd-cell-group>
</template>
<script>
export default {
  props: ["bizScope"]
};
</script>
<style lang="less" scoped>
.mainVarieties {
  background-color: #fff;
  .addVarieties {
    display: inline-block;
    margin: 10px 10px;
    padding: 5px;
    border: 1px solid rgba(230, 230, 230, 0.5);
    i {
      font-size: 10px;
      margin: 5px;
    }
  }
}
</style>


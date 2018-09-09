<template>
    <div>
        <yd-cell-group v-for="(item,index) in allContacts" v-if="item.main == 1">
            <yd-cell-item>
                <span slot="left">姓名：</span>
                <span slot="left">{{item.name}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">职位：</span>
                <span slot="left">{{item.position}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机：</span>
                <span slot="left">{{item.phone}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">电话：</span>
                <span slot="left">{{item.tel}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">微信：</span>
                <span slot="left">{{item.wechart}}</span>
            </yd-cell-item>
            <yd-cell-item>
            <yd-cell-item>
                <span slot="left">QQ：</span>
                <span slot="left">{{item.qq}}</span>
            </yd-cell-item>
                <span slot="left">邮箱：</span>
                <span slot="left">{{item.email}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">Facebook：</span>
                <span slot="left">{{item.facebook}}</span>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["allContacts"]
};
</script>
<style lang="less" scoped>

</style>



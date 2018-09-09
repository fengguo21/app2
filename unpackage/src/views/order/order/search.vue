<template>
    <div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">客户名：</span>
                <yd-input slot="right" v-model="param.customerName" placeholder="请输入"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">订单ID：</span>
                <yd-input slot="right" v-model="param.id" placeholder="请输入"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>
<script>
export default {
    props: ["param"],

}
</script>
<style>
</style>

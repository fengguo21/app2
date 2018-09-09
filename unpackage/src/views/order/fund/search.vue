<template>
    <div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">用户名：</span>
                <yd-input slot="right" v-model="param.payUserName" placeholder="请输入"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">账号：</span>
                <yd-input slot="right" v-model="param.payNumber" placeholder="请输入"></yd-input>
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

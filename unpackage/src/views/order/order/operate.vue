<template>
    <yd-popup v-model="param.show" position="right" width="70%">
        <!-- 订单审核 -->
        <yd-button size="large" type="primary">审核</yd-button>
        <yd-button size="large" type="danger">发货</yd-button>
        <yd-button size="large" type="danger">审核发货</yd-button>
    </yd-popup>
</template>
<script>
export default {
    props: ["param"],
    data() {
        return {


        }
    },
    components: {

    },
    methods: {


    },
    created() {

    }
}
</script>
<style>
</style>

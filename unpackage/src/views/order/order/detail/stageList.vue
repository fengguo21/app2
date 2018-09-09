<template>
    <yd-accordion accordion>
        <yd-accordion-item v-for="item in list" :title="'金额'+item.amount">
            <div style="padding: .24rem;">
                <p>
                    <span v-if="item.extra==0">{{item.orderStatus | orderDescript}}立即支付{{item.amount}}{{currency | currency("cn")}}</span>
                    <span v-else>{{item.orderStatus | orderDescript}}{{item.extra}}天立即支付{{item.amount}}{{currency | currency("cn")}}</span>
                </p>
                <p>类型：{{item.type | payType}}</p>
                <p>申请状态：{{item.validate | stageValid}}</p>
                <p>创建时间：{{item.ctime}}</p>
                <p>备注：{{item.comment}}</p>
            </div>
        </yd-accordion-item>
    </yd-accordion>
</template>
<script>
export default {
    props: ["list", "currency"]
}
</script>
<style lang="less" scoped>
</style>

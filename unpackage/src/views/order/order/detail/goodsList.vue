<template>
    <yd-accordion accordion>
        <yd-accordion-item v-for="item in list" :title="item.breedName">
            <div style="padding: .24rem;">
                <p>品种：{{item.breedName}}</p>
                <p>单价：{{item.price}}</p>
                <p>数量：{{item.number}}</p>
                <p>规格：{{item.spec}}</p>
                <p>质量：{{item.quality}}</p>
            </div>
        </yd-accordion-item>
    </yd-accordion>
</template>
<script>
export default {
    props: ["list"]
}
</script>
<style lang="less" scoped>
</style>

<template>
    <detailsLayout :showMore="true">
        <yd-scrolltab>
            <yd-scrolltab-panel label="基本信息" icon="demo-icons-category1">
                <div style="height: 350px;background-color: gray;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="求购列表" icon="demo-icons-category2" active>
                <div style="height: 350px;background-color: blue;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="订单列表" icon="demo-icons-category3">
                <div style="height: 350px;background-color: yellow;"></div>
            </yd-scrolltab-panel>
            <!-- ... -->
        </yd-scrolltab>
    </detailsLayout>
</template>
<script>
import centerContent from "../../components/centerContent.vue"
import detailsLayout from "../../components/detailsLayout.vue"
export default {
    components: {
        centerContent,
        detailsLayout,
    },
}
</script>
<style lang="less">
</style>

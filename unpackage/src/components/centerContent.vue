<!-- Created by Weiun on 2017/1/17. 页面内容区组件，负责内容区布局-->
<template>
    <div class="centerContent">
        <!-- 搜索 固定高度在头部-->
        <div v-if="showSearch">
            <slot name="search"></slot>
        </div>
        <!-- 列表 -->
        <div :class="showSearch?'content-search':'content'" style="clear:both">
            <slot name="content"></slot>
        </div>
        <div style="z-index:100;">
            <yd-popup v-model="more" position="right" width="70%">
                <div slot="top" class="more-top">更多查询</div>
                <slot name="more"></slot>
                <div slot="bottom" style="display:flex;flex-direction:row;">
                   <yd-button class="searchBtn" style="background:#FCB255;" type="hollow" size="large" @click.native="clear">重置</yd-button>
                   <yd-button class="searchBtn" style="background:#4BB94B;" type="primary" size="large" @click.native="submitHandler">搜索</yd-button>
                </div>
            </yd-popup>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
            return {
                searchValue: "",
                more: false
            };
        },
        props: {
            showSearch: {
                type: Boolean,
                default: false
            },
            showMore: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(["layout"])
        },
        mounted() {
            
        },
        methods: {
            submitHandler() {
                this.$emit("query", this.searchValue);
                this.more = false;
            },
            refresh() {
                this.$emit("refresh");
            },
            clear() {
                this.$emit("clear")
            }
        },
        watch: {
            showMore() {
                this.more = !this.more;
            }
        }
};
</script>
<style scoped lang="less">
.search {
    width: 100%;
    height: 1rem;
    position: fixed;
    top: 1rem;
    left: 0;
    z-index: 99;
    // border-bottom: 1px solid #d7dde4;
}

.content {
    margin-top: 0rem;
}

.content-search {
    margin-top: 1rem;
}

.more-top {
    text-align: center;
    padding: 0.1rem;
    font-size: 20px;
    border-bottom: 1px solid #d7dde4
}
.searchBtn{
    flex:1;
    color:#fff;
    border-radius:0;

}
</style>
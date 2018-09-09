<!-- /**
 * 员工列表
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-04-03 16:59:16
 * @version $Id$
 */

 -->
 <template>
    <yd-layout>
    <yd-navbar slot="navbar" style="text-align:center;" title="选择"></yd-navbar>
    <yd-search v-model="search" ></yd-search>
        <div v-if="search">
            <div class="listLi" v-for="(item, key) in result" @click="menuSelect(item)">
                {{item.name}}
            </div>
        </div>
        <div style="overflow:auto;" ref="scrollBox" >
            <yd-infinitescroll style="width: 86%;" :callback="loadList" ref="infinitescrollDemo" >

                <yd-list theme="1" slot="list">
                    <div class="listLi" v-for="(item, key) in list" @click="menuSelect(item)">
                        {{item.name}}
                    </div>
                </yd-list>

                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

            </yd-infinitescroll>
        </div>

    </yd-layout>
</template>
<script>
    import http from "../../libs/httpService.js";
    import * as filters from "../../filters/filters.js";
    export default {
        data() {
            return {
                search: "",
                page: 1,
                pageSize: 20,
                result: [],
                list: [],
                org:''
            };
        },
        props:['param'],
        watch: {
            search(curVal, oldVal) {
                if(curVal) {
                    this.getResult(curVal)
                }
            },
        },
        methods: {
            menuSelect(item) {
                this.$emit("main-var", item);
            },
            getResult(val) {
                this.result = [];
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: "employService",
                    biz_method: "queryEmployeeList",
                    biz_param: {
                        name: val,
                        orgId:this.org
                    }
                };
                http.commonPost(url, body).then(res => {
                        let suc = res.biz_result.list;
                        this.result = suc;

                    })
                    .catch(err => {});
            },
            loadList() {
                let url = http.urlCommon + http.apiUrl.most;
                let body = {
                    biz_module: "employService",
                    biz_method: "queryEmployeeList",
                    biz_param: {
                        orgId:this.org
                    }
                };
                http.commonPost(url, body).then(res => {
                    const _list = res.biz_result.list;
                    this.list = [...this.list, ..._list];
                    if(_list.length < this.pageSize) {
                        /* 所有数据加载完毕 */
                        this.$refs.infinitescrollDemo.$emit(
                            "ydui.infinitescroll.loadedDone"
                        );
                        return;
                    }
                    /* 单次请求数据完毕 */
                    this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
                    this.page++;
                }).catch(err => {});
            }
        },
        mounted() {
            let boxHeight = document.body.clientHeight - 100 + "px";
            this.$refs.scrollBox.style.height = boxHeight;
        },
        created() {
            this.org=localStorage.getItem('orgid');
            this.loadList();
        }
    };
</script>

<style lang="less" scoped>
    .yd-flexview {
        height: 100vh;
        .listLi {
            margin-left: 10px;
            line-height: 30px;
            border-bottom: 1px solid rgba(230, 230, 230, 0.5);
        }
    }
</style>
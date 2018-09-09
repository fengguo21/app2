<!-- 侧边菜单页 -->
<template>
    <yd-flexbox direction="vertical">
        <yd-flexbox-item>
            <yd-navbar title="功能菜单">
                <yd-icon name="xiangzuojiaohuan" slot="right" size='.5rem' @click.native="menuClose" custom></yd-icon>
            </yd-navbar>
        </yd-flexbox-item>
        <yd-flexbox-item>
            <yd-accordion id="Menus">
                <yd-accordion-item v-for="item in menus" :title="item.cname" :key="item.id">
                    <yd-icon v-if="item.icon" :name="item.icon" slot="icon" size='.5rem' style="margin-right:.5rem" custom></yd-icon>
                    <yd-cell-group v-if="item.subMenus.length > 0">
                        <yd-cell-item v-for="sub in item.subMenus" :key="sub.id" type='div' @click.native="menuClick(sub)" arrow>
                            <yd-icon v-if="sub.icon" slot="left" :name="sub.icon" size='.5rem' style="margin-left:.5rem;margin-right:.3rem" custom></yd-icon>
                            <span slot="left">{{sub.cname}}</span>
                        </yd-cell-item>
                    </yd-cell-group>
                </yd-accordion-item>
            </yd-accordion>
        </yd-flexbox-item>
    </yd-flexbox>
</template>
<script>
export default {

    data() {
            return {
                currentMenu: {
                    title: '首页',
                    link: '/main',
                },
                menus: []
            }
        },
        props: {

        },
        components: {

        },
        methods: {
            menuSelect() {
                this.$emit("menu-select", this.currentMenu);
            },
            menuClose(){
                this.$emit("menu-close");
            },
            menuClick(sumMenu) {
                this.currentMenu = sumMenu;
                this.menuSelect();
                console.log("-----------------菜单点击，关闭菜单：" + sumMenu.url + "---------------");
            },
        },
        created() {
            this.menus = JSON.parse(localStorage.menus);
        }
}
</script>
<style scoped lang="less">
.iconMargin {
    margin-right: 0.2rem;
}

.logo {
    width: 3rem;
}

</style>

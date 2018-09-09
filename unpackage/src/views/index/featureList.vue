<template>
    <yd-scrolltab>
        <yd-scrolltab-panel label="客户管理" icon="demo-icons-category1" active>
            <div class="box">
                <div class="cell" v-for="(item , index) in customerList" @click="featureClick(item)">
                    <yd-icon name="shopcart" size="20px" color="#16AA6B" @click.native="featureClick(item)"></yd-icon>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </yd-scrolltab-panel>
        <yd-scrolltab-panel label="供应商管理" icon="demo-icons-category2">
            <div class="box">
                <div class="cell" v-for="(item , index) in supplierList" @click="featureClick(item)">
                    <yd-icon name="shopcart" size="20px" color="#16AA6B" @click.native="featureClick(item)"></yd-icon>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </yd-scrolltab-panel>
        <yd-scrolltab-panel label="资源管理" icon="demo-icons-category3">
            <div class="box">
                <div class="cell" v-for="(item , index) in supplierList" @click="featureClick(item)">
                    <yd-icon name="shopcart" size="20px" color="#16AA6B" @click.native="featureClick(item)"></yd-icon>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </yd-scrolltab-panel>
        <yd-scrolltab-panel label="订单管理" icon="demo-icons-category4">
            <div class="box">
                <div class="cell" v-for="(item , index) in orderList" @click="featureClick(item)">
                    <yd-icon name="shopcart" size="20px" color="#16AA6B" @click.native="featureClick(item)"></yd-icon>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </yd-scrolltab-panel>
    </yd-scrolltab>
</template>
<script>
export default {
    data() {
            return {
                customerList: [{
                    icon: '',
                    name: '我的客户',
                    link: '/myCustomerList/self',
                },{
                    icon: '',
                    name: '部门客户',
                    link: '/myCustomerList/org',
                }, {
                    icon: '',
                    name: '全部客户',
                    link: '/myCustomerList/all',
                },{
                    icon:'',
                    name:'添加客户',
                    link:'/addCustomer/add'
                }],
                supplierList: [{
                    icon: '',
                    name: '全部供应商',
                    link: '/allSupplier/all',
                }, {
                    icon: '',
                    name: '优质供应商',
                    link: '/allSupplier/quality',
                }, {
                    icon: '',
                    name: '部门供应商',
                    link: '/allSupplier/org',
                }, {
                    icon: '',
                    name: '我的供应商',
                    link: '/allSupplier/mine',
                }, {
                    icon: '',
                    name: '添加供应商',
                    link: '/addSupplier/add',
                }],
                orderList: [{
                    icon: '',
                    name: '我的订单',
                    link: '/order?id=0',
                }, {
                    icon: '',
                    name: '部门订单',
                    link: '/order?id=1',
                }, {
                    icon: '',
                    name: '全部订单',
                    link: '/order?id=2',
                }, {
                    icon: '',
                    name: '我的收付款',
                    link: '/order?id=7',
                }, {
                    icon: '',
                    name: '部门收付款',
                    link: '/order?id=8',
                }, {
                    icon: '',
                    name: '财务收付款审核',
                    link: '/order?id=9',
                }, {
                    icon: '',
                    name: '我的补充合同',
                    link: '/order?id=10',
                }, {
                    icon: '',
                    name: '部门补充合同',
                    link: '/order?id=11',
                }, {
                    icon: '',
                    name: '我的售后申请',
                    link: '/order?id=12',
                }, {
                    icon: '',
                    name: '部门售后申请',
                    link: '/order?id=13',
                }, {
                    icon: '',
                    name: '订单处理',
                    link: '/order?id=14',
                }, {
                    icon: '',
                    name: '待我采购',
                    link: '/order?id=15',
                }, {
                    icon: '',
                    name: '待部门采购',
                    link: '/order?id=16',
                }, {
                    icon: '',
                    name: '我的开票申请',
                    link: '/order?id=18',
                }, {
                    icon: '',
                    name: '部门开票申请',
                    link: '/order?id=18',
                }, {
                    icon: '',
                    name: '全部开票申请',
                    link: '/order?id=18',
                }],

            }
        },
        methods: {
            featureClick(item) {
            	console.log(item)
            	if (item.link.split('/')[1] == 'addSupplier') {
            		this.$router.replace(item.link);
            	} else{
            		 this.$router.push(item.link);
            	}
               
            }
        }
}
</script>
<style lang="less" scoped>
.box {
  text-align: left;
  padding: 0px 0 50px 1%;
  .cell {
    display: inline-block;
    width: 30%;
    margin: 10px 1%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

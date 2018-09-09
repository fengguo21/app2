/**
 * Created by aresn on 16/8/22.
 */
import VueRouter from 'vue-router';
import Main from './views/main.vue';
import Login from './views/login.vue';
import index from './views/index/index.vue';
import user from './views/index/user.vue';
import order from './views/index/order.vue';
import resource from './views/index/resource.vue';
import featureList from './views/index/featureList.vue';
import message from './views/index/message.vue';
import client from './views/index/client.vue';
import supply from './views/index/supply.vue';
import purchaseManage from './views/index/purchaseManage.vue'
import herbsEncyclopedia from './views/index/herbsEncyclopedia.vue'

//首页
import video from './views/commonPlugin/video/video.vue';

//供应商
import allSupplier from './views/supplier/allSupplier.vue';
import addSupplier from './views/supplier/addSupplier.vue';
import newSupplier from './views/supplier/newSupplier.vue';
import supperlierDetail from './views/supplier/supperlierDetail.vue';
import editSupplier from './views/supplier/editSupplier';
import editContact from './views/supplier/editContact';
import operatingData from './views/supplier/operatingData.vue';
import renzhengSupply from './views/supplier/renzhengSupply.vue';
import auditSupply from './views/supplier/auditSupply.vue';

//订单
import myOrderList from './views/order/order/myOrderList.vue';
import orderList from './views/order/order/orderList.vue';
import orderDetail from './views/order/order/orderDetail1.vue';
import editOrder from './views/order/order/editOrder.vue';
import fundDetail from './views/order/fund/detail.vue';
import afterSaleDetail from './views/order/afterSales/detail.vue';
import invoiceDetail from './views/order/invoice/detail.vue';
import editInvoice from './views/order/invoice/operation/editInvoice.vue';
import contractDetail from './views/order/contract/detail.vue';


//测试
import test from './views/test/test.vue';
import share from './views/test/share.vue';

//客户
import customerList from './views/customer/customerList.vue';
import addCustomer from './views/customer/addCustomer.vue';
import customerDetail from './views/customer/customerDetail.vue';
import editCustomer from './views/customer/editCustomer.vue';
import customerOrderList from './views/customer/customerOrderList.vue';
import customerIntentionList from './views/customer/customerIntentionList.vue';
import customerAudit from './views/customer/audit/submitAudit.vue'
// import orderDetail from './views/customer/orderDetail.vue';
// import editOrder from './views/customer/editOrder.vue';

//求购
import addPurchase from './views/intention/function/addPurchase'
//个人中心
import userInfo from './views/user/userInfo.vue';
import myBreed from './views/user/myBreed.vue';
import editPassword from './views/user/editPassword.vue';

//报价
import offerDetail from './views/resource/part/mainPart/offerDetail.vue'
import offerZoneDetail from './views/resource/offerZone/offerZoneDetail.vue'

//我的供应商报价
import sendSample from './views/resource/part/tools/sendSample.vue'
import reused from './views/resource/part/tools/reused.vue';

//资源
import addResource from './views/resource/function/newAdd'

//药材百科
import hotDrugList from './views/breed/hotDrugList'
import drugResTableDetail from './views/breed/drugResTableDetail'

const router = new VueRouter({
    linkActiveClass: 'active',
    routes: [

        { path: '/', component: Login },
        
		//测试
        { path: '/test', component: test },
        { path: '/share', component: share },

        { path: '/login', component: Login }, {

            path: '/main',
            component: Main,
            children: [
                { path: 'index', component: index },
                { path: 'order', component: order },
                { path: 'message', component: message },
                { path: 'herbs', component: herbsEncyclopedia },
                { path: 'user', component: user },
                { path: 'supply', component: supply },
                { path: 'purchaseManage', component: purchaseManage },
                { path: 'featureList', component: featureList },
                { path: 'resource', component: resource },
                { path: 'client', component: client },
            ]
        },

        { path: '/video', component: video },

        /* 供应商 */
        { path: '/allSupplier/:type', component: allSupplier },
        { path: '/addSupplier/:type', component: addSupplier },
        { path: '/supperlierDetail', component: supperlierDetail },
        { path: '/editSupplier', component: editSupplier },
        { path: '/editContact', component: editContact },
        { path: '/operatingData', component: operatingData },
        { path: '/renzhengSupply', component: renzhengSupply },
        { path: '/auditSupply', component: auditSupply },

        /*订单*/
        { path: '/order', component: order },
        { path: '/myOrderList', component: myOrderList },
        // { path: '/orderList/:id', component: orderList, props: (route) => ({ query: route.query.q }) },
        { path: '/orderDetail/:id', component: orderDetail },
        { path: '/editOrder/:id', component: editOrder },
        { path: '/fundDetail/:id', component: fundDetail },
        { path: '/afterSaleDetail/:id', component: afterSaleDetail },
        { path: '/invoiceDetail/:id', component: invoiceDetail },
        { path: '/editInvoice/:id', component: editInvoice },
        { path: '/contractDetail/:id', component: contractDetail },

        /* 客户 */
        { path: '/myCustomerList/:type', component: customerList },
        { path: '/addCustomer/:type', component: addCustomer },
        { path: '/customerDetail', component: customerDetail },
        { path: '/editCustomer', component: editCustomer },
        { path: '/customerOrderList', component: customerOrderList },
        { path: '/customerIntentionList', component: customerIntentionList },
        { path: '/customerAudit', component: customerAudit },

        // { path: '/orgCustomerList', component: orderDetail },
        // { path: '/allCustomerList', component: editOrder },

        /*求购模块*/
        { path: '/addPurchase', component: addPurchase },

        /*报价模块*/
        { path: '/offerDetail', component: offerDetail },
        { path: '/offerZoneDetail',name:'offerzonedetail', component: offerZoneDetail },
        {path: '/newSupplier', name:'newSupplier', component: newSupplier },

         /*供应商报价模块*/
        { path: '/sendSample', component: sendSample },
        { path: '/reused', component: reused },


        { path: '/addPurchase', component: addPurchase },
        /*用户详情*/
        { path: '/userInfo', component: userInfo },
        { path: '/editPassword', component: editPassword },
        { path: '/myBreed', component: myBreed },

        /*资源模块*/
        { path: '/addResource', component: addResource },
        /*药材百科*/
        {path:'/hotDrugList',component:hotDrugList},
        {path:'/drugResTableDetail',component:drugResTableDetail}

    ]
})
export default router;

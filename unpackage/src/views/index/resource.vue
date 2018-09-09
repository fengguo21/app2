<!-- /**
 * 资源
 * @authors DEAN hxj (xxxxxxx@delibal)
 * @date    2018-02-27 13:37:33
 * @version $Id$
 */ -->
<template>
    <div>
        <!--我的资源列表-->
        <my-Resource  v-if="$route.query.id==0"></my-Resource>
         <!--部门资源列表-->
        <org-Resources  v-if="$route.query.id==1"></org-Resources>
        <!--全部资源列表-->
        <all-Resources  v-if="$route.query.id==2"></all-Resources>

		<!--资源列表-->
		
		<!--我的供应商报价-->
		<mine-resource v-if="$route.query.id==4" ></mine-resource>
		<org-resource  v-if="$route.query.id==5"></org-resource>
		<all-resource  v-if="$route.query.id==6"></all-resource>
		<offer-list  v-if="$route.query.id==7"></offer-list>
	</div>
</template>
<script>
import myResource from "../resource/sourceList/myResource.vue";
import orgResources from "../resource/sourceList/orgResource.vue";
import allResources from "../resource/sourceList/allResource.vue";
import mineResource from "../resource/part/offerList/mineResource.vue"
import orgResource from "../resource/part/offerList/orgResource.vue"
import allResource from "../resource/part/offerList/allResource.vue"
import offerList from "../resource/offerZone/offerList.vue"
	export default {
		components: {
            myResource,
            orgResources,
            allResources,
			mineResource,
			orgResource,
			allResource,
			offerList,
		},
		created() {

		}
	}
</script>
<style>
</style>

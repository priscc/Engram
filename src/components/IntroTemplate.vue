<template>
	<v-col>
		<v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
			<v-col class="pt-0">
				<h2 class="font-weight-light">{{topicObj.title}} Introduction</h2>
			</v-col>
		</v-row>
		<v-row align="center" justify="center" class="pt-4 d-flex">
			<v-col cols="9" class="pl-6 pr-7 align-self-start">
				<p :key="topicObj.contentMD" v-markdown> {{topicObj.contentMD}}</p>
			</v-col>
			<v-col class="pa-0">
				
				<div v-for="r in resources" style="background-color: grey; height: 150px" class="ma-2" >
					<iframe width="100%" :src="`https://www.youtube.com/embed/${r.url}`" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
import store from "@/store";
export default {
	props: {
		topicObj: Object,
		resources: Array
	},
	computed: {
		// resources() {
		// 	return this.$store.state.resources.filter(r => r.parentID === this.$props.topicObj.id && r.resourceType === 'video')
		// }
	},
}
</script>
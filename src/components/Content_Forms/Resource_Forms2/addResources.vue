<template>
<div id='app'>
	<h3 class="font-weight-medium text-center pb-4"><u>Add Resources</u></h3>
	<v-expansion-panels multiple focusable>

		<v-expansion-panel v-for="(p, i) in panels" :key="i">
			<v-expansion-panel-header>{{p}}</v-expansion-panel-header>
			<v-expansion-panel-content>

				<article-panel v-if="p == 'Articles'" :parentID="parentID" :parentType="parentType"></article-panel>

				<image-panel v-if="p == 'Images'" :parentID="parentID" :parentType="parentType"></image-panel>

				<video-panel v-if="p == 'Videos'" :parentID="parentID" :parentType="parentType"></video-panel>

			</v-expansion-panel-content>
		</v-expansion-panel>

	</v-expansion-panels>
</div>
</template>


<script>
import articlePanel from './articlePanel.vue'
import imagePanel from './imagePanel.vue'
import videoPanel from './videoPanel.vue'
import { db } from '@/main'
import store from "@/store";
import firebase from 'firebase'

export default {
	props: {
		parentID: String,
		parentType: String
	},
	components:{
		articlePanel,
		imagePanel,
		videoPanel
	},
	data: function () {return {
		panels: [ 'Articles', 'Images', 'Videos']
	}}
}
</script>
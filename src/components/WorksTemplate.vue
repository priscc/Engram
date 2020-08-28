<template>
	<v-col>
		<v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
			<v-col class="pt-0">
				<h2 class="font-weight-light">The {{topicObj.title}}</h2>
			</v-col>
		</v-row>
		<v-row class="pt-5">
			<v-col v-for="(work, i) in works" :key="i" class="pb-2" cols="6">
			<v-card class="mx-auto d-flex" outlined>
				<v-btn x-small fab absolute top right @click="[overlay = true, workDialog = work]"><v-icon>mdi-arrow-expand</v-icon></v-btn>
				<v-container>
					<v-row>
						<v-col class="pa-0">
							<v-card-title class="subtitle-1 py-0 preview truncateTitle">
								{{work.title}}
							</v-card-title>
						</v-col>
					</v-row>
					<v-row>
						<v-col v-if="work.thumbURL" class="pa-0" cols="4">
							<v-avatar class="ma-3 mb-0" size="135" tile>
								<v-img :src="work.thumbURL" width="100%"></v-img>
							</v-avatar>
						</v-col>
						<v-col class="py-0" style="min-height:150px ">
							<v-card-subtitle class="preview truncateCaption pa-0 pl-3 pt-6 pr-6">
								{{work.caption}}
							</v-card-subtitle>
						</v-col>
					</v-row>
					
				</v-container>
			</v-card>
			</v-col>
		</v-row>
	
		<!-- Overlay -->
		<v-dialog v-model="overlay" width="500">
			<v-card class="mx-auto d-flex pb-4" outlined>
				<div>
					<v-btn color="orange lighten-1" small fab absolute  right dark rounded  @click="overlay = false">
						<v-icon dark>mdi-close</v-icon>
					</v-btn>
					<div height="100px" width="100px">
						<v-img :src="workDialog.thumbURL" aspect-ratio="2.3"></v-img>
					</div>
					<div class="mr-1">
						<v-card-title class="subtitle-1"><p class="preview">{{workDialog.title}}</p></v-card-title>
						<v-card-subtitle><p class="preview">{{workDialog.caption}}</p></v-card-subtitle>
					</div>
				</div>
			</v-card>
		</v-dialog>
	</v-col>
</template>

<script>
import { db } from '@/main'
export default {
	props: {
		topicObj: Object,
		works: Array
	},
	data () { return {
		workDialog: {},
		overlay: false,
	}}
}
</script>

<style scoped>
	.cardCaption{
		min-height: 100px !important;
		height: 100px !important;
	}
	#tooltip{
		border-color: 1px solid black;
	}
	.preview {
		-webkit-hyphens: auto;
		-moz-hyphens: auto;
		-ms-hyphens: auto;
		hyphens: auto;
	}
	.truncateTitle {
		display: block;
		display: -webkit-box;
		max-width: 100%;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.truncateCaption {
		display: block;
		display: -webkit-box;
		max-width: 100%;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

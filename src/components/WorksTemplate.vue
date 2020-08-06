<template>
		<v-col >
				<v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
					<v-col class="pt-0">
						<h2 class="font-weight-light">The {{topicObj.title}}</h2>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-for="(work, i) in works" :key="i" class="px-5 pb-2" lg="6" md="6" sm="12">
					<v-card class="mx-auto  d-flex justify-space-between" outlined>
						 <div class="d-flex flex-no-wrap justify-space-between">
							<v-avatar class="ma-3" size="125" tile>
								<v-img :src="work.thumbURL" width="100%"></v-img>
							</v-avatar>
							<div>
								<v-card-title class="subtitle-1">{{work.title}}</v-card-title>
								<v-card-subtitle class="preview">{{work.description}} ljcbdlsjkvbe</v-card-subtitle>
							</div>
						</div>
					</v-card>
					</v-col>
				</v-row>
		</v-col>
</template>

<script>
import { db } from '@/main'
export default {
	props: {
		topicObj: Object,
		works: Array
	}
}
</script>

<style scoped>
	#tooltip{
		border-color: 1px solid black;
	}
	.preview {
		max-width: 500px;
		margin: 0 auto;
		width: 100%;
		text-align: justify;
	}
	.preview {
		-webkit-hyphens: auto;
		-moz-hyphens: auto;
		-ms-hyphens: auto;
		hyphens: auto;
	}
</style>

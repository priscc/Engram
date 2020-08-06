<template>
<div id='app'>
	<h3 class="Subtitle-1 font-weight-bold text-center pb-4"><u>Add Resources</u></h3>
	<v-expansion-panels multiple focusable v-model="panel">
		<!-- Articles -->
		<v-expansion-panel>
			<v-expansion-panel-header>Articles</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>
				<!-- Display articles -->
					<v-col v-for="(i, index) in articles" :keys="index" cols="4">
						<v-card class="pa-2"outlined >
							<v-btn x-small absolute dark fab top right color="blue-grey lighten-3" @click="removeResource(index, articles)">
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<p>{{i.title}}</p>
							<p class="caption">{{i.link}}</p>
						</v-card>
					</v-col>
				<!-- Add article -->
					<v-col cols="4">
						<add-articles :type="'event'" @updateResource="updateResource"></add-articles>
					</v-col>
				</v-row>
				<!-- Saving articles -->
				<v-row class="d-flex justify-end">
					<v-btn large color="error" rounded
						@click="saveResource(0, articles, 'articles')">
						Save
						<v-icon class="ml-2">mdi-cloud-upload</v-icon>
					</v-btn>
				</v-row>	
			</v-expansion-panel-content>
		</v-expansion-panel>
		
		<!-- Images -->
		<v-expansion-panel>
			<v-expansion-panel-header>Images</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>
				<!-- Display images -->
					<v-col v-for="(i, index) in images" :keys="index" cols="4">
						<v-card class="pa-2"outlined >
							<v-btn x-small absolute dark fab top right color="blue-grey lighten-3" @click="removeResource(index, images)">
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<v-img max-height="70" max-width="100%" :src="i.preview" style="border: 1px solid black"></v-img>
							<p class="caption">{{i.caption}}</p>
						</v-card>
					</v-col>
				<!-- Add image -->
					<v-col cols="4">
						<add-images :type="'event'" @updateResource="updateResource"></add-images>
					</v-col>
				</v-row>
				<!-- Saving images -->
				<v-row class="d-flex justify-end">
					<v-btn large color="error" rounded
						@click="saveResource(1, images, 'images')">
						Save
						<v-icon class="ml-2">mdi-cloud-upload</v-icon>
					</v-btn>
				</v-row>	
			</v-expansion-panel-content>
		</v-expansion-panel>

	</v-expansion-panels>
</div>
</template>


<script>
import addArticles from './addArticles.vue'
import addImages from './addImages.vue'

export default {
	props: {
		resetBool: Boolean
	},
	components:{
		addArticles,
		addImages
	},
	data: function () {return {
		panel: [],
		articles: [],
		images: []
	}},
	methods:{
		// receiving new resource from child form 
		updateResource(r, type){
			if (type == "article") {
				this.articles.push(r)
			}
			else if (type == "image") {
				this.images.push(r)
			}
		},

		// remove resource for resource array
		removeResource(i, arr){
			arr.splice(i, 1)
		},

		// sending a resource arr to parent
		saveResource(i, resourceArr, type){
			const index = this.panel.indexOf(i);
			if (index > -1) {
			  this.panel.splice(index, 1);
			}
			this.$emit('resourceArray', resourceArr, type)
		}
	},
	watch: {
		resetBool: function(){
			this.articles = []
			this.images = []
		}
	}
}
</script>
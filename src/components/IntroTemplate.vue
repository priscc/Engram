<template>
	<v-col>
		<v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
			<v-col class="pt-0">
				<h2 class="font-weight-light">Introduction to {{topicObj.title}} ({{topicObj.startDate}} - {{topicObj.endDate}})</h2>
			</v-col>
		</v-row>
		<v-row class="pt-5">
			<v-col cols="3">
				<v-img aspect-ratio="1.2" width="270px" height="200px" :src="topicObj.mapThumbURL" style="border: .5px solid lightgrey " ></v-img>
			</v-col>
			<v-col class="pt-6" lg="7" md="7" sm="9">
				<p class="mb-0" :key="topicObj.contentMD" v-markdown>{{topicObj.contentMD}}</p>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>

		<v-row class="pt-10">
			<v-col class="pr-9" lg="6" md="6" sm="12">
				<v-row>
					<v-col>
						<h2 class="text-center font-weight-light">Additional Resources</h2>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-for="video in  videos" cols="6" class="pt-0 pb-5">
						<v-card class="mx-auto" color="grey lighten-4">
							<iframe width="100%" :src="`https://www.youtube.com/embed/${video.url}`" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							<div class="body-2 px-2 pb-1">{{video.title}}</div>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
			
			<v-col class="pl-9" lg="6" md="6" sm="12">
				<v-row>
					<v-col>
						<h2 class="text-center font-weight-light">Influences Seen Today</h2>
					</v-col>
				</v-row>
				<v-row v-for="article in articles" class="pb-5">
					<v-card>
						<div class="d-flex flex-no-wrap justify-space-between">
							<div class="mb-5">
								<v-card-subtitle class="pb-0" style="font-size: 10px" v-text="article.newsSource"></v-card-subtitle>
								<p class="preview pt-1 pl-4 ma-0" style="font-size: 20px"> {{article.title}}</p>
								</v-card-title>
								<v-card-subtitle class="caption pt-1 py-0" v-text="article.published"></v-card-subtitle>
								<v-card-subtitle class="truncate" style="height: 80px; font-size: 14px" >
									<p>{{article.summary}}</p>
								</v-card-subtitle>
							</div>
							<div class="d-flex flex-column justify-end align-end">
								<v-avatar v-if="article.articleURL"  class="ma-3 ml-0" size="100" tile style="border: 1px solid lightgrey">
									<v-img :src="article.articleURL"></v-img>
								</v-avatar>
								<v-card-actions>
									<v-btn text color="deep-purple accent-4" :href="article.url" target="_blank" > Read More</v-btn>
								</v-card-actions>
							</div>
						</div>
					</v-card>
				</v-row>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
import store from "@/store";
export default {
	props: {
		topicObj: Object,
		videos: Array,
		articles: Array
	}
}
</script>

<style type="text/css" scoped>
    .truncate {
		display: block;
		display: -webkit-box;
		max-width: 100%;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
<template>
	<!-- id is needed so Home.vue can import/grab html content in the id "timePeriods" form '@/components/timePeriods.vue' -->
	<div id="timePeriods">
		<div class="border">
			<div class="row">
				<div class="col">
					<h4 class="bg-dark text-light text-left p-2 m-0">{{header}}</h4>
				</div>
			</div>
			<div class="container">
				<!-- :key allows Vue in making a better job of recognizing each element on the list -->
				<div class="row" v-for="(array, index) in arryInThrees" :key="index">
					<topic-components class="col-sm-4 p-0" v-for="(subtopic, index) in array" :key="index" :subtopicTitle="subtopic.name" :url="subtopic.url" :img="subtopic.img"/>
				</div>
			</div>
		</div>
	</div> <!-- end of #timePeriods -->
</template>



<script>
import topicComponents from '@/components/TopicComponents.vue'
export default {
	name: 'timePeriods',
	components: { 
		topicComponents //translated to topic-components tage
	},
	props: {
		header: String,
		subtopics: Array
	},
	computed:{
		arryInThrees() {
			return this._.chunk(this.subtopics, 3);
		}
	}
}
</script>

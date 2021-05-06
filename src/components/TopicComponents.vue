<template>
	<!-- id is needed so Home.vue can import/grab html content in the id "timePeriods" form '@/components/timePeriods.vue' -->
	<div id="topicComponents">
		<router-link class="col-sm text-break nav-link p-0" :to="`${url}`">
		<div class="border container" style="height: 100%;">
			<div class="row">
				<img class="col-sm text-break" alt="Subtopic Icon" :src="require(`@/assets/${img}`)">
			</div>
			<div class="row">
				<p class="col text-center text-break">{{subtopicTitle}}</p>
			</div>
		</div>
		</router-link>
	<router-view/>
	</div> <!-- end of #timePeriods -->

</template>



<script>
export default {
	name: 'topicComponents',
	props: {
		subtopicTitle: String,
		url: String,
		img: String
	},
	data(){
		return{
			name: "logo.png"
		}
	}
	
}
</script>

<style type="text/css">
	#topicComponents:hover{
		border: solid rgba(0, 0, 0, 0.2) 1.25px;
		/*box-shadow: 0 1px 1px 0 yellow;*/
	}
</style>

<template>
<b-container class="pt-5">
	<b-row class="mb-5" v-for="(arrayOfHeaders, index) in arryInThrees" :key="index">
		<time-periods class="col-sm-6" v-for="(header, index) in arrayOfHeaders" :key="index" :header="header.header" :subtopics="header.subtopics"/>
	</b-row>
</b-container>
</template>

<script>
// @ is an alias to /src
import timePeriods from '@/components/TimePeriods.vue'

export default {
	name:'Home',
	components: { 
		timePeriods //translated to time-periods tage
	},
	data() { 
		return {
			topicHeaders: [
				{header: "Time Period 1",
				// subtopics: ['Buddhism', 'Mongol Empire', 'Middle Ages', 'Aztecs']
				subtopics:[ 
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"}
					]
				}, 
				{header: "Time Period 2",
				// subtopics: ['African Kingdoms', 'Islamic Empires', 'Renaissance', 'North American Colonies']
				subtopics:[ 
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"}
					]
				}, 
				{header: "Time Period 3",
					subtopics:[ 
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"},
						{img:"img1.png", name: 'American Rev', url: "/Topics"}
					]
				}
			]
		}
	},
	computed:{
		arryInThrees() {
			return this._.chunk(this.topicHeaders, 2);
		}
	}
}
</script>

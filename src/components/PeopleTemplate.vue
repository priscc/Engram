<template>
	<v-col style="padding-bottom: 100px">
		<v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
		  <v-col class="pt-0">
			<h2 class="font-weight-light">Historical Figures of {{topicObj.title}} ({{topicObj.startDate}} - {{topicObj.endDate}})</h2>
		  </v-col>
		</v-row>

		<v-row class="pt-5">
		  <v-col class="d-flex justify-center " v-for="(p, i) in people" :key="i" lg="3" md="4" sm="4" xs="12">
			<router-link :to="`/PeoplePage/${p.id}`">
			<v-hover>
			  <template v-slot:default="{ hover }" >
				<v-img class="profile mx-auto" max-width="120px" min-width="120px" min-height="150px" aspect-ratio="1" :src="p.thumbURL">
				<v-fade-transition>
				  <v-overlay v-if="hover" absolute dark>
					  <p>Learn More</p>
				  </v-overlay>
				</v-fade-transition>
				</v-img>
			  </template>
			</v-hover>
			<p class="subtitle-2 pt-2 text-center" style="font-size: 12px;">{{p.name}}</p>
			</router-link>
		  </v-col>
		</v-row>
	</v-col>
</template>


<script>
import { db, analytics } from '@/main'
export default {
	props: {
		topicObj: Object,
		people: Array
	},
	mounted (){
		analytics.logEvent('Topic_People', { topic: this.$props.topicObj.title } );
	}
}
</script>


<style scoped>
	.profile{
		border: 1px solid black;
		border-radius: 50%;
	}
</style>

<template>
<div id="app">
	<v-container fluid style="padding-left: 5%; padding-right: 5%;">
		<v-row>
			<v-spacer></v-spacer>
			<v-col class="text-center" cols="7">
				<p class=" font-weight-light pt-6 pb-12" style="font-size: 25px;text-decoration: underline red;"> We appreciate your feedback because it is core to our development process.</p>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>

		<v-row>
			<v-col cols="7">
				<p class=" headline mb-0 pb-3"><u>Our Design Evolution</u></p>
				<p class="mb-0">Over the last year, this site has evolved in response to the feedback and thoughts of educators and students. From a PowerPoint presentation to a clickable prototype, this site's design has been continually modified to enhance how students and educators interact with content. Looking forward, we are eager to implement new and thoughtful ways this site can evolve to help educators and students in World History. </p>
				
				<v-row>
					<v-col v-for="i in versions" cols="4" >
						<v-card max-width="300"class="mx-auto" flat>
							<v-card-text class="body-1 text-center font-weight-light pb-0">{{i.headline}}</v-card-text>
							<v-img :src="i.img" height="200" style="border: 1px solid lightgrey"></v-img>
							<v-btn v-if="i.url" :href="i.url" target="_blank" class="px-0 d-flex justify-end" text color="orange accent-3"> View Prototype</v-btn>
						</v-card>
					</v-col>
				</v-row>
			</v-col>

			<v-col>
				<v-row class="text-center pl-10">
					<v-col class="px-12 pt-0">
						<v-card class="pa-5" outlined>
							<v-card-text class="headline">Please take this 5 min Survey so we can hear your thoughts.</v-card-text>
							<v-btn color="red" href="https://forms.gle/1G4jKBXWZFjsXPKV9" target="_blank" @click="Survey" large dark> Survey </v-btn>
						</v-card>
					</v-col>
				</v-row>
				<v-row class="text-center pl-10">
					<v-col class="px-12">
						<v-card class="pa-4" outlined>
							<v-card-text class="headline">If you are a student or educator and would like to help add or modify content, please send us your email.</v-card-text>
							<v-btn color="light-blue accent-3" href="https://forms.gle/arBbH8MkfV1yhabn9" target="_blank" outlined large dark> Share email </v-btn>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<div style="height: 100px"></div>
	</v-container>
</div>
</template>

<script type="text/javascript">
import { firebase, db, analytics} from "@/main";
import store from "@/store";
export default {
	data (){ return {
		versions: [
			{ headline: 'Sept. 2019', img: require('@/assets/prototype1.png') },
			{ headline: 'Dec. 2019', img: require('@/assets/prototype2.png'), 
				url: 'https://www.youtube.com/watch?v=t9XTo2dGrVs&feature=youtu.be' },
			{ headline: 'Feb. 2020', img: require('@/assets/prototype3.png'), 
				url: 'https://www.figma.com/proto/81ooMCkE4bom6axTGvJG7q/World-History-Map-(final)?node-id=213%3A144&scaling=min-zoom' },
		]
	}},
	methods:{
		Survey(){
			analytics.logEvent('Feedback_Page_Survey');
		}
	},
	mounted (){
		analytics.logEvent('Feedback_Page');
	}
}
</script>









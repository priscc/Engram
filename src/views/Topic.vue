<template>
<v-container class="px-12" fluid height="100%">
	<v-row>
		<!-- Side bar tabs -->
		<v-col class="topicsSideBar">
			<v-row>
				<v-col class="pt-0">
					<v-avatar size="32">
						<v-btn color="orange lighten-1" dark rounded style="height: 100%;" to="/">
							<v-icon dark>mdi-arrow-left</v-icon>
						</v-btn>
					</v-avatar>
				</v-col>
			</v-row>

			<v-card tile>
				<v-list>
					<v-list-item-group v-model="item" color="orange" >
						<v-list-item class="py-1 mb-4" v-for="(item, i) in items" :key="i" @click="topicTab = item.title">
							<v-list-item-icon class="mr-2 SideBar_icon">
								<v-icon v-text="item.icon" small></v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title class="SideBar_text" v-text="item.title"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-card>
		</v-col>

	<!-- 	<v-row>
			<v-col>
				<v-card class="overflow-hidden">
					<v-app-bar

					:height="height"
					:collapse="!collapseOnScroll"
					
					color="deep-purple accent-4"
					dark
					>
					<v-app-bar-nav-icon v-if="collapse" @click="[collapse = !collapse, height = 50]"></v-app-bar-nav-icon>
					<v-app-bar-nav-icon v-else @click="[collapse = !collapse, height = 200]"></v-app-bar-nav-icon>

					</v-app-bar>
					</v-card>
			</v-col>

		</v-row>
 -->


		<!-- Another side comp -->
		<!-- <v-row>	
				<v-card>
					<v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent >
						<v-list-item class="px-2 d-flex justify-end">
							<v-btn small v-if="!mini"  icon @click.stop="mini = !mini"><v-icon>mdi-chevron-left</v-icon></v-btn>
							<v-btn v-else small icon @click.stop="mini = !mini"><v-icon>mdi-chevron-right</v-icon></v-btn>
						</v-list-item>
						<v-divider></v-divider>
						<v-list dense>
							<v-list-item v-for="item in items" :key="item.title" link @click="topicTab = item.title" >
								<v-list-item-icon>
									<v-icon>{{ item.icon }}</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>{{ item.title }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-navigation-drawer>
				</v-card>
			</v-row> -->



		<!-- Right Comps -->
		<intro-template v-if="topicTab == 'Intro'" 
			:topicObj="topicObj"></intro-template>
		<event-template v-else-if="topicTab == 'Events'" 
			:events="events" :topicObj="topicObj"></event-template>
		<terminology-template v-else-if="topicTab == 'Terminology'"  
			:terminology="terminology" :topicObj="topicObj"></terminology-template>
		<people-template v-else-if="topicTab == 'Historical People'" 
			:people="people" :topicObj="topicObj"></people-template>
		<works-template v-else-if="topicTab == 'Works of the Time'" 
			:works="works" :topicObj="topicObj"></works-template>
	</v-row>
</v-container>
</template>



<script>
import introTemplate from '@/components/IntroTemplate.vue'
import eventTemplate from '@/components/EventTemplate.vue'
import terminologyTemplate from '@/components/TerminologyTemplate.vue'
import peopleTemplate from '@/components/PeopleTemplate.vue'
import worksTemplate from '@/components/WorksTemplate.vue'
import { db, tc } from "@/main";
export default {
	components: {
		introTemplate,
		eventTemplate,
		terminologyTemplate,
		peopleTemplate,
		worksTemplate
	},
	data () { return {
		id: this.$route.params.id,
		topicObj: {},
		events: [],
		people: [],
		terminology: [],
		works: [],

		// Bottom Navbar
		collapse: true,
		topicTab: 'Intro',
		item: 0,
		items: [
			{ title: 'Intro', icon: 'mdi-bookmark' },
			{ title: 'Events', icon: 'mdi-clock-start' },
			{ title: 'Terminology', icon: 'mdi-view-dashboard' },
			{ title: 'Historical People', icon: 'mdi-account' },
			{ title: 'Works of the Time', icon: 'mdi-lightbulb-outline' }
		]
	}},
	methods: {
		async grabTopic (){

			// grabbing topic
			var tcID = await db.collection('topics').doc(this.id).get().then(function(doc) {
				var ref = doc.id
				this.topicObj = doc.data()
				this.topicObj.topicID = ref
				return ref
			}.bind(this))

			// grabbing events
			db.collection('events').where('topicID', '==', tcID)
				.get().then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						var entry = doc.data()
						entry.id = doc.id
						this.events.push(entry)
					}.bind(this));
				}.bind(this))

			// grabbing people
			db.collection('people').where('topicID', '==', tcID)
				.get().then(function(querySnapshot) {
					if (querySnapshot.docs.length == 0) querySnapshot = undefined
					querySnapshot.forEach(function(doc) {
						var entry = doc.data()
						entry.id = doc.id
						this.people.push(entry)
					}.bind(this));
				}.bind(this))

			// grabbing terms
			db.collection('terminology').where('topicID', 'array-contains', tcID)
				.get().then(function(querySnapshot) {
					if (querySnapshot.docs.length == 0) querySnapshot = undefined
					querySnapshot.forEach(function(doc) {
						this.terminology.push(doc.data())
					}.bind(this));
				}.bind(this))

			// grabbing works
			db.collection('works').where('topicID', '==', tcID)
				.get().then(function(querySnapshot) {
					if (querySnapshot.docs.length == 0) querySnapshot = undefined
					querySnapshot.forEach(function(doc) {
						this.works.push(doc.data())
					}.bind(this));
				}.bind(this))
		},

		back () {
			console.log(this.$router.go(-1))
		}
	},
	mounted(){
		this.grabTopic()
	}
}
</script>




<style type="text/css" scoped>
	html {
		scroll-behavior: smooth;
	}
	hr.vertical {
		width: .5px;
		background-color: silver;
		height: 400px;
		border: 2px solid silver;
		border-radius: 2px;
		margin-left: 25%;
		margin-right: 25%;
	}
	.topicsSideBar{
		max-width: 18% !important;
		min-height: 100%;
	}
	.SideBar_text {
		font-size: 13px;
	}
	@media screen and (max-width: 780px) {
		.SideBar_icon{
			max-width: 10%;
		}
		.SideBar_text {
			font-size: 12px;
		}
	}
	@media screen and (max-width: 425px) {
		.topicsSideBar{
			min-width: 100%;
		}
	}

	/* inspired by: https://vuejsexamples.com/horizontal-timeline-with-vue-and-swiperjs/ */
</style>

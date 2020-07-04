Inital Topic Page Layout

(left side bar) | (right content) - components
	Events		|	events-page
	Terminology	|	terminology-page
	People		|	people-page

<template>
<v-container class="px-12" fluid>
	<!-- BREADCRUMB -->
	<v-row>
		<v-col cols="1" >
			<v-avatar size="32">
				<v-btn color="blue lighten-2" dark rounded style="height: 100%;" @click="back">
					<v-icon dark>mdi-arrow-left</v-icon>
				</v-btn>
			</v-avatar>
		</v-col>
		<v-col>
			<h2><u>{{header}}</u></h2>
		</v-col>
		<v-col></v-col>
	</v-row>
	<!-- Left sidebar -->
	<v-row>
		<v-col class="topicsSideBar">
			<v-card tile >
				<v-list>
					<v-list-item-group v-model="item" color="primary">
						<!-- Side bar -->
						<v-list-item class="py-1 mb-4" v-for="(item, i) in items" :key="i" @click="submit(item.title)">
							<!-- Side bar icons -->
							<v-list-item-icon class="mr-2 SideBar_icon">
								<v-icon v-text="item.icon" small></v-icon>
							</v-list-item-icon>
							<!-- Side bar items -->
							<v-list-item-content>
								<v-list-item-title class="SideBar_text" v-text="item.title"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-card>
		</v-col>
	<!-- Right content (changes dep on page) -->
	<!-- col is added in component -->
		<intro-template v-if="TopicContentSelect == 'Intro'" />
		<event-template v-else-if="TopicContentSelect == 'Events'" :causes="causes" :turningP="turningP" :effects="effects"/>
		<terminology-template v-else-if="TopicContentSelect == 'Terminology'"></terminology-template>
		<people-template v-else-if="TopicContentSelect == 'Historical People'"></people-template>
	</v-row>
</v-container>
</template>

<script>
import { db } from '@/main'
import introTemplate from '@/components/IntroTemplate.vue'
import eventTemplate from '@/components/Events/EventTemplate.vue'
import terminologyTemplate from '@/components/TerminologyTemplate.vue'
import peopleTemplate from '@/components/PeopleTemplate.vue'

export default {
  name: 'Topics',
  components: {
    introTemplate,
    eventTemplate,
    terminologyTemplate,
    peopleTemplate
  },
  data () {
    return {
      id: this.$route.params.id,
      header: '',
      TopicContentSelect: '',
      item: 0,
      items: [
        { title: 'Intro', icon: 'mdi-bookmark' },
        { title: 'Events', icon: 'mdi-clock-start' },
        { title: 'Terminology', icon: 'mdi-view-dashboard' },
        { title: 'Historical People', icon: 'mdi-account' },
        { title: 'Works of the Time', icon: 'mdi-lightbulb-outline' }
      ],
      causes: [],
      turningP: [],
      effects: []
    }
  },
  methods: {
    // move into EventTemplate
    async parseEventType () {
      this.header = await db.collection('*SEARCH').where('collectionName', '==', this.id).get().then(function (querySnapshot) {
        var x
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          x = doc.data().name
        })
        return x
      })
      // header console.log(todosRef1)

      const todosRef = db.collection(this.id).doc('Events')
      var x = await todosRef.get().then(function (doc) {
        var all = []
        var c = []
        var tp = []
        var e = []
        doc.data().events.forEach(doc => {
          if (doc.eventType == 'Cause') { c.push(doc) } else if (doc.eventType == 'Turning Point') { tp.push(doc) } else { e.push(doc) }
        })
        all.c = c
        all.tp = tp
        all.e = e
        return all
			  })
      this.causes = x.c
      this.turningP = x.tp
      this.effects = x.e
    },
    submit (i) {
      this.TopicContentSelect = i
      this.$router.replace(i)
    },
    back () {
      console.log(this.$router.go(-1))
    }
  },
  mounted () {
  	this.TopicContentSelect = this.$route.params.subpage

  	this.item = this.items.findIndex(rank => rank.title === this.TopicContentSelect)

    this.parseEventType()
  }
}
</script>

<style type="text/css" scope>
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

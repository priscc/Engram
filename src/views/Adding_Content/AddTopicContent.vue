** Template: Adding Content to Topic **
 __________________
|   Select topic   |
|__________________|
	(components)
	add-events
	add-terminology
	add-people

***************************************

<template>
<div id="app">
	<v-container>
		<!-- <v-row class="blue-grey darken-2 white--text">
			<v-col>
				<h1 class="pt-5">Add Content to a Topic</h1>
				<blockquote class="blockquote">Fill in the following inputs to add a topic to the home web page</blockquote>
			</v-col>
		</v-row> -->
		<!-- DROP DOWN select topic menu -->
		<v-row class="py-12 mb-6">
			<v-col>
				<v-select v-model="e1" :items="states" menu-props="auto" label="Select topic" hide-details single-line ripple></v-select>
			</v-col>
		</v-row>
		<!-- TOGGLE BAR -->
		<!-- e1, shows toggle content type nav bar -->
		<v-row v-if="e1 != '' ">
			<v-col>
				<v-bottom-navigation class="mb-6" v-model="bottomNav" shift style="height: 80px;" color="pink">
					<!-- displays toggle bar options -->
					<v-btn class="mx-5" v-for="(item, index) in items" :key="index">
						<span class="display-5">{{ item.title }}</span>
						<v-icon x-large>{{ item.icon }}</v-icon>
					</v-btn>
				</v-bottom-navigation>
					<!-- Different Content Forms -->
					<add-events v-if="bottomNav == 0" :topicSelected="e1"></add-events>
			</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script>
import addEvents from '@/components/AddEvents.vue'
import { db } from '@/main'
export default {
  components: {
    addEvents
  },
  data: function () {
    return {
      // Drop down
      e1: '',
      states: [],
      // For toggle bar
      bottomNav: 0,
      item: 0,
      items: [
        { title: 'Events', icon: 'mdi-clock-start' },
        { title: 'Terminology', icon: 'mdi-view-dashboard' },
        { title: 'Historical People', icon: 'mdi-account' }
      ]
    }
  },
  methods: {
    // readSearch: mounted to add Topics to auto-fill search list
    readSearch () {
      const todosRef = db.collection('*TIME_PERIODS')
      todosRef.get().then(snapshot => {
        var todos = []
        snapshot.forEach(doc => {
          doc.data().topics.forEach(i => {
            todos.push(i.topicTitle)
          })
        })
        this.states = todos
      })
    }
  },
  mounted () {
    this.readSearch()
  }
}
</script>

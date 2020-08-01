<template>
<div id="app">
  <!-- Header -->
  <v-container>
    <v-row class="blue-grey darken-2 white--text text-center">
      <v-col>
        <h1 class="display-1">Add Content to a Topic</h1>
        <blockquote class="blockquote pa-0">Select a topic below</blockquote>
      </v-col>
    </v-row>
    <!-- Drop dowan -->
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="7">
        <v-select v-model="topic" :items="topics" menu-props="auto" label="Select a topic"  single-line ripple @change="locatingCollection"></v-select>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
  <!-- Topic Components -->
  <v-container fluid>
    <v-row v-if="topic != '' ">
      <v-col>
        <!-- Tab bar -->
          <v-card outlined>
            <v-tabs v-model="tab" @change="mountedEvents" centered icons-and-text color="pink">
              <v-tabs-slider></v-tabs-slider>
              <v-tab class="py-2" v-for="(t, i) in tabs" :key="i" :href="`#`+t.doc">
                <p class="caption">{{t.title}}</p>
                <v-icon medium>{{t.icon}}</v-icon>
              </v-tab>
            </v-tabs>
          </v-card>
          <!-- Different Content Forms -->
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(t, i) in tabs" :key="i" :value="t.doc" >
              <add-events v-if="tab == 'Events'" :topicSelected="topic" :collection="topic" :events="items" @updateTopic="updateTopic"></add-events>
              <add-term v-if="tab == 'Terminology'" :topicSelected="topic" :collection="topic" :items="items" @updateTopic="updateTopic"></add-term>
              <add-people v-if="tab == 'People'" :topicSelected="topic" :collection="topic" :items="items" @updateTopic="updateTopic"></add-people>
              <add-works v-if="tab == 'Works'" :topicSelected="topic" :collection="topic" :items="items" @updateTopic="updateTopic"></add-works>
            </v-tab-item>
          </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
// import addEvents from '@/components/AddEvents.vue'
import addEvents from '@/components/Content_Forms/EventsForm.vue'
import addTerm from '@/components/Content_Forms/TerminologyForm.vue'
import addPeople from '@/components/Content_Forms/PeopleForm.vue'
import addWorks from '@/components/Content_Forms/WorksForm.vue'
import { db } from '@/main'
export default {
  components: {
    addEvents,
    addTerm,
    addPeople,
    addWorks
  },
  data: function () {
    return {
      // Drop down
        topics: [],
      // Toggle bar
        tab: 'Events',
        tabs: [
          { title: 'Events', icon: 'mdi-clock-start', doc: 'Events' },
          { title: 'Terminology', icon: 'mdi-view-dashboard', doc: 'Terminology' },
          { title: 'Historical People', icon: 'mdi-account', doc: 'People' },
          { title: 'Works of The Time', icon: 'mdi-book-open-variant', doc: 'Works' }
        ],
      // sending to components
        items: [],
        topic: '',
        collectionName: '',
    }
  },
  methods: {

    // readSearch: mounted to add Topics to auto-fill search list
    async listTopics () {
      // const todosRef = db.collection('topics').get().then(doc => {
      //     doc.forEach(doc => {
      //       this.topics.push(doc.data().topic)
      //     })
      //   })
      const todosRef = await db.collection('*TIME_PERIODS')
      todosRef.get().then(snapshot => {
        var todos = []
        snapshot.forEach(doc => {
          doc.data().topics.forEach(i => {
            todos.push(i.topicTitle)
          })
        })
        this.topics = todos
      })
    },

    // locatingCollection: finds collection name
    async locatingCollection () {
      this.collectionName = await db.collection('*SEARCH').where('name', '==', this.topic).get().then(querySnapshot => {
          return querySnapshot.docs[0].data().collectionName
      })
      this.mountedEvents()
    },

    // mountedEvents: adding events to the right
    async mountedEvents () {
      this.events = []
      var todosRef = db.collection(this.collectionName).doc(this.tab)
      this.items = await todosRef.get().then(function (doc) {
        var x = []
        if (this.tab == 'Events'){
          console.log(doc.data())
          doc.data().events.forEach(doc => {
            x.push(doc)
          })
        }
        else{
          doc.data().items.forEach(doc => {
            x.push(doc)
          })
        }
        return x
      }.bind(this))
    },

    async updateTopic(e){
      var updates = await db.collection(this.collectionName).doc(this.tab)
      
      if (this.tab == 'Events'){
        updates.update({ events: e })
      }
      else{
        updates.update({ items: e })
      }
      this.mountedEvents()
    }

  },
  mounted () {
    this.listTopics()
  }
}
</script>
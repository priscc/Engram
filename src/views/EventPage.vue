<template>
	<v-container class="px-12" fluid>
		<v-row>
			<v-col cols="1">
				<v-avatar size="32">
					<v-btn color="blue lighten-2" dark rounded style="height: 100%;" @click="back">
						<v-icon dark>mdi-arrow-left</v-icon>
					</v-btn>
				</v-avatar>
			</v-col>
			<v-col>
					<h2 class="event-header"><u>{{event.eventTitle}}</u></h2>
					<div class="pl-5 event-header align-self-end font-weight-light font-italic">( {{event.date}} )</div>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="1"></v-col>
			<v-col>
					<h4><u>Event Content Below</u></h4>
					<div :key="event.content" v-markdown>{{event.content}}</div>
          
          <div v-for="i in event.resources.images">
            <v-img height="150" width="100" :src="i.file" ></v-img>
          </div>
          <div v-for="i in event.resources.articles">
            <p>{{i.title}}</p>
          </div>
          <div v-for="i in event.resources.videos">
            <p>{{i.title}}</p>
            <p>{{i.link}}</p>
          </div>
          
			</v-col>
			<v-col>
				<resources v-for="resource in resources" :key="resource.header" :resource="resource"></resources>
			</v-col>
		</v-row>

	</v-container>
</template>

<script>
import { db } from '@/main'
import resources from '@/components/Resources.vue'

export default {
  components: {
    resources
  },
  data () {
    return {
      id: this.$route.params.id,
      topic: this.$route.params.topic,
      event: '',
      header: {},
      overlay: false,
      resources: [
        {
          header: 'Images',
          img: [
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' }
          ]
        },
        {
          header: 'Videos',
          img: [
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' }
          ]
        },
        {
          header: 'Books',
          img: [
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' }
          ]
        },
        {
          header: 'Podcasts',
          img: [
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' },
            { src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', caption: '' }
          ]
        }
      ]
    }
  },
  methods: {

    // back: goes to previous page
    back () {
      this.$router.go(-1)
    },

    // findingEvent: searching for the loction of the event using *SEARCH
    async findingEvent () {
      this.event = await db.collection(this.topic).doc('Events').get().then(function (doc) {
        var v = doc.data().events.filter(function(i) {
          console.log(this.id)
            return i.name == this.id;
        }.bind(this));
        return v[0]
      }.bind(this))
    },

    // pageContent: grabbing the event content from the database
    async pageContent () {
      var id = this.id

      var event = await db.collection('americanrevolution').doc('Events').get().then(function (doc) {
        var dic = doc.data().events.filter(function (element) {
					 return element.eventTitle == id
        })

        return dic[0]
      })
      this.event = event[0]
    }
  },
  mounted () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.findingEvent()
  }
}
</script>




<style scoped>
	.event-header{
		display: inline
	}
	#text{
		position: relative;
		color: white;
		max-height: 90%;
	}
	#button{
		position: absolute;
		top: 10%;
		right: 5%;
		color: white;
		transform: translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
	}
</style>

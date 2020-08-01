<template>
    <v-col style="padding-bottom: 100px">
        <v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
          <v-col class="pt-0">
            <h2 class="font-weight-light">Historical Figures of the {{header}}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(p, i) in people" :key="i" cols="3" md="3" sm="4">
            <router-link to="/PeoplePage">
            <v-hover>
              <template v-slot:default="{ hover }" >
                <v-img class="profile" aspect-ratio="1" :src="p.image">
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute dark>
                      <p>Learn More</p>
                  </v-overlay>
                </v-fade-transition>
                </v-img>
              </template>
            </v-hover>
            <p class="subtitle-2 pt-2 text-center" style="font-size: 12px;">{{p.figureName}}</p>
            </router-link>
          </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'Topics',
  props: {
    causes: Array,
    turningP: Array,
    effects: Array,
    header: String
  },

  data: function () {
    return {
      id: this.$route.params.id,
      people: []
    }
  },
  methods: {

    // readSearch: mounted to add Topics to auto-fill search list
    async pullData () {
      const todosRef = db.collection(this.id).doc('People')
      
      this.people = await todosRef.get().then(doc => {
        return doc.data().items
      })
    }
  },
  mounted(){
    this.pullData()
  }
}
</script>

<style scoped>
    .profile{
        border: 1px solid black;
        border-radius: 50%;
        height: 150px;
        /*height: 100%;*/
        margin-left: 21%;
        margin-right: 21%;
    }
</style>

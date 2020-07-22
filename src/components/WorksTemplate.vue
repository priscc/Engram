<template>
    <v-col >
        <v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
          <v-col class="pt-0">
            <h2 class="font-weight-light">The {{header}}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(n, i) in works" :key="i" lg="4" md="4" sm="6" class="px-5 pb-2">
          <v-card class="mx-auto" max-width="400" outlined>
             <div class="d-flex flex-no-wrap justify-space-between">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="n.image" width="100%"></v-img>
              </v-avatar>
              <div>
                <v-card-title class="subtitle-1">{{n.work}}</v-card-title>
                <v-card-subtitle>{{n.description}} ljcbdlsjkvbe</v-card-subtitle>
              </div>
            </div>
          </v-card>
          </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { db } from '@/main'
import firebase from 'firebase'

export default {
  name: 'Topics',
  props: {
    header: String
  },
  data () {
    return {
        id: this.$route.params.id,
        works: [],
        storageImg: ''
    }
  },
  methods:{
    async pulldata(){
        const todosRef = db.collection(this.id).doc('Works')
        this.works = await todosRef.get().then(function (doc) {
            return doc.data().items
        })

       
        // 

        // const imageRef = await storageRef.child(this.$props.header +'/Works/' +)

        // const download = imageRef.getDownloadURL()

        // console.log(download)
        // this.storageImg = download
    }
  },
  mounted () {
    this.pulldata()
  }
}
</script>

<style scoped>
    #tooltip{
        border-color: 1px solid black;
    }
</style>

<template>
    <v-col style="padding-bottom: 100px">
        <!-- *** HEADER -->
        <v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
            <v-col class="pt-0">
                <h2 class="font-weight-light">Terms of the {{header}}</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col class="text-left">
                <v-row v-for="(term, i) in terminology" :key="i" class="py-5">
                    <v-tooltip right color="grey lighten-3">
                        <template v-slot:activator="{ on, attrs }">
                            <a class="pr-5" color="primary" dark v-bind="attrs" v-on="on">{{term.term}}</a>
                        </template>
                        <p style="max-width: 25em" class="black--text mb-0 py-4 px-3"><i>{{term.definition}}</i></p>
                    </v-tooltip>
                </v-row>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'Topics',
  props: {
    header: String
  },
  data () {
    return {
        id: this.$route.params.id,
        terminology: []
    }
  },
  methods:{
    async pulldata(){
        const todosRef = db.collection(this.id).doc('Terminology')
        this.terminology = await todosRef.get().then(function (doc) {
            return doc.data().items
        })
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

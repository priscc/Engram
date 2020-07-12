<template>
    <v-col >
        <v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
            <v-col class="pt-0">
                <h2 class="font-weight-light">The {{header}}</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="n in 9" :key="n" cols="4" class="px-5 pb-2">
            
                <v-card class="mx-auto" max-width="400" >
                    <v-img class="white--text align-end" height="150px" src="@/assets/notredame.png" >
                      <v-card-title>Top 10 Australian beaches</v-card-title>
                    </v-img>

                    <v-card-text class="text--primary">
                      <div>Whitsunday Island, Whitsunday Islands</div>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </v-col>
</template>

<script>

export default {
  props: {
    header: String
  }
}
</script>
<template>
<v-container>
	<v-row>
		<v-col cols="12" md="6" wrap color="purple" v-for="(period, index) in time_periods" :key="index">
			<timeperiods  :header="period.header" :topics="period.topics" />
		</v-col>
	</v-row>
</v-container>
</template>

<script>
// @ is an alias to /src
import timeperiods from '@/components/TimePeriods.vue'
import { db } from '@/main'

export default {
  name: 'Home',
  components: {
    timeperiods // translated to time-periods tage
  },
  data () {
    return {
      time_periods: []
    }
  },
  methods: {
    async getEvents () {
      const periodRef = await db.collection('*TIME_PERIODS').get().then(snapshot => {
        const appDate = []
        snapshot.forEach(doc => {
          appDate.push(doc.data())
        })
        this.time_periods = appDate
        console.log(this.time_periods)
      })
    }
  },
  mounted () {
    this.getEvents()
  }
}
</script>

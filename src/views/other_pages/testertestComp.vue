<template>

	<div >

		<div  :class="{ 'on-hover': hover }" class="my-2" :style="{border: i.border}" v-for="(i, index) in time[0].times" :key="index" @mouseover="hover(true, index)" @mouseleave="hover(false, index)"> {{i.label}} </div>
	</div>

</template>

<script>
export default {
  props: {
    time: Array
  },
  methods: {
    hover (d, index) {
      if (d) {
        console.log(d)
        var num = this.time[0].times[index].label
        var circle = document.getElementById('circle' + num)
        circle.style.stroke = 'black'
        circle.style.strokeWidth = '2'
      } else {
        var num = this.time[0].times[index].label
        var circle = document.getElementById('circle' + num)
        circle.style.stroke = 'none'
      }
    }
  }
}
</script>

<style type="text/css" scoped>
	.eventText{
		font-size: 12px;
	}
</style>

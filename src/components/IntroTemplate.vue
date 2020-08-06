<template>
	<v-col>
		<v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
			<v-col class="pt-0">
				<h2 class="font-weight-light">{{topicObj.title}} Introduction</h2>
			</v-col>
		</v-row>
		<v-row align="center" justify="center" class="pt-4">
			<v-col class="pa-12">
				<p> Lorem ipsum dolor sit amet, integer rerum urna magna. Quis etiam, tortor gravida aptent ipsum, in nunc nunc pellentesque magna, dui risus velit libero mauris lobortis. Sociosqu congue a hac dictumst suscipit. Eros ut amet, vel ultrices nonummy nunc at nisl, odio cumque sed nullam sodales, dis eu ligula malesuada ut vitae. Per wisi nam sem feugiat, mauris dis consequat, massa cumque nec posuere vitae tincidunt nullam, non ipsum. Aenean consectetuer nonummy natoque justo consequat, praesent nibh sociis malesuada, in vivamus vitae hac, in sed amet, velit sapien scelerisque aliquam. Arcu a tempor at urna massa dolor. Adipiscing amet quam amet orci quisque ac.</p>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
export default {
	props: {
		topicObj: Object
	}
}
</script>
<template>
	<v-col>
		<v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
			<v-col class="pt-0">
				<h2 class="font-weight-light">{{topicObj.title}} Introduction</h2>
			</v-col>
		</v-row>
		<v-row align="center" justify="center" class="pt-4 d-flex">
			<v-col cols="9" class="pl-6 pr-7 align-self-start">
				<p> Lorem ipsum dolor sit amet, integer rerum urna magna. Quis etiam, tortor gravida aptent ipsum, in nunc nunc pellentesque magna, dui risus velit libero mauris lobortis. Sociosqu congue a hac dictumst suscipit. Eros ut amet, vel ultrices nonummy nunc at nisl, odio cumque sed nullam sodales, dis eu ligula malesuada ut vitae. Per wisi nam sem feugiat, mauris dis consequat, massa cumque nec posuere vitae tincidunt nullam, non ipsum. Aenean consectetuer nonummy natoque justo consequat, praesent nibh sociis malesuada, in vivamus vitae hac, in sed amet, velit sapien scelerisque aliquam. Arcu a tempor at urna massa dolor. Adipiscing amet quam amet orci quisque ac.</p>
				<p> Lorem ipsum dolor sit amet, integer rerum urna magna. Quis etiam, tortor gravida aptent ipsum, in nunc nunc pellentesque magna, dui risus velit libero mauris lobortis. Sociosqu congue a hac dictumst suscipit. Eros ut amet, vel ultrices nonummy nunc at nisl, odio cumque sed nullam sodales, dis eu ligula malesuada ut vitae. Per wisi nam sem feugiat, mauris dis consequat, massa cumque nec posuere vitae tincidunt nullam, non ipsum. Aenean consectetuer nonummy natoque justo consequat, praesent nibh sociis malesuada, in vivamus vitae hac, in sed amet, velit sapien scelerisque aliquam. Arcu a tempor at urna massa dolor. Adipiscing amet quam amet orci quisque ac.</p>
			</v-col>
			<v-col class="pa-0">
				
				<div style="background-color: grey; height: 150px" class="ma-2" >
					<iframe width="100%" src="https://www.youtube.com/embed/szxPar0BcMo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
				<div style="background-color: grey; height: 150px" class="ma-2" >
					<iframe width="100%" src="https://www.youtube.com/embed/wUVvTqvjUaM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
				<div style="background-color: grey; height: 150px" class="ma-2" >
					<iframe width="100%" src="https://www.youtube.com/embed/m0AXxXR6KwY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
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
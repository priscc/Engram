<template>
	<v-col style="padding-bottom: 100px">
		<v-row>
			<v-col v-for="n in 9" cols="3" md="3" sm="7">
				<router-link to="/PeoplePage">
				<v-hover>
					<template v-slot:default="{ hover }" >
						<v-img class="profile" aspect-ratio="1.4" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
						<v-fade-transition>
							<v-overlay v-if="hover" absolute color="#F5F5F5">
								<p>Learn More</p>
							</v-overlay>
						</v-fade-transition>
						</v-img>
					</template>
				</v-hover>
				<p class="pt-2 text-center" style="font-size: 12px;">Name</p>
				</router-link>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>

export default {
  name: 'Topics',
  props: {
    causes: Array,
    turningP: Array,
    effects: Array
  }
}
</script>

<style scope>
	.profile{
		border: 1px solid black;
		border-radius: 50%;
		height: 150px;
		/*height: 100%;*/
		margin-left: 21%;
		margin-right: 21%;
	}
</style>

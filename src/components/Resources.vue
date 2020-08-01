<template>
	<v-row>
		<v-col>
			<h3 style="border-bottom: 1.5px solid blue;">{{resource.header}}</h3>
			<v-row justify="space-around">
				<v-col v-for="(img, index) in resource.img" v-if="index <= 2" :key="index" cols="4">
					<!-- makes image interactive -->
					<v-hover v-slot:default="{ hover }">
						<v-card class="mx-auto" color="grey lighten-4" max-width="600" >
							<v-img aspect-ratio="1.2" :src="img.src" >
								<v-expand-transition>
									<div v-if="hover" class="d-flex transition-fast-in-fast-out blue-grey lighten-5 v-card--reveal blue-grey darken-2--text px-2" style="height: 100%;" >
										Caption with words describing the image
									</div>
								</v-expand-transition>
							</v-img>
						</v-card>
					</v-hover>
				</v-col>
			</v-row>
			<!-- Shows "See More" -->
			<!-- v-dialog box -->
			<v-row v-if="resource.img.length > 3">
				<v-col class="d-flex align-end flex-column">
					<v-dialog v-model="dialog" width="75%">
						<!-- "See More" -->
						<template v-slot:activator="{ on, attrs }">
							<a class="blue--text text-right body-1"  medium v-bind="attrs" v-on="on">
								<u>See more</u>
							</a>
						</template>
						<!-- v-dialog -->
						<v-card>
							<v-card-title class="headline grey lighten-2" primary-title >
								<v-row class="ml-12">
									<v-col class="d-flex align-end pb-2"><h5><u>{{resource.header}}</u></h5></v-col>
									<v-col cols="1">
										<v-btn icon absolute right @click="dialog = false" opacity=".5">
										<v-icon>mdi-close</v-icon>
									</v-btn>
									</v-col>
								</v-row>

							</v-card-title>
							<v-card-text>
								<v-col id="text" class="px-12 pt-6 pb-12">
									<v-row>
										<v-col v-for="(img, index) in resource.img" :key="index" cols="3">
											<!-- makes image interactive -->
											<v-hover v-slot:default="{ hover }">
												<v-card class="mx-auto" color="grey lighten-4" max-width="600" >
													<v-img aspect-ratio="1.2" :src="img.src" >
														<v-expand-transition>
															<div v-if="hover" class="d-flex transition-fast-in-fast-out blue-grey lighten-5 v-card--reveal blue-grey darken-2--text px-2" style="height: 100%;" >
																Caption with words describing the image
															</div>
														</v-expand-transition>
													</v-img>
												</v-card>
											</v-hover>
										</v-col>
									</v-row>
								</v-col>
							</v-card-text>
							<v-divider></v-divider>
						</v-card>
					</v-dialog>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>

export default {
  props: {
    resource: Object
  },
  data () {
    return {
      dialog: false,
      overlay: false
    }
  }
}
</script>

<style scoped>
	.v-card--reveal {
		align-items: center;
		bottom: 0;
		justify-content: center;
		opacity: .5;
		position: absolute;
		width: 100%;
	}
</style>

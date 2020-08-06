<template>
<div id="add-content">
	<v-container>
		<v-row class="pt-5 mt-5">
			<v-spacer></v-spacer>
			<v-col cols="4" class="text-center">
				<v-hover>
					<template v-slot:default="{ hover }">
						<v-card class="mx-auto" elevation="10" max-width="344" height="150" style="border: 1px solid white" color="cyan lighten-3" to="/AddTopic">
							<!-- <v-img class="m-5" aspect-ratio="1.7" src="@/assets/adding_topic.png"></v-img> -->
							<v-card-text>
								<v-icon>mdi-plus</v-icon>
								<h2 class="title">Add a topic</h2>
								Adding new topic to a time period
							</v-card-text>
							<v-fade-transition>
								<v-overlay v-if="hover" absolute color="#0097A7" >
									<v-icon>mdi-plus</v-icon>
								</v-overlay>
							</v-fade-transition>
						</v-card>
					</template>
				</v-hover>
			</v-col>
			<v-spacer></v-spacer>
			<v-col cols="4" class="text-center">
				<v-hover>
					<template v-slot:default="{ hover }">
						<v-card class="mx-auto" elevation="10" max-width="344" height="150" style="border: 1px solid white" color="teal lighten-3" to="/AddContent">
							<!-- <v-img class="m-5" aspect-ratio="1.7" src="@/assets/adding_event.png"></v-img> -->
							<v-card-text>
								<v-icon>mdi-plus</v-icon>
								<h2 class="title">Add Content</h2>
								Adding content (events, people, terminology) to a selected 
								topic
							</v-card-text>
							<v-fade-transition>
								<v-overlay v-if="hover" absolute color="#036358" >
									<v-icon>mdi-plus</v-icon>
								</v-overlay>
							</v-fade-transition>
						</v-card>
					</template>
				</v-hover>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>

	</v-container>
</div>
</template>

<!-- <style type="text/css">
.v-card {
	transition: opacity .3s ease-in-out;
	opacity: 1;
	min-height: 100%;
}
.v-card:not(.on-hover) {
	opacity: .7;
}
</style> -->
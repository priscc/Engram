<template>
	<div class="Packets" style="background-color: #c0bcbc; height: 100%;">
		<v-container
			fluid
			style="height: 100%"
			class="d-flex align-self-strech flex-column"
		>
			<v-row class="pa-0 d-flex align-strech">
				<v-col cols="12" class="pa-0">
					<iframe :src="source"></iframe>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>
<script>
import store from "@/store";
export default {
	data() {
		return {
			source: "https://engramlearn.store/about",
		};
	},
	mounted() {
		store.dispatch("setTimePeriod", -1);
	},
};
</script>

<style type="text/css" scoped>
#app,
#app iframe {
	height: 100%;
	width: 100vw;
	border: none;
	box-sizing: border-box;
}
body {
	margin: 0;
}
</style>

<!-- <template>
	<div class="about" style="background-color: #c0bcbc">
		<v-container class="pt-16">
			<v-row>
				<v-col cols="10">
					<h1 class="pt-6">Hey There</h1>
					<p>
						Engram is a site developed to tackle the abstract,
						overwhelming, and disorganized nature of social studies
						using intuitive UI and web design. We experiment with
						how an interactive web interface can enhance historical
						content and contextualize our past within our present.
						As an early-stage edTech start-up, we provide online
						instruction and study notes concentrated on social
						studies education with a focus on AP World History.
					</p>
					<v-parallax
						height="200"
						src="@/assets/about_ webdesign.jpeg"
					></v-parallax>
					<h1 class="pt-6">About Engram</h1>
					<p class="mb-16">
						Engram's focus is to improve the accessibility to
						organized content. Compared to other subjects, such as
						STEM, little is being done to provide social studies
						students with modern applications to improve their
						learning experiences. While everyday digital experiences
						are becoming progressively more intuitive, interactive,
						and personalized, most of education does not reflect
						this societal change. Engram believes that carefully
						crafted UI has the capacity to present historical
						information in new and diverse ways, making knowledge
						more accessible to everyone.
					</p>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>
<script>
import store from "@/store";
export default {
	mounted() {
		store.dispatch("setTimePeriod", -1);
	},
};
</script>
 -->

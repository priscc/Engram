<template>
	<div id="QuizFeature">
		<div class="site_header">
			<h1>Quiz Feature</h1>
			<h5>Test Your APWH Knowledge</h5>
		</div>

		<b-container class="pt-5">
			<b-row v-for="(section, index) in unitSections" :key="index">
				<h2 style="font-weight: 700; font-size: 20px">
					{{ section.title }}
				</h2>
				<b-row>
					<b-col
						cols="3"
						v-for="(card, index) in section.cards"
						:key="index"
					>
						<div
							class="card"
							@click="goto()"
							v-if="card.title == 'Unit 1'"
						>
							<a :href="card.link">
								<img :src="card.image" alt="Card Image" />
								<div class="overlay">
									<h2>{{ card.title }}</h2>
									<p>{{ card.description }}</p>
								</div>
							</a>
						</div>
						<div class="card-disabled" v-else>
							<a :href="card.link">
								<img :src="card.image" alt="Card Image" />
								<div class="overlay">
									<h2>{{ card.title }}</h2>
									<p>{{ card.description }}</p>
								</div>
							</a>
						</div>
					</b-col>
				</b-row>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import storequiz from "@/store/quiz.js";
export default {
	name: "CardContainer",
	computed: {
		unitSections() {
			return storequiz.state.sections;
		},
	},
	methods: {
		goto() {
			this.$router.push({ name: "QuizUnit1" });
		},
	},
	mounted() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	},
};
</script>

<style lang="sass" scoped src="@/assets/css/quiz.sass"></style>

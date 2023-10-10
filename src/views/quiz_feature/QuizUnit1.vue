<template>
	<div class="QuizUnit">
		<div class="site_header">
			<h1>Unit 1 Quiz</h1>
			<h5>Test Your Knowledge on Unit 1</h5>
		</div>

		<b-container class="assessmentquestion">
			<assessmentquestion></assessmentquestion>
		</b-container>
	</div>
</template>

<script>
import assessmentquestion from "@/components/quiz_feature/AssessmentQuestion.vue";

export default {
	components: { assessmentquestion },
	created() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	},
};
</script>

<style lang="sass" scoped src="@/assets/css/quiz.sass"></style>
<style lang="sass" scoped src="@/assets/css/masterStyles.sass"></style>

<template>
  <div id="AssessmentFeature">
    <b-container>
      <div class="questionNum">{{ questionNumber + 1 }}/{{ questionLen }}</div>
      <h2 class="question">{{ questions[questionNumber].question }}</h2>
      <div class="answers">
        <div v-if="submitted == false">
          <div
            v-for="(answer, index) in questions[questionNumber].answers"
            :key="index"
            @click="selectAnswer(answer)"
            class="answer"
          >
            <p>({{ answer.answerletter }}) {{ answer.answer }}</p>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(answer, index) in questions[questionNumber].answers"
            :key="index"
            :class="[
              'answer-disabled',
              { selected: selectedAnswer === answer.answerletter },
            ]"
          >
            <p v-if="answer.answerletter === correctAnswer">
              ({{ answer.answerletter }}) {{ answer.answer }} ✅
            </p>
            <p v-else>({{ answer.answerletter }}) {{ answer.answer }} ❌</p>
            <!-- :class="{ selected: 'answer-disabled'.selected }" -->
          </div>
        </div>
      </div>
      <div class="quizbuttons" v-if="submitted">
        <b-button
          class="purple_button"
          @click="nextQuestion()"
          v-if="questionNumber < questions.length - 1"
        >
          Next
        </b-button>
        <b-button
          v-else
          class="purple_button"
          v-b-modal.quiz-modal
          type="submit"
        >
          Submit
        </b-button>
        <b-modal id="quiz-modal" hide-footer hide-header size="lg"
          ><quizresultmodal
            @close="$bvModal.hide('quiz-modal')"
            :ready="true"
            :socials="false"
            :header="'Submitted!'"
            :subheader="''"
            :subtitle="
              'You got ' + correctAnswers + '/' + questionLen + ' correct'
            "
            :buttonprops="buttonprops"
          ></quizresultmodal
        ></b-modal>
      </div>
      <div v-if="submitted">
        <p v-if="selectedAnswerIsCorrect">That is correct</p>
        <p v-else>That is incorrect</p>
        <p>Correct Answer: {{ correctAnswer }}</p>
        <p>Explanation: {{ correctAnswerExplanation }}</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import storequiz from "@/store/quiz.js";
import quizresultmodal from "@/components/quiz_feature/QuizResultModal.vue";

export default {
  components: {
    quizresultmodal,
  },
  data() {
    return {
      questionNumber: 0,
      selectedAnswer: null,
      submitted: false, // Track whether the user has submitted
      correctAnswers: 0,
      buttonprops: [
        {
          content: "Choose Another Quiz",
          route: "Quiz",
          disabled: false,
        },
      ],
    };
  },
  computed: {
    questions() {
      return storequiz.state.questions;
    },
    questionLen() {
      return storequiz.state.questions.length;
    },
    // Computed property to check if the selected answer is correct
    selectedAnswerIsCorrect() {
      const currentQuestion = this.questions[this.questionNumber];
      return this.selectedAnswer === currentQuestion.correctanswer;
    },
    // Computed property to get the correct answer for the current question
    correctAnswer() {
      const currentQuestion = this.questions[this.questionNumber];
      return currentQuestion.correctanswer;
    },
    correctAnswerExplanation() {
      const currentQuestion = this.questions[this.questionNumber];
      return currentQuestion.description;
    },
  },
  methods: {
    nextQuestion() {
      this.questionNumber += 1;
      this.selectedAnswer = null; // Reset selected answer when moving to the next question
      this.resetAnswerSelection(); // Reset answer selection for the next question
      this.submitted = false; // Reset submitted flag
    },
    selectAnswer(answer) {
      this.submitted = true;
      this.selectedAnswer = answer.answerletter;
      if (this.selectedAnswerIsCorrect) {
        this.correctAnswers++;
      }
    },
    resetAnswerSelection() {
      this.questions[this.questionNumber].answers.forEach((ans) => {
        ans.selected = false;
      });
    },
    submitQuiz() {
      // Handle quiz submission here (code for scoring and feedback)
      console.log("Quiz submitted!");
      this.submitted = true; // Mark the quiz as submitted
      storequiz.dispatch("setCorrectAnswers", this.correctAnswers);
    },
  },
};
</script>
<style lang="sass" scoped src="@/assets/css/quiz.sass"></style>

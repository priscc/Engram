<template>
    <div id="AssessmentFeature">
        <b-container>
            <h2>{{ questions[questionNumber].question }}</h2>
            <b-row>
                <b-button @click="Next()">
                    Next
                </b-button>
                <b-col cols="3" v-for="(answer, index) in questions[questionNumber].answers" :key="index">
                <div class="answer">
                    <div>
                      <p>{{ answer.answerletter }}-{{ answer.answer }}</p>
                    </div>
                </div>
                </b-col>
            </b-row> 
        </b-container>
    </div>

</template>

<style>

</style>

<script>
export default{
    methods: {
        Next() {
            if (this.questionNumber == this.questions.length - 1) {
                // go to next page ---> score (code in future)
                console.log("no more questions rip");
            } else {
                // stay on questions or ask for popup "are u sure u wanna submit"
              this.questionNumber =+ 1;
            }
        }
    },
    data() {
        return {
            questionNumber: 0,
            questions: [
                {
                    question: 'What is your fav color?',
                    answers: [
                        {answerletter: "A", answer: 'orange'},
                        {answerletter: "B", answer: 'red'},
                        {answerletter: "C", answer: 'blue'},
                        {answerletter: "D", answer: 'black'},
                    ],
                    correctanswer: "A",
                    description: "Orange is correct because why not"
                },
                {
                    question: 'What is your fav animal?',
                    answers: [
                        {answerletter: "A", answer: 'dog'},
                        {answerletter: "B", answer: 'cat'},
                        {answerletter: "C", answer: 'bear'},
                        {answerletter: "D", answer: 'tiger'},
                    ],
                    correctanswer: "D",
                    description: "Tiger is Correct because yes"
                },
            ]
        }
    }
}

</script>
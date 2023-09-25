<template>
    <div id="QuizFeature"> 
        <b-container> 
            <b-row>
                <b-col>
                    Quiz Questions 
                    <!-- Header -->
                </b-col>
            </b-row>
        </b-container>
        <question>

        </question>
    </div>

</template>

<script>
import question from "@/components/QuizFeature/AssessmentQuestion.vue"
export default {

    components: {question}
    


    // components (register component)
    // data 
    // watch (whats happening to text field)
    // computed (watching/searching data/variable)
    // methods (functions go here)
    // mounted (variables n functions that load before page loads)
    // created (same thing but does it before mounted)
}
</script>

<style>

</style>
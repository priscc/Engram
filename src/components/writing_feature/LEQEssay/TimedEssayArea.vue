<template>
    <b-form class="p-0" @submit.prevent="handleSubmit">
        <b-container fluid class="essay-area p-0">
            <b-row class="py-5">
                <b-textarea class="textbox-border textbox mx-auto p-5" rows="15" max-rows="30" v-model="essay"></b-textarea>
            </b-row>
            <b-row align-h="end" class="px-5 pt-5 pb-3">
                <b-button id="purple" class="finish-button border-0 mb-2" v-b-modal.my-modal type="submit">Finish</b-button>
                <b-modal id="my-modal" hide-footer hide-header size="lg"><finishmodal @close="$bvModal.hide('my-modal')" :ready="true" :socials="false" :header="'Congratulations!'" :subheader="''" :subtitle="'Please identify each section so we can best assess your essay!'" :buttonprops="buttonprops"></finishmodal></b-modal>
            </b-row>
        </b-container>
    </b-form>
</template>

<script>
import { ref } from 'vue'
import finishmodal from './FinishModal.vue'
export default {
    props:['text'],
    components: {
        finishmodal,
    },
    emits: ['TimedSubmit'],
    setup(props, context) {
        const essay = ref(props.text);
        const buttonprops = [
            {content: "<   Go Back to Modules", route: '001', disabled: false},
            {content: "Continue   >", route: '005', disabled: false}
        ]

        const handleSubmit = () => {
            context.emit('TimedSubmit', essay.value);
            console.log('djnejcejn')
        }
        return {
            buttonprops, handleSubmit, essay
        }
    }
}
</script>

<style>

</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
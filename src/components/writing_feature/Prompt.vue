<template>
    <b-container fluid class="prompt-container" @click="handleClick">
        <b-row>
            <span>
                <span>Prompt:</span><br>
                <span>{{ prompt.prompt }}</span>
            </span>
            <span>
                <span>Time Period:&nbsp;</span>
                <span>{{ prompt.period }}</span>
            </span>
            <span>
                <span>Type:&nbsp;</span>
                <span>{{ prompt.type }}
                    <b-icon-question-circle class="prompt-icon"></b-icon-question-circle>
                </span>
            </span>
        </b-row>
    </b-container>
</template>

<script>
import storeWriting from '@/store/writing.js';
export default {
    props: ['prompt'],
    setup(props) {
        const store = storeWriting; 
        const handleClick = () => {
            store.dispatch('setSelectedPrompt', props.prompt.id);
            console.log('handled click', store.state.selectedPrompt);
        };
        return { handleClick };
    }
}
</script>

<style scoped>
.prompt-container {
    border-radius: 20px;
    max-width: 1167;
    height: auto;
    padding: 8px 25px;
}

/* .prompt-container:hover {
    color: white;
} */

span:first-child {
    padding-bottom: 20px;
}

span > span:first-child {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 137.5% */
}

span > span:last-child {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
}

.prompt-icon {
    margin-left: 5px;
}
</style>

<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>

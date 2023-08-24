<template>
    <b-container fluid class="white-contain-feedback">
        <div v-for="section in stream" :key="section.title" class="stacked-padding">
        <b-row align-h="between mb-4" style="position: relative;">
            <h1 class="title-variant-feedback">{{ section.title }}</h1>
            <div class="point-given align-middle">
               <span class="title-variant-feedback align-middle">+1</span>
            </div>
        </b-row>
        <b-row>
            <h2 class="subtitle-variant-feedback">What was written</h2>
        </b-row>
        <b-row class="g-5 required-height">
            <b-col class="user-input-styles" cols="5">
                <div class="user-input-contain">
                    {{ section.content.userInput }}
                </div>
            </b-col>
            <b-col class="feedback-contain">
                <h2 class="subtitle-variant-feedback">What was good</h2>
                <div class="input-contain">
                    {{ section.content.good }}
                </div>
            </b-col>
            <b-col class="feedback-contain">
                <h2 class="subtitle-variant-feedback">What to improve</h2>
                <div class="input-contain">
                    {{ section.content.toImprove }}
                </div>
            </b-col>
            <b-col style="max-width: 80px">

            </b-col>
        </b-row>
        </div>  
    </b-container> 
</template>

<script>
export default {
    props: ['title', 'content', 'title_2', 'content_2'],
    setup(props) {
        let stream = [{title: props.title, content: props.content}];
        if(props.title_2 && props.content_2) {
            stream.push({title: props.title_2, content: props.content_2})
        }
        return { stream }
    }
}
</script>

<style scoped>
.user-input-styles {
    /* max-width: 469px; */
    min-width: 300px;
}
.user-input-contain {
    border-radius: 10px;
    border: 0.5px solid var(--text-subtle, #969BAB);
    padding: 48px 25px;
    color: var(--text-normal, #18191F);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 185.714% */
    height: 340px;
}
.title-variant-feedback {
    color: var(--text-normal, #18191F);
    font-feature-settings: 'liga' off;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.subtitle-variant-feedback {
    color: var(--text-normal, #18191F);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
}
.feedback-contain {
    border-left: 1px solid #969BAB;
    min-width: 220px;
    padding-left:30px
}
.point-given {
    height: 56px;
    width: 65px;
    background: #CAE2F1;
    border-radius: 8px;
    position: absolute;
    right: 0;
    padding: 13px 0 0 23px;
}
.white-contain-feedback {
    border-radius: 10px;
    background: var(--page-surface, #FFF);
    padding: 30px 50px;
}
.input-contain {
    margin-top: 37px;
    color: var(--text-normal, #18191F);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 185.714% */
}
.required-height {
    min-height: 386px;
}
.stacked-padding:last-child {
    padding-top: 50px
}
.stacked-padding:first-child {
    padding-top: 0;
}
</style>
<template>
    <b-container fluid class="white-contain-feedback">
        <b-row align-h="between mb-4" style="position: relative;">
            <h1 class="title-variant-feedback">Thesis</h1>
            <div class="point-given">
               <span class="title-variant-feedback">+1</span>
            </div>
        </b-row>
        <b-row>
            <h2 class="subtitle-variant-feedback">What was written</h2>
        </b-row>
        <b-row>
            <b-col class="user-input-styles">
                <div class="user-input-contain">
                    Due to centuries of subjugation and domination or simply a design for change due to resentment of the past, these ideologies grew into movements among the people in both developing and industrialized countries. Ideologies such as fascism, nationalism, and communism uprooted the existing sociopolitical order by mobilizing the people through promises of reform and uniting them with a popular message and universal appeal, inspiring them to rise up.
                </div>
            </b-col>
            <b-col class="feedback-contain">
                <h2 class="subtitle-variant-feedback">What was good</h2>
                <div class="input-contain">
                    The response situates the emergence of German leader Adolf Hitler in the aftermath of World War I.
                </div>
            </b-col>
            <b-col class="feedback-contain">
                <h2 class="subtitle-variant-feedback">What to improve</h2>
                <div class="input-contain">
                    You could have added more contextualization to be more detailed 
                </div>
            </b-col>
            <b-col style="max-width: 65px">

            </b-col>
        </b-row>
    </b-container> 
</template>

<script>
export default {

}
</script>

<style scoped>
.user-input-contain {
    border-radius: 10px;
    border: 0.5px solid var(--text-subtle, #969BAB);
    max-width: 469px;
    padding: 48px 25px;
    color: var(--text-normal, #18191F);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 185.714% */
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
    max-width: 320px;
    padding-left:30px
}
.point-given {
    height: 56px;
    width: 65px;
    background: red;
    border-radius: 8px;
    position: absolute;
    right: 0;
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
</style>
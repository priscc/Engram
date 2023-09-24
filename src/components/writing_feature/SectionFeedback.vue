<template>
    <b-container fluid class="white-contain-feedback">
        <div v-for="section in stream" :key="section.title" class="stacked-padding">
        <b-row align-h="between" class="header-control mb-4" style="position: relative;">
            <h1 class="title-variant-feedback">{{ section.title }}</h1>
            <div class="point-given align-middle" :style="{'background': section.palette}">
               <span class="title-variant-feedback align-middle">{{ section.points }}</span>
            </div>
        </b-row>
        <b-row>
            <h2 class="subtitle-variant-feedback">What was written</h2>
        </b-row>
        <b-row class="g-5 required-height">
            <b-col class="user-input-styles" sm="auto" md="5" lg="5">
                <div class="user-input-contain">
                    {{ parseTemplates(section.content.userInput) }}
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
        const parseTemplates = (template) => {
            var res = "";
            template.forEach(element => {
                res += element.content;
            });
            return res;
        }
        let stream = [{title: props.title, content: props.content, points: "+1"}];
        if (stream[0].title === "Thesis Statement") {
            stream[0].palette = "#CAE2F1";
        } else if (stream[0].title === "Contextualization") {
            stream[0].palette = "#CCEBA5";
        } else if (stream[0].title === "Conclusion") {
            stream[0].palette = "#FFC27880";
            stream[0].points = "Optional";
        } else {
            stream[0].palette = "#DCBAE5";
        }
        if(props.title_2 && props.content_2) {
            stream.push({title: props.title_2, content: props.content_2, points: "+1", palette: "#F5EBBB"})
        }
        return { stream, parseTemplates }
    }
}
</script>

<style scoped>
.user-input-styles {
    /* max-width: 469px; */
    min-width: 469px;
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
    overflow-y: scroll;
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
    width: fit-content;
    border-radius: 8px;
    position: absolute;
    right: 0;
    padding: 13px 23px 0 23px;
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
@media screen and (max-width: 600px) {
    .user-input-styles {
    max-width: auto;
    min-width: auto;
}
}
@media screen and (max-width: 321px) {
    .user-input-styles {
        padding: 0;
    }
    .header-control {
        margin-left: -30px;
        margin-left: -30px;
    }
    .point-given {
        transform: scale(0.8);
        right: -20px;
        top: -10px
    }
}
</style>
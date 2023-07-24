<template>
  <div id="essay-writing">
    <b-container fluid class="background">
        <b-row class="pt-4 px-4">
            <breadcrumb :items="items"></breadcrumb>
        </b-row>
        <b-row class="px-4 pb-4 pt-2 title">
        </b-row>
        <b-row class="px-4 white-container">
            <whitecontainer :title="title" :subtitle="subtitle" id="module-white-container">
                <template #templates>
                    <a class="module-introduction strip label-position">Welcome to the Essay Writing for the LEQ</a>
                    <b-container fluid>
                        <b-row class="mod-children mother-container mx-auto" no-gutters align-h="center">
                                <b-col class="template" cols="12">
                                    <!-- <div style="border: 1px solid red;"> -->
                                        <!-- <div style="border: 2px dotted green; display: inline-flex; flex-wrap: wrap; background-color: aqua; align-items: flex-start; flex-direction: row; gap:10px"> -->
                                            <modules v-for="modules in templateModule" :key="modules.name" :modules="modules"></modules>
                                        <!-- </div>                                    </div> -->
                                </b-col>
                        </b-row>
                    </b-container>
                </template>

                <template #try-it>
                    <a class="module-labels strip label-position">Section Module</a>
                    <b-container>
                        <b-row no-gutters align-h="center">
                                <b-col class="mother-container try-it " sm="3" md="auto" lg="auto">
                                    <!-- <div style="border: 1px solid red;"> -->
                                        <!-- <div style="border: 2px dotted green; display: inline-flex; flex-wrap: wrap; background-color: aqua; align-items: flex-start; flex-direction: row; gap:10px"> -->
                                            <modules v-for="modules in moduleses" :key="modules.name" :modules="modules" class="mx-auto"></modules>
                                        <!-- </div>                                    </div> -->
                                </b-col>
                        </b-row>
                    </b-container>
                </template>

                <template #timed>
                    <a class="module-labels strip label-position">Timed Module</a>
                    <b-container>
                        <b-row class="" no-gutters align-h="center">
                                <b-col class="mother-container timed justify-content-center"  sm="3" md="3" lg="3">
                                    <!-- <div style="border: 1px solid red;"> -->
                                        <!-- <div style="border: 2px dotted green; display: inline-flex; flex-wrap: wrap; background-color: aqua; align-items: flex-start; flex-direction: row; gap:10px"> -->
                                            <modules v-for="modules in timeModule" :key="modules.name" :modules="modules"></modules>
                                        <!-- </div>                                    </div> -->
                                </b-col>
                        </b-row>
                    </b-container>
                </template>
            </whitecontainer>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import whitecontainer from '../../components/writing_feature/V2WhiteContainer.vue'
import breadcrumb from '../../components/writing_feature/BreadCrumb.vue'
// import purplebutton from '../../components/writing_feature/PurpleButton.vue'
import modules from '../../components/writing_feature/ModulesV2.vue'
export default {
    components: {
        whitecontainer, 
        breadcrumb, 
        // purplebutton,
        modules,
    },
    setup() {
        const items = [
            {
                text: 'Essay Writing: LEQ',
                active: 'yes'
            }
        ]

        const timeModule = [
            {
                img: 'ModuleIcon4.svg', 
                // title: 'For Beginners',
                points: ['Real Exam Format', 'Answer a College Board prompt', '45 Minute Time Restriction'], 
                button: {content: "Practice Writing", route: 'SelectModule'},
                orientation: 12,
                name:'timed'
            }, 
        ]
        const templateModule = [
            {
                img: 'ModuleIcon.svg', 
                // title: 'For Beginners',
                points: ['Step by step guides on each section', 'See examples with explanations'], 
                title: 'View Templates & Examples',
                button: {content: "Learn Writing", route: 'SelectModule'},
                orientation: 'auto',
                name:'template',
            }, 
        ]

        const moduleses = [
            {
                img: 'ModuleIcon3.svg', 
                title: 'For Beginners',
                points: ['Section step by step guides', 'Sample prompts', 'No time restriction'], 
                button: {content: "Start", route: '002', disabled: false},
                orientation: 12,
                name:'try-it',
                time: '~15 min'
            }, 
            {
                img: 'ModuleIcon2.svg', 
                title: 'For Advance Learners',
                points: ['Explore each section in-depth', 'Sample prompts', 'No time restriction'],
                button: {content: "Start", route: 'SelectDifficulty', disabled: false},
                orientation: 12,
                name:'try-it',
                time: '~45 min-1hr'
            }
        ]

        const title = "Learning & Practice Module for your writing skills"
        const subtitle = "Each module will improve your LEQ writing skills."
        return { items, moduleses, title, subtitle, timeModule, templateModule}
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');

#module-white-container {
    padding-bottom: 0px;
}
.module-container{
    max-width: 539px;
}
.module-gray-contain {
    border-radius: 8px;
    background: #F5F5F5;
    opacity: 0.8999999761581421;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);
}

/* .mod-children {
    margin: 0 70px 0 70px;
    
} */
.mother-container {
    /* border: 1px dotted red;  */
    display: flex; 
    flex-wrap: wrap;
    border-radius: 8px;
    background: #F5F5F5;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);
    max-width: 1124px;
}

.try-it {
    min-width: 350px;
    padding: 0 50px 0 20px;
    margin-bottom: 40px;
    margin-top:15px;
    white-space: nowrap;
}

.timed {
    min-width: 425px;
    margin-bottom: 40px;
    margin-top:15px;
    /* padding: 5px 0 5px 0; */
}

.template {
    max-width: 1148px;
}

.module-introduction {
    color: #111;
    text-align: center;
    font-feature-settings: 'liga' off;
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    font-family: 'Manrope', sans-serif;
}

.label-position {
    margin-bottom: 15px;
}

.module-labels {
    color: var(--text-normal, #18191F);
    text-align: center;
    font-feature-settings: 'liga' off;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px; /* 90% */
    letter-spacing: 2px;
    text-transform: uppercase;
}

@media screen and (max-width: 380px) {
    .try-it {
        min-width: auto;
        padding: 5px 30px 5px 30px;
        white-space: wrap;
    }

    .timed {
        min-width: auto;
        /* margin-left: 10px; */
    }
}
</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>

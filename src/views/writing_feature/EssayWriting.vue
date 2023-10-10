<template>
    <div id="essay-writing">
        <b-container fluid class="background">
            <b-row class="pt-4 px-4">
                <breadcrumb :items="items"></breadcrumb>
            </b-row>
            <b-row class="px-4 pb-4 pt-2 title">
                Welcome to the Essay Writing Section for LEQ
            </b-row>
            <b-row class="px-4 white-container">
                <whitecontainer :title="title" :subtitle="subtitle">
                    <div class="px-0">
                        <b-container class="py-5 px-0">
                            <b-row
                                class="h-100"
                                align-h="center"
                                align-v="center"
                            >
                                <b-col
                                    v-for="step in steps"
                                    :key="step.title"
                                    sm="6"
                                    md="auto"
                                    lg="auto"
                                >
                                    <steps
                                        :step="step"
                                        class="px-auto mx-auto"
                                    ></steps>
                                </b-col>
                            </b-row>
                        </b-container>
                        <div
                            class="w-100 text-center mt-5 pb-4 button-parent mx-auto"
                        >
                            <purplebutton
                                @click="next"
                                :buttonprops="buttonprops"
                                class="main-button"
                            ></purplebutton>
                        </div>
                    </div>
                </whitecontainer>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import whitecontainer from "../../components/writing_feature/WhiteContainer.vue";
import breadcrumb from "../../components/writing_feature/BreadCrumb.vue";
import steps from "../../components/writing_feature/Steps.vue";
import purplebutton from "../../components/writing_feature/PurpleButton.vue";
import { useRouter } from "vue-router";

export default {
    components: {
        whitecontainer,
        breadcrumb,
        steps,
        purplebutton,
    },
    setup() {
        const router = useRouter();

        const next = () => {
            console.log("click");
            router.push({ name: "SelectModule" });
        };

        const items = [
            {
                text: "Essay Writing",
                active: "true",
            },
        ];
        const steps = [
            {
                img: "IconGroup.svg",
                title: "Step 1: Select a Module",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                height: "72",
                width: "257",
            },
            {
                img: "IconGroup2.svg",
                title: "Step 2: Choose a Prompt",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                height: "72",
                width: "257",
            },
            {
                img: "IconGroup3.svg",
                title: "Step 3: Learn & Practice",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                height: "72",
                width: "257",
            },
        ];

        const buttonprops = {
            content: "Get Started",
            route: "SelectModule",
            disabled: false,
        };

        const title = "How it works";
        const subtitle =
            "Follow the steps below to learn and practice your long essay question (LEQ) writing for the exam.";

        return { items, title, subtitle, steps, buttonprops, next };
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manrope&display=swap");

#essay-writing {
    min-height: 100vh;
    height: 100%;
    background: rgba(245, 245, 245, 1);
    font-family: "Manrope", sans-serif;
}
.background {
    background: rgba(245, 245, 245, 1);
}

.title {
    color: #111;
    font-size: 26px;
    font-style: normal;
    font-weight: 800;
}

.white-container {
    padding-bottom: 150px;
}

#step-container {
    width: 30%;
    padding: 0;
    margin: 0;
}

.main-button {
    width: 100%;
}

.button-parent {
    max-width: 293px;
    padding: 0 10px 0 10px;
}
.essay-white-container {
    height: fit-content;
}
</style>
<!-- <style lang="sass" scoped src="@/assets/css/topicContent.sass"></style>
<style lang="sass" scoped src="@/assets/css/loading.sass"></style> -->

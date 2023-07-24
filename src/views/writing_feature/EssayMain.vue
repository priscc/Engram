<template>
  <div class="essay-writing">
    <div class="main">
        <b-container>
            <b-row align-v="center" class="px-4 py-5 main-row">
                <b-jumbotron id="main-jumbo">
                    <template #header><a id="main-title">Learn & Enjoy<br>AP World History 🌎</a></template>

                    <template #lead>
                        <a id="main-subtitle">Study Bites provides free AP World History study guides, essay practice session, and open community for students</a>
                    </template>

                    <b-button id="button">
                        Get Started
                    </b-button>
                </b-jumbotron>
            </b-row>
        </b-container>
        <div class="icon-parent">
            <img :src="require('../../assets/writing_feature/PurpleCircle.svg')" alt="Image" class="icon-circle">
        </div>
        <div class="icon-parent-demo align-middle">
            <img :src="require('../../assets/writing_feature/demov2.png')" alt="Image" class="icon-demo my-auto">
        </div>
    </div>
    <b-container fluid>
        <b-row align-h="center" align-v="center" class="features">
            <b-col cols="auto" v-for="feature in features" :key="feature.title" class="py-4">
                <featuresdisplay :feature="feature">
                </featuresdisplay>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import featuresdisplay from '../../components/writing_feature/FeaturesDisplay.vue';
export default {
    components: {
        featuresdisplay,
    },
    setup() {
        const features = [
            {
                img: 'book.svg',
                title: 'AP World History Unit',
                description: 'Explore our AP World History resources. Feel free to enjoy our 100+ Interactive study materials.',
            },
            {
                img: 'Essay.svg',
                title: 'Essay Writing',
                description: 'Learn and practice how to write your Long Essay Questions (LEQ) and Document Based Questions (DBQ).',

            }
        ]

        return { features }
    }
}
</script>

<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>

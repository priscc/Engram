<template>
    <b-card id="feature" class="border-0 fontist">
        <div class="features-icon-parent">
            <b-card-img
                :src="require('../assets/' + feature.img + '')"
                alt="Image"
                top
                id="icons"
                height="50"
                width="50"
            ></b-card-img>
        </div>
        <b-card-title class="-feature-title">
            {{ feature.title }}
        </b-card-title>
        <b-card-text class="feature-description">
            {{ feature.description }}
        </b-card-text>
        <a @click="handleClick" id="features-link">Explore</a>
    </b-card>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    props: ["feature"],
    setup(props) {
        const router = useRouter();
        const handleClick = () => {
            router.push({ name: props.feature.route });
        };
        return { handleClick };
    },
};
</script>

<style scoped>
#feature {
    max-width: 400px;
    text-align: left;
    padding: 30px 32px 30px 32px;
}
.feature-title {
    color: var(--text-gray-900, #18191f);
    font-feature-settings: "liga" off;

    /* Heading / H5 */
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px; /* 133.333% */
}

.feature-description {
    color: var(--text-gray-900, #18191f);
    font-feature-settings: "liga" off;

    /* Body / Body 1 */
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 162.5% */
}

.features-icon-parent {
    position: relative;
    width: 50px;
    padding-bottom: 56px;
}

#features-link {
    color: var(--brand-purple, #8c30f5);
    font-feature-settings: "clig" off, "liga" off;

    /* Label / Small Label */
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    text-decoration: none;
    cursor: pointer;
}

#features-link::after {
    content: url("../assets/writing_feature/right-arrow.svg") !important;
    /* margin-top:30px; */

    padding-left: 8px;
    position: absolute;
    bottom: 45px;
}
</style>

<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>

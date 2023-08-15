<template>

    <b-container fluid class="true-white-container p-sm-3 p-md-5 p-lg-5">

        <b-row class="mt-2 pb-3 top-module">
            <slot name="templates"></slot>
        </b-row>
        <b-row no-gutters align-h="center" class="gx-5">
            <b-col class="white-container-try-it-container text-center">
                <slot name="try-it"></slot>
            </b-col>
            <!-- <b-col class="gutter"></b-col> -->
            <b-col class="white-container-timed-container text-center">
                <slot name="timed"></slot>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
export default {
    props:['title'],
    setup(props) {
        console.log(props.title)
    }
}
</script>

<style scoped>
.true-white-container {
    background: white;
    min-height: 600px;
    border-radius: 10px;
    /* padding: 60px 70px 60px 70px; */
}
.title-white-container { 
    color: #111;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
}
.subtitle-white-container {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;

}

.white-container-timed-container {
    max-width: 475px;
    /* padding-left: 30px; */
}

.white-container-try-it-container {
    /* padding-right: 30px; */
}

.top-module {
    margin-bottom: 65px;
}

.gutter {
    max-width: 40px;
}
@media screen and (max-width: 425px) {
    .white-container-timed-container {
        max-width: 100%;
    }
}

</style>
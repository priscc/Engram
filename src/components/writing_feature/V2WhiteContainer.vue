<template>

    <b-container fluid class="true-white-container px-sm-2 px-md-4 px-lg-4 pt-4">

        <b-row class="mt-2 pb-3 top-module px-1 px-sm-0 px-md-0 px-lg-0">
            <slot name="templates"></slot>
        </b-row>
        <b-row no-gutters align-h="around">
            <b-col cols="auto" class="white-container-try-it-container text-center px-3 px-sm-3 px-md-1 px-lg-1">
                <slot name="try-it"></slot>
            </b-col>
            <!-- <b-col class="gutter"></b-col> -->
            <b-col cols="auto" class="white-container-timed-container text-center px-3 px-sm-3 px-md-1 px-lg-1">
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
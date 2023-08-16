<template>
    <div class="accordion test essay-area" role="tablist">
        <b-card no-body class="test">
        <b-card-header header-tag="header" class="essay-area border-0" role="tab" v-b-toggle.accordion-1>
            Outline
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
            <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
            <b-card-text>{{ text }}</b-card-text>
            </b-card-body>
        </b-collapse>
        </b-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
<style lang="sass" scoped src="@/assets/css/essayWriting.sass"></style>
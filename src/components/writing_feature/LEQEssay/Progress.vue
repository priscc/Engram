<template>
  <div class="progress-container">
    <div style="border: 1px solid red; width: fit-content;" class="progress-">
        <span class="circle"></span>
        <span class="line"></span>

        <span class="circle"></span>
        <span class="line"></span>

        <span class="special-circle"></span>
        <span class="line"></span>

        <span class="circle"></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.progress-container {
    background: white;
    height: 140px;
    width: fit-content;
}

.circle {
    height: 15px;
    width: 15px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}
.special-circle {
    height: 21px;
    width: 21px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin: -3px;
}

.line {
    min-width: 63px;
    height: 2px;
    background: var(--gray-4, #BDBDBD);
    display: inline-block;
    margin-bottom: 7px;
}


</style>
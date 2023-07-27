<template>
    <b-breadcrumb>
        <b-breadcrumb-item v-for="item in items" :key="item.name" :id="item.active ? 'active' : 'un-active'" active>{{ item.text }}</b-breadcrumb-item>
    </b-breadcrumb>
</template>

<script>
export default {
    props: ['items']
}
</script>

<style scoped>
#un-active {
    color: #AAAAAA;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    /* border: red 1px solid; */
}

#active {
    color: var(--primary, #8C30F5);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
}
.breadcrumb-item + .breadcrumb-item::before {
      content: url("../../assets/writing_feature/chevron-right.svg") !important; 
      padding: 0 15px 0 10px;
}
/* .hide-wrap {
display: flex;
flex-wrap: nowrap;
flex-shrink: 100;
} */
/* .breadcrumb-item {
    padding-right: 10px;
}

.breadcrumb-item:last-child {
    padding-left: 10px;
}
.breadcrumb-item:nth-child(2) {
    padding-right: 0px;
}

.breadcrumb-item:first-child {
    padding-left: 0px;
} */

</style>
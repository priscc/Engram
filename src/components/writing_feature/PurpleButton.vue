<template>
  <b-button @click="next" id="purple" class="border-0 p-auto m-auto">
    {{ buttonprops.content }}
  </b-button>
</template>

<script>
import { useRouter} from 'vue-router'

export default {
    props: ['buttonprops'],
    setup(props) {
        const router = useRouter()

        const next = () => {
            console.log("click")
            router.push({name: props.buttonprops.route})
        }

        return { next }
    }
}
</script>

<style>
#purple {
    height: 52px;
    width: 293px;
    border-radius: 30px;
    background: #451A75;
    text-transform: uppercase;
    color: var(--default-white, #FFF);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 18px;
    letter-spacing: 2px;
}

#purple:hover {
    background: #F1E4FF;
    color: #451A75;
    font-weight: 800;
}
</style>
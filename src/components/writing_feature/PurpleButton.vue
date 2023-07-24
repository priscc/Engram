<template>
  <b-button @click="next" id="purple" class="border-0 p-auto m-auto" :disabled="buttonprops.disabled">
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
            if (props.buttonprops.params){
                router.push(
                    {name: props.buttonprops.route, 
                    params: props.buttonprops.params}
                )
            } else {
                router.push({name: props.buttonprops.route})
            }
        }

        return { next }
    }
}
</script>

<style>
#purple {
    min-height: 52px;
    border-radius: 30px;
    padding: 10px 10px 10px 10px;
    background: #451A75;
    text-transform: uppercase;
    color: var(--default-white, #FFF);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 25px;
    letter-spacing: 2px;
}

#purple:hover {
    background: #F1E4FF;
    color: #451A75;
    font-weight: 800;
}
</style>
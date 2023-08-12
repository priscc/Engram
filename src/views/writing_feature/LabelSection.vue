<template>
  <div style="height: 100vh;" ref="doc" @mouseup="handleHighlight">
    <p>jjnjnvnj
    sefinrfirnfirfnurbbhsxvexvg</p>
    <p>I lbe iehicbvhvcvisuocbuo</p>
    <br><hr>
    {{ two }}
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const doc = ref(null);
        const two = ref(null)
        const handleHighlight = () => {
            const one = window.getSelection()
            two.value = one.getRangeAt(0);
            console.log(one.getRangeAt(0));
            var umm = document.createElement("span")
            umm.setAttribute("style", "background-color: pink;");
            two.value.surroundContents(umm); 
            umm.addEventListener('click', (e) => {
                console.log(e.target);
            })
        }
        return {doc, handleHighlight, two}
    }
}
</script>

<style>

</style>
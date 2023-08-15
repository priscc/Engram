<template>
  <div style="height: 100vh;white-space: pre-line;margin-top: 10vh; margin-bottom: 10vh;" ref="doc" @mouseup="handleHighlight">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lobortis magna. Pellentesque sit amet dignissim neque. Phasellus ultrices erat et placerat consequat. Aenean sollicitudin purus vel odio consectetur interdum. Proin vestibulum sem blandit, scelerisque leo eget, luctus sem. Etiam tristique porta augue ac sagittis. Maecenas est mi, dictum ut risus in, vehicula facilisis lacus.
      <br><br>
      Proin consectetur metus eu orci egestas, nec egestas purus mollis. Nam sit amet placerat felis, ut commodo elit. Ut mollis mollis velit, hendrerit sollicitudin libero tempus sit amet. Donec sodales eget justo vitae ultrices. Cras finibus tempus dolor ac sodales. Nulla facilisi. Donec sem ligula, gravida non elementum ac, mollis a sem. Aliquam lacinia diam magna, ut euismod est suscipit nec. Phasellus iaculis malesuada rhoncus. Proin ac eros vel augue sodales euismod sed vel nisl. Aenean interdum enim et massa pharetra, eu accumsan velit auctor. Vestibulum vehicula mattis erat, et feugiat leo condimentum ultrices. Proin rutrum rhoncus urna, nec sollicitudin nisi ultricies vel. Nulla facilisi. 
    </p>
    <b-textarea v-model="preserve">

    </b-textarea>
    <b-button @click="handleText"></b-button>
    <p>
      {{ preserve }}
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const doc = ref(null);
        const two = ref(null)
        const preserve = ref(null);
        const handleHighlight = () => {
            const one = window.getSelection()
            console.log('recieved selection');
            two.value = one.getRangeAt(0);
            console.log('range got',one.getRangeAt(0));
            var umm = document.createElement("span")
            umm.setAttribute("style", "background-color: pink;");
            let fallout = two.value.extractContents();
            console.log(fallout);
            // let result = "";
            const recursion = (elem) => {
                elem.childNodes.forEach(element => {
                  if (element.nodeName === "BR"){
                    umm.innerHTML += "<br />";
                  } else {
                    if (element.childNodes.length > 0) {
                      recursion(element);
                    } else {
                      umm.innerHTML += element.textContent;
                    }
                  }
                });
            }
            recursion(fallout);
            // umm.innerText =  result
            //fallout.textContent.replaceAll('\\n', '\n')
          
            two.value.insertNode(umm);
            // two.value.surroundContents(umm); 
            // umm.addEventListener('click', (e) => {
            //     console.log(e.target);
            // })
        }
        const handleText = () => {
          console.log(preserve.value)
        }
        return {doc, handleHighlight, two, preserve, handleText}
    }
}
</script>

<style scoped>
span, p {
  white-space: pre-line;
}
</style>
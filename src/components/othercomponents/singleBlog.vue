 <!-- the page that appears when a specific blog is clicked on -->
 <template>
 	<div id="single-blog">
 		<h1>{{blog.title}}</h1>
 		<article>{{blog.description}}</article>
 	</div>
 </template>

<script>
import { db } from '@/main'

export default {
  data: function () {
    return {
      id: this.$route.params.id,
      blog: {}
    }
  },
  methods: {
    async readTodos () {
      var blogArray = []
      const todosRef = await db.collection('tester').doc(this.id).get().then(function (doc) {
        if (doc.exists) {
			        console.log('Document data:', doc.data())
			        return doc.data()
			    } else {
			        console.log('No such document!')
			    }
      }).catch(function (error) {
			    console.log('Error getting document:', error)
      })
      this.blog = todosRef
    }
  },
  // created(){
  // 	this.$http.get('https://ap-studybit.firebaseio.com/tester/' + this.id + ".json").then(function(data){
  // 			return data.json();

  // 	}).then(function(data){
  // 		this.blog = data;
  // 	});
  // },
  mounted () {
    this.readTodos()
  }
}

</script>

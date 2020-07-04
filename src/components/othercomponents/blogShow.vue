<!-- shows added blog pages  -->

<template>
	<div id="blog-show">
		<h1>Blog Article</h1>
    <input type="text" v-model="search" placeholder="search" style="width: 100%; border: 1px solid black;" />
		<div v-for="blog in filteredBlogs" class="singleblog">
			<router-link :to="`/blog/${blog.id}`"
			>{{blog.title}}</router-link>
			<article>{{blog.description}}</article>
		</div>
	</div>
</template>

<script>
import { db } from '@/main'
export default {
  data: function () {
    return {
      blogs: [],
      search: ''
    }
  },
  methods: {
    readTodos () {
      const todosRef = db.collection('tester')
      todosRef.get().then(snapshot => {
        var todos = []
        snapshot.forEach(doc => {
          todos.push(doc.data())
        })
        this.blogs = todos
      })
    }
  },
  created () {
  	this.$http.get('https://ap-studybit.firebaseio.com/post.json').then(function (data) {
  		return data.json()
  	}).then(function (data) {
  		var blogsArray = []
  		for (const key in data) {
  			data[key].id = key
  			blogsArray.push(data[key])
  		}
  		this.blogs = blogsArray
  	})
  },
  computed: {
    filteredBlogs () {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search)
      })
    }
  },
  mounted () {
    this.readTodos()
  }
}

</script>

<style type="text/css" scope>
	#blog-show{
		max-width: 800px;
		margin: 0 auto;
	}
	.singleblog{
		padding: 20px;
		margin: 20px 0;
		box-sizing: border-box;
		background: #eee;
	}
</style>

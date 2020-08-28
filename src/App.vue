<template>
<v-app id="body">
	<v-app-bar app color="blue-grey darken-4">
		<v-toolbar-title>
			<!-- <h4 class="ma-5 pa-3 border text-light white--text">LOGO img</h4> -->
			<v-img class="ml-7 mb-3" width="100" src="@/assets/MegLogo.png"></v-img>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn v-for="link in links" :key="`${link.label}-header-link`" text dark rounded :to="link.url">
			{{ link.label }}
		</v-btn>
	</v-app-bar>

	<v-content>
		<router-view></router-view>
	</v-content>

	
	<!-- footer -->
	<v-footer padless>
		<v-layout justify-center wrap>
			<v-flex blue-grey py-4 text-center white--text xs12>
				{{ new Date().getFullYear() }} — <strong>Vuetify Dashboard</strong>
			</v-flex>
		</v-layout>
	</v-footer>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      links: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/About' },
        { label: 'Add New Content', url: '/ManageContent' },
        { label: 'Next Steps', url: '/NextSteps' },
        // { label: 'blogShow', url: '/blogShow' },
        // { label: 'addBlog', url: '/addBlog' },
        // { label: 'Filter', url: '/Filter' },
        { label: 'GEOTester', url: '/GEOTester' }
      ]
    }
  }
}
</script>

<style type="text/css" scoped>
.border{
	border: solid lightgrey 1px;
}
#body {
	/*background: #222;*/
	font-family: sans-serif;
}
</style>

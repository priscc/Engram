<template>
<v-app id="body">
	<v-app-bar app color="orange">
		<v-toolbar-title><h4 class="ma-5 pa-3 border text-light white--text">LOGO img</h4></v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn v-for="link in links" :key="`${link.label}-header-link`" text dark rounded :to="link.url">
			{{ link.label }}
		</v-btn>
	</v-app-bar>

	<v-content>
		<router-view></router-view>
	</v-content>

	
	<!-- footer -->
	<!-- <div style="height: 150px;"></div> -->
	<v-footer color="primary lighten-1" padless>
		<v-layout justify-center wrap>
			<!-- <v-btn v-for="link in links" :key="`${link.label}-footer-link`" color="white" text rounded class="my-2" :to="link.url" >
				{{ link.label }}
			</v-btn> -->
			<v-flex primary lighten-2 py-4 text-center white--text xs12>
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
        { label: 'Add New Content', url: '/AddContentPage' },
        // { label: 'blogShow', url: '/blogShow' },
        // { label: 'addBlog', url: '/addBlog' },
        { label: 'Filter', url: '/Filter' },
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

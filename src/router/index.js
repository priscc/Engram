// Page PURPOSE: to map navbar hyperlinks to files in ./views 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'


// this is where the router-link tags are mapped
// VueRouter instance of a vue router
// path: is what the router-link references to identify the obj in the routes array
// name: (not needed) helps you see what array object is what
// component: need import the page (in this case from ./views folder) -- this can iether be done at the top or within the routes array
Vue.use(VueRouter)

export default new VueRouter ({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		// {
		// 	path: '/Filter',
		// 	name: 'Filter',
		// 	component: () => import('@/views/Filter.vue')
		// },
		{
			path: '/Topics',
			name: 'Topics',
			component: () => import('@/views/Topics.vue')
		},
		// LAST PATH, NotFound router-link page
		// '*' is used to catch any other urls entered in the web browers
		{
			path: '*',
			name: 'NotFound',
			component: () => import('@/views/NotFound.vue')
		}
	]
	
})


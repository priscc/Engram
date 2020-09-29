<template>
<v-app id="body">

	<!-- Nav bar -->
	<v-app-bar app color="blue-grey darken-4">
		<v-toolbar-title>
			<v-img class="ml-7 mb-3" width="100" src="@/assets/MegLogo.png"></v-img>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		
		<!-- Not signed in -->
		<div v-if="!user">
			<v-btn v-for="(link, i) in links" :key="i" text dark rounded :to="link.url">
				<p v-if="link.label == 'Give Feedback'" class="mb-0 button" style="border-bottom: 1px solid red">{{ link.label }}</p>
				<p v-else class="mb-0 button">{{ link.label }}</p>
			</v-btn>

			<v-menu v-model="value" open-on-hover offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn text dark rounded v-bind="attrs" v-on="on" >
						<p class="button mb-0" >Bundle Features</p>
					</v-btn>
				</template>
				<v-list>
					<v-list-item v-for="(item, index) in items" :key="index" @click="bundles(item)" class="py-2" two-line>
						<v-list-item-content>
						<v-list-item-title class="font-weight-bold">{{ item.title }}:</v-list-item-title>
						<v-list-item-subtitle class="subtitle-1 mb-0">{{ item.feature }}</v-list-item-subtitle>
						<v-list-item-subtitle class="subtitle-2 mb-0">{{ item.price }}</v-list-item-subtitle>
					</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-btn @click="dialog = true" text dark rounded>
				<p class="mb-0 button">Login</p>
			</v-btn>
		</div>

		<!-- Signed in -->
		<div v-else>
			<v-btn v-for="(link, i) in linksSignedIN" :key="i" text dark rounded :to="link.url"> 
				<p class="mb-0 button">{{ link.label }}</p>
			</v-btn>
			<v-btn @click="signOut" text dark rounded>
				<p class="mb-0 button">Logout</p>
				<v-icon right>mdi-logout</v-icon>
			</v-btn>
		</div>
	</v-app-bar>

	<!-- Dialog Login -->
	<v-dialog v-model="dialog" width="700px" >
		<v-card outlined class="pa-5">
			<v-btn absolute right @click="dialog = false" icon>
				<v-icon large>mdi-close-circle-outline</v-icon>
			</v-btn>
			<v-form v-model="valid" class="pa-5 mt-6">
				<v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>
				<v-text-field v-model="password" :counter="10" label="Password" required ></v-text-field>
			</v-form>
			<v-card-actions class="d-flex justify-end pt-5">
				<v-btn @click="login" outlined color="green">Login</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<!-- BUNDLES -->
	<v-dialog v-model="dialog_Bundles" width="700px" >
		<v-card outlined class="pa-5">
			<v-btn absolute right @click="dialog_Bundles = false" icon>
				<v-icon large>mdi-close-circle-outline</v-icon>
			</v-btn>
			<h1 class="font-weight-light pa-12">FEATURE COMING SOON ... </h1>
		</v-card>
	</v-dialog>

	<!-- Main content -->
	<v-content>
		<router-view></router-view>
	</v-content>

	<!-- footer -->
	<v-footer padless>
		<v-layout justify-center wrap>
			<v-flex blue-grey py-4 text-center white--text xs12>
				{{ new Date().getFullYear() }} — <strong>AP Study Bit</strong>
			</v-flex>
		</v-layout>
	</v-footer>
</v-app>
</template>

<script>
import store from "@/store";
import { firebase, db, analytics} from "@/main";
export default {
	name: 'App',
	data () { return {
		value: false,
		items: [
			{ title: 'For Teachers' , feature: 'Customize Website Content for your Class', price: '$10/per year' },
			{ title: 'For Students', feature:'Notebook [save playlists of notes, links, and more] ', price: '$10/per year'}
		],
		dialog_Bundles: false,
		// Nav bar
		links: [ // all readers
			{ label: 'Home', url: '/' },
			{ label: 'About', url: '/About' },
			{ label: 'Give Feedback', url: '/NextSteps' },
			// { label: 'GEOTester', url: '/GEOTester' }
		],
		linksSignedIN: [ // admins only
			{ label: 'Home', url: '/' },
			{ label: 'About', url: '/About' },
			{ label: 'Add New Content', url: '/ManageContent' },
			{ label: 'Next Steps', url: '/NextSteps' },
			{ label: 'GEOTester', url: '/GEOTester' }
		],
		// Login dialog
		dialog: false,
		valid: false,
		email: '',
		password: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+/.test(v) || 'E-mail must be valid',
		]
	}},
	computed: {
		user() {
			return this.$store.state.user
		}
	},
	methods:{
		bundles(i){
			analytics.logEvent('Bundles', { bundle: i.title } );
			this.dialog_Bundles = true
		},
		login (e){
			firebase.auth()
			.signInWithEmailAndPassword(this.email, this.password)
			.then( 
				user => {
					store.dispatch("signIn", user);
					this.dialog = false
				},
				err => { alert(err.message) }
			);
			e.preventDefault();
		},

		signOut() {
			firebase.auth().signOut();
			store.dispatch("signOut");
		},
	}
}
</script>

<style type="text/css" scoped>
	.border {
		border: solid lightgrey 1px;
	}
	#body {
		/*background: #222;*/
		font-family: sans-serif;
	}
	.button {
		font-size: 1.2rem;
		text-transform: capitalize;
		font-family: "Roboto";
		font-weight: 300;
		letter-spacing: -0.01rem;
	}
</style>

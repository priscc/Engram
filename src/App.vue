<!-- Page PURPOSE: to host a template webpage that will be used by all  pages (ie. all web pages will have a navbar) -->
<template>
	<!-- stuff displayed in #app are displayed on every page on this site -->
	<div id="app">
		<b-navbar toggleable="lg" type="dark" variant="warning">
			<b-navbar-brand class="border p-2" href="#">LOGO Img</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item><router-link class="nav-link" to="/">Home</router-link></b-nav-item>
					<b-nav-item><router-link class="nav-link" to="/Filter">Filter</router-link></b-nav-item>
					<b-nav-item><router-link class="nav-link" to="/Topics">Topics</router-link></b-nav-item>
				</b-navbar-nav>
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<!-- Search -->
					<b-nav-form>
						<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</b-nav-form>
					<!-- Using 'button-content' slot -->
					<b-nav-item-dropdown right>
						<template v-slot:button-content><em>User</em></template>
						<b-dropdown-item href="#">Profile</b-dropdown-item>
						<b-dropdown-item href="#">Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	<router-view/>
	</div> <!-- end of #app -->
</template>


<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
</style>

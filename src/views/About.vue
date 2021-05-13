<template>
<div class="about">
	<v-container fluid class="px-12 pt-12">

		<p class="text-center headline mb-0 pb-3"><u>About this site</u></p>
		<v-row>
			<v-spacer></v-spacer>
			<v-col cols="8"> <hr> </v-col>
			<v-spacer></v-spacer>
		</v-row>
		<v-row class="mx-12">
			<v-col cols="5">
				<v-img width="100%" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q1/product-ux-case-study-roadmap-header.png"></v-img>
			</v-col>
			<v-col>
				<p>
					This site's design explores how an interactive web interface can help enhance the content presented in AP World History. One of the most significant challenges in history education is explaining how the past has impacted our present. This site attempts to take a stab at how an interactive web interface can give the viewer context around their information through timelines, maps, historical images, and links to relevant resources. 
				</p>
			</v-col>
			<v-col cols="1"></v-col>
		</v-row>

		<p class="text-center headline pt-12 mb-0 pb-3"><u>About the Team</u></p>
		<v-row>
			<v-spacer></v-spacer>
			<v-col cols="8"> <hr> </v-col>
			<v-spacer></v-spacer>
		</v-row>
		
		<v-row>
			<v-spacer></v-spacer>
			<v-col cols="7">
				<p class="text-center mb-0">
					This site grew from hearing the challenges students and teachers face in AP World History. Originally a <a href="https://drive.google.com/file/d/15QSwWx3lAsPOoeg92BvIVmIRt7H6tW4d/view?usp=sharing"  target="_blank">thesis project</a> by Priscilla Cancar, this project was bought to life to help teachers and students who may have difficulty tackling course content during this pandemic. 
				</p>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>
		<v-row>
			<v-spacer></v-spacer>
			<v-col cols="8" class="pt-6 pl-10">
				<v-row>
					<v-col v-for="i in team" cols="6">
						<v-card rounded>
							<v-list-item>
								<v-list-item-avatar v-if="i.img" size="68px" color="grey">
									<img alt="Avatar" :src="i.img" >
								</v-list-item-avatar>
								<v-icon v-else size="68px">mdi-account-circle</v-icon>
								<v-list-item-content>
									<v-list-item-title class="headline text-wrap">{{i.name}}</v-list-item-title>
									<v-list-item-subtitle class="font-italic py-2 text-wrap">{{i.position}}</v-list-item-subtitle>
									<v-list-item-subtitle class="text-wrap">{{i.background}}</v-list-item-subtitle>
									<v-list-item-subtitle v-if="i.contact" class="py-2">Email: <a>{{i.contact}}</a></v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>	
						</v-card>
					</v-col>
				</v-row>
			</v-col>
			<v-spacer></v-spacer>
		</v-row>
		
	</v-container>
</div>
</template>


<script>
import { analytics } from '@/main'

export default {
	data () { return {
		team:[
			{name: 'Priscilla Cancar', img: require('@/assets/Priscilla_Cancar.jpg'), position: 'UX Designer & Web Developer', background: "Teachers College, Columbia Unv. Gradute '20", contact: 'pnc2114@tc.columbia.edu'},
			{name: 'Laura Hull', position: 'Editor & Content Creator', background: 'High School Senior' },
			{name: 'Cole', position: 'Researcher & Content Creator', background: 'High School Junior' },
			{name: 'Johnny Green', position: 'Researcher & Content Creator', background: 'High School Junior'}

		]
	}},
	
	mounted (){
		analytics.logEvent('About_Page');
	}
}

</script>



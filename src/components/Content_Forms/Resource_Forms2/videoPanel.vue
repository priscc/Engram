<template>
<div>
	<!-- display videos -->
	<div v-for="(resource, i) in resources" :key="i">
		<v-row class="pt-4">
			<v-col>
				<v-card class="pa-2 d-flex flex-row">

					<iframe width="160" height="70" :src="`https://www.youtube.com/embed/${resource.url}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					<div class="caption pl-4">{{resource.title}}</div>
					<v-btn small color="red" icon fab absolute top right @click="removeResource(resource)"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
				</v-card>
			</v-col>
		</v-row>
	</div>

	<!-- add video -->
	<v-row v-if="add">
		<v-col>
			<v-btn block @click="add = false" outlined color="green"><v-icon>mdi-plus</v-icon></v-btn>
		</v-col>
	</v-row>
	<v-row v-else>
		<v-col>
			<v-card elevation="4" outlined style="border-color: #4CAF50">
				<v-form ref="form" v-model="valid">
					<v-container fluid class="py-0 px-2">
						<v-row class="d-flex flex-column">
							<v-col class="pb-0">
								<v-text-field 
									v-model="video.title" placeholder="video title" 
									dense style="width: 70%" :rules="rule" required>
								</v-text-field>
								<v-text-field 
									v-model="video.url" placeholder="video link"
									dense prepend-inner-icon="mdi-link mdi-rotate-315" :rules="rule" required>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="d-flex justify-end align-center py-0">
								<v-btn color="blue" @click="[add = true, reset()]" small text>Close</v-btn>
								<v-btn color="pink" @click="reset" small text>Reset</v-btn>
								<v-btn color="green" class="mx-2 pb-2" :disabled="!valid" @click="[add = true, addResource()]" icon><v-icon large>mdi-plus-circle-outline</v-icon></v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
			</v-card>
		</v-col>
	</v-row>
</div>
</template>


<script type="text/javascript">
import store from "@/store";
export default {
	props: {
		parentID: String,
		parentType: String
	},
	data: function () {return {
		add: true, //show form for adding new content
		video: {}, //form creates objects -- {title:'', url:''}
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ]
	}},

	computed: {
		resources() {
			return this.$store.state.resources.filter(r => r.parentID === this.$props.parentID && r.resourceType === 'video')
		}
	},

	methods: {
		removeResource(resource){
			//if removing from db (has id) -- remove from resources && add id to removedResources
			// else not from db --remove from resources && remove from newResources
			store.dispatch("removeResource", resource);
		},

		addResource(){
			this.video.parentType = this.$props.parentType
			this.video.resourceType = 'video'
			this.video.parentID = this.$props.parentID
			store.dispatch("addResource", this.video);
			this.video = {}
			this.reset()
		},

		reset() { this.$refs.form.reset() },
		validate () { this.$refs.form.validate() },
	}
}
</script>
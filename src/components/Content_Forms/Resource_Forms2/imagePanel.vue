<template>
<div>
	<!-- display images -->
	<div v-for="(resource, i) in resources" :key="i">
		<v-row>
			<v-col>
				<v-card class="d-flex">
					<v-row>
						<v-col class="py-0 d-flex flex-row">
							<div>
								<v-img v-if="resource.preview" max-width="100px" max-height="80px" :src="resource.preview"></v-img>
								<v-img v-else max-width="100px" max-height="80px" :src="resource.thumbURL"></v-img>
							</div>
							<div class="caption pa-2">{{ resource.caption }}</div>
						</v-col>
						
						<v-col class="py-0 mr-1 d-flex justify-end">
							<v-btn color="red" icon @click="removeResource(resource)"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
						</v-col>
					</v-row>

					<!-- 
					<div class="text-center" >
						<v-img max-width="100px" max-height="80px" :src="resource.preview"></v-img>
					</div>
					<div max-width="70px" class="caption pa-2">{{ resource.caption }}</div>
					<div class="justify-end">
						<v-btn color="red" icon @click="removeResource(resource)"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
					</div>
					 -->
				</v-card>

				<!-- <v-card class="pa-2"outlined >
					<v-btn x-small absolute dark fab top right color="blue-grey lighten-3">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-img max-height="170" max-width="100%" :src="resource.preview" style="border: 1px solid black"></v-img>
					<p class="caption">{{resource.caption}}</p>
				</v-card> -->
			</v-col>
		</v-row>
	</div>
	
	<!-- add article -->
	<v-row v-if="add">
		<v-col>
			<v-btn block @click="add = false" outlined color="green"><v-icon>mdi-plus</v-icon></v-btn>
		</v-col>
	</v-row>
	<v-row v-else>
		<v-col class="px-4">
			<v-card elevation="4" max-width="100%">
				<v-form ref="form" v-model="valid">
					<v-container fluid class="py-0 px-2">
						<v-row class="d-flex flex-column">
							<v-col class="pb-0">
								<v-file-input dense full-width dense v-model="image.thumbnail" accept="image/*" counter show-size label="Image" :rules="imgRule"></v-file-input>
								<v-textarea v-model="image.caption" outlined label="Caption" auto-fill="off" rows="2" row-height="20" :rules="rule" required></v-textarea>
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
		image: {}, //form creates objects -- {thumbnail: null, caption: ''}
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ],
		imgRule: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!']
	}},
	
	computed: {
		resources() {
			return this.$store.state.resources.filter(r => r.parentID === this.$props.parentID && r.resourceType === 'image')
		}
	},

	methods: {
		removeResource(resource){
			//if removing from db (has id) -- remove from resources && add id to removedResources
			// else not from db --remove from resources && remove from newResources
			store.dispatch("removeResource", resource);
		},

		addResource(){
			this.image.parentType = this.$props.parentType
			this.image.resourceType = 'image'
			this.image.parentID = this.$props.parentID
			this.image.preview = URL.createObjectURL(this.image.thumbnail) // added to display preview of image
			store.dispatch("addResource", this.image);
			this.image = {}
			this.reset()
		},

		reset() { this.$refs.form.reset() },
		validate () { this.$refs.form.validate() },
	}
}
</script>
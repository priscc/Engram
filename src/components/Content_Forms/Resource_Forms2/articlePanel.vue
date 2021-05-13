<template>
<div>
	<!-- display articles -->
	<div v-for="(resource, i) in resources" :key="i">
		<v-row>
			<v-col>
				<v-card class="pa-2 d-flex flex-row">
					<v-row>
						<v-col class="py-0 d-flex flex-column">
							<div class="subtitle-2">{{ resource.title }}</div>
							<div class="caption">{{ resource.url }}</div>
						</v-col>
						<v-col cols="1" class="py-0 d-flex justify-end">
							<v-btn color="red" icon @click="removeResource(resource)"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
						</v-col>
					</v-row>
				</v-card>
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
		<v-col>
			<v-card elevation="4" outlined style="border-color: #4CAF50">
				<v-form ref="form" v-model="valid">
					<v-container fluid class="py-2 px-5">
						<v-row>
							<v-col class="pb-0" cols="8">
								<v-text-field 
									v-model="article.newsSource" placeholder="News Source" 
									dense :rules="rule" required>
								</v-text-field>
							</v-col>
							<v-col class="d-flex justify-end align-center flex-row my-0">
								<v-text-field 
									v-model="article.published" placeholder="Published" 
									dense>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="pb-0" cols="8">
								<v-text-field 
									v-model="article.title" placeholder="Article title" 
									dense :rules="rule" required>
								</v-text-field>
							</v-col>
							<v-col class="d-flex justify-end align-center flex-row my-0">
								<v-switch class="mt-0" v-model="article.relevantToday" inset></v-switch>
								<p>Relevance Today</p>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="pb-0">
								<v-text-field 
									v-model="article.summary" placeholder="Summary" 
									dense :rules="rule" required>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-file-input dense v-model="article.thumbnail" accept="image/*" counter show-size label="Thumbnail" :placeholder="article.articleFile" :rules="imgRule" clearable></v-file-input>
							</v-col>
							<v-col>
								<v-text-field 
									v-model="article.url" placeholder="Article link"
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
import firebase from 'firebase'

export default {
	props: {
		parentID: String,
		parentType: String
	},
	data: function () {return {
		add: true, //show form for adding new content
		article: {}, //form creates objects -- {title:'', url:'', relevantToday: Bool}
		// Validation
		valid: true,
		rule: [ v => !!v || 'Required' ],
		imgRule: [ v => !v || v.size < 2000000 || 'More than 2MB required'],
	}},

	computed: {
		resources() {
			return this.$store.state.resources.filter(r => r.parentID === this.$props.parentID && r.resourceType === 'article')
		}
	},

	methods: {
		removeResource(resource){
			console.log('resource', resource)
			//if removing from db (has id) -- remove from resources && add id to removedResources
			// else not from db --remove from resources && remove from newResources
			store.dispatch("removeResource", resource);
		},

		async addResource(){
			if(this.article.thumbnail){
				await this.deleteImage(this.article)
				await this.saveImage(this.article)
			}

			this.article.parentType = this.$props.parentType
			this.article.resourceType = 'article'
			this.article.parentID = this.$props.parentID
			store.dispatch("addResource", this.article);
			this.article = {}
			this.reset()
		},

		//clears firebase storage - thumbFile - thumbURL
		async deleteImage(file){
			var desertRef = firebase.storage().ref().child(file.thumbnail.name);
			await desertRef.delete()
			.then(function() { 
				file.articleFile = ''
				file.articleURL = ''
			})
			.catch(function(error) { console.error("Error updating document: ", error) });
		},

		//updates firebase storeage - thumbFile - thumbURL - deletes thumbURL
		async saveImage(file){
			var storageRef = firebase.storage().ref().child(file.thumbnail.name)
			await storageRef.put(file.thumbnail)
			file.articleFile = file.thumbnail.name
			file.articleURL = await storageRef.getDownloadURL()
			delete file.thumbnail
		},


		reset() { this.$refs.form.reset() },
		validate () { this.$refs.form.validate() },
	}
}
</script>
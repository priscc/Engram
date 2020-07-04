<template>
	<v-col style="padding-bottom: 100px">
		<!-- <h4 class="pl-3 pb-6">Terminology</h4> -->
		<v-row>
			<v-col cols="1"></v-col>
			<v-col>
				<v-row v-for="(term, i) in terminology" :key="i" class="py-5">
					<v-tooltip right color="grey lighten-3">
						<template v-slot:activator="{ on, attrs }">
							<a class="pr-5" color="primary" dark v-bind="attrs" v-on="on">{{term.word}}</a>
						</template>
						<p style="max-width: 25em" class="black--text mb-0 py-4 px-3"><i>{{term.def}}</i></p>
					</v-tooltip>
				</v-row>
			</v-col>
			<v-col>
				<v-row v-for="(term, i) in terminology" :key="i" class="py-5">
					<v-tooltip right color="grey lighten-3">
						<template v-slot:activator="{ on, attrs }">
							<a class="pr-5" color="primary" dark v-bind="attrs" v-on="on">{{term.word}}</a>
						</template>
						<p style="max-width: 25em" class="black--text mb-0 py-4 px-3"><i>{{term.def}}</i></p>
					</v-tooltip>
				</v-row>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>

export default {
  name: 'Topics',
  props: {
    causes: Array,
    turningP: Array,
    effects: Array
  },
  data () {
    return {
      terminology: [
        { word: 'word word', def: 'definition: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin augue nec nunc sagittis semper. Integer bibendum, lectus eu egestas rutrum, nulla erat gravida enim, eget volutpat metus nulla eget eros.' },
        { word: 'word word', def: 'definition: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin augue nec nunc sagittis semper. Integer bibendum, lectus eu egestas rutrum, nulla erat gravida enim, eget volutpat metus nulla eget eros.' },
        { word: 'word word', def: 'definition: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin augue nec nunc sagittis semper. Integer bibendum, lectus eu egestas rutrum, nulla erat gravida enim, eget volutpat metus nulla eget eros.' },
        { word: 'word word', def: 'definition: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin augue nec nunc sagittis semper. Integer bibendum, lectus eu egestas rutrum, nulla erat gravida enim, eget volutpat metus nulla eget eros.' },
        { word: 'word word', def: 'definition: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin augue nec nunc sagittis semper. Integer bibendum, lectus eu egestas rutrum, nulla erat gravida enim, eget volutpat metus nulla eget eros.' },
        { word: 'word word', def: 'definition: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin augue nec nunc sagittis semper. Integer bibendum, lectus eu egestas rutrum, nulla erat gravida enim, eget volutpat metus nulla eget eros.' },
        { word: 'word word', def: 'definition: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin augue nec nunc sagittis semper. Integer bibendum, lectus eu egestas rutrum, nulla erat gravida enim, eget volutpat metus nulla eget eros.' },
        { word: 'word word', def: 'definition: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin augue nec nunc sagittis semper. Integer bibendum, lectus eu egestas rutrum, nulla erat gravida enim, eget volutpat metus nulla eget eros.' }
      ]
    }
  },
  mounted () {

  }
}
</script>

<style scope>
	#tooltip{
		border-color: 1px solid black;
	}
</style>

<template>
    <v-col>
    	<v-row class="text-center" style=" border-bottom: 1px solid #26A69A;"> 
			<v-col class="pt-0">
				<h2 class="font-weight-light">The {{header}}</h2>
			</v-col>
		</v-row>
    	<v-row align="center" justify="center" class="pt-4">
            <v-img aspect-ratio="16/9" src="@/assets/americanrev.jpg" lazy-src="https://picsum.photos/10/6?image=2"  class="grey lighten-2" >
				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center" >
						<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
					</v-row>
				</template>
			</v-img>
		</v-row>
	</v-col>
</template>

<script>

export default {
  props: {
    header: String
  }
}
</script>
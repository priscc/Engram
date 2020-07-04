<template>
    <v-col>
    	<v-row align="center" justify="center">
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

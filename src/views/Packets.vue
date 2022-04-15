<template>
	<div class="Packets" style="background-color: #c0bcbc; height: 100%;">
		<v-container
			fluid
			style="height: 100%"
			class="d-flex align-self-strech flex-column"
		>
			<v-row class="pa-0 d-flex align-strech">
				<v-col cols="12" class="pa-0">
					<iframe :src="source"></iframe>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>
<script>
import store from "@/store";
export default {
	data() {
		return {
			source: "https://engramlearn.store",
		};
	},
	mounted() {
		store.dispatch("setTimePeriod", -1);
	},
};
</script>

<style type="text/css" scoped>
#app,
#app iframe {
	height: 100%;
	width: 100vw;
	border: none;
	box-sizing: border-box;
}
body {
	margin: 0;
}
</style>

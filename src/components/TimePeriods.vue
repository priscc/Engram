<template>
	<v-card class="mx-auto" outlined>
		<v-list-item-title class="headline pa-2 grey lighten-3 text-wrap title">{{ header }}</v-list-item-title>
		<v-container class="py-0">
			<v-row>
				<v-col cols="3" class="pa-0" v-for="(topic, index) in topics" :key="index">
				<!-- Clickable topic -->
					<v-card v-if="topic.topicContent_published" class="mx-auto box" outlined :to="`/Topic/${topic.collectionName}/Intro`">
						<div class="done pa-2">
							<v-responsive>
								<v-img :src="require(`@/assets/${topic.img}`)" aspect-ratio="1"></v-img>
							</v-responsive>
							<v-card-subtitle class="text-center">{{ topic.topicTitle }}</v-card-subtitle>
						</div>
					</v-card>
				<!-- Watermark topic -->
					<v-card v-else id="watermark" class="mx-auto box" outlined>
						<div class="pa-2">
							<v-responsive>
								<v-img :src="require(`@/assets/${topic.img}`)" aspect-ratio="1"></v-img>
							</v-responsive>
							<v-card-subtitle class="text-center">{{ topic.topicTitle }}</v-card-subtitle>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-card> <!-- end of #timePeriods -->
</template>

<script>
export default {
  name: 'timePeriods',
  props: {
    header: String,
   	topics: Array
  }
}
</script>

<style scoped>
	.done:hover {
		border: 2px solid grey;
		font-weight: normal;
	}
	.box{
		min-height: 100%;
		border: .5px solid lightgrey;
		text-align: center;
		min-height: 100%;
		opacity: 1;
	}
	#watermark:after {
		content: "";
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		background-image: url("https://www.thinkoutsidetheslide.com/wp-content/uploads/2019/10/DRAFT-background.jpg");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		opacity: 0.4;
	}
</style>

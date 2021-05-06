<template>
	<!-- id is needed so Home.vue can import/grab html content in the id "timePeriods" form '@/components/Events.vue' -->
	<div id="events">
		<div class="container">
			<div class="row">
				<div class="col m-0">
					<div class="row">
						<p class="bg-danger text-white rounded-circle px-2 my-3 text-center">1</p>
					</div>
				</div>
				<div class="col-sm-10 border rounded p-1"><p>hey</p></div>
			</div>
		</div>
	</div> <!-- end of #events -->
</template>



<script>
export default {
	name: 'events',
	props: {
	},
	data(){
		return{

		}
	}
}
</script>

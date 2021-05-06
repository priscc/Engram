<div id="app" class="container">
		<!-- BREADCRUMB -->
		<div class="row py-4">
			<h3 class="m-0">American Revolution</h3>
		</div>
		<!-- TOPIC CONTENT -->
		<div class="row border border-warning">
			<!-- LEFT COL (SIDE BAR) -->
			<div class="col-sm-2 border-right pt-4 text-sm-left text-break">
				<h4><a class="text-dark" href="#">Events</a></h4>
				<h4><a class="text-dark" href="#">Terminology</a></h4>
				<h4><a class="text-dark" href="#">People</a></h4>
			</div>
			<!-- RIGHT COL -->
			<div class="col-sm-10 my-1 pt-3 bg-light">
			<div class="container">
				<!-- Content above Timeline -->
				<div class="row pt-3 pb-2">
					<!-- CAUSES -->
					<div class="col-sm">
						<div class="row">
							<h4 class="col border text-wrap text-center py-1">Cause</h4>
						</div>
						<div class="row py-1" v-for="event in events" :key="event">
							<events class="col"></events>
						</div>
					</div>
					<!-- LINE -->
					<div class="col-sm-1"><hr class="vertical"/></div>
					<!-- TURNING POINTS -->
					<div class="col-sm">
						<div class="row">
							<h4 class="col border text-wrap text-center py-1">Turning Points</h4>
						</div>
						<div class="row py-1" v-for="event in events" :key="event">
							<events class="col"></events>
						</div>
					</div>
					<!-- LINE -->
					<div class="col-sm-1"><hr class="vertical"/></div>
					<!-- EFFECTS -->
					<div class="col-sm">
						<div class="row">
							<h4 class="col border text-wrap text-center py-1">Effects</h4>
						</div>
						<div class="row py-1" v-for="event in events" :key="event">
							<events class="col"></events>
						</div>
					</div>
				</div>
				<!-- TIMELINE -->
				<div class="row border my-4">
					<div class="col-sm bg-dark text-white" style="padding: 60px 0px;">
						<h4 class="text-center my-0 py-3" style="padding: 60px 0px;">map placeholder </h4>
					</div>
					<div class="col-md-9 timeline-container" style="height:100px;">
						<h4>Timeline of Causes</h4>
						<div class="timeline">
							<!-- <div class="status" v-for="events in causes">
								<span>
									<p>{{events.numTag}}</p>
								</span>
							</div> -->
						</div>
					</div>
				</div> <!-- end of TIMELINE -->
			</div> <!-- end of RIGHT container -->
		</div> <!-- end of RIGHT COL -->
		</div> <!-- end of TOPIC CONTENT -->
	</div> <!-- end of #app -->
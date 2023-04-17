<template>
  <div id="About" class="Packets" style="background-color: #f2f2f2;">
    <b-container>
      <h1 class="py-10">About Engram</h1>
      <div class="absolute">
        <p
          style="padding-left: 80px; padding-right: 80px; padding-top: 40px; padding-bottom: 40px"
        >
          Engram is a site developed to tackle the abstract, overwhelming, and
          complex nature of social studies using design. This site provides
          online instruction concentrated on world history, drawning content
          primarly aligned to the AP World History curriculum.
        </p>
      </div>
      <div class="absolute2">
        <h2 style="padding-top: 40px; padding-left: 80px;text-align: left;">
          Our Mission
        </h2>
        <p
          style="padding-left: 80px; padding-right: 80px; padding-bottom: 10px"
        >
          Engram's focus is to improve the accessibility of how historical
          content can be received. This site experiments with how an interactive
          web interface can enhance historical content. As everyday digital
          experiences are becoming progressively more intuitive, interactive,
          and personalized, we are looking to explore how these societal changes
          can elevate our current education system.
        </p>
        <!-- 
				Engram is a site developed to tackle the abstract,
					overwhelming, and complex nature of social studies using
					intuitive UI and design theories. This site provides online
					instruction and study notes (soon to come) concentrated on
					social studies education with a focus on AP World History.

				Engram's focus is to improve the accessibility of how
					historical content can be received. This site experiments
					with how an interactive web interface can enhance historical
					content and contextualize our past within our present. As
					everyday digital experiences are becoming progressively more
					intuitive, interactive, and personalized, we are looking to
					explore how these societal changes can elevate our current
					education system. Engram carefully crafts a UI experience
					that has the capacity to present historical information in
					new and diverse ways, making knowledge more accessible for
					everyone. -->
        <!-- 

					version from 6/622

					Engram is a site developed to tackle the abstract,
					overwhelming, and complex nature of social studies using
					intuitive UI and design theories. We experiment with how an
					interactive web interface can enhance historical content and
					contextualize our past within our present. As an early-stage
					edTech start-up, we provide online instruction and study
					notes concentrated on social studies education with a focus
					on AP World History.
				
					Engram's focus is to improve the accessibility of how
					historical content can be received. Compared to other
					subjects, such as STEM, little is being done to provide
					social studies students with modern applications to improve
					their learning experiences. While everyday digital
					experiences are becoming progressively more intuitive,
					interactive, and personalized, most of education does not
					reflect this societal changes. We believe carefully crafted
					UI has the capacity to present historical information in new
					and diverse ways, making knowledge more accessible to
					everyone.
		-->
      </div>
      <b-row style="padding-top: 50px">
        <b-col>
          <b-img
            style="min-width: 100%; max-height:600px"
            :src="require('@/assets/globe2.jpg')"
          >
          </b-img>
          <p class="d-flex justify-end" style="font-size: 8px">
            Photo by:
            <a
              class="px-1"
              href="https://unsplash.com/@orbisterrae?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              >Gaël Gaborel - OrbisTerrae</a
            >
            on
            <a
              class="pl-1"
              href="https://unsplash.com/s/photos/globe?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              >Unsplash</a
            >
          </p>
        </b-col>
      </b-row>
      <b-row style="padding-top: 100px; padding-bottom: 100px">
        <b-col class="d-flex flex-column align-center text-align-center">
          <h2>Contact Information</h2>

          <p>Email: pncancar@gmail.com</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<style type="text/css" scoped>
div.absolute {
  position: absolute;
  top: 180px;
  left: 0;
  width: 60%;
  z-index: 10;
  background: rgba(255, 255, 255, 0.6);
}
div.absolute2 {
  position: absolute;

  top: 500px;
  right: 0;
  width: 80%;

  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
}

/*#app,
#app iframe {
	height: 100%;
	width: 100vw;
	border: none;
	box-sizing: border-box;
}
body {
	margin: 0;
}*/
</style>

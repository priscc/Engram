<template>
  <div>
    <div class="slideshow-container">
      <div
        class="mySlides fade-in-image"
        v-for="(event, slide) in events"
        :key="slide"
      >
        <div class="numbertext">{{ slide + 1 }} / {{ events.length }}</div>
        <b-img :src="event.thumbURL" style="width:100%" />
        <div class="title">{{ event.title }}</div>
        <div class="text">{{ event.descriptionMD }}</div>
      </div>
      <div class="prev" @click="plusSlides(-1)">❮</div>
      <div class="next" @click="plusSlides(1)">❯</div>
    </div>
    <br />

    <div style="display: flex; justify-content:center; ">
      <div style="display: inline;" v-for="slide in events.length" :key="slide">
        <span class="dot" @click="currentSlide(slide )"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import storeTopic from "@/store/topic.js";
export default {
  props: {
    events: Object,
  },
  data() {
    return {
      slideIndex: 1,
    };
  },
  watch: {
    events: {
      handler(newVal) {
        if (newVal.length > 0) {
          console.log('card mount', this.slideIndex)
          this.showSlides(this.slideIndex);
        }
      },
      flush: "post",
    },
  },
  methods: {
    // goTo(event) {
    //   storeTopic.dispatch("eventContent", event);
    //   console.log("learn more about event", event.id);
    //   this.$router.push({ name: "Event", params: { event: event.id } });
    // },
    plusSlides(n) {
      this.showSlides((this.slideIndex += n));
    },

    currentSlide(n) {
      this.showSlides((this.slideIndex = n));
    },

    showSlides(n) {
      console.log('card event index', n)
      storeTopic.dispatch("setEventIndex", n-1);
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].className += " active";
    },
  },
};
</script>

<style type="text/css" scoped>
/*body {font-family: Verdana, sans-serif; margin:0}*/
.mySlides {
  display: none;
}
b-img {
  vertical-align: middle;
}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Caption text */
.title {
  color: #f2f2f2;
  font-weight: bold;
  font-size: 15px;
  padding: 8px 12px;
  /*position: absolute;*/
  /*bottom: 56px;*/
  width: 100%;
  text-align: center;
}
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  /*position: absolute;*/
  /*bottom: 8px;*/
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #717171;
}

.fade-in-image {
  animation: fadeIn 2s;
  -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 2s;
  -o-animation: fadeIn 2s;
  -ms-animation: fadeIn 2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev,
  .next,
  .text {
    font-size: 11px;
  }
}
</style>

<template>
  <div id="EventCardComp">
    <div class="slideshow-container">
      <div
        class="mySlides fade-in-image"
        v-for="(event, slide) in events"
        :key="slide"
      >
        <div class="numbertext">{{ slide + 1 }} / {{ events.length }}</div>
        <b-img :src="event.thumbURL" class="eventImage" />
        <div class="eventTitle">{{ event.title }}</div>
        <div class="eventText">{{ event.descriptionMD }}</div>
        <div v-if="event.descriptionMD.length > 0" class="event_button">
          <b-button size="sm" @click="openEvent(event)">Learn More</b-button>
        </div>
      </div>
      <div class="prev" @click="plusSlides(-1)">❮</div>
      <div class="next" @click="plusSlides(1)">❯</div>
    </div>
    <br />

    <div style="display: flex; justify-content:center; ">
      <div style="display: inline;" v-for="slide in events.length" :key="slide">
        <span class="dot" @click="currentSlide(slide)"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import storeTopic from "@/store/topic.js";
export default {
  props: {
    events: Object
  },
  data() {
    return {
      slideIndex: 1
    };
  },
  watch: {
    events: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.showSlides(this.slideIndex);
        }
      },
      flush: "post"
    }
  },
  methods: {
    openEvent(event) {
      storeTopic.dispatch("setEventContent", event);
      this.$router.push({ name: "Event", params: { event: event.id } });
      this.$gtag.event("clicked-event-learnMore", {
        event_category: "engagement",
        event_label: event,
      });
    },
    plusSlides(n) {
      this.showSlides((this.slideIndex += n));
    },

    currentSlide(n) {
      this.showSlides((this.slideIndex = n));
    },

    showSlides(n) {
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
      storeTopic.dispatch("setEventIndex", this.slideIndex - 1);
    }
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/topicEvents.sass"></style>

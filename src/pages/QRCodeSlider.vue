<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="10"

    class="q-my-lg"
    :pagination="true"
  >
    <swiper-slide
      v-for="(item, index) in categories"
      :key="index"
      :style="{ border: index == activeIndex ? '1px solid green' : 'initial' }"
      class="rounded"
    >
      <div class="swiper-slide-content qr_codes" >
       <div v-html="item"></div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      quantity: 1,
      onSwiper,
      onSlideChange,
      activeIndex: null,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  mounted() {
    // You can add mounted logic here if needed
  },
  methods: {
    setActive(index, detail) {
      this.activeIndex = index;
      this.$emit("getActiveId", detail);
    },
    truncatedata(data) {
      const final_data = data.slice(0, 50);
      return final_data + " ...";
    },
  },
};
</script>

<style>
.active-slide {
  border: 1px solid green;
}

.text-green {
  color: green;
}

.swiper-slide-content {
  display: flex;
  justify-content: center;
  margin-block: 50px; /* Center content horizontally */
}

.swiper-slide-image {
  max-width: 100%;
  height: auto;
}
</style>

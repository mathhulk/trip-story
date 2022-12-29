<template>
  <div :class="{ active }" class="trip">  
    <div class="trip-text">
     <div class="trip-icon">
        <FeatherIcon icon="heart" :width="12" :height="12" fill="currentColor" />
      </div>

      <p class="trip-title"><span class="location location-france">France</span> and <span class="location location-belgium">Belgium</span> with love</p>

      <p class="trip-description">Annika, I know this might not come as a surprise, 
        but I really wanted you to know how much of a positive impact our trips have on me.
        Once again, I hope you enjoy this interactive map which will allow us to look back
        on the memories we made in France and Belgium whenever we want. <span class="important">With love, Matthew</span>.</p>

      <router-link to="/world">
        <div class="trip-button">
          <div class="button-icon">
            <FeatherIcon icon="play" />
          </div>

          <p class="button-text">Enter</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";

import FeatherIcon from "../components/FeatherIcon.vue";

const props = defineProps([ "map" ]);

const active = ref(false);

const handleMoveEnd = (event) => {
  if (event.view !== "trip") return;

  active.value = true;
};

onMounted(() => {
  props.map.on("moveend", handleMoveEnd);

  const location = {
    center: [ -40.852003, 38.710733 ],
    zoom: 1.5,
    speed: 0.25,
    // To-do: Padding
    padding: {
      left: window.innerWidth / 2
    }
  };

  props.map.flyTo(location, { view: "trip" });
});

onUnmounted(() => {
  props.map.off("moveend", handleMoveEnd);
});
</script>

<style lang="scss" scoped>
// To-do: Shadow, width
.trip {
  height: 100vh;
  width: 50vw;

  left: 0;
  top: 0;

  position: fixed;

  display: flex;
  align-items: center;
  
  padding: 0 32px;

  opacity: 0;

  transition: opacity 500ms ease;

  &.active {
    opacity: 1;
  }

  .trip-text {
    position: relative;

    .trip-icon {
      position: absolute;

      color: #ef4444;

      left: -12px;
      top: -12px;

      transform: rotate(-22.5deg);
    }

    .trip-title {
      font-size: 48px;
      font-weight: 900;
      color: #ef4444;
      line-height: 1;

      margin-bottom: 32px;

      // To-do: Position
      .location {
        background-size: cover;
        -webkit-background-clip: text;
        background-clip: text;

        color: transparent;

        &.location-france {
          background-image: url("@/assets/images/france.jpeg");
          background-position: 50%;
        }

        &.location-belgium {
          background-image: url("@/assets/images/belgium.jpeg");
        }
      }
    }

    .trip-description {
      margin-bottom: 32px;

      font-size: 16px;
      color: rgba(#262626, 0.5);

      .important {
        color: #262626;
        font-weight: 500;

        border-bottom: 2px solid rgba(0,0,0,.1);
      }
    }

    .trip-button {
      display: flex;
      align-items: center;

      cursor: pointer;

      &:hover .button-icon {
        color: white;
      }

      .button-icon {
        display: grid;
        place-items: center;

        height: 32px;
        width: 32px;

        transition: color 150ms ease;

        border-radius: 4px;

        margin-right: 16px;

        background-color: #262626;

        color: #8d8d8d;
      }

      .button-text {
        font-size: 16px;
        font-weight: 500;
        color: #262626;
      }
    }
  }
}
</style>

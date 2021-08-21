<template>
  <div class="routeplanner" id="routeplanner">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable class="list-group" :list="shifts" group="routes">
        <div
          class="list-group-item active"
          v-for="(element, index) in shifts"
          :key="element.routeId"
        >
          {{ element.routeId }} {{ index }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "RoutePlanner",
  components: {
    draggable,
  },
  data: function () {
    return {
      loading: true,
      mode: null,
      shifts: [
        {
          routeId: "11",
          waypoints: [],
        },
        {
          routeId: "12",
          waypoints: [],
        },
      ],
    };
  },

  mounted: function () {
    //Check what route we are on and change mode
    this.checkUrlRoute();
  },

  methods: {
    checkUrlRoute: function () {
      // Are we editing or new route?
      if (this.$route.params.id) {
        console.log("Edit route");
        this.mode = "edit";
      } else {
        console.log("New route");
        this.mode = "new";
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.list-group-item {
  cursor: move;
}
</style>
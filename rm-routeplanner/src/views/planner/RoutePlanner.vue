<template>
  <div class="routeplanner" id="routeplanner">

      <PlannerMap>
      </PlannerMap>

            <div v-drag="{handle: '#card-header'}" class="rm-card card">
          <div class="card-body">

              <div class="rm-card-header" id="card-header">
                <h5 class="card-title rm-card-title"> Reitti 1</h5>
                <h5 class="rm-card-options bi bi-three-dots-vertical"></h5>
              </div>
                <el-collapse :accordion="accordionMode">
                    <el-collapse-item title="Waypoint 1" name ="1">
                        Waypoint content
                    </el-collapse-item>
                    <el-collapse-item title="Waypoint 2" name ="2">
                        Waypoint content
                    </el-collapse-item>
                                        <el-collapse-item title="Waypoint 1" name ="3">
                        Waypoint content
                    </el-collapse-item>
                    <el-collapse-item title="Waypoint 2" name ="4">
                        Waypoint content
                    </el-collapse-item>
                                        <el-collapse-item title="Waypoint 1" name ="5">
                        Waypoint content
                    </el-collapse-item>
                    <el-collapse-item title="Waypoint 2" name ="6">
                        Waypoint content
                    </el-collapse-item>
                                        <el-collapse-item title="Waypoint 1" name ="7">
                        Waypoint content
                    </el-collapse-item>
                </el-collapse>

            </div>
       </div>

<!--

    <div class="col-3" v-for="(element) in shifts" :key="element.routeId">
      <h3>Draggable 1</h3>
      <draggable class="list-group" :list="element.waypoints" group="routes">
        <div
          class="list-group-item active"
          v-for="(waypoint, index) in element.waypoints"
          :key="waypoint.id"
        >
          {{ waypoint.id }} {{ index }}
        </div>
      </draggable>
    </div>

-->
  </div>
</template>

<script>
//import draggable from "vuedraggable";
import PlannerMap from "@/components/planner/PlannerMap.vue";


export default {
  name: "RoutePlanner",
  components: {
    PlannerMap
  },
  data: function () {
    return {
      loading: true,
      mode: null,
      accordionMode: false,
      shifts: [
        {
          routeId: "11",
          waypoints: [{ id: "Emil" }, { id: "Johnny" }],
        },
        {
          routeId: "12",
          waypoints: [{ id: "Sara" }, { id: "Peter" }],
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

.rm-card {
    width: 20vw;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;

    position: absolute;
    z-index: 1000;
    top: 110px;
    right: 150px;
    max-height: 90vh;
    overflow: scroll;
    overflow-x: hidden;
}

.rm-card-header {

    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

.rm-card-options {
    float: right;
}

.rm-card-title {
    cursor: move;
}

.routeplanner {
  height: 100%;
}

.list-group-item {
  cursor: move;
}
</style>
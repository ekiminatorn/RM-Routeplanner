<template>
  <div class="routeplanner" id="routeplanner">
    <PlannerMap> </PlannerMap>


    <div v-for="(element, index) in shifts" :key="element.routeId" v-drag="{ handle: '#card-header' }" class="rm-card card">
      <div class="card-body">
        <div class="rm-card-header" id="card-header">
          <h5 class="card-title rm-card-title">Reitti {{ index }}</h5>
          <h5 class="rm-card-options bi bi-three-dots-vertical"></h5>
        </div>
        <el-collapse :accordion="accordionMode">
          <draggable :list="element.waypoints" group="routes" handle=".handle">
          <el-collapse-item v-for="(waypoint, index) in element.waypoints" :key="waypoint.id" :name="index">
            <template slot="title" class="user-select-none">
              <i class="bi bi-arrows-move handle"></i>
              {{ waypoint.name }}
              <span class="ms-1 badge rounded-pill bg-primary">HS</span>
              <span class="ms-1 badge rounded-pill bg-warning">Lehdet</span>
              <span class="ms-1 badge rounded-pill bg-info"> 19:00</span>
            </template>
            <div class="d-flex flex-row">
            <select class="">
              <option selected>Projekti</option>
              <option value="1">HS</option>
              <option value="2">Fortum</option>
            </select>
            <el-radio-group v-model="radio4" size="mini">
              <el-radio-button label="Rakennus"></el-radio-button>
              <el-radio-button label="Lehdet"></el-radio-button>
              <el-radio-button label="Purku"></el-radio-button>
            </el-radio-group>
            </div>
          </el-collapse-item>
          </draggable>
        </el-collapse>
      </div>
    </div>

    

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


  </div>
</template>

<script>
import draggable from "vuedraggable";
import PlannerMap from "@/components/planner/PlannerMap.vue";

export default {
  name: "RoutePlanner",
  components: {
    PlannerMap, draggable
  },
  data: function () {
    return {
      loading: true,
      mode: null,
      accordionMode: false,
      radio4: "Lehdet",
      shifts: [
        {
          routeId: "11",
          waypoints: [{ id: "1", name:"Tripla" }, { id: "2", name:"Citycenter" }],
        },
        {
          routeId: "12",
          waypoints: [{ id: "1", name:"Redi" }, { id: "2", name:"Hertsi" }],
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
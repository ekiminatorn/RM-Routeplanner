<template>
  <div class="routeplanner" id="routeplanner">
    <PlannerMap> </PlannerMap>


    <div v-for="(element, index) in shifts" :key="index" v-drag="{handle: '.rm-card-header'}" class="rm-card card">
      <div class="card-body">
        <div class="rm-card-header">
          <h5 class="card-title rm-card-title">Reitti {{ index }}</h5>
          <h5 class="rm-card-options bi bi-three-dots-vertical"></h5>
        </div>
        <el-collapse :accordion="accordionMode">
          <draggable :list="element.waypoints" group="routes" handle=".handle">
          <el-collapse-item v-for="(waypoint, index) in element.waypoints" :key="waypoint.id" :name="index">
            <template slot="title" class="user-select-none">
                <div class="handle user-select-none">
              <i class="bi bi-arrows-move"></i>
              {{ waypoint.name }}
              <span class="ms-1 badge rounded-pill bg-primary">{{waypoint.project}}</span>
              <span class="ms-1 badge rounded-pill bg-warning">{{waypoint.taskType}}</span>
              <span class="ms-1 badge rounded-pill bg-info"> {{waypoint.time}}</span>
              </div>
            </template>
            <div class="d-flex flex-row justify-content-evenly align-items-center user-select-none">
            <select v-model="waypoint.project" class="">
              <option>Projekti</option>
              <option value="HS" selected>HS</option>
              <option value="Fortum">Fortum</option>
            </select>
            <el-radio-group v-model="waypoint.taskType" size="mini">
              <el-radio-button label="Rakennus"></el-radio-button>
              <el-radio-button label="Lehdet"></el-radio-button>
              <el-radio-button label="Purku"></el-radio-button>
            </el-radio-group>
            <el-input-number size="mini" v-model="waypoint.tableQuantity"></el-input-number>
            </div>
            <div class="d-flex flex-row justify-content-evenly align-items-center user-select-none">
                <input type="text" v-model="waypoint.promoPlace" id="promopaikka" name="promopaikka" placeholder="Promo" class="small-input user-select-none">
                <input type="text" v-model="waypoint.time" id="kellonaika" name="kellonaika" placeholder="Kello" class="small-input user-select-none">
                <input type="text" id="lehdet" name="lehdet" placeholder="Lehdet" class="small-input user-select-none">
                
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
    PlannerMap,
    draggable,
  },
  data: function () {
    return {
      loading: true,
      mode: null,
      accordionMode: false,
      shifts: [
        {
          routeId: 1337,
          date: "",
          startTime: "",
          vehicle: "",
          driver: "",
          waypoints: [
            { id: "1", project: "HS", name: "Tripla", taskType: "Lehdet", tableQuantity: 0, promoPlace: "2B", time: "17:00" },
            { id: "2", project: "HS", name: "Citycenter", taskType: "Lehdet", tableQuantity: 0, promoPlace: "2B", time: "17:00" },
          ],
        },
        {
          routeId: 1339,
          date: "",
          startTime: "",
          vehicle: "",
          driver: "",
          waypoints: [
            { id: "1", project: "HS", name: "Redi", taskType: "Lehdet", tableQuantity: 0, promoPlace: "2B", time: "17:00" },
            { id: "2", project: "HS", name: "Hertsi", taskType: "Lehdet", tableQuantity: 0, promoPlace: "2B", time: "17:00" },
          ],
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

.small-input {
    width: 70px;
    height: 20px;
}
</style>
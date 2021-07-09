<template>
  <div class="vehicles container">
    <!-- Spinner -->
    <Spinner v-if="loading"></Spinner>
    <!-- Modal -->
    <div class="modal fade" id="vehicleModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="modalMode === 'edit'" class="modal-title">
              Päivitä ajoneuvo
            </h5>
            <h5 v-if="modalMode === 'new'" class="modal-title">
              Lisää ajoneuvo
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!-- MODAL BODY -->
          <div class="modal-body">
            <form ref="form">
              <div class="form-floating mb-3">
                <input
                  v-model="vehicle.reg_plate"
                  type="text"
                  class="form-control"
                  id="regPlateEdit"
                />
                <label for="regPlateEdit">Rekisterikilpi</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="vehicle.name"
                  type="text"
                  class="form-control"
                  id="vehicleNameEdit"
                />
                <label for="vehicleNameEdit">Nimi</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="vehicle.nickname"
                  type="text"
                  class="form-control"
                  id="vehicleNicknameEdit"
                />
                <label for="vehicleNicknameEdit">Lempinimi</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Sulje
            </button>
            <button
              @click="updateVehicle(vehicle)"
              v-if="modalMode === 'edit'"
              :disabled="modalLoading"
              type="button"
              class="btn btn-success"
            >
              <span
                v-if="modalLoading"
                span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Tallenna
            </button>
            <button
              @click="submitNewVehicle(vehicle)"
              v-if="modalMode === 'new'"
              :disabled="modalLoading"
              type="button"
              class="btn btn-success"
            >
              <span
                v-if="modalLoading"
                span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Lisää auto
            </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped vehicle-table w-75">
      <thead>
        <tr>
          <th scope="col">Rekisterikilpi</th>
          <th scope="col">Nimi</th>
          <th scope="col">Lempinimi</th>
          <th scope="col">ID</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(vehicle, index) in vehicles" v-bind:key="vehicle.id">
          <td>{{ vehicle.reg_plate }}</td>
          <td>{{ vehicle.name }}</td>
          <td>{{ vehicle.nickname }}</td>
          <td>{{ vehicle.id }}</td>
          <td>
            <div class="btn-group" role="group">
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="editVehicle(index, vehicle)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="removeVehicle(index, vehicle)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import * as Bootstrap from "bootstrap";

import Spinner from "@/components/planner/Spinner.vue";
import { EventBus } from "@/components/planner/event-bus";

export default {
  name: "Vehicles",
  components: {
    Spinner,
  },
  data: function () {
    return {
      vehicles: [],
      modalMode: null,
      activeVehicle: null,
      modalLoading: false,
      loading: true,
      modal: null,
      vehicle: {
        reg_plate: "",
        name: "",
        nickname: "",
        id: "",
      },
    };
  },

  mounted: function () {
    axios
      .get(this.$apiURL + "/vehicles")
      .then((response) => {
        this.vehicles = response.data;
        this.loading = false;
      })
      .catch((error) => {
        this.$toast.error("Virhe noudettaessa tietoja tietokannasta: " + error);
        this.loading = false;
      });

    this.modal = new Bootstrap.Modal(document.getElementById("vehicleModal"));

    //EVENTS
    EventBus.$on("nav_button_newVehicle", this.clickHandler);
  },

  methods: {
    removeVehicle: function (index, vehicle) {
      //Confirm() with browser confirm box the deletion of vehicle
      if (confirm("Haluatko poistaa auton?")) {
        axios
          .delete(this.$apiURL + "/vehicles/" + vehicle.id)
          .then((response) => {
            console.log(response);
            //Delete from vehicles data array. Vue reacts to change and updates view
            this.$delete(this.vehicles, index);
            //Display toast to confirm deletion
            this.$toast.success("Ajoneuvo poistettu");
          })
          .catch((error) => alert(error)); //Display error with alert box
      }
    },

    editVehicle: function (index, vehicle) {
      this.modalMode = "edit";
      this.vehicle = JSON.parse(JSON.stringify(vehicle)); //JSON stringify and parse back to object => Remove reactiviness when changing data
      this.activeVehicle = index;
      this.modal.show();
      console.log(this.vehicle);
    },

    updateVehicle: function (vehicle) {
      this.modalLoading = true;
      axios
        .put(this.$apiURL + "/vehicles/" + vehicle.id, {
          name: vehicle.name,
          nickname: vehicle.nickname,
          reg_plate: vehicle.reg_plate,
        })
        .then((response) => {
          console.log(response);
          this.modal.hide();
          this.modalLoading = false;
          this.$toast.success("Ajoneuvo päivitetty");
        })
        .catch((error) => {
          this.$toast.error("Virhetilanne. Virhe: " + error);
          this.modalLoading = false;
        });

      this.$set(this.vehicles, this.activeVehicle, this.vehicle);
    },

    newVehicle: function () {
      this.modalMode = "new";
      //Loop through all vehicle parameters and set them to an empty string.
      //This clears the form inputs for adding a new vehicle
      var self = this;
      Object.keys(this.vehicle).forEach(function (key) {
        self.vehicle[key] = "";
      });
      this.activeVehicle = null;
      this.modal.show();
    },

    submitNewVehicle: function (vehicle) {
      this.modalLoading = true;

      axios.post(this.$apiURL + "/vehicles", {
          name: vehicle.name,
          nickname: vehicle.nickname,
          reg_plate: vehicle.reg_plate,
        })
        .then((response) => {
          console.log(response);
          vehicle.id = response.data.insertId; //Get the ID and add to the vehicle
          this.vehicles.push(JSON.parse(JSON.stringify(vehicle))); //JSON stringify and parse back to object => Remove reactiviness when changing data
          this.modal.hide();
          this.modalLoading = false;
          this.$toast.success("Ajoneuvo lisätty");
        })
        .catch((error) => {
          this.$toast.error("Virhetilanne. Virhe: " + error);
          this.modalLoading = false;
        });

    },

    clickHandler: function (event) {
      switch (event.target.id) {
        case "nav_button_newVehicle":
          this.newVehicle();
          break;
        default:
          console.log("Default case");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
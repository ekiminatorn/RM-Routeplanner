<template>
    <div class="drivers container">
        <!-- Spinner -->
    <Spinner v-if="loading"></Spinner>
    <!-- Modal -->
    <div class="modal fade" id="driverModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="modalMode === 'edit'" class="modal-title">
              Päivitä kuljettaja
            </h5>
            <h5 v-if="modalMode === 'new'" class="modal-title">
              Lisää kuljettaja
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
                  v-model="driver.firstname"
                  type="text"
                  class="form-control"
                  id="firstNameEdit"
                />
                <label for="firstNameEdit">Etunimi</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="driver.lastname"
                  type="text"
                  class="form-control"
                  id="lastNameEdit"
                />
                <label for="lastNameEdit">Sukunimi</label>
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
              @click="updateDriver(driver)"
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
              @click="submitNewDriver(driver)"
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
              Lisää kuljettaja
            </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped vehicle-table w-75">
      <thead>
        <tr>
          <th scope="col">Etunimi</th>
          <th scope="col">Sukunimi</th>
          <th scope="col">ID</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(driver, index) in drivers" v-bind:key="driver.id">
          <td>{{ driver.firstname }}</td>
          <td>{{ driver.lastname }}</td>
          <td>{{ driver.id }}</td>
          <td>
            <div class="btn-group" role="group">
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="editDriver(index, driver)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="removeDriver(index, driver)"
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
  name: "Drivers",
  components: {
    Spinner,
  },
  data: function () {
    return {
      drivers: [],
      modalMode: null,
      activeDriver: null,
      modalLoading: false,
      loading: true,
      modal: null,
      driver: {
        firstname: "",
        lastname: "",
        id: "",
      },
    };
  },
  mounted: function () {
    axios
      .get(this.$apiURL + "/drivers")
      .then((response) => {
        this.drivers = response.data;
        this.loading = false;
        console.log(response);
      })
      .catch((error) => {
        this.$toast.error("Virhe noudettaessa tietoja tietokannasta: " + error);
        this.loading = false;
      });

    this.modal = new Bootstrap.Modal(document.getElementById("driverModal"));

    //EVENTS
    EventBus.$on("nav_button_newDriver", this.clickHandler);
  },

 methods: {
    removeDriver: function (index, driver) {
      //Confirm() with browser confirm box the deletion of vehicle
      if (confirm("Haluatko poistaa kuljettajan?")) {
        axios
          .delete(this.$apiURL + "/drivers/" + driver.id)
          .then((response) => {
            console.log(response);
            //Delete from vehicles data array. Vue reacts to change and updates view
            this.$delete(this.drivers, index);
            //Display toast to confirm deletion
            this.$toast.success("Kuljettaja poistettu");
          })
          .catch((error) => alert(error)); //Display error with alert box
      }
    },

    editDriver: function (index, driver) {
      this.modalMode = "edit";
      this.driver = JSON.parse(JSON.stringify(driver)); //JSON stringify and parse back to object => Remove reactiviness when changing data
      this.activeDriver = index;
      this.modal.show();
      console.log(this.driver);
    },

    updateDriver: function (driver) {
      this.modalLoading = true;
      axios
        .put(this.$apiURL + "/drivers/" + driver.id, {
          firstname: driver.firstname,
          lastname: driver.lastname,
        })
        .then((response) => {
          console.log(response);
          this.modal.hide();
          this.modalLoading = false;
          this.$set(this.drivers, this.activeDriver, JSON.parse(JSON.stringify(driver))); //JSON stringify and parse back to object => Remove reactiviness when changing data
          this.$toast.success("Kuljettaja päivitetty");
        })
        .catch((error) => {
          this.$toast.error("Virhetilanne. Virhe: " + error);
          this.modalLoading = false;
        });

    },

    newDriver: function () {
      this.modalMode = "new";
      //Loop through all vehicle parameters and set them to an empty string.
      //This clears the form inputs for adding a new vehicle
      var self = this;
      Object.keys(this.driver).forEach(function (key) {
        self.driver[key] = "";
      });
      this.activeDriver = null;
      this.modal.show();
    },

    submitNewDriver: function (driver) {
      this.modalLoading = true;

      axios.post(this.$apiURL + "/drivers", {
          firstname: driver.firstname,
          lastname: driver.lastname,
        })
        .then((response) => {
          console.log(response);
          driver.id = response.data.insertId; //Get the ID and add to the vehicle
          this.drivers.push(JSON.parse(JSON.stringify(driver))); //JSON stringify and parse back to object => Remove reactiviness when changing data
          this.modal.hide();
          this.modalLoading = false;
          this.$toast.success("Kuljettaja lisätty");
        })
        .catch((error) => {
          this.$toast.error("Virhetilanne. Virhe: " + error);
          this.modalLoading = false;
        });

    },

    clickHandler: function (event) {
      switch (event.target.id) {
        case "nav_button_newDriver":
          this.newDriver();
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
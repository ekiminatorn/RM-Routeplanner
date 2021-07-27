<template>
    <div class="places container">

            <!-- Spinner -->
    <Spinner v-if="loading"></Spinner>

    <!-- Modal -->
    <div class="modal fade" id="placeModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="modalMode === 'edit'" class="modal-title">
              Päivitä kohde
            </h5>
            <h5 v-if="modalMode === 'new'" class="modal-title">
              Lisää kohde
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
                  v-model="place.name"
                  type="text"
                  class="form-control"
                  id="nameEdit"
                />
                <label for="nameEdit">Kohde</label>
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
              @click="updatePlace(place)"
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
              @click="submitNewPlace(place)"
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
              Lisää kohde
            </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped vehicle-table w-75">
      <thead>
        <tr>
          <th scope="col">Kohde</th>
          <th scope="col">ID</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(place, index) in places" v-bind:key="place.id">
          <td>{{ place.name }}</td>
          <td>{{ place.id }}</td>
          <td>
            <div class="btn-group" role="group">
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="editPlace(index, place)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="removePlace(index, place)"
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
  name: "Places",
  components: {
    Spinner,
  },
  data: function () {
    return {
      places: [],
      modalMode: null,
      activePlace: null,
      modalLoading: false,
      loading: true,
      modal: null,
      place: {
        name: "",
        opening_time: "",
        closing_time: "",
        twentyfourseven: "",
        lat: "",
        lon: "",
        json_data: "",
        id: "",
      },
    };
  },
  mounted: function () {
    axios
      .get(this.$apiURL + "/places")
      .then((response) => {
        this.places = response.data;
        this.loading = false;
        console.log(response);
      })
      .catch((error) => {
        this.$toast.error("Virhe noudettaessa tietoja tietokannasta: " + error);
        this.loading = false;
      });

    this.modal = new Bootstrap.Modal(document.getElementById("placeModal"));

    //EVENTS
    EventBus.$on("nav_button_newPlace", this.clickHandler);
  },

  methods: {
    removePlace: function (index, place) {
      //Confirm() with browser confirm box the deletion of vehicle
      if (confirm("Haluatko poistaa kohteen?")) {
        axios
          .delete(this.$apiURL + "/places/" + place.id)
          .then((response) => {
            console.log(response);
            //Delete from places data array. Vue reacts to change and updates view
            this.$delete(this.places, index);
            //Display toast to confirm deletion
            this.$toast.success("Kohde poistettu");
          })
          .catch((error) => alert(error)); //Display error with alert box
      }
    },

    editPlace: function (index, place) {
      this.modalMode = "edit";
      this.place = JSON.parse(JSON.stringify(place)); //JSON stringify and parse back to object => remove reactiviness when changing data
      this.activePlace = index;
      this.modal.show();
      // Experimenting down below with JSON data
      let store = JSON.parse(place.json_data);
      console.log(store.defaultPromoPlace);
      store.defaultPromoPlace = "1B";
      console.log(JSON.stringify(store));
      // End of experimenting
    },

    updatePlace: function (place) {
      console.log(place);
    },

    newPlace: function () {
      this.modalMode = "new";
      //Loop through all place parameters and set them to an empty string.
      //This clears the form inputs for adding a new place
      var self = this;
      Object.keys(this.place).forEach(function (key) {
        self.place[key] = "";
      });
      this.activeDriver = null;
      this.modal.show();
    },

    clickHandler: function (event) {
      switch (event.target.id) {
        case "nav_button_newPlace":
          this.newPlace();
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
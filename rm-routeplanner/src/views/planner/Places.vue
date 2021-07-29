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
                <input v-model="place.name" type="text" class="form-control" id="nameEdit" required/>
                <label for="nameEdit">Kohde</label>
              </div>

							<div class="row">
								<div class="col">
              <div class="form-floating mb-3">
                <input v-model="place.opening_time" type="text" class="form-control" id="openingEdit"/>
                <label for="openingEdit">Auki</label>
              </div>
							</div>
							<div class="col">
              <div class="form-floating mb-3">
                <input v-model="place.closing_time" type="text" class="form-control" id="closingEdit"/>
                <label for="closingEdit">Kiinni</label>
              </div>
							</div>
							<div class="col">
              <div class="form-check form-switch">
                <label class="form-check-label" for="twentyfourseven">24h?</label>
                <input v-model="place.twentyfourseven" :true-value="1" :false-value="0" class="form-check-input" type="checkbox" id="twentyfourseven">
								
              </div>
							</div>
							</div>

							<div class="row">
								<div class="col">
									<div class="form-floating mb-3">
										<input v-model="place.json_data.defaultPromoPlace" type="text" class="form-control" id="promoPlaceEdit"/>
										<label for="promoPlaceEdit">Oletus promopaikka</label>
									</div>
								</div>
								<div class="col">
									<div class="form-floating mb-3">
										<input v-model="place.json_data.defaultNewspapers" type="text" class="form-control" id="newspapersEdit"/>
										<label for="newspapersEdit">Oletus lehtimäärä</label>
									</div>
								</div>
							</div>

              <div class="row">
                <div class="col">
                <div class="form-floating mb-3">
                <input v-model="place.lat" type="text" class="form-control" id="latEdit"/>
                <label for="latEdit">Latitude</label>
              </div>
                </div>
                <div class="col">
                <div class="form-floating mb-3">
                <input v-model="place.lon" type="text" class="form-control" id="lonEdit"/>
                <label for="lonEdit">Longitude</label>
              </div>
                </div>
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
        json_data: {},
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
        console.log(response.data.json_data);
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
    },

    updatePlace: function (place) {
      this.modalLoading = true;

			axios.put(this.$apiURL + "/places/" + place.id, {
				name: place.name,
				opening_time: place.opening_time,
				closing_time: place.closing_time,
				twentyfourseven: place.twentyfourseven,
				lat: place.lat,
				lon: place.lon,
				json_data: place.json_data
			})
			.then((response) => {
				console.log(response);
				this.modal.hide();
				this.modalLoading = false;
				this.$set(this.places, this.activePlace, JSON.parse(JSON.stringify(place))); //JSON stringify and parse back to object => Remove reactiviness when changing data
				this.$toast.success("Kohde päivitetty");
			})
			.catch((error) => {
				this.$toast.error("Virhetilanne. Virhe: " + error);
				this.modalLoading = false;
			})
    },

    newPlace: function () {
      this.modalMode = "new";
      //Loop through all place parameters and set them to an empty string.
      //This clears the form inputs for adding a new place
      var self = this;
      Object.keys(this.place).forEach(function (key) {
        self.place[key] = "";
				// json_data has to be treated differently. Here we create an empty object instead of a string
				if (key == "json_data") { self.place[key] = {} }
				console.log(key);
      });
      this.activeDriver = null;
      this.modal.show();
    },

		submitNewPlace: function (place) {
			this.modalLoading = true;

			axios.post(this.$apiURL + "/places", {
				name: place.name,
				opening_time: place.opening_time,
				closing_time: place.closing_time,
				twentyfourseven: place.twentyfourseven,
				lat: place.lat,
				lon: place.lon,
				json_data: place.json_data
			})
			.then((response) => {
				console.log(response);
				place.id = response.data.insertId; //Get the ID and add to the place
				this.places.push(JSON.parse(JSON.stringify(place)));  //JSON stringify and parse back to object => Remove reactiviness when changing data
				this.modal.hide();
				this.modalLoading = false;
				this.$toast.success("Kohde lisätty");
			});
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

.custom-control-label::before, 
.custom-control-label::after {
  width: 2.25rem !important;
  height: 2.25rem !important;
  margin: 1rem;
}
.custom-control-label{
  margin: 1.5rem 2rem;
}

</style>
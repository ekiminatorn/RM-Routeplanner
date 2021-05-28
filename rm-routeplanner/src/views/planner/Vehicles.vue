<template>
  <div class="vehicles container">
    <!-- Edit Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
                  v-on:click="showEditModal()"
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
import * as Bootstrap from 'bootstrap';

export default {
  name: "Vehicles",
  data: function () {
    return {
      vehicles: null,
    };
  },

  mounted: function () {
    axios
      .get(this.$apiURL + "/vehicles")
      .then((response) => (this.vehicles = response.data));
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
          })
          .catch((error) => alert(error)); //Display error with alert box
      }
    },
    showEditModal: function () {
      let editModal = new Bootstrap.Modal(
        document.getElementById("editModal")
      );
      editModal.show();
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
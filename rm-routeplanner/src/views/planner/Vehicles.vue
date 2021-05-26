<template>
  <div class="vehicles container">
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
        <tr v-for="vehicle in vehicles" v-bind:key="vehicle.id">
          <td>{{ vehicle.reg_plate }}</td>
          <td>{{ vehicle.name }}</td>
          <td>{{ vehicle.nickname }}</td>
          <td>{{ vehicle.id }}</td>
          <td>
            <div class="btn-group" role="group">
              <td>
                <button type="button" class="btn btn-primary">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger">
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
import axios from 'axios';

export default {
  name: "Vehicles",
  data: function () {
    return {
        vehicles: null
    };
  },
  mounted: function () {
      axios
      .get(this.$apiURL + '/vehicles')
      .then(response => (this.vehicles = response.data));
  }
};
</script>


<style lang="scss" scoped>
</style>
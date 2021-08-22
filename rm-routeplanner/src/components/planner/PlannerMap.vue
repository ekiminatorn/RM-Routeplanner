<template>
        <div id="plannerMapContainer" class="plannerMapContainer"></div>   
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importing the icon images
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "PlannerMap",
  data: function () {
    return {
      map: null,
    };
  },
  watch: {

  },

  mounted() {
    this.map = L.map("plannerMapContainer").setView([60.1933, 24.941], 11);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 18,
        id: "mapbox/streets-v11",
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiZWtpbWluYXRvciIsImEiOiJja3JtNWJzNDYxZnkwMm9ydnp2dHdxZmNhIn0.rYF3zimoVaLglJvpI5ELxA",
      }
    ).addTo(this.map);

  },

  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.plannerMapContainer {
    height: 100%;
    width: 100%;
}
</style>
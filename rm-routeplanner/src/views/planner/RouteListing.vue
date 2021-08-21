<template>
  <div class="routelisting" id="routelisting">
    {{ $route.params.id }}
  </div>
</template>

<script>
export default {
  name: "RouteListing",
  components: {},
  data: function () {
    return {
        loading: true,
    };
  },

  mounted: function () {

  }
};
</script>


<style lang="scss" scoped>
</style>
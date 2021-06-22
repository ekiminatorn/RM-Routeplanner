<template>

    <div class="spinner-grow custom-spinner" role="status"></div>

    
</template>

<script>
export default {
  name: "Spinner",
  data: function () {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.custom-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100000;
  opacity: 0.5;
}
</style>
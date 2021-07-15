<template>
  <div>
    <div class="opacity"></div>
    <div class="spinner-container">
    <div class="spinner"></div>
    <div class="loading-text"></div>
    </div>
  </div>
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

.opacity {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.3;
  background-color: gray;
}

.spinner-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
}

.loading-text {
    position: absolute;
    
}

.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 5rem;
  height: 5rem;
  background-color: $rainmaker-color;
  z-index: 1001;
  border-radius: 100%;  
  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
  animation: sk-scaleout 1.0s infinite ease-in-out;
  transform: translate(-50%, -50%);
}

@-webkit-keyframes sk-scaleout {
  0% { -webkit-transform: scale(0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
}
</style>
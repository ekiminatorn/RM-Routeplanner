<template>
    <div class="planner" id="planner">
        <NavBar :name="$route.path" />
        <router-view></router-view>
    </div>
    
</template>

<script>
import NavBar from "@/components/planner/NavBar.vue";

export default {
    name: 'Planner',
    components: {
        NavBar
    }
    
}
</script>


<style lang="scss" scoped>

.planner {
    transition: margin-left .5s;
}

</style>
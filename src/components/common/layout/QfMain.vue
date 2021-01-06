<template>
    <div class="qf-mian">
        <h1>Main</h1>
        <router-view></router-view>
        <router-view name = "yeye"></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .qf-mian{
        overflow: auto;
        position: relative;
    }
</style>
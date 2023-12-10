<script setup>

    import { store } from '../store'


</script>

<template>
    <div>
        <h1>Playroom</h1>
        <li v-for="word in store.words" :key="word">{{ word }}</li>
    </div>
</template>



<style>

</style>
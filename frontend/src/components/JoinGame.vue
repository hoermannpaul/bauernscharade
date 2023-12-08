<script setup>
import { activeConnection } from '../store'

activeConnection.connect("asdf")

</script>

<template>
  <div>
    <h1>Code eingeben</h1>
    <div>
        <h5>Code</h5>
        <input type="text" />
    </div>
    <button v-on:click="() => {activeConnection.send('test')}">Test</button>
    <div>
        <h5>Name</h5>
        <input type="text" />
    </div>
    <div>
        <router-link to="/waitingroom">Weiter</router-link>
    </div>
  </div>
</template>

<style>

</style>

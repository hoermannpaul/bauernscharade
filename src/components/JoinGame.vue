<template>
  <div>
    <h1>Code eingeben</h1>
    <div>
        <h5>Code</h5>
        <input type="text" />
    </div>
    <div>
        <h5>Name</h5>
        <input type="text" />
    </div>
    <div>
        <router-link to="/waitingroom">Weiter</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: "JoinGame"
}
</script>

<style>

</style>
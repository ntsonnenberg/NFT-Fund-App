<template>
  <div>
      <v-card>
          <p>I am a fund</p>
          <input v-model="fundName" placeholder="enter fund name" />
          <button @click="$emit('view', fundName)">View Name</button>
      </v-card>
  </div>
</template>

<script>
export default {
    name: 'FundCardComponent',

    emits: ['view'],

    data() {
        return {
            fundName: ''
        }
    }
}
</script>

<style>

</style>
<template>
  <v-layout>
    <h1>View Users</h1>
    <v-data-table :headers="headers">
    </v-data-table>
    <div>
      <v-btn @click="displayList()">Display List</v-btn>
    </div>
    <h1>{{ list }}</h1>
  </v-layout>
  
</template>

<script>
export default {
  name: 'UsersPage',

  data () {
    return {
      headers: [
        'Username',
        'Manager Status'
      ]
    }
  },

  methods: {
    async displayList () {
      this.$store.dispatch('accounts/listInit');
    }
  },

  computed: {
    list () {
      return this.$store.state.accounts.list;
    }
  }
}
</script>

<style>

</style>
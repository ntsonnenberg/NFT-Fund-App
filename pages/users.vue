<template>
  <div v-if="user !== null">
    <v-layout @load="displayList()">
      <h1>View Users</h1>
      <div class="pt-10">
        <v-data-table :headers="headers" :items="accountList">
        </v-data-table>
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'UsersPage',

  data () {
    return {
    }
  },

  mounted () {
    this.displayList()
  },

  methods: {
    async displayList () {
      this.$store.dispatch('accounts/listInit');
    }
  },

  computed: {
    accountList () {
      return this.$store.state.accounts.accountList;
    },

    user () {
      return this.$store.state.accounts.user;
    },

    headers () {
      return [
        {
          text: "Account Id",
          align: "start",
          value: "account_id"
        },
        {
          text: "Manager Status",
          value: "is_manager"
        },
        {
          text: "Username",
          value: "username"
        }
      ]
    }
  }
}
</script>

<style scoped>
  div.layout {
    display: flex;
    flex-direction: column;
  }
</style>
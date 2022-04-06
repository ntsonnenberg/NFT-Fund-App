<template>
  <div v-if="user !== null">
    <v-layout @load="displayList()">
      <h1>View Users</h1>
      <div class="account-table pt-10 pl-10">
        <v-simple-table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Manager Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accountList" :key="account.username">
              <td>{{ account.username }}</td>
              <td>{{ account.is_manager }}</td>
            </tr>
          </tbody>
        </v-simple-table>
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
  }
}
</script>

<style scoped>
  div.layout {
    display: flex;
    flex-direction: column;
  }

  div.v-data-table.theme--dark {
    width: 25%
  }
</style>
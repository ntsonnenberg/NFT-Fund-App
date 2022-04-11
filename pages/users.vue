<template>
<v-container>
  <div>
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
    <div v-if="user === null">
      <div class="user-container-no-login pt-10">
        <div class="user-container-message">
          <img src="../img/NFT_Fund_Logo.png" width="300px" />
          <h1 class="font-weight-thin">Find Users and Invest Together</h1>
          <div class="d-flex justify-center">
              <v-btn color="green" width="25%"><NuxtLink to="/signup">Sign Up</NuxtLink></v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</v-container>
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

  .user-container-no-login {
    display: flex;
    justify-content: center;
  }

  .user-container-message {
    display: flex;
    flex-direction: column;
    height: 600px;
    justify-content: space-evenly;
  }

  img {
        align-self: center;
  }

  a {
    text-decoration: none;
    color: white !important;
  }
</style>
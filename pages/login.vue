<template>
  <v-layout class="pt-15">
      <v-flex align-self-center>
        <v-card width="25em" height="20em" elevation="5">
          <h1 class="pt-10" align="center">Login</h1>
          <v-form>
            <div align="center">
            <div class="pt-5">
                <label for="username">username:</label>
                <input id="username" v-model="username" placeholder="insert your username">
            </div>

            <div class="pt-5">
              <label for="password">password:</label>
              <input id="password" v-model="password" placeholder="insert your password">
            </div>

            <div class="signup pt-5 pr-3">
                <NuxtLink to="/signup">Sign Up Here</NuxtLink>
            </div>
            
            <div class="pt-7">
              <v-btn @click="login()">Log In</v-btn>
            </div>
            </div>
          </v-form>
        </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'LoginPage',

  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async login () {
      await this.$store.dispatch('accounts/login', {
        username: this.username,
        password: this.password
      });

      if (this.user !== null) {
        this.$router.push("/account");
      }
    },

    logout () {
      this.$store.dispatch('accounts/logout');
    },
  },  
   
  computed: {
    list () {
      return this.$store.state.nft.list;
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
    justify-content: end;
  }

  input {
    color: white;
  }

  div.signup {
    display: flex;
    justify-content: end;
  }
</style>
<template>
  <v-layout class="pt-15">
    <v-flex align-self-center>
      <v-card width="25em" height="20em">
        <h1 class="pt-10" align="center">Sign Up</h1>
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

            <div class="d-flex">
            <v-switch v-model="isManager" label="Are you a fund manager?" color="success"></v-switch>
            </div>
            
            <div class="pt-3">
              <v-btn @click="signup()">Sign Up</v-btn>
            </div>
          </div>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'SignupPage',

    data() {
      return {
        username: '',
        password: '',
        isManager: null
      }
    },

    methods: {
      async signup () {
        console.log(this.isManager);

        await this.$store.dispatch('accounts/signup', {
          username: this.username,
          password: this.password,
          isManager: this.isManager
        });

        await this.$store.dispatch('accounts/login', {
          username: this.username,
          password: this.password
        });

        if (this.user !== null) {
          this.$router.push("/account");
        }
      }
    },

    computed: {

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

  div.d-flex {
    justify-content: center;
  }
</style>
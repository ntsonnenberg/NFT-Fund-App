<template>
  <v-layout>
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

            <div class="pt-5">
              <div styles="align-items:center">
              <v-switch v-model="isManage" label="Are you a fund manager?"></v-switch>
              </div>
            </div>
            
            <div class="pt-7">
              <v-btn @click="login()">Sign Up</v-btn>
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
        isManager: ''
      }
    },

    methods: {

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

  label.v-label.theme--dark {
    display: flex;
    justify-content: center;
  }
</style>
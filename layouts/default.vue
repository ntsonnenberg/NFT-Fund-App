<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <NuxtLink to="/"><img src="../img/NFT_Fund_Logo.png"></NuxtLink>
      <NuxtLink to="/">
        <v-toolbar-title v-text="title" class="pl-2"/>
      </NuxtLink>
      <NuxtLink to="/funds">
      <v-toolbar-title v-text="funds" class="pl-15"/>
      </NuxtLink>
      <NuxtLink to="/users">
        <v-toolbar-title v-text="users" class="pl-15"/>
      </NuxtLink>
      <v-spacer />
      <div v-if="user === null">
        <NuxtLink to="/login" id="loginTab">Log In</NuxtLink>
      </div>
      <div v-if="user !== null" class="pr-10">
        <NuxtLink to="/account" id="accountTab">Account</NuxtLink>
      </div>
      <div v-if="user !== null">
        <NuxtLink to="/" id="logoutTab">
          <button @click="logout()">Log Out</button>
        </NuxtLink>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; January 3, 2022</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Inspire',
            to: '/inspire'
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Bit-Fund',
        funds: 'Funds',
        users: 'Users',
      }
    },

    methods: {
      logout () {
        console.log("inside logout method")
        this.$store.dispatch('accounts/logout');
      }
    },

    computed: {
      user () {
        return this.$store.state.accounts.user
      }
    },

    components: {
      
    }
  }
</script>

<style scoped>
  img {
    width: 50px;
    height: 50px;
  }

a {
    text-decoration: none;
    color: white !important;
  }
</style>

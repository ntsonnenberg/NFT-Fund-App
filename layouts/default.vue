<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <div class="logo">
        <NuxtLink to="/"><img src="../img/NFT_Fund_Logo.png"></NuxtLink>
      </div>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="user !== null">
        <v-btn @click="logout()">Log Out</v-btn>
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
        title: 'Bit-Fund'
      }
    },

    methods: {
      logout () {
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
</style>

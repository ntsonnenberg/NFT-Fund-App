<template>
  <h1>Hello {{ user }}!</h1>
</template>

<script>
export default {
    name: "AccountPage",

    data () {
        return {

        }
    },

    methods: {

    },

    computed: {
        user () {
            return this.$store.state.accounts.user;
        }
    }
}
</script>

<style>

</style>
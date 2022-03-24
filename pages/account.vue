<template>
<v-layout>
    <h1>Hello {{ user }}!</h1>

    <div>

    </div>
</v-layout>
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
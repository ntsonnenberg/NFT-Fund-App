<template>
    <v-card v-if="fund !== null" width="25em" elevation="12">
        <v-card-title>{{ fund.title }}</v-card-title>
        <v-card-subtitle>{{ fund.owner }}</v-card-subtitle>
        <v-card-text>{{ fund.description }}</v-card-text>
        <v-card-actions class="d-flex">
            <v-btn text color="green">Request to Join</v-btn>
            <v-btn text color="green">View Capital Holdings</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'FundCardComponent',

    data() {
        return {

        }
    },

    props: {
        fund: Object
    },
}
</script>

<style scoped>
    input {
        color: white;
    }
</style>
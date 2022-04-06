<template>
    <v-card v-if="fund !== null" width="25em" elevation="12">
        <v-card-title>{{ fund.title }}</v-card-title>
        <v-card-subtitle>{{ fund.owner }}</v-card-subtitle>
        <v-card-text>{{ fund.description }}</v-card-text>
        <v-card-actions class="d-flex">
            <v-btn text color="green">Request to Join</v-btn>
            <v-btn text color="green" @click="overlay = !overlay">View Capital Holdings</v-btn>
        </v-card-actions>
        <v-btn>Delete Fund</v-btn>
        <v-overlay :value="overlay">
            <v-card width="30em" elevation="15">
                <v-card-title class="d-flex justify-center">Capital Holdings</v-card-title>
                <div class="pl-10">
                    <v-card-text>ETH: {{ fund.capital.ETH }}</v-card-text>
                    <v-card-text>SOL: {{ fund.capital.SOL }}</v-card-text>
                    <v-card-text>AVAX: {{ fund.capital.AVAX }}</v-card-text>
                    <v-card-text>XRP: {{ fund.capital.XRP }}</v-card-text>
                </div>
                <div class="d-flex justify-end pr-5 pb-5">
                    <v-btn @click="overlay = false">Back</v-btn>
                </div>
            </v-card>
        </v-overlay>
    </v-card>
</template>

<script>
export default {
    name: 'FundCardComponent',

    data() {
        return {
            overlay: false
        }
    },

    props: {
        fund: Object,
        user: String
    },
}
</script>

<style scoped>
    input {
        color: white;
    }
</style>
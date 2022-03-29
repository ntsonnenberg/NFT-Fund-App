<template>
    <v-card width="30em" elevation="10">
        <v-card-title>Fund Name Goes Here</v-card-title>
        <v-card-subtitle>Fund Owner Name Goes Here</v-card-subtitle>
        <v-card-text>Fund Description Goes Here</v-card-text>
        <v-card-actions class="d-flex">
            <v-btn text color="green">Request to Join</v-btn>
            <v-btn text color="green">View Capital Holdings</v-btn>
        </v-card-actions>

        <div>
            <label for="fundId">Fund Id:</label>
            <input id="fundId" v-model="fundId" type="number" />
            <v-btn @click="showFund()">View Fund</v-btn>
        </div>
        
        <!-- <input v-model="fundName" placeholder="enter fund name" />
        <button @click="$emit('view', fundName)">View Name</button> -->
    </v-card>
</template>

<script>
export default {
    name: 'FundCardComponent',

    emits: ['view'],

    data() {
        return {
            fundId: 0
        }
    },

    methods: {
        async showFund () {
            await this.$store.dispatch('fund/getFund', this.fundId)
        },
    },

    computed: {

    }
}
</script>

<style scoped>
    input {
        color: white;
    }
</style>
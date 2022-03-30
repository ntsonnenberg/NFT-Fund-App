<template>
    <v-card @load="getFund()" v-if="fund !== null" width="30em" elevation="10">
        <v-card-title>{{ fund.title }}</v-card-title>
        <v-card-subtitle>{{ fund.ownerName }}</v-card-subtitle>
        <v-card-text>{{ fund.description }}</v-card-text>
        <v-card-actions class="d-flex">
            <v-btn text color="green">Request to Join</v-btn>
            <v-btn text color="green">View Capital Holdings</v-btn>
        </v-card-actions>

        <!-- <div>
            <label for="fundId">Fund Id:</label>
            <input id="fundId" v-model="fundId" type="number" />
            <v-btn @click="getFundList()">View Fund</v-btn>
        </div> -->
    </v-card>
</template>

<script>
export default {
    name: 'FundCardComponent',

    mounted() {
        this.getFund();
    },

    data() {
        return {
            fundId: 3101407
        }
    },

    methods: {
        async getFund () {
            console.log('inside getFundList')

            await this.$store.dispatch('fund/getFund', this.fundId);
        }
    },

    computed: {
        fund () {
            return this.$store.state.fund.fund;
        },
    }
}
</script>

<style scoped>
    input {
        color: white;
    }
</style>
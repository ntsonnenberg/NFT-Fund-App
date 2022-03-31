<template>
    <v-layout @load="displayFund()">
        <h1>View Funds</h1>
        <v-container v-for="fund in list" :key="fund.fundId">
            <fund-card :fund="fund"/>
        </v-container>
    </v-layout>
</template>

<script>
import FundCard from '@/components/FundCard.vue'

export default {
    name: 'FundsPage',

    data() {
        return {

        }
    },

    mounted() {
        this.addFunds();
    },

    components: { 
        FundCard 
    },

    methods: {
        async displayFunds () {
            await this.$store.dispatch('fund/modifyList');
        }
    },

    computed: {
        list () {
            return this.$store.state.fund.list;
        },

        fund () {
            return this.$store.state.fund.fund;
        },
    }
}
</script>

<style>

</style>
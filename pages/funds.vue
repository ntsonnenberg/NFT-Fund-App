<template>
    <v-layout>
        <h1>View Funds</h1>
        <div class="funds">
            <div class="fund-cards pl-10 pt-10" v-for="fund in list" :key="fund.fundId">
                <fund-card :fund="fund"/>
            </div>
        </div>
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
        this.displayFunds();
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
    div.fund-cards {
        display: flex;

    }
</style>
<template>
    <v-layout @load="displayFunds()">
        <div width="30em">
            <h1>View Funds</h1>
            <div class="fund-container">
                <v-container v-for="fund in fundList" :key="fund.fundId">
                    <fund-card :fund="fund"/>
                </v-container>
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
            await this.$store.dispatch('fund/fundListInit');
        }
    },

    computed: {
        fundList () {
            return this.$store.state.fund.fundList;
        },

        fund () {
            return this.$store.state.fund.fund;
        },
    }
}
</script>

<style scoped>
    div.fund-container {
        display: flex;
        flex-direction: row;
    }
</style>
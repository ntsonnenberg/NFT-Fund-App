<template>
    <v-layout @load="displayFunds()">
        <div width="30em">
            <h1>View Funds</h1>
            <div class="fund-container">
                <v-container v-for="fund in fundList" :key="fund.fundId">
                    <fund-card :fund="fund" @joinFund="addMember(fund.fundId, user)" />
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
        },

        async addMember (fundId, username) {

            console.log(fundId, username)
            await this.$store.dispatch('fund/addMember', {
                fundId: fundId,
                username: username
            });
        }
    },

    computed: {
        fundList () {
            return this.$store.state.fund.fundList;
        },

        fund () {
            return this.$store.state.fund.fund;
        },

        user () {
            return this.$store.state.accounts.user;
        }
    }
}
</script>

<style scoped>
    div.fund-container {
        display: flex;
        flex-direction: row;
    }
</style>
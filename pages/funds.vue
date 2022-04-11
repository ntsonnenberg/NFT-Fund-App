<template>
    <v-container>
    <div>
        <div v-if="user !== null">
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
        </div>
        <div v-if="user === null">
            <div class="fund-container-no-login pt-10">
                <div class="fund-container-message">
                    <img src="../img/NFT_Fund_Logo.png" width="300px" />
                    <h1 class="font-weight-thin">View Funds and Start Investing Now</h1>
                    <div class="d-flex justify-center">
                        <v-btn color="green" width="25%"><NuxtLink to="/signup">Sign Up</NuxtLink></v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </v-container>
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
            await this.$store.dispatch('fund/addMember', {
                fundId: fundId,
                username: username
            });

            alert("You were accepted into the fund!");
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

    .fund-container-no-login {
        display: flex;
        justify-content: center;
    }

    .fund-container-message {
        display: flex;
        flex-direction: column;
        height: 600px;
        justify-content: space-evenly;
    }

    img {
        align-self: center;
    }

    a {
      text-decoration: none;
      color: white !important;
    }
</style>
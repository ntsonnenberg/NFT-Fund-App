<template>
    <v-layout @load="displayFunds()">
        <div>
            <h1>Hello {{ user }}!</h1>
            <div class="py-10 pl-10">
                <div>
                    <v-btn color="success" @click="hidden = !hidden">Change Username</v-btn>
                    <div v-show="!hidden">
                        <v-text-field value="username" v-model="username" placeholder="username"></v-text-field>
                    </div>
                </div>
                <div v-if="username !== ''">
                    <v-btn @click="changeUser()">Update</v-btn>
                </div>
                <div class="pt-10">
                    <v-btn color="red" @click="deleteUser()">Delete Account</v-btn>
                </div>
            </div>
            <div>
                <h1>My Funds</h1>
                <div>
                    <v-container v-for="fund in fundList" :key="fund.fundId">
                        <fund-card :fund="fund" v-if="fund.owner === user" />
                    </v-container>
                </div>
            </div>
            <div>
                <h1>My Investments</h1>
            </div>
        </div>
        <div v-if="user !== ''">
            <h1>Create a Fund</h1>
            <v-form>
                <v-container>
                    <v-text-field v-model="title" label="Fund Title" required></v-text-field>
                    <v-textarea v-model="description" label="Fund Description" required></v-textarea>
                    <br>
                    <label>Enter Initial Crypto Investment: </label>
                    <v-text-field type="number" v-model="eth" label="ETH"></v-text-field>
                    <v-text-field type="number" v-model="avax" label="AVAX"></v-text-field>
                    <v-text-field type="number" v-model="sol" label="SOL"></v-text-field>
                    <v-text-field type="number" v-model="xrp" label="XRP"></v-text-field>
                </v-container>
                <v-btn color="success" @click="createFund()">Create Fund</v-btn>
            </v-form>
        </div>
    </v-layout>
</template>

<script>
import FundCard from '@/components/FundCard.vue'

export default {
    name: "AccountPage",

    data () {
        return {
            hidden: false,
            username: '',
            title: '',
            description: '',
            eth: 0,
            avax: 0,
            sol: 0,
            xrp: 0,
        }
    },

    components: {
        FundCard
    },

    methods: {
        async changeUser () {
            await this.$store.dispatch('accounts/updateUser', { 
                username: this.username
            });

            alert("User updated successfully!")

            if (this.user !== null) {
                this.$router.push("/account");
            }
        },

        async deleteUser () {
            await this.$store.dispatch('accounts/deleteUser');

            alert("User deleted successfully!")

            if (this.user === null) {
                this.$router.push("/");
            }
        },

        async displayFunds () {
            await this.$store.dispatch('fund/fundListInit');
        },

        async createFund () {
            const ownerId = await this.$store.dispatch('fund/getOwner', this.$store.state.accounts.user);

            await this.$store.dispatch('fund/createFund', {
                title: this.title,
                description: this.description,
                eth: this.eth,
                avax: this.avax, 
                sol: this.sol,
                xrp: this.xrp,
                ownerId: ownerId
            });

            alert("Fund created successfully!")
        }
    },

    computed: {
        user () {
            return this.$store.state.accounts.user;
        },

        fundList () {
            return this.$store.state.fund.fundList;
        }
    }
}
</script>

<style scoped>
    div.layout {
        display: flex;
        justify-content: space-between;
    }
</style>
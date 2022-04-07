<template>
    <v-layout>
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
                <div @load="displayFunds()">
                    <h1 v-if="fundList.length > 0">My Funds</h1>
                    <v-container v-for="fund in fundList" :key="fund.fundId">
                        <fund-card :user="user" :fund="fund" @deleteFund="deleteFund(fund.fundId)"/>
                    </v-container>
                </div>
            </div>
            <div>
                <h1>My Investments</h1>
                <div>
                    <p>{{ fundListForMember }}</p>
                    <p>{{ user }}</p>
                    <!-- <v-simple-table>
                        <thead>
                            <tr>
                                <th>Fund Title</th>
                                <th>Ethereum Holdings</th>
                                <th>Solana Holdings</th>
                                <th>Avalanche Holdings</th>
                                <th>Ripple Holdings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="fund in fundListForMember" :key="fund.fundId">
                                <td>{{ fund.title }}</td>
                                <td>{{ fund.capital.ETH }}</td>
                                <td>{{ fund.capital.SOL }}</td>
                                <td>{{ fund.capital.AVAX }}</td>
                                <td>{{ fund.capital.XRP }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table> -->
                </div>
            </div>
        </div>
        <div class="create-fund-container">
            <v-btn text x-large @click="overlay = !overlay">Create Fund</v-btn>
            <v-overlay :value="overlay">
                <v-card class="create-fund-card">
                    <v-form>
                        <v-container class="pl-10 pr-10">
                            <div class="fund-title-input">
                                <v-text-field v-model="title" label="Fund Title" required></v-text-field>
                            </div>
                            <div class="pt-10">
                                <v-textarea v-model="description" label="Fund Description" required></v-textarea>
                            </div>
                            <div class="pt-10">
                                <label>Enter Initial Crypto Investment: </label>
                                <div class="fund-capital-input pl-10 pt-5">
                                    <v-text-field type="number" v-model="eth" label="ETH"></v-text-field>
                                    <v-text-field type="number" v-model="avax" label="AVAX"></v-text-field>
                                    <v-text-field type="number" v-model="sol" label="SOL"></v-text-field>
                                    <v-text-field type="number" v-model="xrp" label="XRP"></v-text-field>
                                </div>
                            </div>
                            <div class="overlay-buttons pt-15">
                                <div>
                                    <v-btn color="success" @click="createFund()">Create Fund</v-btn>
                                </div>
                                <v-btn @click="overlay = false">Back</v-btn>
                            </div>
                        </v-container>
                    </v-form>
                </v-card>
            </v-overlay>
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
            overlay: false
        }
    },

    mounted() {
        this.displayFunds();
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
                this.$router.push("/account");
            }
        },

        async displayFunds () {
            await this.$store.dispatch('fund/fundListInit');
        },

        async createFund () {
            this.overlay = false;

            const ownerId = await this.$store.dispatch('fund/getOwner', this.user);

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
        },

        async deleteFund (fundId) {
            console.log('inside delete fund method', fundId);

            await this.$store.dispatch('fund/deleteFund', fundId);

            alert("Fund deleted successfully!")
        }
    },

    computed: {
        user () {
            return this.$store.state.accounts.user;
        },

        fundList () {
            return this.$store.state.fund.fundList.filter((fund) => {
                if (fund.owner === this.user) {
                    return true;
                } else {
                    return false;
                }
            });
        },

        fundListForMember () {
            return this.$store.state.fund.fundList.filter((fund) => {
                fund.memberNames.forEach(member => {
                    if (member === this.user) {
                        return true;
                    }
                })

                return false;
            })
        }
    }
}
</script>

<style scoped>
    div.layout {
        display: flex;
        justify-content: space-between;
    }

    div.create-fund-container {
        width: 40%;
    }

    button.v-btn.v-btn--text.theme--dark.v-size--x-large {
        position: absolute;
        right: 100px;
    }

    div.fund-title-input {
        width: 20em;
    }

    div.fund-capital-input.pl-10.pt-5 {
        width: 10em;
    }

    div.overlay-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .create-fund-card {
        width: 50em;
        height: 50em;
        overflow-y: auto;
    }

    @media (max-width: 1536px) {
        .create-fund-card {
            width: 40em;
            height: 40em;
            overflow-y: auto
        }
    }
</style>
<template>
<v-container>
    <v-layout>
        <div>
            <h1>Hello {{ user }}!</h1>
            <div class="py-10 pl-10">
                <div>
                    <v-btn color="success" @click="hidden = !hidden">Change Username</v-btn>
                    <div v-show="!hidden" class="user-update-field">
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
                <div class="pt-10" v-if="fundListForMember.length > 0">
                    <v-simple-table>
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
                            <tr v-for="fund in fundListForMember" :key="fund.fundId" @click="removeBtnHidden = !removeBtnHidden; chosenFundId = fund.fundId">
                                <td class="fund-title">{{ fund.title }}</td>
                                <td class="eth">{{ fund.capital.ETH }}</td>
                                <td class="sol">{{ fund.capital.SOL }}</td>
                                <td class="avax">{{ fund.capital.AVAX }}</td>
                                <td class="xrp">{{ fund.capital.XRP }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                    <div class="pt-10">
                        <v-fab-transition>
                            <v-btn color="red" v-show="!removeBtnHidden" @click="removeMember(chosenFundId); removeBtnHidden = true;">Leave Fund</v-btn>
                        </v-fab-transition>
                    </div>
                </div>
                <div v-if="fundListForMember.length === 0" class="pl-5 pt-5">
                    <p>You have not invested in any funds.</p>
                    <p><NuxtLink to="/funds">Click Here to Join a Fund!</NuxtLink></p>
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
</v-container>
</template>

<script>
import FundCard from '@/components/FundCard.vue'

export default {
    name: "AccountPage",

    data () {
        return {
            hidden: true,
            username: '',
            title: '',
            description: '',
            eth: 0,
            avax: 0,
            sol: 0,
            xrp: 0,
            overlay: false,
            removeBtnHidden: true,
            chosenFundId: 0
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
                this.$router.push("/");
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
        },

        async removeMember (fundId) {
            await this.$store.dispatch('fund/removeMember', {
                fundId: fundId, 
                username: this.user
            });
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
                if (fund.memberNames.includes(this.user)) {
                    return true;
                } else {
                    return false;
                }
            });
        },
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

    td.eth,
    td.sol,
    td.avax,
    td.xrp {
        text-align: center;
    }

    a {
      text-decoration: none;
      color: white !important;
    }

    div.user-update-field {
        width: 15em;
    }
</style>
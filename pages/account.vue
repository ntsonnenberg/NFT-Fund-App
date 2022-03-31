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
            </div>
        </div>
        <div v-if="user !== ''">
            <h1>Create a Fund</h1>
        </div>
    </v-layout>
</template>

<script>
export default {
    name: "AccountPage",

    data () {
        return {
            hidden: false,
            username: ''
        }
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
        }
    },

    computed: {
        user () {
            return this.$store.state.accounts.user;
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
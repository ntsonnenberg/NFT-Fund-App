<template>
<v-layout>
    <div>
        <h1>Hello {{ user }}!</h1>
        <div class="py-10 pl-10">
            <div>
                <v-btn color="success" @click="hiddenUsername = !hiddenUsername">Change Username</v-btn>
                <div v-show="!hiddenUsername">
                    <v-text-field value="username" v-model="username" placeholder="username"></v-text-field>
                </div>
            </div>
            <div class="py-5">
                <v-btn color="success" @click="hiddenPassword = !hiddenPassword">Change Password</v-btn>
                <div v-show="!hiddenPassword">
                    <v-text-field value="password" v-model="password" placeholder="password"></v-text-field>
                </div>
            </div>
            <div v-if="username !== '' || password !== ''">
                <v-btn @click="changeUser()">Update</v-btn>
            </div>
        </div>
    </div>
</v-layout>
</template>

<script>
export default {
    name: "AccountPage",

    data () {
        return {
            hiddenUsername: false,
            hiddenPassword: false,
            username: '',
            password: ''
        }
    },

    methods: {
        async changeUser () {
            await this.$store.dispatch('accounts/updateUser', { 
                username:this.username,
                password: this.password,
                isManager: false
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

</style>
<template>
    <v-card @load="getFundList()" v-if="list !== []" width="30em" elevation="10">
        <v-card-title>{{ list[0] }}</v-card-title>
        <v-card-subtitle>{{ list[0] }}</v-card-subtitle>
        <v-card-text>{{ list[0] }}</v-card-text>
        <v-card-actions class="d-flex">
            <v-btn text color="green">Request to Join</v-btn>
            <v-btn text color="green">View Capital Holdings</v-btn>
        </v-card-actions>

        <!-- <div>
            <label for="fundId">Fund Id:</label>
            <input id="fundId" v-model="fundId" type="number" />
            <v-btn @click="getFundList()">View Fund</v-btn>
        </div> -->
        
        <!-- <input v-model="fundName" placeholder="enter fund name" />
        <button @click="$emit('view', fundName)">View Name</button> -->
    </v-card>
</template>

<script>
export default {
    name: 'FundCardComponent',

    emits: ['view'],

    data() {
        return {
            fundId: 3101407
        }
    },

    methods: {
        async getFundList () {
            console.log('inside funciton')

            this.$store.dispatch('fund/getFund', this.fundId);
        }
    },

    computed: {
        list () {
            return this.$store.state.fund.list;
        },
    }
}
</script>

<style scoped>
    input {
        color: white;
    }
</style>
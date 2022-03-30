<template>
    <v-card v-if="list !== []" width="30em" elevation="10">
        <v-card-title>{{ list[0].fund.title }}</v-card-title>
        <v-card-subtitle>{{ list[0].fund.ownerName }}</v-card-subtitle>
        <v-card-text>{{ list[0].fund.description }}</v-card-text>
        <v-card-actions class="d-flex">
            <v-btn text color="green">Request to Join</v-btn>
            <v-btn text color="green">View Capital Holdings</v-btn>
        </v-card-actions>

        <!-- <div>
            <label for="fundId">Fund Id:</label>
            <input id="fundId" v-model="fundId" type="number" />
            <v-btn @click="getFundList()">View Fund</v-btn>
        </div> -->
    </v-card>
</template>

<script>
export default {
    name: 'FundCardComponent',

    mounted() {
        this.getFundList();
    },

    data() {
        return {
            fundId: 3101407
        }
    },

    methods: {
        async getFundList () {
            console.log('inside getFundList')

            await this.$store.dispatch('fund/getFund', this.fundId);
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
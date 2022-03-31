<template>
    <v-layout>
        <div class="pt-5">
            <h1>View Funds</h1>
            <div class="fund-cards pl-10 pt-10" v-for="fund in list" :key="fund.fundId">
                <fund-card :fund="fund"/>
            </div>

        </div>
    </v-layout>
</template>

<script>
import FundCard from '@/components/FundCard.vue'

export default {
    name: 'FundsPage',

    components: { 
        FundCard 
    },

    methods: {

    },

    computed: {
        list () {
            return this.$store.fund.list;
        }
    }
}
</script>

<style>

</style>
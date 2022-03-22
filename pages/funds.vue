<template>
    <div>
        <h1>This is the funds page</h1>
        <fund-card @view="showFundName" />
    </div>
</template>

<script>
import FundCard from '@/components/FundCard.vue'
export default {
    name: 'FundsPage',

    components: { 
        FundCard 
    },

    methods: {
    showFundName (event) {
        alert("This fund is named: " + event);
        }
    }
}
</script>

<style>

</style>
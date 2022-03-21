<template>
<div>
  <NuxtLink to="/login">Login</NuxtLink>
  <h1>NFT Fund</h1>
  <fund-card @view="showFundName"/>
</div>
  
</template>

<script>
  import FundCard from '@/components/FundCard.vue'

  export default {
    name: 'IndexPage',

    data() {
      return {
        fundName: '' 
      }
    },

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

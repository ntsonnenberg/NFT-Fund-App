<template>
<div>
  <v-parallax dark height=700 src="https://imgs.search.brave.com/9gt-3mQrxBb8lXMj7vOnMsVu9CQtaJQCYiXp6UhV6X4/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDQ2Nzg1/NDIuanBn">
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <h1 class="text-h4 font-weight-thin mb-4">Welcome to Bit-Fund</h1>
        <h4>This Best NFT Fund Exchange Platform Around</h4>
      </v-col>
    </v-row>
  </v-parallax>
  <div class="pt-15 mt-10 pl-15 ml-15">
    <div class="investing-container">
      <img src="https://imgs.search.brave.com/TizE_UhwmlwhcyJQitmq62PpKRi96hvlvXJaYFnkpCU/rs:fit:745:481:1/g:ce/aHR0cHM6Ly9iaXRj/b2luZXhjaGFuZ2Vn/dWlkZS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTgvMDkv/V2h5LUxvbmctdGVy/bS1DcnlwdG8tSW52/ZXN0b3JzLVNob3Vs/ZC1DYXBpdGFsaXpl/LW9uLXRoZS1Pbmdv/aW5nLUJlYXJpc2gt/TWFya2V0LVRyZW5k/LmpwZw" />
      <div class="investing-titles pl-15 ml-15">
        <h1 class="investing-main-title font-weight-thin">Join an NFT Fund ran by professional fund managers</h1>
        <h4 class="pt-5">Invest in your future</h4>
        <div class="pt-5 pl-5">
          <v-btn color="green" width="25%"><NuxtLink to="/signup">Join Now</NuxtLink></v-btn>
        </div>
      </div>
    </div>
  </div>
  <div class="py-15 my-10 pr-15 mr-15">
    <div class="dreams-container">
      <div class="dreams-titles pr-15 mr-15">
        <h1 class="dreams-main-title font-weight-thin">Make your dreams come true</h1>
        <h4 class="pt-5">See extraordinary returns</h4>
        <div class="pt-5 pl-5">
          <v-btn color="green" width="25%"><NuxtLink to="/signup">Sign Up</NuxtLink></v-btn>
        </div>
      </div>
      <img width="700px" src="https://imgs.search.brave.com/7nTfpgfp8HbWWBFCFSpWXKmbwqElWtJyyxO2Rlhxlp0/rs:fit:1200:866:1/g:ce/aHR0cHM6Ly9uZnRu/ZXdzZ2xvYmFsLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8wNC9uZnRfaW52/ZXN0bWVudHNfcGxj/X19SZFBSOS5qcGc"/>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'IndexPage',

    data() {
      return {
        fundName: '' 
      }
    },

    components: {
      
    },

    methods: {
    }
  }
</script>

<style scoped>
  .investing-container {
    display: flex;
    flex-direction: row;
  }

  .investing-titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .investing-main-title {
    width: 500px;
  }

  .dreams-container {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .dreams-titles {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dreams-main-title {
    width: 500px;
  }

  a {
      text-decoration: none;
      color: white !important;
  }
</style> 
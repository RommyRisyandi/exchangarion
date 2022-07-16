<template>
  <div id="exchangario">
    <Hero 
    :onSearch="filterExchanges"
    />
    <ExchangleList 
    :exchanges="exchanges"
    />
    <Pagination 
    :onNextPage="getMoreExchanges"
    :isFetching="isFetchingMoreData"
    :page="currentPage"
    />
  </div>
</template>

<script>
import ExchangleList from "../components/ExchangleList.vue"
import Pagination from "../components/Pagination.vue"
import Hero from "../components/Hero.vue"

export default {
  components: { 
  ExchangleList, 
  Pagination, 
  Hero 
  },
 data() {
  return {
    searchedExchangeTitle: ""
  }
 },
computed: {
  exchanges() {
    console.log();
    return this.$store.getters["exchange/filterExchanges"](this.searchedExchangeTitle);
  },
  isFetchingMoreData() {
    return this.$store.state.exchange.pagination.isFetchingData
  },
  currentPage() {
    return this.$store.getters["exchange/currentPage"];
  } 
},
created() {
 this.$store.dispatch("exchange/getExchanges");
},
methods: {
  getMoreExchanges({page}) {
    this.$store.dispatch("exchange/getMoreExchanges", {page});
  },
  filterExchanges(searchValue) {
    this.searchedExchangeTitle = searchValue;
  }
}
}
</script>

<style scoped>
.counter-container {
  padding: 200px;
  font-size: 60px;
}
</style>

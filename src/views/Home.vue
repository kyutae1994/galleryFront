<template>
  <div class="home">
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(item, idx) in state.items" :key="idx">
            <Card :item="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/views/Card";
import {reactive} from "vue";
import http from "@/scripts/http";
import store from "@/scripts/store";
import router from "@/scripts/router";

export default {
  name: "Home",
  components: {Card},
  setup() {
    const state = reactive({
      items: []
    })

    http.get("/api/items").then((res) => {
      state.items = res.data.responseData.itemList;
    }).catch(()=>{
      store.commit('setToken',null);
      store.commit('setRefreshToken',null);
      router.push({path: "/login"});
    });

    return {state}
  }
}
</script>
<style scoped>

</style>
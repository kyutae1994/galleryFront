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
    <button class="popup" @click="() => TogglePopup('buttonTrigger')">상담문의</button>
    <Popup v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')">
      <h2>상담문의</h2>
    </Popup>
  </div>
</template>
<script>
import Card from "@/views/Card";
import {reactive, ref} from "vue";
import http from "@/scripts/http";
import store from "@/scripts/store";
import router from "@/scripts/router";
import Popup from "@/components/Popup";

export default {
  name: "Home",
  components: {Popup, Card},
  setup() {
    const state = reactive({
      items: []
    })

    const popupTriggers = ref({
      buttonTrigger: false
    });

    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    http.get("/items").then((res) => {
      state.items = res.data.responseData.itemList;
    }).catch(()=>{
      store.commit('setToken',null);
      store.commit('setRefreshToken',null);
      router.push({path: "/login"});
    });

    return {state, Popup, popupTriggers, TogglePopup}
  }
}
</script>
<style scoped>
.popup{
  float: right;
  padding: 10px;
  margin-right: 200px;
}
</style>
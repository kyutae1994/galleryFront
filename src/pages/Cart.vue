<template>
  <div class="cart">
    카트 페이지
  </div>
</template>

<script>
import axios from "axios";

export default {
  setup() {
    axios.get("/api/cart/items").then((res) => {
      console.log(res.data);
    })
  }
}
</script>
<style scoped>
</style>
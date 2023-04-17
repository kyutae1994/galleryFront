<template>
  <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="example@example.com"
             @keyup.enter="submit()" v-model="state.form.email">
      <label for="floatingInput">Email address</label>
      <div v-if="state.check">
        중복된 email 입니다.
      </div>
    </div>
    <button class="w-100 btn btn-sm btn-primary" @click="duplicate()">Duplicate check</button>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
             @keyup.enter="submit()" v-model="state.form.password">
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" @click="submit()">Sign up</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import store from "@/scripts/store";
import router from "@/scripts/router";

export default {
  setup() {
    const state = reactive({
      form: {
        email: "",
        password: ""
      },
      check: false
    })

    const submit = () => {
      axios.post("/api/account/login", state.form).then((res) => {
        store.commit('setAccount', res.data);
        sessionStorage.setItem("id", res.data);
        router.push({path: "/"});
        window.alert('로그인 되었습니다.');
      }).catch(()=>{
        window.alert("로그인 정보가 존재하지 않습니다.");
      });
    }

    const duplicate = () => {
      axios.post("/api/account/duplicate", state.form).then((res) => {
        state.check = res.data;
      })
    }

    return {state, submit, duplicate}
  }
}
</script>
<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
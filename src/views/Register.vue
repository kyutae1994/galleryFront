<template>
  <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="E-Mail"
             @keyup.enter="submit()" v-model="state.form.email">
      <label for="floatingInput">Email address</label>
      <div v-if="state.check">
        중복된 email 입니다.
      </div>
      <div v-else-if="!state.check && state.cntCheck == 1">
        인증되었습니다.
      </div>
    </div>
    <button class="w-100 btn btn-sm btn-primary" @click="duplicate()">Duplicate check</button>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
             @keyup.enter="submit()" v-model="state.form.password">
      <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingName" placeholder="Name"
             @keyup.enter="submit()" v-model="state.form.name">
      <label for="floatingName">Name</label><br/>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingYear" placeholder="Year" maxlength="4"
             @keyup.enter="submit()" v-model="state.form.year">
      <label for="floatingYear">Year</label>
    </div>
    <div class="form-floating">
      <select id="floatingMonth" class="form-control" @keyup.enter="submit()" v-model="state.form.month">
        <option value>Month</option>
        <option value="01">1</option><option value="02">2</option><option value="03">3</option><option value="04">4</option><option value="05">5</option><option value="06">6</option>
        <option value="07">7</option><option value="08">8</option><option value="09">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
      </select>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingDay" placeholder="Day" maxlength="2"
             @keyup.enter="submit()" v-model="state.form.day">
      <label for="floatingDay">Day</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" @click="submit()">Sign up</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import router from "@/scripts/router";

export default {
  setup() {
    const state = reactive({
      form: {
        email: "",
        password: "",
        name: "",
        year: "",
        month: "",
        day: ""
      },
      check: false,
      cntCheck: 0
    })

    const submit = () => {
      if (state.form.email === null || state.form.email == '') {
        window.alert('이메일을 입력해주세요.');
        return;
      }
      if (state.form.password == null || state.form.password == '') {
        window.alert('패스워드를 입력해주세요.');
        return;
      }
      if (state.form.name === null || state.form.name == '') {
        window.alert('이름이 입력해주세요.');
        return;
      }
      if (state.form.year == null || state.form.year == '') {
        window.alert('년도를 입력해주세요.');
        return;
      }
      if (state.form.month == null || state.form.month == '') {
        window.alert('월을 입력해주세요.');
        return;
      }
      if (state.form.day == null || state.form.day == '') {
        window.alert('일을 입력해주세요.');
        return;
      }
      if (state.cntCheck == 0) {
        window.alert('이메일 인증을 진행해주세요.');
        return;
      }
      if (state.cntCheck > 0) {
        axios.post("/api/account/register", state.form).then(() => {
          router.push({path: "/login"});
          window.alert('회원가입 되었습니다.');
        }).catch(() => {
          router.push({path: "/register"});
        });
      }
    }

    const duplicate = () => {
      axios.post("/api/account/duplicate", state.form).then((res) => {
        state.check = res.data;
        if (!state.check) {
          state.cntCheck = 1;
        }
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
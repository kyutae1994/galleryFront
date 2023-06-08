<template>
  <div class="popup">
    <div class="popup-inner">
      <slot/>
      유저이름:
      <input
          v-model="userName"
          type="text"
      >
      내용: <input
        v-model="message"
        type="text"
        @keyup="sendMessage"
    >
      <div
          v-for="(item, idx) in recvList"
          :key="idx"
      >
        <h3>유저이름: {{ item.body.responseData.userName }}</h3>
        <h3>내용: {{ item.body.responseData.message }}</h3>
      </div>
      <button class="popup-close" @click="TogglePopup()">
        닫기
      </button>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  props: ['TogglePopup'],
  data() {
    return {
      userName: "",
      message: "",
      recvList: []
    }
  },
  created() {
    // Chat.vue가 생성되면 소켓 연결을 시도.
    this.connect()
  },
  methods: {
    sendMessage(e) {
      if (e.keyCode === 13 && this.userName !== '' && this.message !== '') {
        this.send()
        this.message = ''
      }
    },
    send() {
      console.log("Send message:" + this.message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userName: this.userName,
          message: this.message
        };
        // 서버로 메시지 보냄.
        this.stompClient.send("/message", JSON.stringify(msg), {});
      }
    },
    connect() {
      const serverURL = "http://localhost:8080/api/ws"
      let socket = new SockJS(serverURL);  // 소켓 생성
      this.stompClient = Stomp.over(socket);  // stompClient를 이용해 소켓 연결
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      this.stompClient.connect(
          {},
          frame => {
            // 소켓 연결 성공
            this.connected = true;
            console.log('소켓 연결 성공', frame);
            // 서버의 메시지 전송 endpoint를 구독.
            // 서버에서 메시지 받음.
            this.stompClient.subscribe("/topic/messages", res => {
              console.log('구독으로 받은 메시지 입니다.', res.body);

              // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
              this.recvList.push(JSON.parse(res.body))
            });
          },
          error => {
            // 소켓 연결 실패
            console.log('소켓 연결 실패', error);
            this.connected = false;
          }
      );
    }
  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: #fff;
  padding: 32px;
}
</style>
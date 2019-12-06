<template>
  <div class="page-container chat">
    <div class="chat__wrapper">
      <ul class="message-list" ref="scrolling">
        <Message
          v-for="message in messages"
          :key="message.id"
          :name="message.name"
          :text="message.text"
          :owner="message.id === user.id"
        />
      </ul>
    </div>
    <div class="chat__form-wrapper">
      <v-text-field
        label="Outlined"
        v-model="newMessage"
        @keydown.enter="send"
        outlined
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Message from '@/components/Message';
export default {
  head() {
    return {
      title: `Room ${this.user.room}`,
    };
  },
  data: () => ({
    newMessage: '',
  }),
  computed: mapState(['user', 'messages']),
  components: {
    Message,
  },
  methods: {
    send() {
      this.$socket.emit(
        'createMessage',
        {
          text: this.newMessage,
          id: this.$store.state.user.id,
        },
        (err, data) => {
          console.warn(888888);

          if (err) {
            console.log('err :', err);
          } else {
            this.clearMessage();
            console.log('data :', data);
          }
        },
      );
    },
    clearMessage() {
      console.log(1111111);

      this.newMessage = '';
    },
  },
  middleware: ['chat'],
  watch: {
    messages() {
      setTimeout(() => {
        console.log(
          'this.$refs.scrolling.scrollTop :',
          this.$refs.scrolling.scrollTop,
        );
        console.log(
          'this.$refs.scrolling.scrollHeight :',
          this.$refs.scrolling.scrollHeight,
        );
        this.$refs.scrolling.scrollTop = this.$refs.scrolling.scrollHeight;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  padding: 15px;
  &__wrapper {
    flex: 1;
    position: relative;
  }
  &__form-wrapper {
    background-color: #212121;
    padding: 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
.chat-form {
  border: 2px solid white;
  border-radius: 4px;
}
.message-list {
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 95px;
  left: 0;
  right: 0;
}
</style>

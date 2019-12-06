<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400px">
        <v-snackbar v-model="snackbar" :timeout="6000" top>
          {{ message }}
          <v-btn dark text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>

        <v-card-title>
          <h1>Nuxt чат</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Your name"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Choose room"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              class="mr-4"
              @click="submit"
              color="primary"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  layout: 'empty',
  sockets: {
    connect() {
      console.log('socket connected');
    },
    customEmit(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
      );
    },
  },
  head: {
    title: 'Welcome',
  },
  data: () => ({
    snackbar: false,
    valid: true,
    name: '',
    message: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 16) || 'Name must be less than 16 characters',
    ],
    room: '',
    roomRules: [
      (v) => !!v || 'Room number is required',
      (v) => /\d/.test(v) || 'Room number must be valid',
    ],
  }),

  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room,
        };
        this.$socket.emit('userJoined', user, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log('data :', data);
            user.id = data.userId;
            this.setUser(user);
            this.$router.push('chat');
          }
        });
      }
    },
  },
  mounted() {
    const { message } = this.$route.query;
    if (message === 'noUser') {
      this.message = 'Enter your name and room';
    } else if (message === 'leftChat') {
      this.message = 'You left the chat';
    }

    this.snackbar = Boolean(this.message);
  },
};
</script>

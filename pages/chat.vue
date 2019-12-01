<template>
  <ul>
    <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
  head() {
    return {
      title: `Room ${this.user.room}`,
    };
  },
  computed: mapState(['user']),
  middleware: ['chat'],
  data: () => ({
    messages: [],
  }),
};
</script>

<style></style>

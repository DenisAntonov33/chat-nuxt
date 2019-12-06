<template>
  <div class="message">
    <div v-if="name === 'admin'" class="message-admin">
      <span class="message-admin__text">{{ text }}</span>
      <hr />
    </div>
    <div v-else :class="{ 'message-user_owned': owner }" class="message-user">
      <span class="message-user__name">{{ name }}</span>
      <span class="message-user__text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  margin-right: 10px;
  &-admin {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    &__text {
      margin-bottom: 5px;
      text-align: center;
    }
    margin-bottom: 1rem;
  }
  &-user {
    background-color: blue;
    border-radius: 4px;
    color: #fff;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    padding: 0.5rem;
    width: 40%;
    &_owned {
      align-items: flex-end;
      color: #000;
      background-color: #fff;
      margin-left: auto;
    }
    &__name {
      font-weight: bold;
      text-transform: uppercase;
    }
    // &__text {

    // }
  }
}
</style>

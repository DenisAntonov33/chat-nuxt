<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list subheader>
        <v-subheader>Persons in room</v-subheader>

        <v-list-item
          v-for="item in users"
          :key="item.title"
          @click="setActiveUser(item)"
        >
          <!-- <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon
              :color="item.id === user.id ? 'deep-purple accent-4' : 'grey'"
              >mdi-chat</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Room {{ user.room }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  computed: mapState(['user', 'users']),
  data: () => ({
    drawer: true,
  }),
  methods: {
    ...mapMutations(['clearUser']),
    ...mapActions(['CLEAR_DATA']),
    setActiveUser(user) {
      this.items = this.items.map((user) => {
        user.active = false;
        return user;
      });
      user.active = true;
    },
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=leftChat');
        this.CLEAR_DATA();
      });
    },
  },
};
</script>

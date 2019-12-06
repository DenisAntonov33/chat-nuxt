export const state = () => ({
  user: {},
  messages: [],
  users: [],
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  clearUser(state) {
    state.user = {};
  },
  clearMessages(state) {
    state.messages = [];
  },
  clearUsers(state) {
    state.users = [];
  },
  SOCKET_newMessage(state, payload) {
    state.messages = [...state.messages, payload];
  },
  SOCKET_updateUsers(state, payload) {
    state.users = payload;
  },
};

export const actions = {
  CLEAR_DATA({ commit }) {
    commit('clearUser');
    commit('clearMessages');
    commit('clearUsers');
  },
};

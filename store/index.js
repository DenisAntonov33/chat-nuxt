export const state = () => ({
  user: {},
  messages: [],
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
};

export const actions = {
  SOCKET_newMessage(context, payload) {
    console.log('context :', context);
    console.log('payload :', payload);
  },
  CLEAR_DATA({ commit }) {
    commit('clearUser');
    commit('clearMessages');
  },
};

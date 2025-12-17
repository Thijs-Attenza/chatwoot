import types from '../mutation-types';
import ConversationApi from '../../api/inbox/conversation';
import { debounce } from '@chatwoot/utils';

const state = {
  inbox_count: [],
};

export const getters = {
  getStats: $state => $state,
};

// Create a debounced version of the actual API call function
const fetchMetaData = async (commit, params) => {
  try {
    const response = await ConversationApi.meta(params);
    const {
      data: { meta },
    } = response;
    commit(types.SET_CONV_MENU_META, { inboxId: params.inboxId, meta: meta });
  } catch (error) {
    // ignore
  }
};

const debouncedFetchMetaData = debounce(fetchMetaData, 500, false, 1500);
const longDebouncedFetchMetaData = debounce(fetchMetaData, 5000, false, 10000);
const superLongDebouncedFetchMetaData = debounce(
  fetchMetaData,
  10000,
  false,
  20000
);

export const actions = {
  get: async ({ commit, state: $state }, params) => {
    if ($state.allCount > 5000) {
      superLongDebouncedFetchMetaData(commit, params);
    } else if ($state.allCount > 100) {
      longDebouncedFetchMetaData(commit, params);
    } else {
      debouncedFetchMetaData(commit, params);
    }
  },
  getAll: async ({ commit, state: $state }) => {
    let inboxIds = Object.keys(state.inbox_count);
    inboxIds.forEach(inboxId => {
      let params = { inboxId: inboxId };
      if ($state.allCount > 5000) {
        superLongDebouncedFetchMetaData(commit, params);
      } else if ($state.allCount > 100) {
        longDebouncedFetchMetaData(commit, params);
      } else {
        debouncedFetchMetaData(commit, params);
      }
    });
  },
  set({ commit }, data) {
    commit(types.SET_CONV_MENU_META, data);
  },
};

export const mutations = {
  [types.SET_CONV_MENU_META](
    $state,
    { inboxId: inboxId, meta: { all_count: allCount } } = {}
  ) {
    $state.inbox_count[inboxId] = allCount;
    $state.updatedOn = new Date();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import {History} from "@/modules/history/models";
import {User} from "@/modules/user/models";
import {HISTORY_ACTIONS_TYPE} from "@/modules/history/store/actions";

type TState = {
    historyItems: Array<History<User>>
}

const state = (): TState => {
    return {
        historyItems: [],
    }
}

const mutations = {
    [HISTORY_ACTIONS_TYPE.SET_NEW_HISTORY_ITEM] (state: TState, historyItem: History<User>): void {
        state.historyItems.push(Object.freeze(historyItem));
    }
}

const getters = {
    historyList(state: TState): Array<History<User>> {
        return state.historyItems;
    },

    addingHistoryList(state: TState): Array<History<User>> {
        return state.historyItems.filter(item => item.type === "ADDING_TO_FAVORITES");
    },

    removingHistoryList(state: TState): Array<History<User>> {
        return state.historyItems.filter(item => item.type === "REMOVING_FROM_FAVORITES");
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}
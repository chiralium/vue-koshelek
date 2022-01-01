import {HistoryItem} from "@/modules/history/models";
import {User} from "@/modules/user/models";
import {HISTORY_ACTIONS_TYPE} from "@/modules/history/store/actions";

type TState = {
    historyItems: Array<HistoryItem<User>>
}

const state = (): TState => {
    return {
        historyItems: [],
    }
}

const mutations = {
    [HISTORY_ACTIONS_TYPE.SET_NEW_HISTORY_ITEM] (state: TState, historyItem: HistoryItem<User>): void {
        state.historyItems.push(Object.freeze(historyItem));
    }
}

const getters = {
    historyList(state: TState): Array<HistoryItem<User>> {
        return state.historyItems;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}
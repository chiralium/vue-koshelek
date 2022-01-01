import {User} from "@/modules/user/models";
import {FAVORITE_LIST_ACTIONS_TYPE} from "@/modules/favorites/store/actions";
import {Commit} from "vuex";
import {TActionWithStateA} from "@/store/types";
import {USER_ACTIONS_TYPE} from "@/modules/user/store/actions";

type TState = {
    favoriteList: Array<User>,
}

type TActionA = {
    commit: Commit,
}

const state = (): TState => {
    return {
        favoriteList: [],
    }
}

const mutations = {
    [FAVORITE_LIST_ACTIONS_TYPE.SET_REMOVED] (state: TState, id: string): void {
        const deletedId = state.favoriteList.findIndex(user => user.id === id);

        if (deletedId !== -1) {
            state.favoriteList.splice(deletedId, 1);
        }
    },

    [FAVORITE_LIST_ACTIONS_TYPE.SET_ADDED] (state: TState, user: User): void {
        state.favoriteList.push(user);
    }
}

const actions = {
    add({commit}: TActionA, user: User): void {
        commit(FAVORITE_LIST_ACTIONS_TYPE.SET_ADDED, user);
    },

    removeFromFavorite({commit, state}: TActionWithStateA<TState>, id: string): void {
        const user: User | undefined = state.favoriteList.find(user => user.id === id);
        if (!user) {
            return;
        }

        commit(`userStore/${USER_ACTIONS_TYPE.SET_ADDED}`, user, {
            root: true,
        });
        commit(`userStore/${USER_ACTIONS_TYPE.SET_FILTERED}`, null, {
            root: true,
        });

        commit(FAVORITE_LIST_ACTIONS_TYPE.SET_REMOVED, id);
    }
}

const getters = {
    favoritesList(state: TState): Array<User> {
        return state.favoriteList;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
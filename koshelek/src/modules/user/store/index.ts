import {Commit} from "vuex";
import {USER_ACTIONS_TYPE} from "@/modules/user/store/actions";
import {User} from "@/modules/user/models";
import UserApi from "@/modules/user/api";

type TState = {
    isLoading: boolean;
    userList: Array<User>;
}

type TActionA = {
    commit: Commit,
}

const userApi = new UserApi();

const state = (): TState => ({
    isLoading: false,
    userList: [],
});

const actions ={
    setIsLoading({commit}: TActionA, loadingState: boolean): void {
        commit(USER_ACTIONS_TYPE.SET_IS_LOADING, loadingState);
    },

    setUserList({commit}: TActionA, userList: Array<User>): void {
        commit(USER_ACTIONS_TYPE.SET_USER_LIST, userList);
    },

    async fetchUserList({commit}: TActionA): Promise<void> {
        commit(USER_ACTIONS_TYPE.SET_IS_LOADING, true);
        commit(USER_ACTIONS_TYPE.SET_USER_LIST, await userApi.getUserList());
        commit(USER_ACTIONS_TYPE.SET_IS_LOADING, false);
    },
};

const getters = {
    isLoading(state: TState): boolean {
        return state.isLoading
    },

    userList(state: TState): Array<User> {
        return state.userList;
    }
}

const mutations = {
    [USER_ACTIONS_TYPE.SET_IS_LOADING] (state: TState, loadingState: boolean): void {
        state.isLoading = loadingState;
    },

    [USER_ACTIONS_TYPE.SET_USER_LIST] (state: TState, userList: Array<User>): void {
        state.userList = userList;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
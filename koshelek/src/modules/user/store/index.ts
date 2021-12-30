import {Commit} from "vuex";
import {USER_ACTIONS_TYPE} from "@/modules/user/store/actions";
import {User} from "@/modules/user/models";
import UserApi from "@/modules/user/api";

type TState = {
    isLoading: boolean;
    userList: Array<User>;
    filteredList: Array<User>;
    searchQuery: string;
}

type TActionA = {
    commit: Commit,
}

const userApi = new UserApi();

const state = (): TState => ({
    isLoading: false,
    userList: [],
    searchQuery: '',
    filteredList: [],
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

    setSearchQuery({commit}: TActionA, query: string): void {
        commit(USER_ACTIONS_TYPE.SET_SEARCH_QUERY, query);
        commit(USER_ACTIONS_TYPE.SET_OCCURRENCES);
        commit(USER_ACTIONS_TYPE.SET_FILTERED);
    }
};

const getters = {
    isLoading(state: TState): boolean {
        return state.isLoading
    },

    userList(state: TState): Array<User> {
        return state.userList;
    },

    searchQuery(state: TState): string {
        return state.searchQuery;
    },

    filteredList(state: TState): Array<User> {
        if (state.searchQuery === '') {
            return state.userList;
        }

        console.log(state.filteredList);

        return state.filteredList;
    }
}

const mutations = {
    [USER_ACTIONS_TYPE.SET_IS_LOADING] (state: TState, loadingState: boolean): void {
        state.isLoading = loadingState;
    },

    [USER_ACTIONS_TYPE.SET_USER_LIST] (state: TState, userList: Array<User>): void {
        state.userList = userList.map(user => Object.freeze<User>(user));
    },

    [USER_ACTIONS_TYPE.SET_OCCURRENCES] (state: TState): void {
        state.userList.forEach(user => user.findOccurrences<User>(user, state.searchQuery));
    },

    [USER_ACTIONS_TYPE.SET_SEARCH_QUERY] (state: TState, query: string): void {
        state.searchQuery = query;
    },

    [USER_ACTIONS_TYPE.SET_FILTERED] (state: TState): void {
        state.filteredList = state
            .userList
            .slice()
            .sort((x: User, y: User) => {
                if (x.occurrencesKeysList.length > y.occurrencesKeysList.length) {
                    return -1;
                }

                return 1;
            }).filter(user => user.occurrencesKeysList.length > 0);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
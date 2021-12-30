import {Commit} from "vuex";
import {USER_ACTIONS_TYPE} from "@/modules/user/store/actions";
import {User} from "@/modules/user/models";
import UserApi from "@/modules/user/api";

const sortingCallback = (x: number, y: number, method: TSorting): number => {
    const [moreFactor, lessFactor] =
        method === 'ASC' ? [
            -1, 1
        ] : [
            1, -1
        ];

    if (x > y) {
        return moreFactor;
    }

    return lessFactor;
}

export type TSorting = 'ASC' | 'DESC';

type TState = {
    isLoading: boolean;
    userList: Array<User>;
    filteredList: Array<User>;
    favorites: Array<User>;
    searchQuery: string;
    sorting: TSorting;
}

type TActionA = {
    commit: Commit,
}

const userApi = new UserApi();

const state = (): TState => ({
    isLoading: false,
    userList: [],
    filteredList: [],
    favorites: [],
    searchQuery: '',
    sorting: 'ASC',
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
    },

    setSorting({commit}: TActionA, sorting: TSorting): void {
        commit(USER_ACTIONS_TYPE.SET_SORTING, sorting);
    },

    removeAtId({commit}: TActionA, id: string): void {
        commit(USER_ACTIONS_TYPE.REMOVE, id);
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

        return state.filteredList
            .sort((x: User, y: User) =>
                sortingCallback(x.occurrencesKeysList.length, y.occurrencesKeysList.length, state.sorting)
            );
    },

    totalOccurrences(state: TState): number {
        if (state.searchQuery === '') {
            return 0;
        }

        return state.filteredList.reduce((total, userItem) => {
            return total + userItem.occurrencesKeysList.length;
        }, 0)
    },

    currentSort(state: TState): TSorting {
        return state.sorting;
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
            .filter(userItem => userItem.occurrencesKeysList.length > 0);
    },

    [USER_ACTIONS_TYPE.SET_SORTING] (state: TState, sorting: TSorting): void {
        state.sorting = sorting;
    },

    [USER_ACTIONS_TYPE.REMOVE] (state: TState, id: string): void {
        const deletedIndex = state.userList.findIndex(userItem => userItem.id === id);

        if (deletedIndex === -1) {
            return;
        }

        state.userList.splice(deletedIndex, 1);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
import Vue from 'vue';
import Vuex from 'vuex';
import {COUNTRY_STORE_ACTIONS} from "@/modules/country/actions";

Vue.use(Vuex);

type TState = {
    isLoading: boolean,
}

export default new Vuex.Store<TState>({
    state: {
        isLoading: false,
    },
    mutations: {
        [COUNTRY_STORE_ACTIONS.SET_IS_LOADING]: (state: TState, payload: boolean) => {
            state.isLoading = payload;
        },
    },
    actions: {
        setIsLoading(context, payload: boolean) {
            context.commit(COUNTRY_STORE_ACTIONS.SET_IS_LOADING, payload);
        },
    },
});
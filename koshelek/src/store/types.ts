import {Commit} from "vuex";

export type TActionA = {
    commit: Commit,
}

export type TActionWithStateA<T> = {
    commit: Commit,
    state: T,
}
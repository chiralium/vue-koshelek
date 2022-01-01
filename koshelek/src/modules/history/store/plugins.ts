import {Store} from "vuex";
import {FAVORITE_LIST_ACTIONS_TYPE} from "@/modules/favorites/store/actions";
import {HISTORY_ACTIONS_TYPE} from "@/modules/history/store/actions";
import {HistoryItem} from "@/modules/history/models";
import {User} from "@/modules/user/models";

const getUserById = (id: string, userList: Array<User>): User | undefined => {
    return userList.find(user => user.id === id);
}

export const historyPluginListener = (store: Store<null>): void => {
    store.subscribe((mutation,) => {
        if (mutation.type === `favoritesStore/${FAVORITE_LIST_ACTIONS_TYPE.SET_ADDED}`) {
            const user = mutation.payload;

            const historyItem = new HistoryItem<User>({
                datetime: new Date(),
                type: "ADDING_TO_FAVORITES",
                item: user,
            });

            store.commit(
                `historyStore/${HISTORY_ACTIONS_TYPE.SET_NEW_HISTORY_ITEM}`,
                historyItem,
            );
        } else if (mutation.type === `historyStore/${HISTORY_ACTIONS_TYPE.SET_NEW_HISTORY_ITEM}`) {
            const userId = mutation.payload;
            const userList = store.getters["userStore/userList"];

            const user = getUserById(userId, userList);

            if (!user) {
                return;
            }

            const historyItem = new HistoryItem<User>({
                datetime: new Date(),
                type: "REMOVING_FROM_FAVORITES",
                item: user,
            })

            store.commit(
                `historyStore/${HISTORY_ACTIONS_TYPE.SET_NEW_HISTORY_ITEM}`,
                historyItem,
            )
        }
    })
}
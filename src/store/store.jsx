const defaultStore = {
    defaultMenu: null,
    user: {
        name: null,
        token: 0
    }
};

var store = window.localStorage.getItem("store");
if (store === null || store === "null") {
    store = defaultStore;
} else {
    try {
        store = JSON.parse(store);
    } catch (error) {
        store = defaultStore;
    }
}

export default store;

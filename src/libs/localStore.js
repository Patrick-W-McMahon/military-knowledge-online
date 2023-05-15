/* LocalStore is a wrapper for window.localStorage */

class LocalStore {
    getItem(itemName, fallbackData) {
        let dataStore = fallbackData || [];
        if(typeof window !== 'undefined') {
            dataStore = JSON.parse(window.localStorage.getItem(itemName));
        }
        return dataStore;
    }

    setItem(itemName, data) {
        if(typeof window !== 'undefined') {
            window.localStorage.setItem(itemName, JSON.stringify(data));
            return true;
        }
        return false;
    }
}
export default LocalStore;
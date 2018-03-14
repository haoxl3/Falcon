
export default {
    //交换对象
    swap(obj, now, pos){
        var temp = obj[now];
        obj[now] = obj[pos];
        obj[pos] = temp;
        return obj;
    },
    setStorage(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getStorage(key) {
        return JSON.parse(window.localStorage.getItem(key));
    }
}
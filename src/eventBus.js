let listeners = {};


export default {
    on(eventName,handler){
        if(!listeners[eventName]){
            listeners[eventName] = new Set();
        }
        listeners[eventName].add(handler);
    },
    off(eventName,handler){
        if(!listeners[eventName]){
            return
        }
        listeners[eventName].delete(handler);
    },
    emit(eventName,...arg){
        console.log(listeners[eventName],arg);
        if(!listeners[eventName]){
            return
        }
        for (const handler of listeners[eventName]) {
            handler(arg);
        }
    }
}
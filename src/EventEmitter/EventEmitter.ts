export type Callback = (payload: any) => void

class EventEmitter {

    private eventMap: Map<string, Callback[]> = new Map()

    public subscribe(eventName: string, callback: Callback) {
        const callbacks = this.eventMap.get(eventName)

        if (!callbacks) this.eventMap.set(eventName, [callback])
        else this.eventMap.set(eventName, [...callbacks, callback])
    }

    public unsubscribe(eventName: string, callback: Callback) {
        const callbacks = this.eventMap.get(eventName)
        this.eventMap.set(eventName, callbacks.filter((c: Callback) => c !== callback))
    }

    public emit(eventName: string, payload: any) {
        const callbacks = this.eventMap.get(eventName)
        if (callbacks) callbacks.forEach((callback: Callback) => callback(payload))
    }

}

export default EventEmitter
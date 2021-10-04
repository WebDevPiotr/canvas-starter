import { JsonConfig } from "Core/Scene/Scene";

class JsonLoader {

    static async load(source: JsonSource) {
        switch (typeof source) {
            case 'string':
                return this.loadFromUrl(source)
            case 'object':
                return this.loadFromFile(source)
        }
    }

    private static async loadFromUrl(url: string): Promise<JsonConfig> {
        return fetch(url).then(res => res.json())
    }

    private static async loadFromFile(file: File): Promise<JsonConfig> {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.addEventListener('load', e => {
                resolve(JSON.parse(e.target.result as string))
            })
            reader.readAsText(file)
        })
    }

}

export default JsonLoader

export type JsonSource = File | string
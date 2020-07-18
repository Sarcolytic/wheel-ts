import { Loader, Texture, ITextureDictionary, Sprite } from 'pixi.js';

class Assets {
    private _textures: ITextureDictionary;

    load(): Promise<any> {
        const id = 'texture';
        const loader = new Loader();
        loader.add(id, 'img/texture.json', undefined, () => {
            this._textures = { ...loader.resources[id].textures };
        });

        return new Promise((resolve) => {
            loader.load(resolve);
        });
    }

    texture(id: string): Texture {
        return this._textures[id];
    }

    sprite(id: string): Sprite {
        return new Sprite(this.texture(id));
    }
}

export default new Assets();

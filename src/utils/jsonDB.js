const fs = require('fs');
module.exports = class JsonDB {
    /**
     * 
     * @param {Object<String>} options 
     */
    constructor(options) {
        this.path = options.path;
        this.type = options.type === "cache" ? "cache" : "object";
        this.data = this.type === "cache" ? [] : {};
        this.format = options.format;
        this.#load();
        return this;
    }

    #load() {
        if (fs.existsSync(this.path)) {
            this.data = JSON.parse(fs.readFileSync(this.path));
        }
        return this;
    }

    #save() {
        if (this.format) {
            fs.writeFileSync(this.path, JSON.stringify(this.data, null, "\t"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify(this.data));
        }
        return this;
    }

    #renewIds() {
        this.data.map((item, index) => {
            item.id = index + 1;
        });
        this.#save();
        return this;
    }

    /**
     * 
     * @param {String} key 
     * @returns {Object} Object
     */
    get(key) {
        return this[key] || {};
    }

    add(data) {
        if (this.type === "object") return this;
        this.#renewIds();
        data.id = this.data.length + 1;
        this.data.push(data);
        this.#save();
        return this;

    }

    update(data) {
        this.data.forEach(item => {
            if (item.id === data.id) {
                item.name = data.name || item.name;
                item.stock = data.stock || item.stock;
                item.stockSize = data.stockSize || item.stockSize;
            }
        });
        this.#save();
        return this;
    }

    /**
     * 
     * @param {String} key 
     * @param {String} value 
     */
    set(key, value) {
        if (this.type === "cache") return;
        this.data[key] = value;
        this.#save();
        return this;

    }

    remove(key) {
        if (this.type === "cache") {
            this.data.map((item, index) => {
                console.log(item.id, key);
                if (item.id == key) {
                    console.log(this.data[index]);
                    this.data.splice(index, 1);

                }
            });
            // this.#renewIds();
            this.#save();
            return this;
        } else {
            delete this.data[key];
            this.#save();
        }
        return this;
    }

    clear() {
        this.data = this.type === "cache" ? [] : {};
        this.#save();
        return this;
    }
};
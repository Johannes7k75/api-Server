module.exports = class Item {

    constructor() {
        this.id = 0;
        this.name = '';
        this.stock = "0";
        this.stockSize = "0";
    }

    setStockSize(setStockSize) {
        this.stockSize = setStockSize;
        return this;
    }

    setId(setId) {
        this.id = setId;
        return this;
    }

    setName(setName) {
        this.name = setName;
        return this;
    }

    setStock(setStock) {
        this.stock = setStock;
        return this;
    }
};
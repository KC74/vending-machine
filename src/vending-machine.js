/**
 *  Vending Machine
 *  v. 20171911
 * 
 *  Kenneth Chow
 */

class VendingMachine {
  constructor() {
    this.power = true;
    this.inventory = {
      coke: {
        price: 2.75,
        stock: 0
      }
    };

    this.bank = {
      toonie: {
        value: 2,
        stock: 10
      },
      loonie: {
        value: 1,
        stock: 25
      },
      quarter: {
        value: 0.25,
        stock: 10
      },
      dime: {
        value: 0.1,
        stock: 20
      },
      nickel: {
        value: 0.05,
        stock: 35
      },
      penny: {
        value: 0.01,
        stock: 100
      }
    };
  }

  refillInventory(item, price, stock) {
    if (
      item === (undefined || null) ||
      typeof item !== "string" ||
      stock === undefined ||
      typeof stock !== "number" ||
      stock <= 0 ||
      price === undefined ||
      typeof price !== "number" ||
      price <= 0
    ) {
      throw new Error("Please supply valid inputs. ie. apple, 6");
    }

    this.inventory = {
      [item]: {
        price,
        stock: !this.inventory[item]
          ? stock
          : this.inventory[item].stock + stock
      }
    };

    // return the item that just got added
    return this.inventory[item];
  }

  giveChange(price, cash) {
    let change = {};
    let changeNeeded = Math.round((cash - price) * 100) / 100;

    if (price <= 0 || cash < price || cash <= 0) {
      throw new Error("Invalid inputs. Cash must be greater than the price.");
    }

    // iterate through the piggy bank
    for (let coin in this.bank) {
      if (
        changeNeeded > 0 &&
        this.bank[coin].stock > 0 &&
        this.bank[coin].value <= changeNeeded
      ) {
        let calculateCoin = Math.floor(changeNeeded / this.bank[coin].value);
        change[coin] = calculateCoin;
        changeNeeded =
          Math.round(
            (changeNeeded - this.bank[coin].value * change[coin]) * 100
          ) / 100;
      }
    }

    return change;
  }

  resupplyChange(coin, stock) {
    if (!this.bank[coin] && stock <= 0) {
      throw new Error("Please input valid coin and stock. i.e toonie, 5");
    }
    this.bank[coin].stock += stock;
    return this.bank;
  }

  dispense(item, cash) {
    // make sure item exists
    if (!this.inventory[item]) {
      throw new Error("Please select a valid item.");
    } else if (this.inventory[item].stock <= 0) {
      throw new Error("Sorry, out of stock.");
    } else if (cash <= 0) {
      throw new Error("Please insert a valid amount of cash.");
    }

    const price = this.inventory[item].price;

    // should we dispense change?
    if (cash === price) {
      // adjust stock
      this.inventory[item].stock--;
      return item;
    } else if (cash > price) {
      this.inventory[item].stock--;
      // dispense change
      this.giveChange(price, cash);
      return item;
    }
  }

  printInventory() {
    return this.inventory;
  }
}

module.exports = VendingMachine;

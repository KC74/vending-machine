const VendingMachine = require("../src/vending-machine");
/**
 * 
 *  <------------- REFILLING INVENTORY TESTS ------------->
 * 
 */
describe("Refilling the inventory", () => {
  beforeEach(() => {
    inventory = {
      coke: {
        price: 2.75,
        stock: 6
      }
    };
    start = new VendingMachine();
  });

  // NEGATIVE TESTS
  describe("When no item is passed", () => {
    it("should throw an error", () => {
      expect(() => start.refillInventory(undefined, 6, 3)).toThrow();
    });
  });

  describe("When no stock is passed", () => {
    it("should throw an error", () => {
      expect(() => start.refillInventory("item", 1)).toThrow();
    });
  });

  describe("When no inputs are passed", () => {
    it("should throw an error", () => {
      expect(() => start.refillInventory()).toThrow();
    });
  });

  describe("When a negative stock is passed", () => {
    it("should throw an error", () => {
      expect(() => start.refillInventory("item", 1, -1)).toThrow();
    });
  });

  describe("When a zero stock is passed", () => {
    it("should throw an error", () => {
      expect(() => start.refillInventory("item", 2, 0)).toThrow();
    });
  });

  describe("When no price is passed", () => {
    it("should throw an error", () => {
      expect(() => start.refillInventory("item", undefined, 1)).toThrow();
    });
  });

  describe("When a negative price is passed", () => {
    it("should throw an error", () => {
      expect(() => start.refillInventory("item", -1.75, 1)).toThrow();
    });
  });

  describe("When a zero price is passed", () => {
    it("should throw an error", () => {
      expect(() => start.refillInventory("item", 0, 1)).toThrow();
    });
  });

  // POSITIVE TESTS
  describe("When a valid item, stock, and price is passed", () => {
    it("should increment the given item in inventory by the stock", () => {
      start.refillInventory("coke", 2.75, 6);
      expect(start.printInventory()).toEqual(inventory);
    });
  });

  describe("When an existing item restock is passed", () => {
    it("should add the stock to the given inventory", () => {
      start.refillInventory("coke", 2.75, 6);
      start.refillInventory("coke", 2.75, 6);
      inventory.coke.stock = 12;

      expect(start.printInventory()).toEqual(inventory);
    });
  });
});

/**
 * 
 *  <------------- DISPENSING INVENTORY TESTS ------------->
 * 
 */
describe("Dispensing Inventory tests", () => {
  beforeEach(() => {
    inventory = {
      coke: {
        price: 2.75,
        stock: 6
      }
    };

    this.bank = {
      toonie: 10,
      loonie: 25,
      quarter: 10,
      dime: 20,
      nickel: 35,
      penny: 100
    };
    start = new VendingMachine();
  });

  describe("When an invalid item is chosen", () => {
    it("Should throw an error", () => {
      start.refillInventory("coke", 2.75, 1);
      expect(() => start.dispense("item", 5)).toThrow();
    });
  });

  describe("When a negative amount of cash is entered", () => {
    it("Should throw an error", () => {
      start.refillInventory("coke", 2.75, 1);
      expect(() => start.dispense("coke", -5)).toThrow();
    });
  });

  describe("When a zero amount of cash is entered", () => {
    it("Should throw an error", () => {
      start.refillInventory("coke", 2.75, 1);
      expect(() => start.dispense("coke", 0)).toThrow();
    });
  });

  describe("When there is no stock left for the item", () => {
    it("Should throw an error", () => {
      expect(() => start.dispense("coke", 3)).toThrow();
    });
  });

  // POSITIVE TESTS

  describe("When all inputs are valid and exact cash is given and there is stock", () => {
    it("Should return the item requested", () => {
      const item = {
        price: 2.75,
        stock: 4
      };
      start.refillInventory("coke", 2.75, 5);
      expect(start.dispense("coke", 2.75)).toEqual(item);
    });
  });
});

/**
 * 
 *  <------------- DISPENSING CHANGE TESTS ------------->
 * 
 */
describe("Tests for dispensing change", () => {
  describe("When cash and price are invalid inputs", () => {
    it("Should throw error", () => {
      start.refillInventory("coke", 2.75, 5);
      expect(() => start.dispense("none", -1)).toThrow();
    });
  });

  describe("When cash is negative input", () => {
    it("Should throw error", () => {
      start.refillInventory("coke", 2.75, 5);
      expect(() => start.dispense("coke", -1)).toThrow();
    });
  });

  describe("When 0 coin is inserted", () => {
    it("Should throw error", () => {
      start.refillInventory("coke", 2.75, 5);
      expect(() => start.dispense("coke", 0)).toThrow();
    });
  });

  describe("When item does not exist", () => {
    it("Should throw error", () => {
      expect(() => start.dispense("powerade", 5)).toThrow();
    });
  });

  describe("When all inputs are valid and extra cash is given and there is stock", () => {
    it("Should return the item requested", () => {
      result = {
        toonie: 2,
        quarter: 2,
        dime: 2,
        penny: 4
      };
      start.refillInventory("coke", 2.75, 5);
      start.resupplyChange("penny", 5);
      expect(start.giveChange(2.75, 7.49)).toEqual(result);
    });
  });
});

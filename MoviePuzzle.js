class CashRegister {
    constructor() {
        // The register starts with no $25, no $50 and no $100 bills.
        this.bills = {
            25: 0,
            50: 0,
            100: 0,
        };
    }

    isValid(bill) {
        // This register is implemented to only work with 25, 50 and 100 dollar bills.
        return [25, 50, 100].indexOf(bill) !== -1;
    }

    add(bill) {
        if (!this.isValid(bill)) {
            throw 'Invalid Bill Given.';
        }

        this.bills[bill]++;
    }

    remove(bill) {
        if (!this.contains(bill)) {
            throw 'Cannot remove non existent bill.';
        }

        this.bills[bill]--;
    }

    contains(bill) {
        return this.bills[bill] >= 1; // There is at least one of said bill in the register
    }
}

class MovieClerk {
    constructor() {
        this.cashRegister = new CashRegister();
    }

    giveChange(billsArray) {
        billsArray.forEach((bill) => this.cashRegister.remove(bill));
    }

    sellTicket(amountReceived) {
        this.cashRegister.add(amountReceived);

        switch (amountReceived) {
            case 25:
                // No change needed
                break;
            case 50:
                this.giveChange([25]);
                break;
            case 100:
                // Try to pay the change with large bills if possible, since the small bills are more flexible
                // In other words, if you can get rid of a 50 dollars bill while paying change, do so.
                let change = this.cashRegister.contains(50) ? [50, 25] : [25, 25, 25];
                this.giveChange(change);
                break;
            default:
                throw 'Invalid amount received';
        }
    }

    workShift(customersLine) {
        customersLine.forEach(customerPay => this.sellTicket(parseInt(customerPay)))
    }
}

// Rules:
// 1) Each customer will necessarily come with a single 25, 50 or 100 dollars bill.
// 2) The register has no bills to begin with.
// 3) Return 'YES' if all customers will be able to attend the movie, 'NO' otherwise.
const [nodeDir, app, ...customerLine] = process.argv;
let vasya = new MovieClerk(); // Vasya is the name of the guy in the puzzle
let hasLetEveryoneIn = true;

try {
    vasya.workShift(customerLine);
} catch (e) {
    hasLetEveryoneIn = false;
}

console.log(hasLetEveryoneIn ? 'YES' : 'NO');

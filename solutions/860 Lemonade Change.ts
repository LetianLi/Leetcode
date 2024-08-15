import expect from "./helpers/expect";
/* 8/15/2024
At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and 
order one at a time (in the order specified by bills). 
Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. 
You must provide the correct change to each customer so that the net transaction is that the customer pays $5.

Note that you do not have any change in hand at first.

Given an integer array bills where bills[i] is the bill the ith customer pays, 
return true if you can provide every customer with the correct change, or false otherwise.
*/

function lemonadeChange(bills: number[]): boolean {
    let num5s = 0;
    let num10s = 0; // we don't actually need to track num20s as it'll never be returned as change

    for (let i = 0; i < bills.length; i++) {
        switch (bills[i]) {
            case 5: // no change needed
                num5s++;
                break;
            case 10: // use a 5 as change
                num10s++;
                if (num5s > 0) {
                    num5s--;
                } else {
                    return false;
                }
                break;
            case 20: // use a 10 and a 5 as change, or 3 5s as change
                if (num10s > 0 && num5s > 0) {
                    num10s--;
                    num5s--;
                } else if (num5s > 2) {
                    num5s -= 3;
                } else {
                    return false;
                }
                break;
        }
    }

    return true;
};

expect(true, lemonadeChange, [5, 5, 5, 10, 20]);
expect(false, lemonadeChange, [5, 5, 10, 10, 20]);
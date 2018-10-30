//////// MAIN PROGRAMME- FULL UNIDAYSDISCOUNTCHALLENGE OBJECT ////////
var UnidaysDiscountChallenge = function(pricingRules) {
  //Properties
  this._ItemList = []; //Could be made public to user
  this._pricingRules = pricingRules;
  this._AcceptedItems = "ABCDEabcde";
    
  this.AddToBasket = function(newItems) {
    //Checks that the newItems is a string, that it is an accepted value and that each character is an item value (letters A-E, upper or lowercase).
    if (typeof newItems === "string" && newItems.length >= 1) {
      for (var item = 0; item < newItems.length; item++) {
        if (this._AcceptedItems.includes(newItems[item])){
          this._ItemList.push(newItems[item].toUpperCase());
        }
      }
    }
  };
    
  this.CalculateTotalPrice = function() {
  //Returns an object containing Total and DeliveryCharge properties
    
    //Call pricing rules to find the total
    var Total = this._pricingRules(this._ItemList);

    //Apply delivery charge rules
    var DeliveryCharge;

    if (Total >= 50) {
        DeliveryCharge = 0;
    }
    else if (Total > 0) {
        DeliveryCharge = 7;
    }
    else {console.log("Zero or negative total, please enter a valid amount and if the error persists call our hotline");}

    // For future implementation, OverallPrice can be returned instead of the challenge's recommended use (extracting Total, extracting DeliveryCharge, and then adding them).
    var OverallTotal = Total + DeliveryCharge;

    return {Total: Total, DeliveryCharge: DeliveryCharge};
    
  };

  
};

/////////////////////// Pricing Rules Function ///////////////////////
var pricingRules = function(ItemList=[]) {
// Function that takes in the list of items and applies the pricing rules from the brief, outputting the total price of the ItemList

    //First it counts the number of each item
    var Acounter = 0;
    var Bcounter = 0;
    var Ccounter = 0;
    var Dcounter = 0;
    var Ecounter = 0;
    var TotalCounter = 0;
    var FaultyCounter = 0;

    //Begins ItemList counter- number of each item, total items, faulty items (not included in total). Faulty items is for potential future use in bug testing or diagnostics
    for(var i = 0; i < ItemList.length;i++) {
      var item = ItemList[i].toUpperCase();
      if (item === "A") {
        Acounter++;
      } else if (item === "B") {
        Bcounter++;
      } else if (item === "C") {
        Ccounter++;
      } else if (item === "D") {
        Dcounter++;
      } else if (item === "E") {
        Ecounter++;
      } else { 
        console.log("Faulty entry"); 
        FaultyCounter++; // Faulty counter also prevents the program crashing
      }
    }
    
    //TotalCounter to potentially show total number of items added to basket, in future versions.
    TotalCounter = Acounter + Bcounter + Ccounter + Dcounter + Ecounter;
    
    // Applies the pricing rules to the items
    var priceA = 0;
    var priceB = 0;
    var priceC = 0;
    var priceD = 0;
    var priceE = 0;
    var total = 0;
    
    // Could allow input arguments and make the 2s and 3s below into variables to allow changes in rules for future versions. Or use function expressions as input arguments for each item's price.
    priceA = 8 * Acounter; 
    priceB = 20 * Math.floor(Bcounter/2) + 12 * (Bcounter % 2);
    priceC = 10 * Math.floor(Ccounter/3) + 4 * (Ccounter % 3);
    priceD = 7 * 1 * Math.floor(Dcounter/2) + 7 * (Dcounter % 2);
    priceE = 5 * 2 * Math.floor(Ecounter/3) + 5 * (Ecounter % 3);

    total = priceA + priceB + priceC + priceD + priceE;
    
    return total;
};

/*
/////////////////////////TESTING PROCEDURE/////////////////////////

var tests = ["A", "B", "C", "D", "E", "Bb", "Bbb", "Bbbb", "Ccc", "Cccc", "Dd", "Ddd", "Ee", "Eee", "EEEE", "DDDDDDDDDDDDDD", "BBBBCCC", "ABBCCCDDEE", "EDCBAEDCBC"];


var testFunction = function(item) {
  example = new UnidaysDiscountChallenge(pricingRules);
  example.AddToBasket(item);
  console.log(example._ItemList)
  result = example.CalculateTotalPrice();
  console.log(result)
};

tests.forEach(testFunction);

//////////////////////REFERENCE COMPARISON VALUES//////////////////////

Items           Total   DeliveryCharge
--------------  -----   --------------
None            £0.00	  £0.00
A	              £8.00	  £7.00
B	              £12.00  £7.00
C	              £4.00	  £7.00
D	              £7.00	  £7.00
E	              £5.00	  £7.00
BB	            £20.00	£7.00
BBB	            £32.00	£7.00
BBBB	          £40.00	£7.00
CCC	            £10.00	£7.00
CCCC	          £14.00	£7.00
DD	            £7.00	  £7.00
DDD	            £14.00	£7.00
EE	            £10.00	£7.00
EEE	            £10.00	£7.00
EEEE	          £15.00	£7.00
DDDDDDDDDDDDDD	£49.00	£7.00
BBBBCCC	        £50.00	£0.00
ABBCCCDDEE	    £55.00	£0.00
EDCBAEDCBC	    £55.00	£0.00 
*/
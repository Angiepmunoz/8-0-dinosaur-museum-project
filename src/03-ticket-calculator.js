/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */

//  function errors(ticketInfo,ticketTypes=null,entrantTypeArr=null,extraTypes=null){
//   let error = '';
//  }
function calculateTicketPrice(ticketData, ticketInfo) {
  let priceTotal = 0;
  const ticketTypes = Object.keys(ticketData);
  const extraTypes = Object.keys(ticketData.extras);

  //errors
  if (!ticketTypes.includes(ticketInfo.ticketType)) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  } else if (!["child", "adult", "senior"].includes(ticketInfo.entrantType)) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }

  for (let i = 0; i < ticketInfo.extras.length; i++) {
    if (!extraTypes.includes(ticketInfo.extras[i])) {
      return `Extra type '${ticketInfo.extras[i]}' cannot be found.`;
    }
  }

  /***************/
  const { ticketType, entrantType, extras } = ticketInfo;

  for (const type in ticketData) {
    if (type === ticketType) {
      priceTotal += ticketData[type].priceInCents[entrantType];
      if (extras.length) {
        for (const extraType of extras) {
          priceTotal += ticketData.extras[extraType].priceInCents[entrantType];
        }
      }
    }
  }
  return priceTotal;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each `  "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function capitalize(word) {
  if (!word.includes(" ")) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  } else {
    const wordArr = word.split(" ");
    return wordArr
      .map((word) => {
        return word.slice(0, 1).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
}

function formatIndividualTicket(ticketType, entrantType, extras, ticketPrice, lastIndex = false){
  if(extras.length){
    if(!lastIndex){
      return `${capitalize(entrantType)} ${capitalize(ticketType)} Admission: $${(ticketPrice / 100).toFixed(2)} (${extras.join(", ")})\n`;
    }else{
      return `${capitalize(entrantType)} ${capitalize(ticketType)} Admission: $${(ticketPrice / 100).toFixed(2)} (${extras.join(", ")})`;
    }
  }else{
    if(!lastIndex){
      return `${capitalize(entrantType)} ${capitalize(ticketType)} Admission: $${(ticketPrice / 100).toFixed(2)}\n`;
    }else{
      return `${capitalize(entrantType)} ${capitalize(ticketType)} Admission: $${(ticketPrice / 100).toFixed(2)}`;
    }
  }
}

function purchaseTickets(ticketData, purchases) {
  let receipt = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;

  let allTickPrice = 0;

  for (let i = 0; i < purchases.length; i++) {
    const ticketPrice = calculateTicketPrice(ticketData, purchases[i]);
    if (typeof ticketPrice !== "number") {
      return ticketPrice;
    } else {
      allTickPrice += ticketPrice / 100;
    }

    const { ticketType, entrantType, extras } = purchases[i];
    const extrasFormatted = extras.map((extra) => {
      return capitalize(extra) + ' Access';
    });

    if (i !== purchases.length - 1) {
      receipt += formatIndividualTicket(ticketType,entrantType,extrasFormatted, ticketPrice);
    } else {
      receipt += formatIndividualTicket(ticketType,entrantType,extrasFormatted, ticketPrice, true);
    }
  }
  return (receipt += `\n-------------------------------------------\nTOTAL: $${allTickPrice.toFixed(2)}`);
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};

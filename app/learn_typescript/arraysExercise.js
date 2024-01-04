// **********************************************
// ******************* PART 1 *******************
// **********************************************
// Create an empty array of numbers called "ages":
var ages = [];
// **********************************************
// ******************* PART 2 *******************
// **********************************************
// Create an array variable called gameBoard that starts as an empty array.
// It should be typed to hold a 2 dimensional array of strings
var gameBoard = [];
// **********************************************
// ******************* PART 4 *******************
// **********************************************
// Write a function called getTotal that accepts an array of Product types
// It should return the sum of all the products' prices
function gettotal(product) {
    return product.reduce(function (acc, product) { return acc + product.price; }, 0);
}
console.log(gettotal([
    { name: "sdfs", price: 11.5 },
    { name: "asdasd", price: 11.5 },
]));

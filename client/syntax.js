//  _                                  _____
// | |                                |  __ \
// | |     ___   ___  ___  ___ _   _  | |  \/ ___   ___  ___  ___ _   _
// | |    / _ \ / _ \/ __|/ _ | | | | | | __ / _ \ / _ \/ __|/ _ | | | |
// | |___| (_) | (_) \__ |  __| |_| | | |_\ | (_) | (_) \__ |  __| |_| |
// \_____/\___/ \___/|___/\___|\__, |  \____/\___/ \___/|___/\___|\__, |
//                              __/ |                              __/ |
//                             |___/                              |___/

// Remember- Javascript is "Loosey Goosey". There are many ways to accomplish the same thing.
// Because of this, snytax can vary greatly from developer to developer.
// Do you need to remember all of these? No! As long as you can find a resource to help you, you're good to go!

// 1. Function Declaration
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // Output: 5

// 2. Function Expression
const add2 = function (a, b) {
  return a + b;
};
console.log(add2(2, 3)); // Output: 5

// 3. Arrow Function
const add3 = (a, b) => a + b;
console.log(add3(2, 3)); // Output: 5

// 4. IIFE (Immediately Invoked Function Expression)
(function () {
  console.log(2 + 3); // Output: 5
})();

console.log(add(), add2(), add3()); // Output: 5 5 5 :P

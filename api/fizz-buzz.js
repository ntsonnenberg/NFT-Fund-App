
exports.fizzbuzz = function (value) {
    if (value % 3 === 0 && value % 5 === 0) {
        return "FizzBuzz";
    } 
    if (value % 3 === 0) {
        return "Fizz";
    } 
    if (value % 5 === 0) {
        return "Buzz"
    }
    if (typeof value !== 'number') throw Error("You need to provide a number")

    return value;
}
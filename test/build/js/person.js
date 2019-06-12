"use strict";
exports.__esModule = true;
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = "ya";
        this.age = 4;
        this.name = name;
        this.age = age;
    }
    Person.prototype.walking = function () {
        return this.name + " is walking";
    };
    return Person;
}());
exports.Person = Person;

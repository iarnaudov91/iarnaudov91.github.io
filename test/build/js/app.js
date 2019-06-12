"use strict";
exports.__esModule = true;
var person_1 = require("./person");
// let Person = require('./person');
var ivo = new person_1.Person("Waaaaaaaaaaaat", 26);
ivo.walking();
document.getElementById("test").innerText = ivo.walking();

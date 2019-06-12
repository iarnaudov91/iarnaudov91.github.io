import { Person } from "./person";
// let Person = require('./person');

var ivo = new Person("Waaaaaaaaaaaat", 26);
ivo.walking();

document.getElementById("test").innerText = ivo.walking();
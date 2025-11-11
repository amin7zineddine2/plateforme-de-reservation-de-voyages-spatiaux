// Déclarations de variables

// ❌ Ancien JS

var name = "amin";
var age = 99;
var valide = true;


// ✅ Moderne ES6+

const name = "amin";
let age = 25;
const valide = true;


console.log();




// ❌ Ancien JS

function multiply(a, b) {
    return a * b;
}

var multiply = function(a, b) {
    return a * b;
};


// ✅ Moderne ES6+

// Fonction fléchée
const multiply = (a, b) => a * b;

// Fonction avec paramètres par défaut
const greet = (name = "Guest") => `Hello ${name}`;

// Retour implicite pour les expressions simples
const square = x => x * x;




// ❌ Ancien JS

var firstName = "John";
var lastName = "Doe";
var fullName = firstName + " " + lastName;

var message = "Hello " + name + ", welcome to " + city + "!";


// ✅ Moderne ES6+

const firstName = "John";
const lastName = "Doe";
const fullName = `${firstName} ${lastName}`;

const message = `Hello ${firstName}, welcome to ${city}!`;
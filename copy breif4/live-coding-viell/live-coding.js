// les variables 
// les fonctions 
//  map  filter foreach 



            //0   1   2  3   4   5
const tab = [ 5 , 58 ,6 ,54 ,9 ,-7];

const newTab=[];

tab.forEach((elm , index , array) => {
    if ( elm > 0)
        newTab.push(elm);
});

console.log(tab);
// console.log(a);
console.log(newTab);

var nom = "amin"
var pernom = "aminiiiiii"
var phrase = "bonjour  " + nom + "ton adress est \"safi\" vpter \\  "


let phrase1 = `bonjour amin " ca svvsv" votre nom est ${nom}`


console.log(phrase);
console.log(phrase1);


console.clear();
let persone = { nom :"amin" ,
     prenom :"aminzzz" ,
      age :99,

      getAge : function(){
        console.log(this.age);
        // const p1 = this;
         test = ()=>{
            console.log("bonjour je suis la deuieme fct " + this.age);
         }
         test();
      }

 }

persone.getAge();



// var nom1 = persone.nom;
// var prenom1 = persone.prenom;
// var date = persone.age;
// console.log("bonjour " + nom1 + "  " + persone.prenom);



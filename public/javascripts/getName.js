
var tmpName = getCookie('name');
if(tmpName == null || tmpName == 'null' || tmpName === undefined){
	tmpName = generateName();
}
const name = tmpName;
rememberName();

function rememberName(){
	var cookieString = "name=" + name;
	document.cookie = cookieString;
}

function generateName(){
	var first = ['Snowmobil', 'Lapte', 'Pamatuf', 'Cactus', 'Inspector', 'Mesteacan', 'Nuc', 'Mar', 'Laptop', 'BMW', 'Golf', 'Rotund', 'Matematician', 'Stalker'];
	var second = ['Lucios', 'Inteligent', 'Lung', 'Mic', 'Stralucitor', 'Retard', 'Jupan', 'Interesant', 'Incepator', 'Surd', 'Schiop', 'Stirb', 'Cu Ochi Negru'];
	const randomFirst = first[Math.floor(Math.random() * first.length)];
	const randomSecond = second[Math.floor(Math.random() * second.length)];
	return randomFirst + " " + randomSecond;
}
function setGreeting(){
	var tmpName = getCookie('name');
	document.getElementById('greetingText').innerText = "Bine ai venit, " + tmpName;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

var tmpName = getCookie('name');
var tmpColor = getCookie('color');
var tmpNameAndColor = [];
tmpNameAndColor.push({
	name: tmpName,
	color: tmpColor
});
if(tmpName == null || tmpName == 'null' || tmpName === undefined || tmpName == 'undefined'){
	tmpNameAndColor = generateNameAndColor();
	rememberNameAndColor(tmpNameAndColor[0]);
}
const nameAndColor = tmpNameAndColor[0];
const name = nameAndColor.name;
const color = nameAndColor.color;

function generateNameAndColor(){
	var first = ['Snowmobil', 'Lapte', 'Pamatuf', 'Cactus', 'Inspector', 'Mesteacan', 'Nuc', 'Mar', 'Laptop', 'BMW', 'Golf', 'Rotund', 'Matematician', 'Stalker'];
	var second = ['Lucios', 'Inteligent', 'Lung', 'Mic', 'Stralucitor', 'Retard', 'Jupan', 'Interesant', 'Incepator', 'Surd', 'Schiop', 'Stirb', 'Cu Ochi Negru'];
	var color = ['red', 'blue', 'cyan', 'black', 'yellow', 'green', 'purple'];
	const randomFirst = first[Math.floor(Math.random() * first.length)];
	const randomSecond = second[Math.floor(Math.random() * second.length)];
	const randomColor = color[Math.floor(Math.random() * color.length)];
	var name = randomFirst + " " + randomSecond;
	var returnObj = [];
	returnObj.push({
		name,
		color: randomColor
	});
	return returnObj;
}
function rememberNameAndColor(nameAndColor){
	var cookieString = "name=" + nameAndColor.name+";path=/";
	document.cookie = cookieString;
	var cookieStringColor = "color=" + nameAndColor.color + ";path=/";
	document.cookie = cookieStringColor;
}
function setGreeting(){
	var tmpName = getCookie('name');
	var color = getCookie('color');
	document.getElementById('greetingText').innerText = tmpName;
	document.getElementById('greetingText').style.color = color;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
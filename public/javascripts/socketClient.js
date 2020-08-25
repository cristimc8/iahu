const socket = io('localhost:8080');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('send-input');
const messageSpace = document.getElementById('msg-space');

var tmpName = getCookie('name');
var tmpColor = getCookie('color');
var tmpNameAndColor = [];
tmpNameAndColor.push({
	name: tmpName,
	color: tmpColor
});
if(tmpName == null || tmpName == 'null' || tmpName === undefined){
	tmpNameAndColor = generateNameAndColor();
	rememberNameAndColor(tmpNameAndColor[0]);
}
const nameAndColor = tmpNameAndColor[0];
const name = nameAndColor.name;
const color = nameAndColor.color;

console.log(name);
socket.emit('new-user', name, color, roomName);

socket.on('chat-msg', data => {
	console.log(data);
	appendMsg(data.name, data.color, data.message);
	audioPlay('soundSwap');
})

socket.on('user-connected', data => {
	console.log(data);
	appendMsg(data.name, data.color, 'S-a conectat');
})

socket.on('user-disconnected', data => {
	appendMsg('Really Evolved AI','white', 'L-am pierdut pe ' + data + ' :(');
})

socket.on('buzz', data => {
	appendBuzz(data.name, data.color, 'BUZZED HARD');
	audioPlay('buzz');
})

messageForm.addEventListener('submit', e => {
	e.preventDefault();
	if(e.submitter.id == 'buzz'){
		appendBuzz(name, color, ' BUZZED HARD');
		socket.emit('buzz', color, roomName);
		audioPlay('buzz');
		return;
	}
	const message = messageInput.value;
	if(message == '') return;
	appendMsg(name, color, message);
	audioPlay('soundSwap');
	socket.emit('send-msg', color, message, roomName);
	messageInput.value = '';
})

function appendMsg(name, color, message){
	var element = $("<span style='color:"+color+"'>"+name+" > </span><span style='color:white;'>"+message+"</span><br>");
	$('#msg-space').append(element);
}
function appendBuzz(name, color, message){
	var element = $("<span class='is-size-5' style='color:"+color+"'>"+name+" > </span><span class='is-size-5' style='color:pink;'>"+message+"</span><br>");
	$('#msg-space').append(element);
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function generateNameAndColor(){
	var first = ['Snowmobil', 'Lapte', 'Pamatuf', 'Cactus', 'Inspector', 'Mesteacan', 'Nuc', 'Mar', 'Laptop', 'BMW', 'Golf', 'Rotund', 'Matematician', 'Stalker'];
	var second = ['Lucios', 'Inteligent', 'Lung', 'Mic', 'Stralucitor', 'Retard', 'Jupan', 'Interesant', 'Incepator', 'Surd', 'Schiop', 'Stirb', 'Cu Ochi Negru', 'Bipolar'];
	var color = ['#f7584d', '#b679e8', 'cyan', '#5788eb', '#ede574', '#6ceba3', '#c55de8'];
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
function audioPlay(sound){
	var soundState = getCookie('sonor');
	if(soundState == 'off'){
		return;
	}
	var audio = new Audio('/sounds/'+sound+'.mp3');
	try{
		audio.play();
	}
	catch(err){
	}
}

const socket = io('localhost:8080');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('send-input');
const messageSpace = document.getElementById('msg-space');

var tmpName = getCookie('name');
if(tmpName == null || tmpName == 'null' || tmpName === undefined){
	tmpName = generateName();
	rememberName(tmpName);
}
const name = tmpName;

socket.emit('new-user', name, roomName);

socket.on('chat-msg', data => {
	appendMsg(data.name + ' > ' + data.message);
	audioPlay('soundSwap');
})

socket.on('user-connected', data => {
	appendMsg(data);
})

socket.on('user-disconnected', data => {
	appendMsg('L-am pierdut pe ' + data + ' :(');
})

socket.on('buzz', name => {
	appendMsg(name + ' BUZZED HARD');
	audioPlay('buzz');
})

messageForm.addEventListener('submit', e => {
	e.preventDefault();
	if(e.submitter.id == 'buzz'){
		appendMsg(name + ' BUZZED HARD');
		socket.emit('buzz', roomName);
		audioPlay('buzz');
		return;
	}
	const message = messageInput.value;
	if(message == '') return;
	appendMsg(name + ' > ' + message);
	audioPlay('soundSwap');
	socket.emit('send-msg', message, roomName);
	messageInput.value = '';
})

function appendMsg(message){
	const msgElement = document.createElement('div');
	msgElement.innerText = message;
	messageSpace.append(msgElement);
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function generateName(){
	var first = ['Snowmobil', 'Lapte', 'Pamatuf', 'Cactus', 'Inspector', 'Mesteacan', 'Nuc', 'Mar', 'Laptop', 'BMW', 'Golf', 'Rotund', 'Matematician', 'Stalker'];
	var second = ['Lucios', 'Inteligent', 'Lung', 'Mic', 'Stralucitor', 'Retard', 'Jupan', 'Interesant', 'Incepator', 'Surd', 'Schiop', 'Stirb', 'Cu Ochi Negru'];
	const randomFirst = first[Math.floor(Math.random() * first.length)];
	const randomSecond = second[Math.floor(Math.random() * second.length)];
	return randomFirst + " " + randomSecond;
}
function rememberName(name){
	var cookieString = "name=" + name+";path=/";
	document.cookie = cookieString;
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

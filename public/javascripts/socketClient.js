const socket = io('localhost:8080');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('send-input');
const messageSpace = document.getElementById('msg-space');

const name = generateName();
socket.emit('new-user', name);


socket.on('chat-msg', data => {
	appendMsg(data.name + ' > ' + data.message);
})

socket.on('user-connected', data => {
	appendMsg(data);
})

socket.on('user-disconnected', data => {
	appendMsg('L-am pierdut pe ' + data + ' :(');
})

messageForm.addEventListener('submit', e => {
	e.preventDefault();
	const message = messageInput.value;
	appendMsg(name + ' > ' + message);
	socket.emit('send-msg', message);
	messageInput.value = '';
})

function appendMsg(message){
	const msgElement = document.createElement('div');
	msgElement.innerText = message;
	messageSpace.append(msgElement);
}

function generateName(){
	var first = ['Snowmobil', 'Lapte', 'Pamatuf', 'Cactus', 'Inspector', 'Mesteacan', 'Nuc', 'Mar', 'Laptop', 'BMW', 'Golf', 'Rotund'];
	var second = ['Lucios', 'Inteligent', 'Lung', 'Mic', 'Stralucitor', 'Retard', 'Jupan', 'Interesant', 'Incepator', 'Surd', 'Schiop', 'Stirb', 'Cu Ochi Negru'];
	const randomFirst = first[Math.floor(Math.random() * first.length)];
	const randomSecond = second[Math.floor(Math.random() * second.length)];
	return randomFirst + " " + randomSecond;
}
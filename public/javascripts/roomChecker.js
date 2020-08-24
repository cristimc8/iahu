const socket = io('localhost:8080');

socket.on('room-created', room => {
	var element = $("<a href = '/room/"+room+"' class='button is-primary is-rounded'>"+room+"</a>");
	$('#add-rooms-here').append(element);
})
const socket = io()

var message = document.getElementById('msg')
var username = document.getElementById('username')
var btn = document.getElementById('send')
var output = document.getElementById('output')



btn.addEventListener('click', function(){
    socket.emit('chat:message',{
        message: message.value,
        username : username.value
    });
});

socket.on('chat:message', function(data){
    output.innerHTML += `<p>
    <strong> ${data.username} </strong> ${data.message} 
    </p>`

});
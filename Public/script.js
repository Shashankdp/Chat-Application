
const socket = io(); 

let username ="";
const button = document.getElementById("join-btn");
button.addEventListener("click", (event) => {
     event.preventDefault();   // if i use this , there is no use of "required" keyword in html element. 
     username = document.getElementById("username-input").value;
     if(username.trim()!=""){
        document.querySelector(".form-container").style.display = 'none';
        document.querySelector(".chatroom-container").style.display = 'block';
        document.querySelector('.chatroom-header').innerHTML = `Chatroom - ${username}`;
     }
})

document.getElementById("send-btn").addEventListener('click',(event)=>{
   event.preventDefault(); // it prevents  all the default event happening
   
   const data = {
      username: username,
      message: document.getElementById('message-input').value,
   }

   // emitting with 'message' event
   socket.emit('message',data);    // this calls the function that was there in server.js => socket.on('message',(data)--------
   addMessage(data,true); // true means sent
})

// recieving the message

socket.on('message',(data) => {
   if(data.username!==username){
      addMessage(data,false);
   }
})

//  this function is just for appending message
function addMessage(data,check){
   // check -> true for sent
   // check -> false for recieved

   var msgDiv = document.createElement('div');
   msgDiv.innerText = `${data.username}: ${data.message}`;
   if(check){
      msgDiv.setAttribute('class','message sent');
   }
   else{
      msgDiv.setAttribute('class','message recieved');
   }

   document.getElementById('message-container').appendChild(msgDiv);
   document.getElementById('message-input').value="";
}
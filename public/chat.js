var socket = io();

//Query DOM
let message = document.getElementById("message");
let handle = document.getElementById("handle");
let output = document.getElementById("output");
let btn = document.getElementById("send");
let feedback = document.getElementById("feedback");
//Emit Event

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener("keypress", e => {
  socket.emit("typing", {
    handle: handle.value
  });
});

// Event Listener

socket.on("chat", data => {
  output.innerHTML +=
    "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
  feedback.innerHTML = "";
  message.value = "";
});

socket.on("typing", data => {
  feedback.innerHTML =
    "<p><em>" + data.handle + " is typing a message</em></p>";
});

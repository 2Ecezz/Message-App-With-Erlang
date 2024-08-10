document.addEventListener("DOMContentLoaded", function () {
    var ws = new WebSocket("ws://localhost:5500/websocket");
    var messageArea = document.getElementById("message-area");
    var messageInput = document.getElementById("message-input");
    var sendButton = document.getElementById("send-button");

    function displayMessage(messageText) {
        var message = document.createElement("div");
        message.textContent = messageText;
        messageArea.appendChild(message);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    ws.onopen = function () {
        console.log("WebSocket connection opened");
        displayMessage("Connected to chat server");
    };

    ws.onmessage = function(event) {
        console.log("Message received: ", event.data);
        displayMessage("Received: " + event.data);
    };

    ws.onerror = function(error) {
        console.log("WebSocket Error: ", error);
        displayMessage("WebSocket Error: " + error.message);
    };

    ws.onclose = function() {
        displayMessage("WebSocket connection closed");
    };

    sendButton.addEventListener("click", function () {
        var message = messageInput.value;
        console.log("Sending message: ", message);
        if (message) {
            ws.send(message);
            displayMessage("Sent: " + message);
            messageInput.value = "";
        }
    });

    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});

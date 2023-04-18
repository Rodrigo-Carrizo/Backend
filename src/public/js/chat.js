console.log("Socket")
const socket = io()
let user
let chatbox = document.querySelector("#chatbox")

Swal.fire({
    title: "identificate",
    imput: "text",
    text: "ingresar el nombre de usuario.",
    imputValidator: (value) => {
        return !value && "El nombre de usuario es obligatorio"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value
    socket.emit("authenticated", user)
})

chatbox.addEventListener("keyup", evt => {
    if (evt.key=="Enter") {
        if (chatbox.value.trim().length>0) {
            socket.emit("message", {
                user, message: chatbox.value
            })
            chatbox.value=""
        }
    }
})

socket.on("messageLogs", data => {
    let log = document.getElementById(" messageLogs")
    let mensajes = ""
    data.forEach(({user, message}) => {
        mensajes += <li>${user} dice: ${message}</li>
        
    })
    log. innerHTML = mensajes
})

socket.on("newUserConnected", user => {
    if (!user) {
        return
    }
  
    Swal.fire ({
        toast: true,
    })
})
const socketChat = (io) => {
    let messages = []

    io.on("connection", socket => {
        console.log("Nuevo cliente conectado")
        socket.on("message", data => {
            messages.push(data)
            io.emit("messageLogs", messages)
        })  
        socket.on("authenticated", data => {
            socket.broadcast.emit("newUserConnected", data)
        })
    })
}

module.exports = {
    socketChat
}
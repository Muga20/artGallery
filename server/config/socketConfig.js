const { Server } = require("socket.io");

function configureSocket(server, clientURL) {
  const io = new Server(server, {
    cors: {
      origin: clientURL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`WebSocket client connected with ID ${socket.id}`);

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });

  
  io.on("connection", (socket) => {
    // Handle the "profileImageUpdated" message when received
    socket.on("profileImageUpdated", (data) => {
      console.log("Received profileImageUpdated message with data:", data);

      // Broadcast the message to all connected WebSocket clients
      socket.broadcast.emit("profileImageUpdated", data);

      // Emit the message back to the sender
      socket.emit("profileImageUpdated", data);
    });
  });
// online ofline 
const onlineUsers  = []
io.on('connection', (socket) => {
    console.log("websocket connection initiated by a user", socket.id);

  socket.on('online', (userId) => {
// to check if there is an existing user which should not be the case so if there is a user 
// we need to negate it to be false so as not to perform the second implementation 
    !onlineUsers.some(user => user.userId === userId) &&
    onlineUsers.push({
      userId:userId,
      socketId: socket.id
    })
    console.log(onlineUsers, "online user")
    // Broadcast online status to all connected clients
    io.emit('getOnlineUsers', onlineUsers);
  });



});




  // io.on("connection", (socket) => {
  //   socket.on("checkUser", (data) => {
  //     const userId = data.userId; // The user ID received from the client

  //     // Check if the user is registered (you need to implement this logic)
  //     const isRegistered = checkUserRegistration(userId);

  //     // If registered, you can send the token (replace with your actual token retrieval logic)
  //     if (isRegistered) {
  //       const userToken = getUserToken(userId);
  //       socket.emit("userStatus", { registered: true, token: userToken });
  //     } else {
  //       // If not registered, send a message indicating that
  //       socket.emit("userStatus", { registered: false });
  //     }
  //   });
  // });

  return io;
}

module.exports = configureSocket;

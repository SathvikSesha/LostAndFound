// // src/Services/ChatService.jsx
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

// const SOCKET_URL = "http://localhost:9999/ws";

// let stompClient = null;
// let onMessageReceivedCallback = null;
// let onOnlineUsersUpdateCallback = null;

// const connect = (username, onMessageReceived, onOnlineUsersUpdate) => {
//   const socket = new SockJS(SOCKET_URL);
//   stompClient = Stomp.over(socket);

//   onMessageReceivedCallback = onMessageReceived;
//   onOnlineUsersUpdateCallback = onOnlineUsersUpdate;

//   stompClient.connect(
//     {},
//     () => {
//       console.log("✅ Connected to WebSocket at", SOCKET_URL);

//       // Receive messages
//       stompClient.subscribe("/topic/messages", (message) => {
//         try {
//           onMessageReceivedCallback(JSON.parse(message.body));
//         } catch (err) {
//           console.error("Failed to parse message body", err);
//         }
//       });

//       // Receive online users
//       stompClient.subscribe("/topic/users", (message) => {
//         try {
//           onOnlineUsersUpdateCallback(JSON.parse(message.body));
//         } catch (err) {
//           console.error("Failed to parse users body", err);
//         }
//       });

//       // Register user
//       stompClient.send(
//         "/app/register",
//         {},
//         JSON.stringify({ sender: username, type: "JOIN" })
//       );
//     },
//     (err) => {
//       console.error("WebSocket connection error:", err);
//     }
//   );
// };

// const sendMessage = (sender, content) => {
//   if (stompClient && stompClient.connected) {
//     stompClient.send(
//       "/app/sendMessage",
//       {},
//       JSON.stringify({ sender, content, type: "CHAT" })
//     );
//   } else {
//     console.warn("Cannot send message — stompClient not connected.");
//   }
// };

// const disconnect = (username) => {
//   if (stompClient) {
//     try {
//       // notify others before disconnecting
//       if (stompClient.connected) {
//         stompClient.send(
//           "/app/sendMessage",
//           {},
//           JSON.stringify({ sender: username, type: "LEAVE" })
//         );
//       }
//       stompClient.disconnect(() => {
//         console.log("❌ Disconnected from WebSocket");
//       });
//     } catch (err) {
//       console.error("Error during disconnect:", err);
//     } finally {
//       stompClient = null;
//     }
//   }
// };

// // default export (so ChatRoom can do: import ChatService from '.../ChatService')
// const ChatService = {
//   connect,
//   sendMessage,
//   disconnect,
// };

// // named exports kept for compatibility
// export { connect, sendMessage, disconnect };
// export default ChatService;

// src/Services/ChatService.js
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const SOCKET_URL = "http://localhost:9999/ws";

let stompClient = null;

const connect = (username, onMessageReceived, onOnlineUsersUpdate) => {
  const socket = new SockJS(SOCKET_URL);
  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    () => {
      console.log(`✅ WebSocket connected as ${username}`);

      stompClient.subscribe("/topic/messages", (message) => {
        onMessageReceived(JSON.parse(message.body));
      });

      stompClient.subscribe("/topic/users", (message) => {
        onOnlineUsersUpdate(JSON.parse(message.body));
      });

      // Send JOIN event
      stompClient.send(
        "/app/register",
        {},
        JSON.stringify({ sender: username, type: "JOIN" })
      );
    },
    (err) => {
      console.error("WebSocket connection error:", err);
    }
  );
};

const sendMessage = (sender, content) => {
  if (stompClient && stompClient.connected) {
    stompClient.send(
      "/app/sendMessage",
      {},
      JSON.stringify({ sender, content, type: "CHAT" })
    );
  }
};

const disconnect = (username) => {
  if (stompClient) {
    if (stompClient.connected) {
      stompClient.send(
        "/app/sendMessage",
        {},
        JSON.stringify({ sender: username, type: "LEAVE" })
      );
    }
    stompClient.disconnect(() => {
      console.log(`❌ WebSocket disconnected for ${username}`);
    });
    stompClient = null;
  }
};

const ChatService = { connect, sendMessage, disconnect };
export default ChatService;

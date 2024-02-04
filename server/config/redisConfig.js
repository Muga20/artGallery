const redis = require("redis");

// Create and export the Redis client
const client = redis.createClient({
  host: "localhost", // Replace with your Redis server's hostname or IP address
  port: 6379, // Redis default port
  // Add other configuration options if necessary
});

// Handle Redis connection errors
client.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = client;

We have 2 types of servers
http and https

HTTP (simple, local dev)
HTTPS (secure, production) - It has a SSL Certificate
An SSL (Secure Sockets Layer) certificate is a digital certificate that authenticates a website's identity and enables an encrypted connection between a web server and a browser

👉 For now → ALWAYS use http


When importing a file, always add the extension

Always restart your server

route.js is a file that handles a specific responsibility which happens to be routing, it is not a utility function. It is a dedicated routing module


## ES Modules Notes

- Used "type": "module" in package.json
- Used import/export instead of require/module.exports
- Must include file extensions (.js)


## Req.on & Req.end

req is the incoming HTTP request object
.on take in 2 parameters ('data', callback function) which is basically nodes way of saying, yo listen for whenever a piece of data arrives from the client and run this function

chunk: htttp data doesn't always arrive all at once, each piece of the data is regarded as a chunk
body: This is like an accumulator which collects all the chunks together, thats why we usually see this


req.on("data", chunk => {
  body += chunk.toString(); // append the chunk to the full body
});

chunk is being added to the body
chunk.toString(): This converts binary data to readable text


req.on('end', callback) is an event that fires after all dat chunks have been recieved, it indicates that only now i s it safe to process the full request body, because until the, you might have only part of the data

req.on("end", () => {
  console.log("Full data received:", body);
  res.end("Data processed");
});

Node.js uses streams, not static data objects. The Request object is an instance of a readable stream
This event-driven handling is what makes Node efficient for handling large payloads or many simultaneous requests without blocking the server.

Quick ones: 

-- In the command curl -X POST http://localhost:8000/user -d "name=Favour", the -d (or --data) flag is used to send data to the server in an HTTP POST request

-- If your server expects JSON, you usually need to manually set the header:
curl -X POST http://localhost:8000/user -H "Content-Type: application/json" -d '{"name":"Favour"}'

-- try..catch is not limited to async code, it works anytime you want to catch synchronous errors like parsinf a json

-- findIndex is an array method in JavaScript. It goes through each element of the array and returns the index of the first element that matches a condition you provide.

The index (0-based) of the first element that satisfies the condition.
-1 if no element matches.

const index = array.findIndex(element => condition);
-- const users = [
  { id: 101, name: "Favour" },
  { id: 102, name: "Evans" }
];

// Find index of user with id 102
const index = users.findIndex(user => user.id === 102);

console.log(index); // 1
console.log(users[index]); // { id: 102, name: "Evans" }


URL Modules is a module that helps you parse and work with URLs in a sturctured way, it gives you properties and methods to handle everything about urls easily

First you import

import { URL } from "url";

Next you create a URL object

const urlObj = new URL (req.url, `http://${req.headers.host});

req.url → the path and query part from the incoming request (like /users?id=123).
req.headers.host → the host (like localhost:8000) so Node knows the full absolute URL.
new URL() → creates a URL object with properties like .pathname and .searchParams.

To access query parameters we use searchParams which is an instance of URLSearchParams, .get retrieves the value of the query parameter
const id = reqUrl.searchParams.get("id");
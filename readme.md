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



1. Create an in memory user storage, eg an array
2. Create your url object
3. For Get, we access the main query parameter which we need, i.e id
if the id is true, run this : inside the users array, we should find the id, using the find method after which we respond

4. for the Post, follow synthax and then for a new user give it a unique id and push that into the already existing data

5. For put we need to find the index of the id so we can update it , for Delete we also use findindex and then, the deleted user should be gotten through the help of the splice method  which is used to remove, replace, or add elements in an array at a specific position.

array.splice(start, deleteCount, item1, item2, ...);
start → the index at which to start changing the array.
deleteCount → number of elements to remove starting from start.
item1, item2, ... → optional items to add at the start index.
Returns an array of the deleted elements.

eg, const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(2, 2); // start at index 2, remove 2 elements
console.log(arr);     // [1, 2, 5]
console.log(removed); // [3, 4]

nb, splice is a mutating method

const deletedUser = users.splice(userIndex, 1)[0];
userIndex → the index of the user we want to remove (found using findIndex).
1 → we only want to remove one element.
splice returns an array of removed items, so [0] gets the actual user object.
The users array is now updated without the deleted user.

This way, splice lets you directly remove the user from the array and keep a copy of it to return in the response.

---CORS: Cross-Origin Resource Sharing (CORS) is a browser-based security mechanism that allows a web server to explicitly permit resources (like APIs) to be accessed from a different domain than its own. It extends the Same-Origin Policy (SOP), using HTTP headers to manage safe cross-domain requests, preventing malicious sites from accessing private data

Controllers handle logic, utils handles helper functions, and routes simply handles the routes and method

// export const handleRoutes = (req, res) => {
//     console.log(req.method, req.url);
//     if (req.url === "/" && req.method === "GET") {
//     res.end("Home page");
//   } 
//   else if (req.url === "/about" && req.method === "GET") {
//     res.end("About page");
//   } else if (req.url === "/user" && req.method === "POST") {
//      if (req.headers["content-type"] !== "application/json") {
//     res.writeHead(400, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Content-Type must be application/json" }));
//     return;
//   }

//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       try {
//         const parsedData = JSON.parse(body);
//         console.log(`Recieved JSON: ${parsedData}`);

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: "User data received", data: parsedData }));

//       } catch (err) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Invalid JSON" }));
//       }
//     });
//   }  else {
//     res.end("404 Page not found");
//   }
// }


import { URL } from "url";

let users = []; // in-memory user storage

export const handleRoutes = (req, res) => {
  console.log(req.method, req.url);

  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  // GET /users or GET /users?id=123
  if (requestUrl.pathname === "/users" && req.method === "GET") {
    const id = requestUrl.searchParams.get("id");
    if (id) {
      const user = users.find(u => u.id === parseInt(id));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user || { error: "User not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    }
  }
  // POST /users
  else if (requestUrl.pathname === "/users" && req.method === "POST") {
    if (req.headers["content-type"] !== "application/json") {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Content-Type must be application/json" }));
      return;
    }

    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);
        const newUser = { id: Date.now(), ...parsedData };
        users.push(newUser);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User created", data: newUser }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }
   // Handle PUT requests for updating users
  else if (requestUrl.pathname === "/users" && req.method === "PUT") {
  const id = requestUrl.searchParams.get("id");
  if (!id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User id is required in query params" }));
    return;
  }

  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    try {
      const parsedData = JSON.parse(body);
      const userIndex = users.findIndex(u => u.id === parseInt(id));
      if (userIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "User not found" }));
        return;
      }
      users[userIndex] = { ...users[userIndex], ...parsedData };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User updated", data: users[userIndex] }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
}
    else if (requestUrl.pathname === "/users" && req.method === "DELETE") {
  const id = requestUrl.searchParams.get("id");
  if (!id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User id is required in query params" }));
    return;
  }

  const userIndex = users.findIndex(u => u.id === parseInt(id));
  if (userIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User deleted", data: deletedUser }));
}
  // fallback for unknown routes
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page not found");
  }
};
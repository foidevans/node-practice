export const handleRoutes = (req, res) => {
    console.log(req.method, req.url);
    if (req.url === "/" && req.method === "GET") {
    res.end("Home page");
  } 
  else if (req.url === "/about" && req.method === "GET") {
    res.end("About page");
  } else if (req.url === "/user" && req.method === "POST") {
     if (req.headers["content-type"] !== "application/json") {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Content-Type must be application/json" }));
    return;
  }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);
        console.log(`Recieved JSON: ${parsedData}`);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User data received", data: parsedData }));

      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }  else {
    res.end("404 Page not found");
  }
}
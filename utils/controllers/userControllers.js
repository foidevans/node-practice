// controllers/userController.js

import { sendJson, parseJsonBody } from "../utils/helper.js";

export let users = [
  { id: 101, name: "Favour" },
  { id: 102, name: "Evans" }
];

// GET all or single
export const getUsers = (req, res, id) => {
  if (id) {
    const user = users.find(u => u.id === parseInt(id));
    return sendJson(res, 200, user || { error: "User not found" });
  }
  return sendJson(res, 200, users);
};

// POST
export const createUser = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    const parsedData = parseJsonBody(body);
    if (!parsedData) return sendJson(res, 400, { error: "Invalid JSON" });

    const newUser = { id: Date.now(), ...parsedData };
    users.push(newUser);
    sendJson(res, 201, { message: "User created", data: newUser });
  });
};

// PUT
export const updateUser = (req, res, id) => {
  if (!id) return sendJson(res, 400, { error: "User id is required" });

  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    const parsedData = parseJsonBody(body);
    if (!parsedData) return sendJson(res, 400, { error: "Invalid JSON" });

    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return sendJson(res, 404, { error: "User not found" });

    users[index] = { ...users[index], ...parsedData };
    sendJson(res, 200, { message: "User updated", data: users[index] });
  });
};

// DELETE
export const deleteUser = (res, id) => {
  if (!id) return sendJson(res, 400, { error: "User id is required" });

  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) return sendJson(res, 404, { error: "User not found" });

  const deletedUser = users.splice(index, 1)[0];
  sendJson(res, 200, { message: "User deleted", data: deletedUser });
};
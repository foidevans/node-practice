import { URL } from "url";
import { getQueryParam, sendJson } from "./utils/helper.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userControllers.js";

export const handleRoutes = (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const id = getQueryParam(requestUrl, "id");

  if (requestUrl.pathname === "/users" && req.method === "GET") {
    return getUsers(req, res, id);
  } else if (requestUrl.pathname === "/users" && req.method === "POST") {
    return createUser(req, res);
  } else if (requestUrl.pathname === "/users" && req.method === "PUT") {
    return updateUser(req, res, id);
  } else if (requestUrl.pathname === "/users" && req.method === "DELETE") {
    return deleteUser(res, id);
  } else {
    return sendJson(res, 404, { error: "Route not found" });
  }
};

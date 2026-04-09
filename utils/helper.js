// Send JSON response
export const sendJson = (res, statusCode, data) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS for testing
  res.setHeader("Access-Control-Allow-Methods", "GET");
 
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// Parse JSON body safely
export const parseJsonBody = (body) => {
  try {
    return JSON.parse(body);
  } catch (err) {
    return null;
  }
};

// Get query param
export const getQueryParam = (urlObj, key) => {
  return urlObj.searchParams.get(key);
};
import http from 'http';
import { handleRoutes } from './routes.js';

const PORT =  9000;

const server = http.createServer((req, res) => {
    handleRoutes(req, res);
}); 

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

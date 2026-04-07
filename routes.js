export const handleRoutes = (req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {'content-type' : 'text/plain'})
        res.end('Hello, World!')
    } else if (req.url === '/about') {
        res.writeHead(200, {'content-type' : 'text/plain'})
        res.end('This is the about page.')
    } else {
        res.writeHead(404, {'content-type' : 'text/plain'})
        res.end('Page not found.')
    }
}
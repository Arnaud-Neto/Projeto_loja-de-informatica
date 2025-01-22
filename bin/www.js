const app = require('../src/app');
const http = require('http');
const args = process.argv.slice(2);

const port = args[0] | 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
   throw error; 
}

function onListening() {
    console.log(`Server is running on port ${port}`);
}
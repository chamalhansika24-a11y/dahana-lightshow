const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

// Admin සහ Client ෆයිල්ස් පෙන්නන්න public ෆෝල්ඩර් එකක් හදමු
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    // Admin ගෙන් බීට් එකක් ආවම මේක වැඩ කරනවා
    socket.on('admin_beat_detected', (data) => {
        console.log('Beat detected! Sending flash to clients...');
        
        // කනෙක්ට් වෙලා ඉන්න ඔක්කොම ෆෝන් වලට 'flash_screen' මැසේජ් එක යවනවා
        io.emit('flash_screen', { color: 'white' }); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
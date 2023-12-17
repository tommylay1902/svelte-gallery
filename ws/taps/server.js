import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
import cors from 'cors';
// https://svelte-gallery.onrender.com
const io = new Server(server, {
	cors: {
		origin: 'https://svelte-gallery.onrender.com',
		methods: ['GET', 'POST']
	}
});

app.use(cors());

const activeRooms = new Map();

io.on('connection', (socket) => {
	// Listen for "create room" event
	socket.on('createRoom', (eventData) => {
		// Check if the room already exists
		if (activeRooms.has(eventData.roomName)) {
			// Notify the client that the room already exists
			socket.emit('room exists', eventData.roomName);
		} else {
			// Create a room and join it
			socket.join(eventData.roomName);
			activeRooms.set(eventData.roomName, {
				creator: socket.id,
				members: [socket.id]
			});

			console.log(`User ${socket.id} created and joined room: ${eventData.roomName}`);

			// Notify the client that the room was created
			socket.emit('room created', eventData.roomName, socket.id);
		}
	});

	// Listen for "join room" event
	socket.on('joinRoom', (eventData) => {
		console.log('joinRoom event called');
		console.log('data', eventData);
		// Join an existing room
		const room = activeRooms.get(eventData.roomName);
		if (!room) {
			// Notify the client that the room already exists
			socket.emit('room doesnt exist', eventData.roomName);
		} else if (room.members.length == 1) {
			socket.join(eventData.roomName);
			room.members.push(socket.id);
			activeRooms.set(eventData.roomName, room);
			console.log(`User ${socket.id} joined room: ${eventData.roomName}`);
			socket.to(eventData.roomName).emit('roomJoined', socket.id);
		} else {
			socket.emit('room is full');
		}
	});

	socket.on('keydown', (roomName) => {
		socket.to(roomName).emit('keydownEvent', roomName);
	});

	socket.on('keyup', (roomName) => {
		socket.to(roomName).emit('keyupEvent', roomName);
	});

	socket.on('disconnect', () => {
		// Remove the user from the room
		activeRooms.forEach((room, roomName) => {
			const index = room.members.indexOf(socket.id);
			if (index !== -1) {
				room.members.splice(index, 1);
				activeRooms.set(roomName, room);

				// Check if the room is empty, and if so, delete it
				if (room.members.length === 0) {
					activeRooms.delete(roomName);
					console.log(`Room ${roomName} deleted as there are no members.`);
				}

				// Notify other clients in the room about the disconnection
				socket.to(roomName).emit('userDisconnected', socket.id);
			}
		});
	});
});

server.listen(3000, () => {
	console.log('server running at http://localhost:3000');
});

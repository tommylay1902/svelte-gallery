import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
import cors from 'cors';
const io = new Server(server, {
	cors: {
		origin: 'https://svelte-gallery.onrender.com', // Replace with the actual origin of your SvelteKit app
		methods: ['GET', 'POST']
	}
});

app.use(cors());

const activeRooms = new Map();

io.on('connection', (socket) => {
	// Listen for "create room" event
	// Listen for "create room" event
	socket.on('createRoom', (eventData) => {
		console.log(eventData);
		// Check if the room already exists
		if (activeRooms.has(eventData.roomName)) {
			// Notify the client that the room already exists
			socket.emit('room exists', eventData.roomName);
		} else {
			// Create a room and join it
			socket.join(eventData.roomName);
			activeRooms.set(eventData.roomName, {
				creator: eventData.playerId,
				members: [eventData.playerId]
			});

			console.log(`User ${eventData.playerId} created and joined room: ${eventData.roomName}`);

			// Notify the client that the room was created
			socket.emit('room created', eventData.roomName, eventData.playerId);
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
			console.log('issue');
			socket.emit('room doesnt exist', eventData.roomName);
		} else if (room.members.length == 1) {
			socket.join(eventData.roomName);
			room.members.push(eventData.playerId);
			activeRooms.set(eventData.roomName, room);
			console.log(`User ${eventData.playerId} joined room: ${eventData.roomName}`);
			socket.to(eventData.roomName).emit('roomJoined', eventData.playerId);
		} else {
			socket.emit('room is full');
		}
	});

	socket.on('keydown', (roomName) => {
		socket.to(roomName).emit('keydownEvent', 'hello');
	});

	socket.on('keyup', (roomName) => {
		socket.to(roomName).emit('keyupEvent', 'hello');
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');

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

import io from 'socket.io-client';
import { ServerUrl } from './ServerUrl';

const socket = io.connect(ServerUrl);

const setupSocketConnection = () => {
  socket.on('connect', () => {
    // console.log('Connected to the server');
  });

  socket.on('disconnect', () => {
    // console.log('Disconnected from the server');
  });

  return socket;
};

export default setupSocketConnection;

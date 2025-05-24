import { io } from 'socket.io-client';
import { SOCKET_URL } from './constants';
import { useMemo } from 'react';

export const useSocket = () => {
  const socket = useMemo(() => {
    return io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true
    });
  }, []);

  return socket;
}
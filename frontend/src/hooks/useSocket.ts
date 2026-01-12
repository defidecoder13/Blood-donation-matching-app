import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

interface SocketState {
  isConnected: boolean;
  socket: Socket | null;
}

export const useSocket = () => {
  const [socketState, setSocketState] = useState<SocketState>({
    isConnected: false,
    socket: null
  });

  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    const socket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001', {
      transports: ['websocket', 'polling'],
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socketRef.current = socket;

    // Connection events
    socket.on('connect', () => {
      console.log('Connected to server');
      setSocketState({ isConnected: true, socket });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setSocketState({ isConnected: false, socket: null });
    });

    // Join appropriate room when authenticated
    if (isAuthenticated && user) {
      if (user.role === 'donor') {
        socket.emit('join-donor', user.id);
        console.log(`Joined donor room: ${user.id}`);
      } else {
        socket.emit('join-user', user.id);
        console.log(`Joined user room: ${user.id}`);
      }
    }

    // Listen for real-time events
    socket.on('new-match', (data) => {
      console.log('New match found:', data);
      // Handle new match notification
    });

    socket.on('request-update', (data) => {
      console.log('Request update:', data);
      // Handle request status updates
    });

    socket.on('donor-response', (data) => {
      console.log('Donor response:', data);
      // Handle donor responses to requests
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, user]);

  // Re-join room when user changes
  useEffect(() => {
    if (socketState.socket && isAuthenticated && user) {
      if (user.role === 'donor') {
        socketState.socket.emit('join-donor', user.id);
      } else {
        socketState.socket.emit('join-user', user.id);
      }
    }
  }, [socketState.socket, isAuthenticated, user]);

  const emit = (event: string, data?: any) => {
    if (socketState.socket) {
      socketState.socket.emit(event, data);
    }
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    if (socketState.socket) {
      socketState.socket.on(event, callback);
    }
  };

  const off = (event: string, callback?: (...args: any[]) => void) => {
    if (socketState.socket) {
      if (callback) {
        socketState.socket.off(event, callback);
      } else {
        socketState.socket.off(event);
      }
    }
  };

  return {
    ...socketState,
    emit,
    on,
    off
  };
};
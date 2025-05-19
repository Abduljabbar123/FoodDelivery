import {Socket, io} from 'socket.io-client';
import {useAppSelector} from '../Helper/Hooks/reduxHooks';
import {ENV} from './env';
import React, {useState} from 'react';

export const useSocket: (url?: string) => Socket | null = (
  url = ENV.resourceURL,
) => {
  const token = useAppSelector(state => state.auth.token);
  const [socket, setSocket] = useState<Socket | null>(null);

  React.useEffect(() => {
    if (token) {
      const newSocket = io(url, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, url]);

  return socket;
};

// let socket: Socket;

// export const useSocket: (url?: string) => Socket = (url = ENV.resourceURL) => {
//   const token = useAppSelector(state => state.auth.token);
//   const [_, update] = useState('');

//   React.useEffect(() => {
//     if (!socket) {
//       socket = io(url, {
//         extraHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     } else {
//       socket.io.opts.extraHeaders = {
//         Authorization: `Bearer ${token}`,
//       };
//     }
//     update(',');
//   }, [token, url]);

//   return socket;
// };

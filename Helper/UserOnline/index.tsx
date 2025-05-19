import React from 'react';

export const UserOnline = React.createContext<{onlineUsers: string[]}>({
  onlineUsers: [],
});

import { envConfig } from '@src/core/config/envConfig';
import React from 'react';

const RoomJoinModalContent = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1>{envConfig.appName}</h1>
    </div>
  );
};

export default RoomJoinModalContent;

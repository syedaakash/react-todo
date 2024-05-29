//@flow
import React, { useContext } from 'react';
import { JwtToken } from './typedefs';

export const DecodedJwtTokenContext = React.createContext({});
export const useDecodedJwtToken = (): JwtToken => {
  // const ctx: JwtToken = useContext(DecodedJwtTokenContext);
  const ctx: JwtToken = useContext(DecodedJwtTokenContext);
  return {
    user_id: ctx ? ctx.user_id : null,
  };
};

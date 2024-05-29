//@flow
export type JwtToken = {
  token_type?: string,
  exp?: number,
  iat?: number,
  jti?: number,
  user_id: number,
};

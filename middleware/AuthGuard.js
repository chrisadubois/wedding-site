import {getToken} from 'next-auth/jwt';

const AuthGuard = (handler) => async (req, res) => {
  const token = await getToken({req, secret: process.env.TOKEN_SECRET});
  if (token) {
    // Signed in
    return handler(req, res);
  } else {
    // Not Signed in
    return res.status(401).json(new Error('Unauthenticated'));
  }
};

export default AuthGuard;

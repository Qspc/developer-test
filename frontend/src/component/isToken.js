// export default function isTokenExpired({ token }) {
//   if (!token) return false;
//   const decodedToken: DecodedToken = jwt.decode(token) as DecodedToken;
//   const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
//   const currentTime = Date.now();

//   if (expirationTime < currentTime) return false;
//   else {
//     return true;
//   }
// }

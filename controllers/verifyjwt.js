import jwt from 'jsonwebtoken';



// export const verifyJwt = (req,res) => {
//     const secretKey = "harsh123";
//     console.log("secretKey : " , secretKey);
//     const token = req.headers['x-access-token']
  
//     const obj = JSON.parse(token);
//   const extractedToken = obj.token;

//   try {
    
//     const verifiedToken = jwt.verify(extractedToken, secretKey);
//     console.log("verifiedToken jwt.jsx : " , verifiedToken);
    
// } catch (error) {
//     // console.error("Token verification failed 3333333333 :", error);
//     console.log("Token verification failed 3333333333 ");
//     //return res.redirect("http://localhost:5173/login");
//     //return res.redirect("http://localhost:5173/login");
//     return res.status(200).json("failed");
// }
// }

export const verifyJwt = (req,res, next) => {
  const secretKey = "sdfhj@j13j24";
  console.log("secretKey : " , secretKey);
  const token = req.headers['x-access-token']

  const obj = JSON.parse(token);
const extractedToken = obj.token;

console.log(extractedToken)

try {
  console.log("verifiedToken jwt.jsx in process ");
  const verifiedToken = jwt.verify(extractedToken, secretKey);
  console.log("verifiedToken jwt.jsx : " , verifiedToken);
  next();
} catch (error) {
  
  //return res.status(403).json("failed");
  console.log("failed")
  //res.redirect('http://localhost:5173/login');
  //res.status(302).redirect('http://localhost:5173/notfound');
  return res.status(200).json("failed");
}
}
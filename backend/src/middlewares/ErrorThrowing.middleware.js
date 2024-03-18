const errorThrowingMiddleware = async (err, req, res, next) => {
    const status = err.status || 500;
    const massage = err.massage || "BACKEND ERROR";
    const extraMassage = err.extraMassage || "Error from backend";
    return res.status(status).json({ massage:massage, extradetails:extraMassage });
  };
  
  export { errorThrowingMiddleware };
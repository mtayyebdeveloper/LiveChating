const validateMiddleware = (authvalidators) => async (req, res, next) => {
    try {
      const parsBody = await authvalidators.parseAsync(req.body);
      req.body = parsBody;
      return next();
    } catch (err) {
      res.status(401).json({ massage: err });
      return next(err);
    }
  };
  
  export default validateMiddleware;
  
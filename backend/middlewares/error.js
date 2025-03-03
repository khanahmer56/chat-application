const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = Object.keys(err.keyPattern).join(",") + "Duplicate field";
  }
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Invalid id";
  }
  res.status(err.statusCode).json({
    success: false,
    message: process.env.NODE_ENV === "DEVELOPEMENT" ? err : err.message,
  });
};

const TryCatch = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
export { errorMiddleware, TryCatch };

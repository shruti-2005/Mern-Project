const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    console.log("Validation error:", err);

    if (err.errors && err.errors.length > 0) {
      return next({
        status: 400,
        message: err.errors[0].message,
        extraDetails: "Validation Error",
      });
    }

    if (err.issues && err.issues.length > 0) {
      return next({
        status: 400,
        message: err.issues[0].message,
        extraDetails: "Validation Error",
      });
    }

    return next({
      status: 500,
      message: err.message || "Validation failed or internal error",
      extraDetails: "Unexpected Error",
    });
  }
};

module.exports = validate;

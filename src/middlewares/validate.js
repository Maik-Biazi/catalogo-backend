export const validate =
  (schema) =>
  (req, _res, next) => {
    const data = {
      body: req.body,
      params: req.params,
      query: req.query
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return next({ status: 400, message: 'Validação falhou', details: parsed.error.flatten() });
    }
    // substitui pelos dados parseados (coerção)
    req.body = parsed.data.body;
    req.params = parsed.data.params;
    req.query = parsed.data.query;
    next();
  };

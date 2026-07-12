import proxy from "express-http-proxy";

export const proxyheader = (serviceURL) => {
  return proxy(serviceURL, {
    proxyReqOptDecorator: (proxyReqOpts, req) => {
      if (req.user) {
        proxyReqOpts.headers["x-user-id"] = req.user._id;
      }
      return proxyReqOpts;
    },
  });
};
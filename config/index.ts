export const IronOptions:any = {
    cookieName: process.env.SESSION_COOKIE_NAME,
    password: process.env.SESSION_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        // cookie的过期时间
      maxAge:24*60*60*1000,
      secure: process.env.NODE_ENV === "production",
    },
}
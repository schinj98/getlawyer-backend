/**
 * CMS Auth Middleware
 * Checks if cms_auth cookie exists
 */
export const cmsAuth = (req, res, next) => {
    const cookieHeader = req.headers.cookie || "";
  
    // Cookie not present
    if (!cookieHeader.includes("cms_auth=true")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: CMS login required",
      });
    }
  
    // Cookie present → allow
    next();
  };
  
export default function cmsAuth(req, res, next) {
    const cookieHeader = req.headers.cookie || "";
  
    if (!cookieHeader.includes("cms_auth=true")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: CMS login required",
      });
    }
  
    next();
  }
  
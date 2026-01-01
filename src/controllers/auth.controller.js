export const login = async (req, res) => {
    const { email, password } = req.body;
  
    // env se writers read karo
    let writers = [];
    try {
      writers = JSON.parse(process.env.CMS_WRITERS || "[]");
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Server config error",
      });
    }
  
    // match check
    const isValid = writers.some(
      (writer) =>
        writer.email === email && writer.password === password
    );
  
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  
    // cookie set (Express way)
    res.cookie("cms_auth", "true", {
        httpOnly: true,
        secure: true,              // HTTPS mandatory
        sameSite: "none",          // 🔥 cross-subdomain
        domain: ".getlawyer.me",   // 🔥 VERY IMPORTANT
        path: "/",
        maxAge: 6 * 60 * 60 * 1000 // 6 hours
      });
      
  
    return res.json({ success: true });
  };
  
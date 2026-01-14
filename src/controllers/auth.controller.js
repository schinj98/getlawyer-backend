export const login = async (req, res) => {
  const { email, password } = req.body;

  let users = [];
  try {
    users = JSON.parse(process.env.CMS_USERS || "[]");
  } catch (e) {
    console.error("ENV parse error:", e);
    return res.status(500).json({
      success: false,
      message: "Server config error",
    });
  }

  // 🔥 FIND USER (NOT some())
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // ✅ AUTH COOKIE
  res.cookie("cms_auth", "true", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".getlawyer.me",
    path: "/",
    maxAge: 6 * 60 * 60 * 1000,
  });

  // ✅ ROLE COOKIE
  res.cookie("cms_role", user.role, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".getlawyer.me",
    path: "/",
    maxAge: 6 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    role: user.role,
  });
};

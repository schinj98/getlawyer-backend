async function getAccessToken() {
    const {
      ZOHO_BEGIN_REFRESH_TOKEN,
      ZOHO_BEGIN_CLIENT_ID,
      ZOHO_BEGIN_CLIENT_SECRET,
    } = process.env;
  
    const res = await fetch(
      `https://accounts.zoho.in/oauth/v2/token?refresh_token=${ZOHO_BEGIN_REFRESH_TOKEN}&client_id=${ZOHO_BEGIN_CLIENT_ID}&client_secret=${ZOHO_BEGIN_CLIENT_SECRET}&grant_type=refresh_token`,
      { method: "POST" }
    );
  
    const data = await res.json();
    console.log("Zoho token response:", data);

    if (data.access_token) return data.access_token;

    throw new Error(
    "Failed to refresh Zoho access token: " + JSON.stringify(data)
    );

  }
  
  export const submitLead = async (req, res) => {
    try {
      const body = req.body;
  
      if (!body?.name || !body?.email || !body?.phone) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }
  
      if (!Array.isArray(body.services) || body.services.length === 0) {
        return res.status(400).json({
          message: "Please select at least one service",
        });
      }
  
      const nameParts = body.name.trim().split(" ");
      const lastName = nameParts.pop();
      const firstName = nameParts.join(" ");
  
      const accessToken = await getAccessToken();
  
      const response = await fetch(
        "https://www.zohoapis.in/bigin/v2/Contacts",
        {
          method: "POST",
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                Last_Name: lastName,
                First_Name: firstName,
                Email: body.email,
                Phone: body.phone,
                Lead_Source: body.source || "getlawyer-Website",
                Description: `Services interested in: ${body.services.join(", ")}`,
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok && data?.data?.[0]?.code === "SUCCESS") {
        return res.json({
          message: "Lead submitted successfully!",
          zoho_data: data,
        });
      }
  
      return res.status(400).json({
        message: "Failed to submit lead",
        details: data,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  
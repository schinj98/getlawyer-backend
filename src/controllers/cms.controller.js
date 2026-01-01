export const publish = async (req, res) => {
    try {
      const body = req.body;
  
      const {
        GITHUB_TOKEN,
        GITHUB_OWNER,
        GITHUB_REPO,
        GITHUB_BRANCH,
      } = process.env;
  
      const filePath = "app/knowledge/blogData.js";
  
      if (body.status === "DRAFT") {
        return res.json({
          message: "Draft saved (not published)",
        });
      }
  
      // 1️⃣ Get existing file from GitHub
      const getRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
  
      if (!getRes.ok) {
        throw new Error("Failed to fetch blogData.js");
      }
  
      const fileData = await getRes.json();
      const decoded = Buffer.from(fileData.content, "base64").toString("utf-8");
  
      // 2️⃣ Extract existing posts
      const match = decoded.match(/export const blogPosts = (\[.*\]);/s);
      if (!match) throw new Error("Invalid blogData.js format");
  
      const posts = eval(match[1]); // server-only
  
      // 3️⃣ Create new post
      const newPost = {
        slug: body.slug,
        title: body.title,
        starRating: String(body.rating || 0),
        starTotalRating: "5.0",
        likes: String(body.likes || 0),
        dateAdded: new Date().toDateString(),
        tags: body.tags || [],
        author: body.author || "Content Writer",
        category: body.category || "How-to",
        description: body.description || "",
        faqs: body.faqs || [],
        content: body.content,
      };
  
      posts.unshift(newPost);
  
      const updatedFile = `export const blogPosts = ${JSON.stringify(
        posts,
        null,
        2
      )};`;
  
      // 4️⃣ Commit updated file back to GitHub
      const putRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
          body: JSON.stringify({
            message: `Publish blog: ${newPost.title}`,
            content: Buffer.from(updatedFile).toString("base64"),
            sha: fileData.sha,
            branch: GITHUB_BRANCH,
          }),
        }
      );
  
      if (!putRes.ok) {
        throw new Error("GitHub commit failed");
      }
  
      return res.json({
        message: "Blog published & deployed 🚀",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Publish failed",
        error: err.message,
      });
    }
  };
  
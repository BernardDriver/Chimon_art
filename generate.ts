export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "your-model-version-id", // 请替换为实际版本ID
      input: { prompt },
    }),
  });

  const data = await response.json();
  const image = data?.output?.[0] || "";
  res.status(200).json({ image });
}

export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  const response = await fetch(`${url}/incr/zeroverse-visitors`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store"
  });

  const count = await response.text();
  res.status(200).json({ count: Number(count) });
}
export default function handler(req, res) {
  console.log("aoba");
  res.status(200).json({ name: "John Doe" });
}

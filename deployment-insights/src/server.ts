import app from "./app";

const PORT = process.env.PORT || 3000;

// Start Express server
app.listen(PORT, () => {
  console.log(`Deployment Insights API listening on ${PORT}`);
});
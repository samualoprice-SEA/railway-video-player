export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Video Demo</h1>
      <video id="player" controls preload="metadata" width="640">
        {/* Put a Chromium-friendly format first */}
        <source src="/videos/sample.webm" type="video/webm" />
        <source src="/videos/sample.mp4"  type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
}

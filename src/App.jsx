export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Video Demo</h1>
      <video id="player" controls width="640" preload="metadata">
        <source src="/videos/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
}

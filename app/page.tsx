export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Creovixa Language Services LMS</h1>

      <p>
        Welcome to the Creovixa Learning Management System
      </p>

      <div>
        <button>English</button>
        <button>French</button>
        <button>Spanish</button>
      </div>
    </main>
  );
}

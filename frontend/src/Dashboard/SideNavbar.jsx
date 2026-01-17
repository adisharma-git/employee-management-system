function SideNavbar({ setActiveComponent }) {
  return (
    <div
      style={{
        width: "220px",
        background: "#1e1e2f",
        color: "white",
        padding: "20px",
      }}
    >
      <h3>Dashboard</h3>

      <button onClick={() => setActiveComponent("home")}>
        Home
      </button>
      <br /><br />

      <button onClick={() => setActiveComponent("profile")}>
        Profile
      </button>
      <br /><br />

      <button onClick={() => setActiveComponent("settings")}>
        Settings
      </button>
    </div>
  );
}

export default SideNavbar;

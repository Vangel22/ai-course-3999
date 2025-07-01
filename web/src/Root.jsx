import { Link, Outlet, useNavigate } from "react-router";

function Root() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        {isLoggedIn && (
          <>
            <Link to="/" style={{ marginRight: "1rem" }}>
              Home
            </Link>
            <Link to="/soil-chat" style={{ marginRight: "1rem" }}>
              Chat
            </Link>
          </>
        )}

        {!isLoggedIn && (
          <Link to="/login" style={{ marginRight: "1rem" }}>
            Login
          </Link>
        )}

        {isLoggedIn && (
          <button onClick={handleLogout} style={{ marginRight: "1rem" }}>
            Logout
          </button>
        )}
      </nav>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;

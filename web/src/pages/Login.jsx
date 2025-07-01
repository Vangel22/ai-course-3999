export const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault(); // sprecuva defaulten refresh na formata

    // Povikaj ja rutata za logiranje /api/v1/login
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Your email"
          value={""}
          onChange={(e) => {}}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Your password"
          value={""}
          onChange={(e) => {}}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

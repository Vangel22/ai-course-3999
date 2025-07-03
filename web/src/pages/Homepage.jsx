import { jwtDecode } from "jwt-decode";
import style from "../styles/Homepage.module.css";

function getEmailFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  console.log(decoded);
  // Ako decoded.email ne postoi ke se vrati null
  return decoded?.email;
}

export const Homepage = () => {
  const email = getEmailFromToken();

  // TODO: Make this in English
  // TODO: Make this with custom design

  return (
    <div className={style.container}>
      <h3 style={{ fontWeight: "bold", color: "lightblue" }}>
        Logged guest: {email}
      </h3>
      <h1>Welcome to the first app for soils in Macedonia!</h1>

      <h2>Become part of the farmers in our country</h2>
      <p>
        This application allows us to view information about agricultural
        activities, and all the necessary information can be found here.
      </p>
      <p>
        For your home, enrich the menu with soil, agricultural crops,
        fertilizers, and mechanization.
      </p>
    </div>
  );
};

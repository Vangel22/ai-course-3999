import { jwtDecode } from "jwt-decode";

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

  // Boi:
  // Pozadina: #151618
  // Kontejner: #252628

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <h3 style={{ fontWeight: "bold", color: "lightblue" }}>
        Најавен гостин: {email}
      </h3>
      <h1>Добредојдовте на првата апликацијата за почни во Македонија! </h1>
      <h2>Станетте дел од земјделците во нашата држава</h2>
      <p>
        Оваа апликација ни овозможува да прегледуваме информации за
        земјоделските работи, и сите потребни информации може да ги најдите тука
      </p>
      <p>
        За домашна да го збогатите менито со почва, земјдолески култури,
        ѓубрива, механизација
      </p>
    </div>
  );
};

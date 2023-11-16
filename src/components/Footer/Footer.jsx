import "./footer.css";
export function Footer() {
  return (
    <>
      <footer
        className="d-flex justify-content-between align-items-center footer"
        style={{
          backgroundColor: "#0d0d0d",
          padding: "10px 20px",
          marginTop: "auto",
        }}
      >
        <div>
          <img src="img/icon.png" style={{ width: "75px", height: "75px" }} />
        </div>
        <div className="text-center text-white ms-5">
          © 2023 Derechos reservados: Tromü
        </div>
        <div>
        <img src="img/antu.png" className="me-2" style={{ width: "60px", height: "60px" }} />
          <img src="img/ubb.png" style={{ width: "50px", height: "75px" }} />
        </div>
      </footer>
    </>
  );
}

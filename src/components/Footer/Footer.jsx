import "./footer.css"
export function Footer() {
    return (
      <>
        <footer
          className="d-flex justify-content-between align-items-center footer"
          style={{ backgroundColor: "#0d0d0d", padding: "10px 20px", marginTop: "auto"}}>
          <div>
            <img
              src="/src/assets/img/icon.png"
              style={{ width: "75px", height: "75px" }}
            />
          </div>
          <div className="text-center text-white">
            © 2023 Derechos reservados: Tromü
          </div>
          <div>
            <img
              src="/src/assets/img/ubb.png"
              style={{ width: "50px", height: "75px" }}
            />
          </div>
        </footer>
      </>
    );
  }
  
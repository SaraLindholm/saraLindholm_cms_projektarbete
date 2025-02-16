
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Sara Lindholm
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/aboutMe">
                Om mig
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/projects">
                Projekt
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
}

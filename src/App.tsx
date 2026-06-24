import React, { useState, useEffect } from "react";
import "./App.css";
import logoBojic from "./assets/logo_bojic_transparent.png";
import gallery1 from "./assets/1.png";
import gallery2 from "./assets/2.png";
import gallery3 from "./assets/3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 3D metalni zupčanik (gear) – pure SVG, koristi se u hero sceni
function Gear({ className }: { className: string }) {
  // Jedinstveni ID-jevi po instanci (sprečava koliziju SVG defs kada ima više zupčanika)
  const uid = React.useId().replace(/:/g, "");
  const metalId = `gearMetal-${uid}`;
  const holeId = `gearHole-${uid}`;

  return (
    <svg
      className={className}
      viewBox="-50 -50 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6b7178" />
          <stop offset="45%" stopColor="#2c2f34" />
          <stop offset="55%" stopColor="#1b1d20" />
          <stop offset="100%" stopColor="#41454c" />
        </linearGradient>
        <radialGradient id={holeId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0c0c0e" />
          <stop offset="100%" stopColor="#2a2d32" />
        </radialGradient>
      </defs>
      <g fill={`url(#${metalId})`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="-7"
            y="-48"
            width="14"
            height="18"
            rx="3"
            transform={`rotate(${i * 30})`}
          />
        ))}
        <circle cx="0" cy="0" r="36" />
      </g>
      <circle
        cx="0"
        cy="0"
        r="14"
        fill={`url(#${holeId})`}
        stroke="#e74c3c"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Dekorativni zupčanici koji se ponavljaju u svakoj sekciji (tema sajta)
function SectionGears() {
  return (
    <div className="section-gears" aria-hidden="true">
      <Gear className="deco-gear deco-gear-a" />
      <Gear className="deco-gear deco-gear-b" />
    </div>
  );
}

// Loading screen - automobil koji ubrzava pre prikaza sajta
function Preloader({ leaving }: { leaving: boolean }) {
  return (
    <div className={`preloader ${leaving ? "preloader-hide" : ""}`}>
      {/* Pozadinski zupčanici radi usklađenosti sa temom */}
      <Gear className="preloader-gear pg-1" />
      <Gear className="preloader-gear pg-2" />

      <div className="preloader-stage">
        {/* Brzinske linije iza auta */}
        <div className="speed-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Automobil (SVG) */}
        <svg
          className="loader-car"
          viewBox="0 0 240 90"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6b5d" />
              <stop offset="55%" stopColor="#e74c3c" />
              <stop offset="100%" stopColor="#b02a1c" />
            </linearGradient>
          </defs>

          {/* Karoserija */}
          <path
            d="M10 62
               Q14 60 24 59
               L52 42
               Q60 36 74 35
               L150 33
               Q176 33 196 48
               L214 54
               Q230 56 230 64
               L230 68
               Q230 72 224 72
               L18 72
               Q10 72 10 66 Z"
            fill="url(#carBody)"
            stroke="#7c241b"
            strokeWidth="1.5"
          />
          {/* Prozori */}
          <path
            d="M70 40 L142 38 Q160 38 176 49 L120 50 Z"
            fill="#1a1c20"
            opacity="0.85"
          />
          <path
            d="M64 41 L60 50 L112 50 L116 39 Z"
            fill="#1a1c20"
            opacity="0.85"
          />

          {/* Točkovi */}
          <g className="loader-wheel">
            <circle
              cx="64"
              cy="72"
              r="15"
              fill="#15171a"
              stroke="#3a3d42"
              strokeWidth="3"
            />
            <circle cx="64" cy="72" r="5" fill="#e74c3c" />
          </g>
          <g className="loader-wheel">
            <circle
              cx="186"
              cy="72"
              r="15"
              fill="#15171a"
              stroke="#3a3d42"
              strokeWidth="3"
            />
            <circle cx="186" cy="72" r="5" fill="#e74c3c" />
          </g>
        </svg>

        {/* Put / asfalt */}
        <div className="loader-road"></div>
      </div>

      <div className="preloader-brand">
        AUTO SERVIS BOJIĆ
        <span className="preloader-sub">Pokrećemo motor...</span>
      </div>
    </div>
  );
}

// Recenzije klijenata (zameni pravim tekstovima sa Google recenzija po potrebi)
const reviews = [
  {
    name: "Marko Petrović",
    date: "pre 2 nedelje",
    color: "#e74c3c",
    text: "Brz i profesionalan servis. Ljubazno osoblje, sve objasne detaljno i cena je korektna. Moj auto nikad nije radio bolje. Preporuka!",
  },
  {
    name: "Jovana Ilić",
    date: "pre mesec dana",
    color: "#2436c7",
    text: "Konačno servis kome mogu da verujem. Otkrili su problem koji druga dva servisa nisu mogla. Pošteni i vredni momci.",
  },
  {
    name: "Nikola Stojanović",
    date: "pre 3 nedelje",
    color: "#27ae60",
    text: "Odlična dijagnostika i brza popravka. Doveo sam kola ujutru, popodne već gotovo. Sve pohvale za ekipu.",
  },
  {
    name: "Ana Marković",
    date: "pre 2 meseca",
    color: "#f39c12",
    text: "Vrhunska usluga i odnos prema klijentima. Promena ulja i mali servis urađeni besprekorno. Vraćam se sigurno.",
  },
  {
    name: "Stefan Đorđević",
    date: "pre nedelju dana",
    color: "#8e44ad",
    text: "Najbolji auto servis u okolini. Korektne cene, kvalitetni delovi i ekipa koja zna svoj posao. Topla preporuka svima.",
  },
  {
    name: "Milica Pavlović",
    date: "pre 5 dana",
    color: "#16a085",
    text: "Ljubazni, brzi i stručni. Servis klime urađen perfektno, a i posavetovali su me oko održavanja. Hvala vam!",
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  // Loading screen: prikazuje se 2s, pa fade-out pre prikaza home page-a
  useEffect(() => {
    const leaveTimer = setTimeout(() => setIsLeaving(true), 2000);
    const removeTimer = setTimeout(() => setIsLoading(false), 2600);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Scroll reveal: elementi sa klasom "reveal" se pojavljuju (fade-up) kada uđu u vidno polje
  useEffect(() => {
    if (isLoading) return;

    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    // Ako browser ne podržava IntersectionObserver, samo prikaži sve
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading]);

  // Funkcija za zatvaranje menija kada se klikne na link (bitno za mobilni)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return <Preloader leaving={isLeaving} />;
  }

  return (
    <div className="app-wrapper">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="container nav-content">
          <a href="#home" className="logo" onClick={closeMenu}>
            <img
              src={logoBojic}
              alt="Auto Servis Bojić logo"
              className="logo-img"
            />
          </a>

          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <a href="#home" onClick={closeMenu}>
                Početna
              </a>
            </li>
            <li>
              <a href="#services" onClick={closeMenu}>
                Usluge
              </a>
            </li>
            <li>
              <a href="#brendovi" onClick={closeMenu}>
                Brendovi
              </a>
            </li>
            <li>
              <a href="#about" onClick={closeMenu}>
                O nama
              </a>
            </li>
            <li>
              <a href="#galerija" onClick={closeMenu}>
                Galerija
              </a>
            </li>
            <li>
              <a href="#utisci" onClick={closeMenu}>
                Utisci
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeMenu}>
                Kontakt
              </a>
            </li>

            {/* Dodatni sadržaj u mobilnom meniju */}
            <li className="nav-extra">
              <a href="#contact" className="nav-cta" onClick={closeMenu}>
                Zakažite termin
              </a>
            </li>

            <li className="nav-extra nav-contact-info">
              <a href="tel:+381645871016">📞 +381 64 587 1016</a>
              <span>📍 Braće Nešković 75, Deč</span>
              <span>🕒 Pon - Sub: 08 - 17h</span>
            </li>

            <li className="nav-extra nav-social">
              <a
                href="https://www.facebook.com/profile.php?id=100063530171843&locale=sr_RS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/bojic.ac92/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>

            {/* Dekorativni zupčanik u pozadini menija (tema) */}
            <Gear className="nav-menu-gear" />
          </ul>

          <div className="hamburger" onClick={toggleMenu}>
            <span
              className={`bar ${isMenuOpen ? "bar-top active" : "bar-top"}`}
            ></span>
            <span
              className={`bar ${isMenuOpen ? "bar-mid active" : "bar-mid"}`}
            ></span>
            <span
              className={`bar ${isMenuOpen ? "bar-bot active" : "bar-bot"}`}
            ></span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero">
        {/* 3D animirana scena - zupčanici i tech grid */}
        <div className="hero-3d-scene" aria-hidden="true">
          <div className="grid-floor"></div>
          <Gear className="hero-gear gear-1" />
          <Gear className="hero-gear gear-2" />
          <Gear className="hero-gear gear-3" />
        </div>

        <div className="container">
          <div className="hero-inner">
            <span className="hero-badge">⚙️ Auto Servis i Mehanika</span>
            <h1>Profesionalni Servis Za Vaše Vozilo</h1>
            <p>
              Od redovnog održavanja do najsloženijih popravki. Vaš partner na
              putu već decenijama.
            </p>
            <div className="hero-btns">
              <a href="#contact" className="btn-primary">
                Zakažite termin
              </a>
              <a href="#services" className="btn-secondary">
                Naše usluge
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services section-themed">
        <SectionGears />
        <div className="container reveal">
          <h2 className="section-title">Naše Usluge</h2>
          <div className="grid">
            <div className="card">
              <div className="icon">🔧</div>
              <h3>Auto Mehanika</h3>
              <p>
                Mali i veliki servis, popravka motora, kočionog sistema i
                oslanjanja.
              </p>
            </div>
            <div className="card">
              <div className="icon">💻</div>
              <h3>Dijagnostika</h3>
              <p>
                Precizno očitavanje kvarova na najsavremenijim uređajima za sve
                tipove vozila.
              </p>
            </div>
            <div className="card">
              <div className="icon">❄️</div>
              <h3>Auto Klima</h3>
              <p>
                Punjenje klime, servisiranje kompresora i dezinfekcija kanala.
              </p>
            </div>
            <div className="card">
              <div className="icon">⚡</div>
              <h3>Auto Elektrika</h3>
              <p>
                Popravka alternatora, alnasera i kompletne električne
                instalacije.
              </p>
            </div>
            <div className="card">
              <div className="icon">🚜</div>
              <h3>Šlep Služba</h3>
              <p>
                Dostupni smo 24/7 za transport vašeg vozila u slučaju kvara ili
                nezgode.
              </p>
            </div>
            <div className="card">
              <div className="icon">🛡️</div>
              <h3>Tehnički Pregled</h3>
              <p>
                Priprema vozila i kompletna provera pre zvaničnog tehničkog
                pregleda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (Opciono) */}
      <section id="about" className="about section-themed section-dark">
        <SectionGears />
        <div className="container reveal">
          <div
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
          >
            <h2 className="section-title">O Nama</h2>
            <p style={{ marginTop: "20px", fontSize: "1.1rem" }}>
              Auto Servis Bojić je porodični servis sa dugom tradicijom. Naš
              cilj je da svakom klijentu pružimo brzu, kvalitetnu i poštenu
              uslugu. Koristimo isključivo proverene rezervne delove i
              najsavremenije alate.
            </p>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section id="brendovi" className="partners-section section-themed">
        <SectionGears />
        <div className="container reveal">
          <h2 className="section-title">Brendovi koje servisiramo</h2>
          <div className="partners-grid">
            <div className="partner-logo">
              <img
                src="https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/bmw.png"
                alt="BMW"
              />
            </div>
            <div className="partner-logo">
              <img
                src="https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/mercedes-benz.png"
                alt="Mercedes"
              />
            </div>
            <div className="partner-logo">
              <img
                src="https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/porsche.png"
                alt="Porsche"
              />
            </div>
            <div className="partner-logo">
              <img
                src="https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/volkswagen.png"
                alt="VW"
              />
            </div>
            <div className="partner-logo">
              <img
                src="https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/audi.png"
                alt="Audi"
              />
            </div>
            <div className="partner-logo">
              <img
                src="https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/toyota.png"
                alt="Toyota"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="galerija" className="gallery-section section-themed">
        <SectionGears />
        <div className="container reveal">
          <h2 className="section-title">Galerija Radova</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            <SwiperSlide>
              <img
                src={gallery1}
                alt="Galerija radova - slika 1"
                onClick={() => setSelectedImg(gallery1)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={gallery2}
                alt="Galerija radova - slika 2"
                onClick={() => setSelectedImg(gallery2)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={gallery3}
                alt="Galerija radova - slika 3"
                onClick={() => setSelectedImg(gallery3)}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section
        id="kontakt"
        className="contact-section section-themed section-dark"
      >
        <SectionGears />
        <div className="container reveal">
          <h2 className="section-title">Gde se nalazimo</h2>
          <div className="contact-wrapper">
            {/* Google Mapa */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5658.989790747772!2d20.124428073398274!3d44.831853882669094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a4581aa0c3eaf%3A0x28383e75bddb43c!2sAuto%20Service%20Boji%C4%87!5e0!3m2!1sen!2srs!4v1771287619256!5m2!1sen!2srs"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* UTISCI / RECENZIJE SECTION */}
      <section id="utisci" className="reviews-section section-themed">
        <SectionGears />
        <div className="container reveal">
          <h2 className="section-title">Utisci naših klijenata</h2>

          <div className="reviews-google-badge">
            <span className="rg-stars">★★★★★</span>
            <span className="rg-text">
              5.0 ocena na <strong>Google</strong> recenzijama
            </span>
          </div>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <div
                    className="review-avatar"
                    style={{ background: review.color }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div className="review-meta">
                    <span className="review-name">{review.name}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <svg
                    className="review-google-icon"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>

          <a
            href="https://www.google.com/maps/place/Auto+Service+Boji%C4%87"
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-cta"
          >
            Pogledaj sve recenzije na Google-u
          </a>
        </div>
      </section>

      {selectedImg && (
        <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <span className="close-lightbox">&times;</span>
          <img src={selectedImg} className="lightbox-img" alt="Uvećan prikaz" />
        </div>
      )}

      {/* FOOTER / CONTACT SECTION */}
      <footer id="contact" className="footer">
        <div className="container reveal">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Gde se nalazimo?</h4>
              <p>📍 Braće Nešković 75, 22441 Deč</p>
              <p>📞 +381 64 587 1016</p>
              <p>✉️ info@autoservisbojic.rs</p>
            </div>

            <div className="footer-col">
              <h4>Radno Vreme</h4>
              <p>Pon - Pet: 08:00 - 17:00</p>
              <p>Subota: 08:00 - 14:00</p>
              <p>Nedelja: Ne radimo</p>
            </div>

            <div className="footer-col">
              <h4>Pratite nas</h4>
              <div className="social-links">
                <a
                  href="https://www.facebook.com/profile.php?id=100063530171843&locale=sr_RS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/bojic.ac92/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Auto Servis Bojić. Sva prava
              zadržana.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

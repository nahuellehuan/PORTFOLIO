// Navegación suave y efectos del header
document.addEventListener("DOMContentLoaded", () => {
  // Navegación suave
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Efecto de scroll en el header
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
      header.style.background = "rgba(15, 15, 35, 0.98)"
    } else {
      header.style.background = "rgba(15, 15, 35, 0.95)"
    }
  })

  // Animación de las habilidades al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos para animaciones
  const skillItems = document.querySelectorAll(".skill-item")
  const timelineItems = document.querySelectorAll(".timeline-item")
  const projectCards = document.querySelectorAll(".project-card")
  ;[...skillItems, ...timelineItems, ...projectCards].forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(item)
  })
})

// Carrusel de certificados
let currentSlide = 0
const slides = document.querySelectorAll(".certificate-slide")
const indicators = document.querySelectorAll(".indicator")
const totalSlides = slides.length

function showSlide(index) {
  // Ocultar todas las slides
  slides.forEach((slide) => slide.classList.remove("active"))
  indicators.forEach((indicator) => indicator.classList.remove("active"))

  // Mostrar la slide actual
  slides[index].classList.add("active")
  indicators[index].classList.add("active")
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  showSlide(currentSlide)
}

function currentSlideIndex(index) {
  currentSlide = index - 1
  showSlide(currentSlide)
}

function changeSlide(direction) {
  if (direction === 1) {
    nextSlide()
  } else {
    prevSlide()
  }
}

// Auto-play del carrusel
setInterval(nextSlide, 5000)

// Función para abrir proyectos
function openProject(url) {
  window.open(url, "_blank")
}

// Menú móvil
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })
}

// Efectos de partículas en el hero (opcional)
function createParticles() {
  const hero = document.querySelector(".hero")
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "particles"
  particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #8B7CF8;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
        `
    particlesContainer.appendChild(particle)
  }

  hero.appendChild(particlesContainer)
}

// CSS para la animación de partículas
const style = document.createElement("style")
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(15, 15, 35, 0.98);
        backdrop-filter: blur(10px);
        border-top: 1px solid var(--border);
        padding: 1rem;
        gap: 1rem;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`
document.head.appendChild(style)

// Inicializar partículas
createParticles()

// Efecto de typing en el título (opcional)
function typeWriter(element, text, speed = 10) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Aplicar efecto de typing al cargar la página
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 150)
  }
})

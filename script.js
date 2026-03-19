// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initHero3D();
    initExperience3D();
    initContact3D();
    initAnimations();
    initNavigation();
});

// Hero Section 3D Animation
function initHero3D() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create main sphere
    const geometry = new THREE.IcosahedronGeometry(2, 3);
    const material = new THREE.MeshPhongMaterial({
        color: 0xFD853A,
        emissive: 0x442200,
        shininess: 30,
        transparent: true,
        opacity: 0.9,
        wireframe: true
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add inner sphere
    const innerGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const innerMat = new THREE.MeshPhongMaterial({
        color: 0xFD853A,
        emissive: 0x331100,
        transparent: true,
        opacity: 0.2
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // Add particles
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i+1] = (Math.random() - 0.5) * 10;
        posArray[i+2] = (Math.random() - 0.5) * 10;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMat = new THREE.PointsMaterial({
        color: 0xFD853A,
        size: 0.02,
        transparent: true,
        opacity: 0.5
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Lights
    const light1 = new THREE.PointLight(0xFD853A, 1, 20);
    light1.position.set(2, 2, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xFFB800, 1, 20);
    light2.position.set(-2, -2, 2);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 6;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.01;
        
        innerSphere.rotation.x -= 0.003;
        innerSphere.rotation.y -= 0.007;
        
        particles.rotation.y += 0.0005;

        // Follow mouse slightly
        sphere.rotation.y += mouseX * 0.01;
        sphere.rotation.x += mouseY * 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Experience Section 3D Particles
function initExperience3D() {
    const container = document.getElementById('experience-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i+1] = (Math.random() - 0.5) * 20;
        posArray[i+2] = (Math.random() - 0.5) * 20;
        
        // Color
        colorArray[i] = 0.99; // R
        colorArray[i+1] = 0.52; // G
        colorArray[i+2] = 0.23; // B
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMat = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    camera.position.z = 15;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Contact Section 3D Grid
function initContact3D() {
    const container = document.getElementById('contact-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create grid
    const gridHelper = new THREE.GridHelper(20, 20, 0xFD853A, 0x333333);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Create floating cubes
    const cubes = [];
    const colors = [0xFD853A, 0xFFB800, 0xFF8C42];

    for(let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            emissive: 0x221100,
            transparent: true,
            opacity: 0.8
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = (Math.random() - 0.5) * 8;
        cube.position.y = Math.random() * 4;
        cube.position.z = (Math.random() - 0.5) * 5;
        
        scene.add(cube);
        cubes.push(cube);
    }

    // Lights
    const light1 = new THREE.PointLight(0xFD853A, 1, 20);
    light1.position.set(2, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x4466FF, 1, 20);
    light2.position.set(-2, 3, 5);
    scene.add(light2);

    camera.position.set(5, 3, 10);
    camera.lookAt(0, 1, 0);

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        cubes.forEach((cube, index) => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.02;
            cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate stat numbers
                if (entry.target.classList.contains('stat-item')) {
                    animateNumber(entry.target.querySelector('.stat-number'));
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Number animation
    function animateNumber(element) {
        if (!element) return;
        const target = parseInt(element.textContent) || 0;
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    }
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Sent! ✓';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const speed = 0.05 + (index * 0.01);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mouse trail effect
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9999';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgba(253, 133, 58, ${Math.random() * 0.5})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('mousemove', (e) => {
    for(let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if(particles[i].size < 0.5) {
            particles.splice(i, 1);
            i--;
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// Initialize page-specific 3D headers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize landing page 3D
    initHero3D();
    initContact3D();
    
    // Initialize page headers based on current page
    if (document.getElementById('services-header-canvas')) {
        initServicesHeader3D();
    }
    if (document.getElementById('experience-header-canvas')) {
        initExperienceHeader3D();
    }
    if (document.getElementById('portfolio-header-canvas')) {
        initPortfolioHeader3D();
    }
    
    initAnimations();
    initNavigation();
    initPortfolioFilters();
});

// Services Header 3D
function initServicesHeader3D() {
    const container = document.getElementById('services-header-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create floating icons
    const icons = [];
    const colors = [0xFD853A, 0xFFB800, 0xFF8C42];
    const shapes = ['sphere', 'cube', 'torus'];

    for(let i = 0; i < 8; i++) {
        let geometry;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        switch(shape) {
            case 'sphere':
                geometry = new THREE.SphereGeometry(0.3, 16, 16);
                break;
            case 'cube':
                geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
                break;
            case 'torus':
                geometry = new THREE.TorusGeometry(0.2, 0.1, 16, 32);
                break;
        }
        
        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            emissive: 0x221100,
            transparent: true,
            opacity: 0.6
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 10;
        mesh.position.z = (Math.random() - 0.5) * 5;
        
        scene.add(mesh);
        icons.push(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const light = new THREE.PointLight(0xFD853A, 1, 20);
    light.position.set(2, 2, 5);
    scene.add(light);

    camera.position.z = 8;

    function animate() {
        requestAnimationFrame(animate);

        icons.forEach((icon, index) => {
            icon.rotation.x += 0.01;
            icon.rotation.y += 0.02;
            icon.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        });

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Experience Header 3D
function initExperienceHeader3D() {
    const container = document.getElementById('experience-header-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create timeline-like particles
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (i / 3) * 0.1 - 10;
        posArray[i+1] = Math.sin(i * 0.1) * 2;
        posArray[i+2] = (Math.random() - 0.5) * 2;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMat = new THREE.PointsMaterial({
        color: 0xFD853A,
        size: 0.1,
        transparent: true,
        opacity: 0.5
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    camera.position.z = 15;
    camera.position.y = 0;

    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Portfolio Header 3D
function initPortfolioHeader3D() {
    const container = document.getElementById('portfolio-header-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create floating frames
    for(let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(1, 0.8, 0.1);
        const material = new THREE.MeshPhongMaterial({
            color: 0xFD853A,
            emissive: 0x221100,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        
        const frame = new THREE.Mesh(geometry, material);
        frame.position.x = (Math.random() - 0.5) * 8;
        frame.position.y = (Math.random() - 0.5) * 4;
        frame.position.z = (Math.random() - 0.5) * 5;
        frame.rotation.x = Math.random() * Math.PI;
        frame.rotation.y = Math.random() * Math.PI;
        
        scene.add(frame);
    }

    camera.position.z = 10;

    function animate() {
        requestAnimationFrame(animate);

        scene.children.forEach(child => {
            child.rotation.x += 0.005;
            child.rotation.y += 0.01;
        });

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Portfolio Filtering
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Quick Contact Form
const quickContactForm = document.getElementById('quick-contact-form');
if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = quickContactForm.querySelector('button');
        const originalText = button.innerHTML;
        
        button.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.innerHTML = 'Sent! ✓';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
                quickContactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Update active navigation based on current page
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', (e) => {
            // Let the browser handle navigation naturally
            // No need to prevent default for page navigation
        });
    });
}

// Smooth scroll for anchor links on index page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
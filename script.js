(function() {
        'use strict';

        /* ============================================================
           1. LOADING OVERLAY
           ============================================================ */
        const loadingOverlay = document.getElementById('loading-overlay');

        function hideLoader() {
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
            }
        }

        window.addEventListener('load', function() {
            setTimeout(hideLoader, 1500);
        });

        if (document.readyState === 'complete') {
            setTimeout(hideLoader, 1500);
        }

        /* ============================================================
           2. MENU DATA
           ============================================================ */
        const menuItems = [{
                id: 'beef-stew',
                title: 'Beef Stew',
                tag: 'Vegetable Based',
                price: 'R75',
                desc: 'Slow-cooked beef stew with rich gravy, served with rice or pap. A hearty, home-style classic.',
                image: 'images/beef-stew.jpg'
            },
            {
                id: 'grilled-chicken',
                title: 'Grilled Chicken',
                tag: 'Portuguese Saus',
                price: 'R70',
                desc: 'Flame-grilled chicken basted in our signature Portuguese sauce. Juicy, smoky, and full of flavour.',
                image: 'images/grilled-chicken.jpg'
            },
            {
                id: 'dagwood',
                title: 'Dagwood',
                tag: 'With Fries',
                price: 'R50',
                desc: 'Triple-decker sandwich stacked with meat, cheese, and fresh veggies. Served with golden fries.',
                image: 'images/dagwood.jpg'
            }
        ];

        const extraMenuItems = [{
                id: 'isibindi',
                title: 'Isibindi',
                tag: 'Sweet Chilli',
                price: 'R60',
                desc: 'Traditional isibindi (chicken livers) cooked in a sweet chilli sauce.',
                image: 'images/beef-stew.jpg'
            },
            {
                id: 'beef-smash-burger',
                title: 'Beef Smash Burger',
                tag: 'Loaded Fries',
                price: 'R70',
                desc: 'Double smashed beef patty, cheese, and our secret sauce with loaded fries.',
                image: 'images/dagwood.jpg'
            }
        ];

        const allMenuItems = menuItems.concat(extraMenuItems);

        /* ============================================================
           3. SLIDESHOW STATE
           ============================================================ */
        let slideInterval = null;
        let currentSlideIndex = 0;
        let slideshowSlides = [];
        let slideshowDots = [];

        function stopSlideshow() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        function pauseAllVideos() {
            document.querySelectorAll('.slide-video').forEach(v => {
                try { v.pause(); } catch (e) {}
            });
        }

        /* ============================================================
           4. TEMPLATES
           ============================================================ */
        function slideshowTemplate() {
            return `
      <section class="slideshow-section">
        <div class="slideshow-container" id="slideshow">
          <div class="slide active" data-type="video">
            <video class="slide-video" muted loop playsinline preload="auto">
              <source src="images/video-1.mp4" type="video/mp4">
            </video>
            <div class="slide-content">
              <h2>Home Cooked<br>Meal Palace</h2>
              <p>Authentic flavours, hearty portions, and that homemade taste you crave.</p>
              <a href="#/menu" class="slide-btn" data-nav="menu">View Menu</a>
            </div>
          </div>
          <div class="slide" data-type="image" style="background-image: url('images/slide-1.jpg');">
            <div class="slide-content">
              <h2>Flame-Grilled<br>Perfection</h2>
              <p>Our grilled chicken and beef are marinated to perfection, served with love.</p>
              <a href="#/menu" class="slide-btn" data-nav="menu">Order Now</a>
            </div>
          </div>
          <div class="slide" data-type="video">
            <video class="slide-video" muted loop playsinline preload="auto">
              <source src="images/video-2.mp4" type="video/mp4">
            </video>
            <div class="slide-content">
              <h2>Smash Burger<br>Deal</h2>
              <p>Double smashed patties, melted cheese, and our secret sauce. Only R70.</p>
              <a href="#/menu" class="slide-btn" data-nav="menu">See Deal</a>
            </div>
          </div>
          <div class="slide" data-type="image" style="background-image: url('images/slide-2.jpg');">
            <div class="slide-content">
              <h2>Traditional<br>Favourites</h2>
              <p>Isibindi, Beef Stew, and more – cooked the way Mama used to make it.</p>
              <a href="#/menu" class="slide-btn" data-nav="menu">Explore</a>
            </div>
          </div>
          <div class="slide" data-type="video">
            <video class="slide-video" muted loop playsinline preload="auto">
              <source src="images/video-3.mp4" type="video/mp4">
            </video>
            <div class="slide-content">
              <h2>Your Career,<br>Your Way</h2>
              <p>Elevate your career status to royal level at the King.</p>
              <a href="#/menu" class="slide-btn" data-nav="menu">Apply Now</a>
            </div>
          </div>
          <div class="slideshow-dots" id="slideshow-dots">
            <button class="dot active" data-index="0" aria-label="Slide 1"></button>
            <button class="dot" data-index="1" aria-label="Slide 2"></button>
            <button class="dot" data-index="2" aria-label="Slide 3"></button>
            <button class="dot" data-index="3" aria-label="Slide 4"></button>
            <button class="dot" data-index="4" aria-label="Slide 5"></button>
          </div>
        </div>
      </section>
    `;
        }

        function menuCardTemplate(item) {
            return `
      <a href="#/item/${item.id}" class="menu-card" data-nav="item/${item.id}">
        <div class="menu-card-img" style="background-image: url('${item.image}');"></div>
        <div class="menu-card-body">
          <span class="menu-tag">${item.tag}</span>
          <h3>${item.title}</h3>
          <div class="price">${item.price}</div>
          <p>${item.desc}</p>
        </div>
      </a>
    `;
        }

        function homePage() {
            return `
      <div class="page">
        ${slideshowTemplate()}

        <section class="home-section">
          <h2 class="section-title">Featured Dishes</h2>
          <p class="section-sub">Our customer favourites — tap any dish to see its own page.</p>
          <div class="home-featured-grid">
            ${menuItems.map(menuCardTemplate).join('')}
          </div>
        </section>

        <section class="home-section" style="margin-bottom: 48px;">
          <h2 class="section-title">Our Full Menu</h2>
          <p class="section-sub">All meals are 10% off · Grand Opening Special</p>
          <div class="home-featured-grid">
            ${allMenuItems.map(menuCardTemplate).join('')}
          </div>
          <div style="text-align:center; margin-top:28px;">
            <a href="#/menuboard" class="slide-btn" data-nav="menuboard" style="background:var(--bk-brown); color:var(--bk-cream);">See Menu Board</a>
          </div>
        </section>
      </div>
    `;
        }

        function itemDetailPage(id) {
            const item = allMenuItems.find(m => m.id === id);
            if (!item) {
                return `
        <div class="page detail-page">
          <a href="#/" class="detail-back" data-nav="home">← Back to Home</a>
          <h1>Item not found</h1>
        </div>
      `;
            }
            return `
      <div class="page detail-page">
        <a href="#/" class="detail-back" data-nav="home">← Back to Home</a>
        <div class="detail-card">
          <div class="detail-image-wrap">
            <img src="${item.image}" alt="${item.title}" class="detail-image">
          </div>
          <div class="detail-info">
            <span class="menu-tag">${item.tag}</span>
            <h1>${item.title}</h1>
            <div class="price">${item.price}</div>
            <p>${item.desc}</p>
            <p style="font-weight:600; color:var(--bk-brown); margin-bottom:0;">Order now: <a href="tel:0672529826" style="color:var(--bk-red);">067 252 9826</a></p>
          </div>
        </div>
      </div>
    `;
        }

        function menuBoardPage() {
            return `
      <div class="page menu-board-page">
        <a href="#/" class="detail-back" data-nav="home" style="display:inline-flex; margin-bottom:20px;">← Back to Home</a>
        <h2 class="section-title">Today's Menu Board</h2>
        <p class="section-sub">Grand Opening Special · 10% Off All Meals</p>
        <img src="images/Menu.jpg" alt="Chef Zakes Menu Board" class="menu-board-img" loading="lazy">
      </div>
    `;
        }

        function galleryPage() {
            const galleryImages = [
                'images/slide-1.jpg',
                'images/slide-2.jpg',
                'images/slide-3.jpg',
                'images/slide-4.jpg',
                'images/beef-stew.jpg',
                'images/dagwood.jpg',
                'images/grilled-chicken.jpg',
                'images/Menu.jpg'
            ];
            const galleryVideos = [
                'images/video-1.mp4',
                'images/video-2.mp4',
                'images/video-3.mp4'
            ];

            return `
      <div class="page gallery-section">
        <a href="#/" class="detail-back" data-nav="home" style="display:inline-flex; margin-bottom:20px;">← Back to Home</a>
        <h2 class="section-title">Gallery</h2>
        <p class="section-sub">Photos and videos from Chef Zakes</p>

        <h3 style="margin: 20px 0 14px; color:var(--bk-brown); font-size:1.2rem;">Photos</h3>
        <div class="gallery-grid">
          ${galleryImages.map(src => `
            <div class="gallery-item">
              <img src="${src}" alt="Chef Zakes gallery" loading="lazy">
            </div>
          `).join('')}
        </div>

        <h3 style="margin: 32px 0 14px; color:var(--bk-brown); font-size:1.2rem;">Videos</h3>
        <div class="gallery-grid">
          ${galleryVideos.map(src => `
            <div class="gallery-item">
              <video controls muted playsinline preload="metadata">
                <source src="${src}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function contactPage() {
    return `
      <div class="page contact-section">
        <a href="#/" class="detail-back" data-nav="home" style="display:inline-flex; margin-bottom:20px;">← Back to Home</a>
        <div class="contact-card">
          <h1>Get in Touch</h1>
          <p><strong>Chef Zakes · Home Cooked Meal Palace</strong></p>
          <p>1118 Churchill Mokoeka Street<br>Vosloorus Ext 2</p>
          <p>Phone: <a href="tel:0672529826">067 252 9826</a></p>
          <p>Hours: Mon–Fri 9am–8pm · Sat–Sun 10am–9pm</p>
          <p style="margin-bottom:0;">Follow us on social media for daily specials and updates.</p>
        </div>
      </div>
    `;
  }

  /* ============================================================
     5. ROUTER
     ============================================================ */
  const app = document.getElementById('app');

  function render() {
    stopSlideshow();
    pauseAllVideos();
    closeMobileMenu();

    const hash = window.location.hash.replace(/^#\/?/, '') || '';
    let html = '';

    if (hash.startsWith('item/')) {
      const id = hash.substring('item/'.length);
      html = itemDetailPage(id);
    } else if (hash === 'menu') {
      html = `
        <div class="page menu-section">
          <a href="#/" class="detail-back" data-nav="home" style="display:inline-flex; margin-bottom:20px;">← Back to Home</a>
          <h2 class="section-title">Today's Menu</h2>
          <p class="section-sub">All meals are 10% off · Grand Opening Special</p>
          <div class="menu-grid">
            ${allMenuItems.map(menuCardTemplate).join('')}
          </div>
        </div>
      `;
    } else if (hash === 'menuboard') {
      html = menuBoardPage();
    } else if (hash === 'gallery') {
      html = galleryPage();
    } else if (hash === 'contact') {
      html = contactPage();
    } else {
      html = homePage();
    }

    app.innerHTML = html;
    updateNavActive(hash);
    attachHandlers();
    initSlideshowIfPresent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavActive(hash) {
    document.querySelectorAll('.header-nav a').forEach(a => {
      a.classList.remove('active');
    });
    let target = 'home';
    if (hash === 'menu' || hash.startsWith('item/') || hash === 'menuboard') target = 'menu';
    if (hash === 'gallery') target = 'gallery';
    if (hash === 'contact') target = 'contact';
    const link = document.querySelector(`.header-nav a[data-nav="${target}"]`);
    if (link) link.classList.add('active');
  }

  /* ============================================================
     6. MOBILE MENU TOGGLE
     ============================================================ */
  const menuToggle = document.getElementById('menu-toggle');
  const headerNav = document.getElementById('header-nav');

  function closeMobileMenu() {
    if (headerNav) headerNav.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = headerNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a nav link is tapped
    headerNav.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        closeMobileMenu();
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (headerNav.classList.contains('open') &&
          !headerNav.contains(e.target) &&
          e.target !== menuToggle) {
        closeMobileMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 900) {
        closeMobileMenu();
      }
    });
  }

  /* ============================================================
     7. HANDLERS
     ============================================================ */
  function attachHandlers() {
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', function(e) {
        const nav = this.getAttribute('data-nav');
        if (nav === 'home') {
          e.preventDefault();
          window.location.hash = '#/';
        } else if (nav.startsWith('item/')) {
          e.preventDefault();
          window.location.hash = '#/' + nav;
        } else {
          e.preventDefault();
          window.location.hash = '#/' + nav;
        }
      });
    });
  }

  /* ============================================================
     8. SLIDESHOW INIT
     ============================================================ */
  function initSlideshowIfPresent() {
    const container = document.getElementById('slideshow');
    if (!container) return;

    slideshowSlides = container.querySelectorAll('.slide');
    slideshowDots = container.querySelectorAll('.dot');

    if (slideshowSlides.length === 0) return;

    currentSlideIndex = 0;

    function goToSlide(index) {
      if (index < 0) index = slideshowSlides.length - 1;
      if (index >= slideshowSlides.length) index = 0;

      slideshowSlides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (video) {
          if (i === index) {
            try {
              video.currentTime = 0;
              video.play().catch(() => {});
            } catch (e) {}
          } else {
            try { video.pause(); } catch (e) {}
          }
        }
      });

      slideshowSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

      slideshowDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentSlideIndex = index;
    }

    function nextSlide() {
      goToSlide(currentSlideIndex + 1);
    }

    function startSlideshow() {
      stopSlideshow();
      slideInterval = setInterval(nextSlide, 6000);
    }

    slideshowDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startSlideshow();
      });
    });

    // Pause on hover (desktop)
    container.addEventListener('mouseenter', () => {
      stopSlideshow();
      const activeVideo = slideshowSlides[currentSlideIndex]?.querySelector('video');
      if (activeVideo) { try { activeVideo.pause(); } catch(e) {} }
    });

    container.addEventListener('mouseleave', () => {
      const activeVideo = slideshowSlides[currentSlideIndex]?.querySelector('video');
      if (activeVideo) { try { activeVideo.play().catch(()=>{}); } catch(e) {} }
      startSlideshow();
    });

    // Pause slideshow when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopSlideshow();
        const activeVideo = slideshowSlides[currentSlideIndex]?.querySelector('video');
        if (activeVideo) { try { activeVideo.pause(); } catch(e) {} }
      } else {
        const activeVideo = slideshowSlides[currentSlideIndex]?.querySelector('video');
        if (activeVideo) { try { activeVideo.play().catch(()=>{}); } catch(e) {} }
        startSlideshow();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left → next
          goToSlide(currentSlideIndex + 1);
        } else {
          // Swipe right → previous
          goToSlide(currentSlideIndex - 1);
        }
        startSlideshow();
      }
    }, { passive: true });

    goToSlide(0);
    startSlideshow();
  }

  /* ============================================================
     9. START
     ============================================================ */
  window.addEventListener('hashchange', render);
  render();

})();
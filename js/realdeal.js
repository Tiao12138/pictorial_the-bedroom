document.addEventListener("DOMContentLoaded", function () {
  const navContainer = document.getElementById('nav-container');
  const navItems = document.querySelectorAll(".link");

  loadContent('p2.html');  // Initial content load

  navItems.forEach(item => {
    item.addEventListener("click", function () {
      const contentNav = this.getAttribute('nav-content');
      navItems.forEach(link => link.classList.remove("selected"));
      this.classList.add("selected");

      let contentUrl = '';
      switch (contentNav) {
        // case 'p1': contentUrl = 'p1.html'; break;
        case 'p2': contentUrl = 'p2.html'; break;
        // case 'p3': contentUrl = 'p3.html'; break;
        default: contentUrl = 'p2.html';
      }
      
      loadContent(contentUrl);  
    });
  });
  
  function loadContent(contentUrl) {
    fetch(contentUrl)
      .then(response => response.text())
      .then(data => {
        navContainer.innerHTML = data;  
        applyHoverTextListeners();      
        applyImageClickListeners();

        if (contentUrl === 'p2-2.html') {
          initializeAccordion();
          showclickme()
        }

        if (contentUrl === 'p2-1.html' || contentUrl === 'p2-5.html'|| contentUrl === 'p2-3.html') {
          initializeAccordion();
        }
  
      const backToTopButton = document.getElementById("backToTop");
        if (backToTopButton) {
          window.onscroll = function () {
            if (document.documentElement.scrollTop > 200) {
              backToTopButton.style.display = "block";
            } else {
              backToTopButton.style.display = "none";
            }
          };
  
          backToTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        }
      })
      .catch(error => console.error('Error loading content:', error));
  }   

  function applyImageClickListeners() {
    document.querySelectorAll('img.cover').forEach(cover => {
      cover.addEventListener('click', function () {
        const contentPast = this.getAttribute('past-content');
        loadContentPast(contentPast); // Load content based on clicked image
      });
    });
  }

  function loadContentPast(contentPast) {
    let contentUrl2 = '';
    switch (contentPast) {
      case 'p2-1': contentUrl2 = 'p2-1.html'; break;
      case 'p2-2': contentUrl2 = 'p2-2.html'; break;
      case 'p2-3': contentUrl2 = 'p2-3.html'; break;
      case 'p2-4': contentUrl2 = 'p2-4.html'; break;
      case 'p2-5': contentUrl2 = 'p2-5.html'; break;
      case 'p2-6': contentUrl2 = 'p2-6.html'; break;
      case 'p2-7': contentUrl2 = 'p2-7.html'; break;
      case 'p2-8': contentUrl2 = 'p2-8.html'; break;
      case 'p2-9': contentUrl2 = 'p2-9.html'; break;
      default: contentUrl2 = 'p2.html';
    }

    if (contentUrl2) {
      loadContent(contentUrl2); 
      toggleContent()
      showclickme()

      window.onscroll = function () {
        const backToTopButton = document.getElementById("backToTop");
        if (document.documentElement.scrollTop > 200) {
          backToTopButton.style.display = "block";
        } else {
          backToTopButton.style.display = "none";
        }
      };
  
      document.getElementById("backToTop")?.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    if (contentUrl2 === 'p2-1.html') {
      loadScrollScript();  
    }
    if(contentUrl2 === 'p2-2.html'){
      toggleContent()
      showclickme()
    }
    if(contentUrl2 === 'p2-1.html' || contentUrl2 === 'p2-5.html'|| contentUrl2 === 'p2-3.html'){
      toggleContent()
      showclickme()
    }
  }

  function loadScrollScript() {
    const script = document.createElement('script');
    script.src = 'js/p2-1.js';
    script.onload = () => {console.log('Script loaded successfully.');

    const scrollableColumn = document.getElementById('scrollable-column');
    
    if (scrollableColumn) {
        console.log('scrollablecolumn valid');
        let isDown = false;
        let startX;
        let scrollLeft;
    
        scrollableColumn.addEventListener('mousedown', (e) => {
            isDown = true;
            console.log('Mouse down at X:', e.pageX);
            scrollableColumn.classList.add('active');
            startX = e.pageX - scrollableColumn.offsetLeft;
            scrollLeft = scrollableColumn.scrollLeft;
            // console.log('Mouse down event, dragging started');
        });

        scrollableColumn.addEventListener('mouseleave', () => {
            isDown = false;
            scrollableColumn.classList.remove('active');
            console.log('Mouse left the scrollable area, dragging ended'); 
        });

        scrollableColumn.addEventListener('mouseup', () => {
            isDown = false;
            scrollableColumn.classList.remove('active');
            console.log('Mouse up event, dragging ended');
        });

        scrollableColumn.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            console.log('Mouse is moving while dragging');
            e.preventDefault();
            const x = e.pageX - scrollableColumn.offsetLeft;
            const walk = (x - startX) * 3; 
            scrollableColumn.scrollLeft = scrollLeft - walk;
        });
    }
  };

    script.onerror = () => console.error('Failed to load script.');

    document.body.appendChild(script); 
  }

  function showclickme(){
    const col01 = document.querySelector('.col01');
    const hoverText = document.getElementById('hover-text');
    col01.addEventListener('mousemove', (event) => {
        const rect = col01.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;  
    
        if (x < rect.width * 0.68 && !event.target.closest('.icon')) {
            hoverText.style.display = 'block';
            hoverText.style.left = `${event.clientX}px`;
            hoverText.style.top = `${event.clientY}px`;
            hoverText.textContent = 'click to experience';
              col01.addEventListener('click', () => {
              const externalURL = 'https://tiao12138.github.io/The_Bedroom/';
              window.location.href = externalURL; 
          });
        } else {
            hoverText.style.display = 'none';
        }
    });
    
    col01.addEventListener('mouseleave', () => {
        hoverText.style.display = 'none';
    });
  }
  
 
  function initializeAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', function () {
        const item = this.parentElement;
        const content = item.querySelector('.accordion-content');
        const icon = this.querySelector('.icon-arrow');
  
        const isOpen = item.classList.contains('open');
        if (isOpen) {
          item.classList.remove('open');
          icon.textContent = '▼';
          content.style.maxHeight = null; 
        } else {
          item.classList.add('open');
          icon.textContent = '▲';
          content.style.maxHeight = content.scrollHeight + "px"; 
        }
      });
    });
  }
  

  function applyHoverTextListeners() {
    const images = document.querySelectorAll('.cover');
    images.forEach(img => {
      img.addEventListener('mouseover', () => showText(img));
      img.addEventListener('mouseout', () => hideText(img));
    });
  }
  
  function showText(img) {
    const hoverText = img.parentElement.querySelector('.hovertext');
    const hoverTextDisplay = document.getElementById('hover-text-display');
    if (hoverText && hoverTextDisplay) {
      hoverTextDisplay.textContent = hoverText.textContent; // Update the dedicated container
      hoverTextDisplay.classList.add('show'); // Show the text smoothly
    }
  }
  
  function hideText() {
    const hoverTextDisplay = document.getElementById('hover-text-display');
    if (hoverTextDisplay) {
      hoverTextDisplay.classList.remove('show'); // Hide the text smoothly
    }
  }

  applyHoverTextListeners();
  applyImageClickListeners();


});

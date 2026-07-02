/**
 * Karri Venkata Abhishek Reddy - Premium Portfolio Interactivity Scripts
 * File: script.js
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  /* ==========================================================================
     1. Page Loading Overlay Timeout
     ========================================================================== */
  const loader = document.getElementById("loader-wrapper");
  if (loader) {
    window.addEventListener("load", () => {
      // Small buffer for elegant loading feel
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.visibility = "hidden";
        }, 600);
      }, 500);
    });

    // Fallback if load event takes too long
    setTimeout(() => {
      if (loader.style.visibility !== "hidden") {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.visibility = "hidden";
        }, 600);
      }
    }, 3000);
  }

  /* ==========================================================================
     2. Custom Scroll Progress Indicator
     ========================================================================== */
  const scrollBar = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.pageYOffset / totalHeight) * 100;
      scrollBar.style.width = `${progress}%`;
    }
  });

  /* ==========================================================================
     3. Sticky Navbar & Active Link Observer
     ========================================================================== */
  const navbar = document.querySelector(".custom-navbar");
  const navLinks = document.querySelectorAll(".custom-navbar .nav-link");
  const sections = document.querySelectorAll("section");

  // Sticky Navbar class additions
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Track scroll section to highlight navigation menu links
  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    sections.forEach((sec) => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.clientHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scroll logic for standard Bootstrap collapse auto-closing on link selection
  const navCollapse = document.getElementById("navbarNav");
  const bsCollapse = navCollapse ? new bootstrap.Collapse(navCollapse, { toggle: false }) : null;
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (bsCollapse && window.innerWidth < 992 && navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  /* ==========================================================================
     4. Typing Roles Animation (Hero Section)
     ========================================================================== */
  const roles = [
    "Artificial Intelligence Engineering Student",
    "Python Developer",
    "Flask Developer",
    "AI Enthusiast",
    "Machine Learning Enthusiast"
  ];
  const typingTextEl = document.getElementById("typing-text");
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeRole() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typingTextEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40; // Faster deleting speed
    } else {
      typingTextEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Wait 2s before deleting
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500; // Wait 0.5s before typing next
    }

    setTimeout(typeRole, typeSpeed);
  }

  if (typingTextEl) {
    typeRole();
  }

  /* ==========================================================================
     5. Scroll Reveal & Skill Progress Bar Trigger
     ========================================================================== */
  const revealElements = document.querySelectorAll("[data-anim]");
  const progressBars = document.querySelectorAll(".progress-bar-fill");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Distinct observer for animating skill progress bars once visible
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressBars.forEach((bar) => {
              const targetWidth = bar.getAttribute("data-width");
              bar.style.width = targetWidth;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    skillObserver.observe(skillsSection);
  }

  /* ==========================================================================
     6. Animated Achievements Stat Counters
     ========================================================================== */
  const counterElements = document.querySelectorAll(".stat-number");
  
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10);
          let count = 0;
          const duration = 2000; // 2 seconds animation
          const stepTime = Math.max(Math.floor(duration / target), 15);
          
          const counterTimer = setInterval(() => {
            count++;
            el.textContent = `${count}+`;
            if (count >= target) {
              el.textContent = `${target}+`;
              clearInterval(counterTimer);
            }
          }, stepTime);
          
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach((counter) => {
    counterObserver.observe(counter);
  });

  /* ==========================================================================
     7. Dynamic Certificate Lightbox/Modal
     ========================================================================== */
  const certCards = document.querySelectorAll(".certificate-card");
  const modalCertTitle = document.getElementById("modal-cert-title");
  const modalCertIssuer = document.getElementById("modal-cert-issuer");
  const modalCertImg = document.getElementById("modal-cert-img");

  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-cert-title");
      const issuer = card.getAttribute("data-cert-issuer");
      const imgUrl = card.getAttribute("data-cert-img");

      if (modalCertTitle) modalCertTitle.textContent = title;
      if (modalCertIssuer) modalCertIssuer.textContent = `Issuer: ${issuer}`;
      if (modalCertImg) modalCertImg.setAttribute("src", imgUrl);
    });
  });

  /* ==========================================================================
     8. Back To Top Button Click Action
     ========================================================================== */
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ==========================================================================
     9. Contact Form Dynamic Handling
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const contactSubmitBtn = document.getElementById("contact-submit-btn");
  const contactStatusMsg = document.getElementById("contact-status-msg");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Select form field inputs
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const subject = document.getElementById("contact-subject").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      // Basic validation safety
      if (!name || !email || !subject || !message) {
        showStatusMessage("Please fill in all input fields.", "danger");
        return;
      }

      // Visual feedback loading state
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Transmitting Message...`;

      // Mock delay representing actual network operations
      setTimeout(() => {
        contactForm.reset();
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.innerHTML = `<i data-lucide="send"></i> Send Message`;
        if (typeof lucide !== "undefined") lucide.createIcons();
        
        // Show success status
        showStatusMessage("Transmission Successful! Thank you, I will respond shortly.", "success");
      }, 1500);
    });
  }

  function showStatusMessage(text, type) {
    if (!contactStatusMsg) return;
    contactStatusMsg.className = `mt-3 text-center badge-dim-common bg-${type === "success" ? "success-dim text-success" : "danger-dim text-danger"}`;
    contactStatusMsg.innerHTML = text;
    contactStatusMsg.classList.remove("d-none");

    setTimeout(() => {
      contactStatusMsg.classList.add("d-none");
    }, 5000);
  }

  /* ==========================================================================
     10. FLOATING AI CHATBOT ASSISTANT
     ========================================================================== */
  const chatToggleBtn = document.getElementById("chat-btn-toggle");
  const chatCloseBtn = document.getElementById("chat-btn-close");
  const chatBoxContainer = document.getElementById("chat-box-container");
  const chatMessagesBody = document.getElementById("chat-messages-body");
  const chatUserInput = document.getElementById("chat-user-input");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const chatSuggestionChips = document.querySelectorAll(".chat-suggest-chip");
  const triggerLiveChatbotBtn = document.getElementById("trigger-live-chatbot");

  // Toggle chat expand/minimize views
  if (chatToggleBtn && chatBoxContainer) {
    chatToggleBtn.addEventListener("click", () => {
      chatBoxContainer.classList.toggle("d-none");
      if (!chatBoxContainer.classList.contains("d-none")) {
        chatUserInput.focus();
        // Clear red notification badge if present
        const badge = chatToggleBtn.querySelector(".chat-badge");
        if (badge) badge.style.display = "none";
      }
    });
  }

  if (chatCloseBtn && chatBoxContainer) {
    chatCloseBtn.addEventListener("click", () => {
      chatBoxContainer.classList.add("d-none");
    });
  }

  // Trigger chatbot button inside Project Section
  if (triggerLiveChatbotBtn) {
    triggerLiveChatbotBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (chatBoxContainer) {
        chatBoxContainer.classList.remove("d-none");
        chatUserInput.focus();
        chatBoxContainer.scrollIntoView({ behavior: "smooth" });
        
        // Send a custom introductory message
        appendMessage("What can your chatbot do?", "user");
        sendMessageToServer("What can your chatbot do?");
      }
    });
  }

  // Send message actions
  if (chatSendBtn && chatUserInput) {
    chatSendBtn.addEventListener("click", handleUserMessageSend);
    chatUserInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleUserMessageSend();
      }
    });
  }

  // Suggestion chips clicks handler
  chatSuggestionChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const promptText = chip.textContent.trim();
      appendMessage(promptText, "user");
      sendMessageToServer(promptText);
    });
  });

  function handleUserMessageSend() {
    const text = chatUserInput.value.trim();
    if (!text) return;

    chatUserInput.value = "";
    appendMessage(text, "user");
    sendMessageToServer(text);
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-message ${sender === "user" ? "user-msg" : "bot-msg"}`;
    
    // Support markdown style bullet points or bold tags minimally inside bubble
    const formattedText = formatChatMessageText(text);

    msgDiv.innerHTML = `
      <p>${formattedText}</p>
      <span class="chat-time font-mono">${getFormattedCurrentTime()}</span>
    `;

    chatMessagesBody.appendChild(msgDiv);
    autoScrollChatToBottom();
  }

  function appendTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-message bot-msg typing-indicator-msg";
    typingDiv.id = "chat-typing-indicator";
    typingDiv.innerHTML = `
      <p class="mb-0 d-flex gap-1 align-items-center">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </p>
    `;
    chatMessagesBody.appendChild(typingDiv);
    autoScrollChatToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("chat-typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  async function sendMessageToServer(userMsg) {
    appendTypingIndicator();

    try {
      // POST payload to Express server `/api/chat`
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMsg })
      });

      removeTypingIndicator();

      if (response.ok) {
        const data = await response.json();
        appendMessage(data.response || "No response received.", "bot");
      } else {
        appendMessage("Pardon me, I encountered a temporary communication glitch. Please try again.", "bot");
      }
    } catch (err) {
      removeTypingIndicator();
      appendMessage("Unable to connect to the server. Please verify your connection.", "bot");
      console.error("Chat error:", err);
    }
  }

  function autoScrollChatToBottom() {
    chatMessagesBody.scrollTop = chatMessagesBody.scrollHeight;
  }

  function getFormattedCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  // Simple formatting helper for markdown-like text
  function formatChatMessageText(str) {
    if (!str) return "";
    return str
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text **bold**
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text *italic*
      .replace(/\n/g, "<br>"); // Newlines
  }
});

function showComingSoon() {
  const modal = document.createElement("div");
  modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(20px);
            animation: modalSlide 0.4s ease-out;
          `;

  const content = document.createElement("div");
  content.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            padding: 3rem;
            border: 2px solid #4ecdc4;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            box-shadow: 0 20px 60px rgba(78, 205, 196, 0.3);
            animation: contentBounce 0.6s ease-out;
            position: relative;
            overflow: hidden;
          `;

  content.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🚧</div>
            <h2 style="color: #4ecdc4; margin-bottom: 1.5rem; font-size: 1.8rem; font-weight: 700;">Coming Soon!</h2>
            <p style="color: #cccccc; margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">
              This feature is currently under development.
              <br><br>
              Stay tuned for awesome educational content! 📖✨
            </p>
            <button onclick="this.parentElement.parentElement.remove()"
                    style="
                      background: linear-gradient(45deg, #4ecdc4, #44a08d);
                      color: white;
                      border: none;
                      padding: 1rem 2.5rem;
                      border-radius: 25px;
                      font-size: 1rem;
                      font-weight: 700;
                      cursor: pointer;
                      transition: all 0.3s ease;
                      text-transform: uppercase;
                      letter-spacing: 0.05em;
                    "
                    onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 10px 25px rgba(78, 205, 196, 0.4)'"
                    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
              Got It! 👍
            </button>
          `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
            @keyframes modalSlide {
              from { opacity: 0; backdrop-filter: blur(0px); }
              to { opacity: 1; backdrop-filter: blur(20px); }
            }
            @keyframes contentBounce {
              0% { transform: scale(0.3) translateY(-100px); opacity: 0; }
              70% { transform: scale(1.1) translateY(0); opacity: 1; }
              100% { transform: scale(1) translateY(0); opacity: 1; }
            }
          `;
  document.head.appendChild(style);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.animation = "modalSlide 0.3s ease-in reverse";
      setTimeout(() => modal.remove(), 300);
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", function handleEscape(e) {
    if (e.key === "Escape") {
      modal.style.animation = "modalSlide 0.3s ease-in reverse";
      setTimeout(() => modal.remove(), 300);
      document.removeEventListener("keydown", handleEscape);
    }
  });
}

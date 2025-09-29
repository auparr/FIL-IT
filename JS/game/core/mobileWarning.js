// Mobile Device Warning - Add this at the top of play.html in a <script> tag
// Or create a new file: JS/core/mobileWarning.js
function showMobileWarning() {
  // Check if user is on mobile device
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isSmallScreen = window.innerWidth <= 1024;

  if (isMobile || isSmallScreen) {
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      backdrop-filter: blur(10px);
      animation: fadeIn 0.3s ease-out;
    `;

    const content = document.createElement("div");
    content.style.cssText = `
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      padding: 2rem;
      border: 3px solid #ff9800;
      border-radius: 20px;
      text-align: center;
      max-width: 90%;
      width: 400px;
      box-shadow: 0 20px 60px rgba(255, 152, 0, 0.4);
      animation: slideUp 0.4s ease-out;
    `;
    content.innerHTML = `
 <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
<h2 style="color: #ff9800; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 700;">
  Perangkat Mobile Terdeteksi
</h2>
<p style="color: #cccccc; margin-bottom: 1.5rem; font-size: 1rem; line-height: 1.6;">
  Website ini lebih optimal diakses melalui PC atau Laptop untuk pengalaman terbaik.
  <br><br>
  <strong style="color: #ff6b6b;">Jika menggunakan HP, mungkin akan mengalami:</strong>
</p>
<ul style="color: #cccccc; margin-bottom: 1.5rem; font-size: 1rem; line-height: 1.8; padding-left: 1.2rem; text-align:left;">
  <li>⚡ Performa lebih lambat</li>
  <li>📱 Tampilan tidak sepenuhnya sesuai</li>
  <li>🎮 Kontrol & navigasi lebih sulit</li>
</ul>
<div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
  <button id="understood"
          style="
            background: linear-gradient(45deg, #ff9800, #f57c00);
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            flex: 1 1 0;
          "
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 20px rgba(255, 152, 0, 0.4)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
    Tetap Lanjutkan
  </button>
</div>
<p style="color: #888; margin-top: 1rem; font-size: 0.85rem;">
  💡 Untuk pengalaman terbaik, gunakan PC/Laptop dengan layar lebih besar.
</p>
    `;
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Add CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { 
          transform: translateY(50px); 
          opacity: 0; 
        }
        to { 
          transform: translateY(0); 
          opacity: 1; 
        }
      }
      @keyframes fadeOutSlideDown {
        from { 
          transform: translateY(0); 
          opacity: 1; 
        }
        to { 
          transform: translateY(20px); 
          opacity: 0; 
        }
      }
    `;
    document.head.appendChild(style);

    // Close modal function
    function closeModal() {
      modal.style.animation = "fadeOutSlideDown 0.5s ease-out forwards";
      setTimeout(() => modal.remove(), 500); // tunggu animasi selesai
    }

    document
      .getElementById("understood")
      .addEventListener("pointerdown", () => {
        closeModal();
      });

    // Close with Escape key
    document.addEventListener("keydown", function handleEscape(e) {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleEscape);
      }
    });
  }
}

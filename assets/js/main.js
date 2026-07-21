// Kích hoạt ScrollTrigger
const qs = (selector, parent = document) => parent.querySelector(selector);

gsap.registerPlugin(ScrollTrigger);
// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  const mainSwiper = new Swiper(".main-swiper", {
    spaceBetween: 10,
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    // thumbs: {
    //   swiper: thumbSwiper,
    // },
    autoplay: {
      delay: 3000, // thời gian giữa các lần chuyển (ms)
      disableOnInteraction: false, // không tắt khi người dùng bấm
    },

    loop: true, // lặp lại ảnh
    effect: "fade", // hiệu ứng chuyển mượt
    fadeEffect: { crossFade: true },
    speed: 1000 // tốc độ chuyển (ms)
  });

  gsapFlipIn(".animate-flip");
  gsapFlipInThenYoyo(".animate-flip-yoyo");
  gsapFadeIn(".fade-in");
  gsapFadeInThenYoyo(".fade-in-yoyo");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
  gsapFadeUp(".fade-up");
  gsapFadeDown(".fade-down");
  gsapRotateBottomLeft(".rotate-bl");
  gsapRotateBottomRight(".rotate-br");
  gsapRotateBottomLeftThenYoyo(".rotate-bl-yoyo");
  gsapRotateBottomRightThenYoyo(".rotate-br-yoyo");
  gsapFlipVerticalLeft(".flip-vertical-left");
  gsapRollInLeft(".roll-in-left");
  gsap_rotate_bl__float(".rotate-bl--float");

  // 💫 Tạo sparkles
  const sparkleContainer = document.querySelector(".sparkle-container");
  for (let i = 0; i < 16; i++) {
      const s = document.createElement("div");
      s.classList.add("sparkle");
      sparkleContainer.appendChild(s);
      const x = Math.random() * 300;
      const y = Math.random() * 400;
      gsap.set(s, { x, y, opacity: 0.2 + Math.random() * 0.8, scale: 0.5 + Math.random() });
      animateSparkle(s);
  }

  function animateSparkle(el) {
    gsap.to(el, {
        x: "+=" + (Math.random() * 100 - 50),
        y: "+=" + (Math.random() * 100 - 50),
        opacity: 0.3 + Math.random() * 0.7,
        duration: 4 + Math.random() * 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });
  }

  const tl_dresscode = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".color-palette",
      start: "top 85%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  // Thêm các animation theo thứ tự
  tl_dresscode.from(".first", { x: -100, opacity: 0 })        // box đỏ bay xuống
    .from(".second", { x: -100, opacity: 0 }, "-=0.3")       // box xanh bay từ trái
    .from(".third", { x: -100, opacity: 0 }, "-=0.3")  // box xanh lá phóng to dần
    .from(".four", { x: -100, opacity: 0 }, "-=0.3")    // box xanh lá phóng to dần
    .from(".five", { x: -100, opacity: 0 }, "-=0.3");    // box xanh lá phóng to dần

  async function playMusic(e) {
    const music = document.getElementById('audio');
    if (!music.src) {
        alert('Chưa có nhạc, vui lòng thêm src cho audio.');
        return;
    }
    if (music.paused) {
      music.play();
    } 
    music.addEventListener('play', () => {
        iconSvg.classList.add('spin');
    });
  }

  async function toggleMusic(e) {
    const audio = document.getElementById('audio');
    const iconSvg = document.getElementById('iconSvg');
    if (!audio.src) {
        alert('Chưa có nhạc, vui lòng thêm src cho audio.');
        return;
    }
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    audio.addEventListener('play', () => {
        iconSvg.classList.add('spin');
    });
    audio.addEventListener('pause', () => {
        iconSvg.classList.remove('spin');
    });
  }

  // const qrcode = document.getElementById('qr-btn');
  // qrcode.addEventListener("click", toggleQR);

  const btn = document.getElementById('player-btn');
  btn.addEventListener('click', toggleMusic);

  const form = document.forms["rsvpForm"];
  if (form) {
    form.addEventListener("submit", (e) => handleFormSubmit(e));
  }

  startCountdown(new Date("2026-09-19T18:00:00"));
});

function toggleQR(e) {
  e.preventDefault();
  Swal.fire({
      title: "",
      text: "",
      imageUrl: "https://pub-d341ea7ec201435598469d75d8c4a056.r2.dev/tu-huy/IMG_2584-optimized.webp",
      imageWidth: '100%',
      imageHeight: "auto",
      imageAlt: "Custom image",
      html: `
          <div class="qrcode-box">
              <div class="item">
                  <div class="info">
                      <p>Tiffany Hoang</p>
                      <p>215-980-3673</p>
                  </div>
                  <div class="qrcode-img">
                      <img src="assets/images/qrcode.jpg" alt="">
                  </div>
              </div>
          </div>
      `,
      confirmButtonColor: "#dba7b2ff"
  });
}

 /* ======================================================
       COUNTDOWN
    ====================================================== */

  function startCountdown(targetDate) {
    const daysEl = qs("#days");
    const hoursEl = qs("#hours");
    const minsEl = qs("#mins");
    const secsEl = qs("#secs");

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const timer = setInterval(update, 1000);
    update();

    function update() {
      const distance = targetDate - Date.now();

      if (distance <= 0) {
        clearInterval(timer);
        daysEl.textContent =
          hoursEl.textContent =
          minsEl.textContent =
          secsEl.textContent =
          "00";
        return;
      }

      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const mins = Math.floor((distance % 3600000) / 60000);
      const secs = Math.floor((distance % 60000) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minsEl.textContent = String(mins).padStart(2, "0");
      secsEl.textContent = String(secs).padStart(2, "0");
    }
  }

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("🚀 ~ handleFormSubmit ~ data:", data);

  const {
    name: name,
    confirm: confirm,
    phone: phone,
    vegetarian: vegetarian,
    guest_info: guest_info,
    other: other,
    wish: wish,
  } = data;
  console.log("🚀 ~ handleFormSubmit 2~ data:", data);

  // Thông báo khi bắt đầu gửi
  Swal.fire({
    title: 'Đang gửi ...',
    text: "Vui lòng chờ trong giây lát",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const url = "?sheet=confirm";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        phone,
        guest_info,
        vegetarian,
        wish
      }),
    });

    const result = await res.json().catch(() => ({}));
    console.log("Server response:", result);
    if (Object.keys(result).length === 0) {
      Swal.fire({
        title: "Lỗi!",
        text: "OPPS! Không tìm thấy server",
        icon: "error",
        confirmButtonText: "Thử lại",
        confirmButtonColor: "#000",
      });
      return;
    }

    form.reset();

    // Thông báo thành công
    Swal.fire({
      title: "Thành công!",
      text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    console.error("Error:", error);

    // Thông báo lỗi
    Swal.fire({
      title: "Lỗi!",
      text: "OPPS! Đã xảy ra lỗi: " + error.message,
      icon: "error",
      confirmButtonText: "Thử lại",
      confirmButtonColor: "#000",
    });
  }
}

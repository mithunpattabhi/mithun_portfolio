
const RESUME_URL = "./Mithun_AIML_Resume.pdf";

const typingEl = document.getElementById("typing");
const splashEl = document.getElementById("splash");
const siteEl = document.getElementById("site");

const nameFull = "MITHUN PATTABHI";
const code = "23BCE8347";

function wait(ms){ return new Promise(r => setTimeout(r, ms)); }

async function typeAndMorph() {
  for (let i = 1; i <= nameFull.length; i++) {
    typingEl.textContent = nameFull.slice(0, i);
    await wait(80);
  }
  await wait(600);
  for (let k = 1; k <= code.length; k++) {
    typingEl.textContent = code.slice(0, k);
    await wait(110);
  }
  await wait(400);
  hideSplash();
}

function hideSplash(){
  splashEl.style.opacity = "0";
  splashEl.style.transform = "translateY(-6px)";
  setTimeout(()=>{
    splashEl.style.display = "none";
    siteEl.classList.remove("hidden");
  }, 520);
}

window.addEventListener("load", () => {
  siteEl.classList.add("hidden");
  typeAndMorph().catch(()=> hideSplash());
});

const viewResumeBtn = document.getElementById("viewResumeBtn");
const resumeModal = document.getElementById("resumeModal");
const resumeIframe = document.getElementById("resumeIframe");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalOpenNew = document.getElementById("modalOpenNew");
const openInNewTab = document.getElementById("openInNewTab");

function tryEmbedDirect(publicUrl){
  resumeIframe.src = publicUrl;
  resumeModal.setAttribute("aria-hidden","false");
  modalOpenNew.href = publicUrl;
  openInNewTab.href = publicUrl;
  openInNewTab.style.display = "inline-block";

  let loaded = false;

  const onLoad = () => { loaded = true; resumeIframe.removeEventListener('load', onLoad); clearTimeout(timeout); };
  resumeIframe.addEventListener('load', onLoad);

  const timeout = setTimeout(() => {
    resumeIframe.removeEventListener('load', onLoad);
    if (!loaded) {
      tryGoogleViewer(publicUrl);
    }
  }, 1800); 
}

function tryGoogleViewer(publicUrl){
  const viewer = `https://docs.google.com/viewer?url=${encodeURIComponent(publicUrl)}&embedded=true`;
  resumeIframe.src = viewer;
  modalOpenNew.href = publicUrl;
  openInNewTab.href = publicUrl;
  openInNewTab.style.display = "inline-block";

  let googleLoaded = false;
  const onLoad = () => { googleLoaded = true; resumeIframe.removeEventListener('load', onLoad); clearTimeout(gtimeout); };
  resumeIframe.addEventListener('load', onLoad);

  const gtimeout = setTimeout(() => {
    resumeIframe.removeEventListener('load', onLoad);
    if (!googleLoaded) {
      window.open(publicUrl, "_blank");
      closeResumeModal();
    }
  }, 2200);
}

function openResumeModal(publicUrl){
  resumeIframe.src = "about:blank";
  tryEmbedDirect(publicUrl);
}

function closeResumeModal(){
  resumeIframe.src = "";
  resumeModal.setAttribute("aria-hidden","true");
}

viewResumeBtn.addEventListener("click", () => {
  openResumeModal(RESUME_URL);
});

modalBackdrop.addEventListener("click", closeResumeModal);
modalClose.addEventListener("click", closeResumeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeResumeModal();
});

resumeIframe.addEventListener("error", () => {
  window.open(RESUME_URL, "_blank");
  closeResumeModal();
});

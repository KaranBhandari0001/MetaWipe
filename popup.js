const upload = document.getElementById("upload");
const cleanBtn = document.getElementById("clean");
const downloadLink = document.getElementById("download");
const preview = document.getElementById("preview");

let imageFile;

// Hide initially
cleanBtn.style.display = "none";
downloadLink.style.display = "none";

upload.addEventListener("change", (e) => {
  imageFile = e.target.files[0];

  if (imageFile) {
    const url = URL.createObjectURL(imageFile);
    preview.src = url;
    preview.style.display = "block";

    cleanBtn.style.display = "block"; // 👈 show remove button
    downloadLink.style.display = "none"; // reset download
  }
});

cleanBtn.addEventListener("click", () => {
  if (!imageFile) return alert("Upload image first");

  const img = new Image();
  const url = URL.createObjectURL(imageFile);

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      const cleanUrl = URL.createObjectURL(blob);

      downloadLink.href = cleanUrl;
      downloadLink.download = "metawipe-clean.png";
      downloadLink.style.display = "block"; // 👈 show download
    }, "image/png");
  };

  img.src = url;
});
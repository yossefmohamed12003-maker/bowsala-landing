// Places each .photo's <img> from a source-pixel crop: data-crop="sx,sy,sw"
// (crop width in source px; height follows the box aspect). Never stretches: one uniform scale.
document.querySelectorAll('.photo[data-src]').forEach((box) => {
  const [sx, sy, sw] = box.dataset.crop.split(',').map(Number);
  const img = new Image();
  img.src = box.dataset.src;
  img.onload = () => {
    const s = box.clientWidth / sw;
    img.style.width = img.naturalWidth * s + 'px';
    img.style.height = img.naturalHeight * s + 'px';
    img.style.left = -sx * s + 'px';
    img.style.top = -sy * s + 'px';
    box.appendChild(img);
    box.dataset.ready = '1';
  };
});

const API = 'http://45.130.151.44:3001/';

async function handleFiles(files) {
  const file = files[0];
  const div = document.querySelector('.block__image-div');
  const loader = document.querySelector('.block__loader');
  let img = document.querySelector('.block__image-div-obj');

  if (!img) {
    img = document.createElement("img");
    img.classList.add("block__image-div-obj");
    img.file = file;
    div.append(img);
  }
  div.style.display = 'none';
  loader.style.display = 'block';

  img.addEventListener('load', () => {
    loader.style.display = 'none';
    div.style.display = 'block';
  });

  await sendFile(img, file);
}

async function sendFile(img, file) {
  const fd = new FormData();
  fd.append('uploadFile', file);
  let newFile = undefined
  await fetch(API, {
    method: 'POST',
    body: fd
  })
  .then((resp) => {
    return resp.blob();
  })
  .then((blob) => {
    newFile = blob;
  });
  const a = document.querySelector('.download');
  const url = window.URL.createObjectURL(newFile);
  a.href = url;
  a.click();
  window.URL.revokeObjectURL(url);
  loadImg(newFile, img);
}

function loadImg(file, div) {
  const reader = new FileReader();
  reader.onload = (
    function(aImg) {
      return function(e) {
        aImg.src = e.target.result;
      };
    }
  )(div);

  reader.readAsDataURL(file);
}

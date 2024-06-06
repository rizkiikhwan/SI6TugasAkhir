const navbar = document.getElementsByTagName('nav')[0];
window.addEventListener('scroll', function() {
    console.log(window.scrollY);
    if (window.scrollY > 1) {
        navbar.classList.replace('bg-transparent', 'nav-color');
    } else if (this.window.scrollY <= 0) {
        navbar.classList.replace('nav-color', 'bg-transparent');
    }
});

const fileMRI = document.getElementById('fileMRI');
const cardHasil = document.getElementById('cardHasil');
const btnCek = document.getElementById('btnCek');
const btnHasilDiagnosis = document.getElementById('btnHasilDiagnosis');

fileMRI.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const img = document.createElement('img');
    img.src = event.target.result;
    cardHasil.innerHTML = '';
    cardHasil.appendChild(img);
  };

  reader.readAsDataURL(file);
});

btnCek.addEventListener('click', async function() {
  // Memuat model yang sudah dilatih
  const model = await tf.loadModel('my_model.h5');

  // Mendapatkan gambar dari card hasil
  const imgData = cardHasil.querySelector('img').src;
  const imgTensor = tf.browser.decodeImage(imgData);

  // Memprediksi klasifikasi gambar
  const predictions = await model.predict(imgTensor.expandDims(0));
  const predictedClass = predictions.argMax(1).dataSync()[0];

  // Menampilkan hasil klasifikasi pada button HASIL DIAGNOSIS
  btnHasilDiagnosis.textContent = `Hasil Diagnosis: ${predictedClass}`;
  btnHasilDiagnosis.disabled = false;
});
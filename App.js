/**
 * ============================================================================
 * PENGUKUR INSAN KAMIL - JavaScript Utama
 * ============================================================================
 * Aplikasi evaluasi diri berbasis refleksi tiga pilar: Insan, Islam, dan Iman.
 * Dibuat menggunakan JavaScript murni (Vanilla JS) tanpa backend/database.
 */

// --- 1. DATA PERTANYAAN (15 Pertanyaan Reflektif) ---
const questions = [
  // --- Kategori Insan (5 Pertanyaan) ---
  {
    id: 1,
    category: 'insan',
    categoryName: 'Insan',
    aspect: 'Akhlak & Sopan Santun',
    text: 'Saya berusaha bertutur kata dengan santun, menjaga adab, dan menghargai orang lain dalam pergaulan sehari-hari.'
  },
  {
    id: 2,
    category: 'insan',
    categoryName: 'Insan',
    aspect: 'Kejujuran (Ash-Shidq)',
    text: 'Saya menjunjung tinggi kejujuran dalam perkataan maupun tindakan, meskipun dalam situasi yang sulit atau merugikan saya.'
  },
  {
    id: 3,
    category: 'insan',
    categoryName: 'Insan',
    aspect: 'Tanggung Jawab (Amanah)',
    text: 'Saya menjalankan tugas, janji, dan kewajiban yang dipercayakan kepada saya dengan sungguh-sungguh tanpa menunda-nunda.'
  },
  {
    id: 4,
    category: 'insan',
    categoryName: 'Insan',
    aspect: 'Kepedulian Sesama (Empati)',
    text: 'Saya memiliki empati dan tergerak untuk membantu orang lain yang sedang tertimpa kesulitan atau membutuhkan pertolongan.'
  },
  {
    id: 5,
    category: 'insan',
    categoryName: 'Insan',
    aspect: 'Pengendalian Diri (Ihsan)',
    text: 'Saya mampu mengendalikan amarah, hawa nafsu, dan ego ketika menghadapi cobaan, tekanan, atau perbedaan pendapat.'
  },

  // --- Kategori Islam (5 Pertanyaan) ---
  {
    id: 6,
    category: 'islam',
    categoryName: 'Islam',
    aspect: 'Pelaksanaan Ibadah Rutin',
    text: 'Saya melaksanakan ibadah yang diperintahkan dengan penuh kesadaran diri, keikhlasan, dan tanpa paksaan orang lain.'
  },
  {
    id: 7,
    category: 'islam',
    categoryName: 'Islam',
    aspect: 'Penjagaan Shalat Lima Waktu',
    text: 'Saya menjaga shalat fardhu lima waktu tepat pada waktunya dan berusaha melaksanakannya dengan tertib serta khusyuk.'
  },
  {
    id: 8,
    category: 'islam',
    categoryName: 'Islam',
    aspect: 'Interaksi dengan Al-Qur\'an',
    text: 'Saya meluangkan waktu secara rutin untuk membaca, mempelajari, dan merenungkan kandungan ayat-ayat suci Al-Qur\'an.'
  },
  {
    id: 9,
    category: 'islam',
    categoryName: 'Islam',
    aspect: 'Menjalankan Kewajiban Muslim',
    text: 'Saya menunaikan kewajiban sebagai seorang muslim (seperti puasa, zakat/infaq, dan menutup aurat) dengan penuh ketaatan.'
  },
  {
    id: 10,
    category: 'islam',
    categoryName: 'Islam',
    aspect: 'Menjauhi Hal yang Dilarang',
    text: 'Saya secara sadar berusaha sekuat tenaga menjauhi perbuatan maksiat, ghibah, dusta, serta hal-hal yang diharamkan agama.'
  },

  // --- Kategori Iman (5 Pertanyaan) ---
  {
    id: 11,
    category: 'iman',
    categoryName: 'Iman',
    aspect: 'Keyakinan kepada Allah SWT',
    text: 'Saya meyakini dengan sepenuh hati keesaan dan kebesaran Allah SWT serta senantiasa bergantung dan memohon pertolongan-Nya.'
  },
  {
    id: 12,
    category: 'iman',
    categoryName: 'Iman',
    aspect: 'Keyakinan kepada Malaikat',
    text: 'Saya mengimani keberadaan malaikat Allah dan merasa diawasi oleh malaikat pencatat amal dalam setiap gerak-gerik saya.'
  },
  {
    id: 13,
    category: 'iman',
    categoryName: 'Iman',
    aspect: 'Keyakinan kepada Kitab-Kitab Allah',
    text: 'Saya meyakini kitab-kitab Allah dan menjadikan Al-Qur\'an sebagai pedoman utama petunjuk kebenaran dalam hidup saya.'
  },
  {
    id: 14,
    category: 'iman',
    categoryName: 'Iman',
    aspect: 'Keyakinan kepada Rasul-Rasul Allah',
    text: 'Saya mengimani para nabi dan rasul serta berusaha meneladani akhlak mulia dan sunnah Rasulullah Muhammad SAW.'
  },
  {
    id: 15,
    category: 'iman',
    categoryName: 'Iman',
    aspect: 'Hari Akhir & Takdir (Qadha & Qadar)',
    text: 'Saya mengimani adanya hari pembalasan dan ikhlas menerima ketetapan takdir Allah setelah berusaha secara maksimal.'
  }
];

// --- 2. PILIHAN SKALA JAWABAN (Skala 1 - 5) ---
const scaleOptions = [
  { value: 1, label: 'Tidak Pernah / Sangat Tidak Sesuai' },
  { value: 2, label: 'Jarang / Tidak Sesuai' },
  { value: 3, label: 'Kadang-kadang / Cukup Sesuai' },
  { value: 4, label: 'Sering / Sesuai' },
  { value: 5, label: 'Selalu / Sangat Sesuai' }
];

// --- 3. STATUS APLIKASI (Application State) ---
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

// --- 4. REFERENSI ELEMEN DOM ---
const viewHome = document.getElementById('view-home');
const viewQuiz = document.getElementById('view-quiz');
const viewResult = document.getElementById('view-result');

const progressBarFill = document.getElementById('quiz-progress-fill');
const progressText = document.getElementById('quiz-progress-text');
const categoryBadge = document.getElementById('quiz-category-badge');
const aspectLabel = document.getElementById('quiz-aspect-label');
const questionText = document.getElementById('quiz-question-text');
const optionsContainer = document.getElementById('quiz-options-container');
const validationAlert = document.getElementById('validation-alert');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const questionNavChips = document.getElementById('question-nav-chips');

// --- 5. FUNGSI PERALIHAN HALAMAN ---
function showView(viewName) {
  viewHome.classList.add('d-none');
  viewQuiz.classList.add('d-none');
  viewResult.classList.add('d-none');

  if (viewName === 'home') {
    viewHome.classList.remove('d-none');
  } else if (viewName === 'quiz') {
    viewQuiz.classList.remove('d-none');
  } else if (viewName === 'result') {
    viewResult.classList.remove('d-none');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 6. FUNGSI MEMULAI KUIS ---
function startQuiz() {
  currentQuestionIndex = 0;
  userAnswers = new Array(questions.length).fill(null);
  showView('quiz');
  renderQuestion();
}

// --- 7. FUNGSI MENAMPILKAN PERTANYAAN ---
function renderQuestion() {
  const q = questions[currentQuestionIndex];
  hideValidationError();

  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);
  
  progressBarFill.style.width = `${progressPercent}%`;
  progressText.textContent = `Pertanyaan ${questionNumber} dari ${totalQuestions}`;

  categoryBadge.className = `category-pill ${q.category}`;
  let iconClass = 'bi-person-heart';
  if (q.category === 'islam') iconClass = 'bi-moon-stars';
  if (q.category === 'iman') iconClass = 'bi-shield-check';
  categoryBadge.innerHTML = `<i class="bi ${iconClass}"></i> Kategori ${q.categoryName}`;
  
  aspectLabel.textContent = `Aspek: ${q.aspect}`;
  questionText.textContent = q.text;

  // Render Pilihan Jawaban 1-5
  optionsContainer.innerHTML = '';
  const currentAnswer = userAnswers[currentQuestionIndex];

  scaleOptions.forEach(opt => {
    const isSelected = currentAnswer === opt.value;
    const optionDiv = document.createElement('div');
    optionDiv.className = `option-item ${isSelected ? 'selected' : ''}`;
    optionDiv.setAttribute('role', 'button');
    optionDiv.setAttribute('tabindex', '0');
    optionDiv.id = `option-btn-${opt.value}`;

    optionDiv.innerHTML = `
      <div class="option-circle">${opt.value}</div>
      <div class="option-label">${opt.label}</div>
    `;

    optionDiv.addEventListener('click', () => {
      selectOption(opt.value);
    });

    optionDiv.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(opt.value);
      }
    });

    optionsContainer.appendChild(optionDiv);
  });

  // Tombol Sebelumnya
  if (currentQuestionIndex === 0) {
    btnPrev.classList.add('invisible');
  } else {
    btnPrev.classList.remove('invisible');
  }

  // Tombol Selanjutnya
  if (currentQuestionIndex === questions.length - 1) {
    btnNext.innerHTML = `Lihat Hasil <i class="bi bi-check-circle ms-1"></i>`;
  } else {
    btnNext.innerHTML = `Selanjutnya <i class="bi bi-arrow-right ms-1"></i>`;
  }

  renderNavChips();
}

// --- 8. FUNGSI MEMILIH OPSI JAWABAN ---
function selectOption(value) {
  userAnswers[currentQuestionIndex] = value;
  hideValidationError();

  const allOptions = optionsContainer.querySelectorAll('.option-item');
  allOptions.forEach((item, idx) => {
    const optValue = scaleOptions[idx].value;
    if (optValue === value) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });

  renderNavChips();
}

// --- 9. FUNGSI NAVIGASI SOAL & VALIDASI ---
function nextQuestion() {
  if (userAnswers[currentQuestionIndex] === null) {
    showValidationError('Silakan pilih salah satu jawaban (skala 1–5) terlebih dahulu sebelum melanjutkan.');
    return;
  }

  if (currentQuestionIndex === questions.length - 1) {
    const unansweredIndex = userAnswers.findIndex(ans => ans === null);
    if (unansweredIndex !== -1) {
      showValidationError(`Pertanyaan nomor ${unansweredIndex + 1} belum dijawab. Mohon lengkapi semua pertanyaan.`);
      currentQuestionIndex = unansweredIndex;
      renderQuestion();
      return;
    }
    calculateAndShowResults();
  } else {
    currentQuestionIndex++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function jumpToQuestion(index) {
  if (index >= 0 && index < questions.length) {
    currentQuestionIndex = index;
    renderQuestion();
  }
}

function renderNavChips() {
  questionNavChips.innerHTML = '';
  questions.forEach((q, idx) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'nav-chip';
    chip.textContent = idx + 1;
    chip.title = `Pertanyaan ${idx + 1}: ${q.aspect}`;

    if (idx === currentQuestionIndex) {
      chip.classList.add('current');
    } else if (userAnswers[idx] !== null) {
      chip.classList.add('answered');
    }

    chip.addEventListener('click', () => {
      jumpToQuestion(idx);
    });

    questionNavChips.appendChild(chip);
  });
}

function showValidationError(message) {
  validationAlert.textContent = message;
  validationAlert.classList.remove('d-none');
}

function hideValidationError() {
  validationAlert.classList.add('d-none');
}

// --- 10. SISTEM PERHITUNGAN SKOR & KATEGORISASI HASIL ---
function calculateAndShowResults() {
  let scoreInsan = 0;
  let scoreIslam = 0;
  let scoreIman = 0;

  questions.forEach((q, idx) => {
    const val = userAnswers[idx] || 0;
    if (q.category === 'insan') scoreInsan += val;
    else if (q.category === 'islam') scoreIslam += val;
    else if (q.category === 'iman') scoreIman += val;
  });

  const totalScore = scoreInsan + scoreIslam + scoreIman;
  const percentage = Math.round((totalScore / 75) * 100);

  let resultCategory = '';
  let resultDescription = '';
  let reflectionTips = '';

  if (percentage <= 20) {
    resultCategory = 'Perlu Banyak Refleksi';
    resultDescription = 'Skor Anda mengindikasikan perlunya pembenahan diri dan refleksi mendalam terhadap nilai-nilai dasar Insan, pelaksanaan ibadah Islam, serta penguatan rukun Iman. Jangan berkecil hati, jadikan hasil ini titik awal untuk bangkit memperbaiki diri.';
    reflectionTips = 'Fokuslah memulai kembali dari hal yang paling fundamental: menjaga shalat wajib, membiasakan berkata jujur, dan memperbanyak istighfar serta dzikir.';
  } else if (percentage <= 40) {
    resultCategory = 'Tahap Awal';
    resultDescription = 'Anda berada pada tahap awal pembelajaran dan pembiasaan diri. Nilai-nilai kesalehan sudah mulai Anda kenali, namun konsistensi (istiqamah) dalam pengamalan akhlak dan ibadah masih perlu ditingkatkan.';
    reflectionTips = 'Bangun komitmen harian kecil namun berkesinambungan. Mulai dengan menjaga adab bertutur kata, tidak meninggalkan shalat lima waktu, dan mencari lingkungan yang mendukung kebaikan.';
  } else if (percentage <= 60) {
    resultCategory = 'Cukup Baik';
    resultDescription = 'Pencapaian Anda sudah cukup baik. Anda telah berusaha menjalankan kewajiban sebagai muslim, berakhlak terpuji, dan mempercayai rukun iman dalam keseharian. Terdapat beberapa aspek yang dapat lebih dioptimalkan menuju kesempurnaan ihsan.';
    reflectionTips = 'Tingkatkan kualitas khusyuk dalam beribadah, tingkatkan kepedulian sosial terhadap sesama, dan perdalam pemahaman makna Al-Qur\'an serta rukun iman.';
  } else if (percentage <= 80) {
    resultCategory = 'Baik';
    resultDescription = 'Alhamdulillah, pencapaian Anda berada pada kategori Baik. Anda menunjukkan komitmen yang solid dalam mempraktikkan akhlak mulia (Insan), konsisten beribadah (Islam), dan meyakini rukun iman secara sadar dan bertanggung jawab.';
    reflectionTips = 'Pertahankan kebiasaan baik ini, jaga keikhlasan niat agar terhindar dari sifat riya\', dan terus pelajari sunnah Nabi Muhammad SAW untuk menyempurnakan amal.';
  } else {
    resultCategory = 'Sangat Baik';
    resultDescription = 'Masya Allah, evaluasi diri Anda menunjukkan tingkat keselarasan yang Sangat Baik antara dimensi akhlak (Insan), ketertiban ibadah (Islam), dan kedalaman akidah (Iman). Jiwa Insan Kamil tercermin dalam keseimbangan ketiga pilar ini.';
    reflectionTips = 'Senantiasa rawat hati dengan kerendahan hati (tawadhu\'), teruslah menebarkan kebaikan dan manfaat bagi masyarakat sekitar, serta mohon istiqamah kepada Allah SWT.';
  }

  // Tampilkan data ke elemen hasil
  document.getElementById('res-total-score').textContent = totalScore;
  document.getElementById('res-percentage').textContent = `${percentage}%`;
  
  const levelBadge = document.getElementById('res-level-badge');
  levelBadge.textContent = resultCategory;

  // Skor per kategori
  document.getElementById('res-score-insan').textContent = `${scoreInsan}/25`;
  document.getElementById('res-score-islam').textContent = `${scoreIslam}/25`;
  document.getElementById('res-score-iman').textContent = `${scoreIman}/25`;

  // Persentase per kategori untuk visualisasi bar
  const pctInsan = Math.round((scoreInsan / 25) * 100);
  const pctIslam = Math.round((scoreIslam / 25) * 100);
  const pctIman = Math.round((scoreIman / 25) * 100);

  // Update Mini Progress Bar di Card
  const miniInsan = document.getElementById('chart-fill-insan-mini');
  if (miniInsan) miniInsan.style.width = `${pctInsan}%`;
  const miniIslam = document.getElementById('chart-fill-islam-mini');
  if (miniIslam) miniIslam.style.width = `${pctIslam}%`;
  const miniIman = document.getElementById('chart-fill-iman-mini');
  if (miniIman) miniIman.style.width = `${pctIman}%`;

  // Update Diagram Perbandingan Kategori (Bar Chart)
  document.getElementById('chart-fill-insan').style.width = `${pctInsan}%`;
  document.getElementById('chart-fill-islam').style.width = `${pctIslam}%`;
  document.getElementById('chart-fill-iman').style.width = `${pctIman}%`;

  document.getElementById('chart-val-insan').textContent = `${scoreInsan}/25 (${pctInsan}%)`;
  document.getElementById('chart-val-islam').textContent = `${scoreIslam}/25 (${pctIslam}%)`;
  document.getElementById('chart-val-iman').textContent = `${scoreIman}/25 (${pctIman}%)`;

  // Penjelasan Naratif
  document.getElementById('res-description').textContent = resultDescription;
  document.getElementById('res-tips').textContent = reflectionTips;

  renderAnswerReview();
  showView('result');
}

// --- 11. TINJAUAN JAWABAN (REVIEW) ---
function renderAnswerReview() {
  const reviewContainer = document.getElementById('review-list-container');
  reviewContainer.innerHTML = '';

  questions.forEach((q, idx) => {
    const val = userAnswers[idx];
    const optObj = scaleOptions.find(o => o.value === val) || { label: '-' };

    const itemDiv = document.createElement('div');
    itemDiv.className = 'py-3 border-bottom';

    let catBadgeClass = 'text-bg-primary';
    if (q.category === 'islam') catBadgeClass = 'text-bg-success';
    if (q.category === 'iman') catBadgeClass = 'text-bg-warning text-dark';

    itemDiv.innerHTML = `
      <div class="d-flex justify-content-between align-items-start gap-2 mb-1">
        <div>
          <span class="badge ${catBadgeClass} me-1">${q.categoryName}</span>
          <span class="text-muted small">No. ${q.id} • ${q.aspect}</span>
        </div>
        <span class="badge bg-light text-dark border font-monospace">Poin: ${val} / 5</span>
      </div>
      <p class="mb-1 text-dark small">${q.text}</p>
      <div class="small fw-semibold" style="color: var(--primary-emerald);">
        <i class="bi bi-check2-circle me-1"></i>Jawaban Anda: ${optObj.label}
      </div>
    `;

    reviewContainer.appendChild(itemDiv);
  });
}

// --- 12. EVENT LISTENERS & TOMBOL AKSI ---
document.getElementById('btn-start-quiz').addEventListener('click', () => {
  startQuiz();
});

btnNext.addEventListener('click', () => {
  nextQuestion();
});

btnPrev.addEventListener('click', () => {
  prevQuestion();
});

document.getElementById('btn-restart-quiz').addEventListener('click', () => {
  if (confirm('Apakah Anda ingin mengulang pengukuran dari awal? Jawaban sebelumnya akan direset.')) {
    startQuiz();
  }
});

document.getElementById('btn-back-home').addEventListener('click', () => {
  showView('home');
});

const btnPrint = document.getElementById('btn-print-result');
if (btnPrint) {
  btnPrint.addEventListener('click', () => {
    window.print();
  });
}

// Inisialisasi awal ke halaman beranda saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  showView('home');
});

import type { Article, BlogSource } from "./types";
import { excerpt } from "@/lib/utils";

type Story = [title: string, label: string, intro: string, imageKey: string];

const coverPool = [
  "photo-1518770660439-4636190af475",
  "photo-1634017839464-5c339ebe3cb4",
  "photo-1516321318423-f06f85e504b3",
  "photo-1515879218367-8466d910aaa4",
  "photo-1504384308090-c894fdcc538d",
  "photo-1498050108023-c5249f4df085",
  "photo-1461749280684-dccba630e2f6",
  "photo-1519389950473-47ba0277781c",
  "photo-1521737711867-e3b97375f902",
  "photo-1555066931-4365d14bab8c",
  "photo-1556761175-5973dc0f32e7",
  "photo-1517245386807-bb43f82c33c4",
];

const legacyStories: Story[] = [
  ["Cara Menghitung Rumus Keliling Lingkaran dengan Mudah", "Rumus-rumus", "Panduan lengkap menghitung keliling lingkaran lengkap dengan contoh soal.", "photo-1518770660439-4636190af475"],
  ["Rumus Luas Persegi Panjang dan Contoh Soalnya", "Rumus-rumus", "Memahami rumus luas persegi panjang serta cara cepat mengerjakannya.", "photo-1509228468518-180dd4864904"],
  ["Rumus Volume Balok, Kubus, dan Tabung Lengkap", "Rumus-rumus", "Kumpulan rumus bangun ruang yang sering keluar di ujian.", "photo-1509228468518-180dd4864904"],
  ["Rumus Trigonometri Dasar yang Wajib Dihafal", "Rumus-rumus", "Sin, cos, tan, dan identitas trigonometri yang harus kamu kuasai.", "photo-1551288049-bebda4e38f71"],
  ["Tips Belajar Fisika untuk Pemula Tanpa Stres", "Edukasi", "Cara memahami fisika dengan mudah meskipun kamu baru mulai.", "photo-1635070041078-e363dbe005cb"],
  ["Mengenal Sejarah Kemerdekaan Indonesia untuk Pelajar", "Edukasi", "Ringkasan sejarah perjuangan kemerdekaan yang mudah dipahami.", "photo-1471014286613-c9eb7d5b8f5d"],
  ["Cara Cepat Menghafal Rumus Matematika", "Edukasi", "Teknik menghafal rumus matematika agar tidak cepat lupa.", "photo-1509228468518-180dd4864904"],
  ["Soal Cerita Matematika dan Pembahasannya", "Edukasi", "Kumpulan soal cerita matematika beserta langkah penyelesaiannya.", "photo-1509228468518-180dd4864904"],
  ["Berita Teknologi Terbaru Minggu Ini", "Berita", "Rangkuman berita teknologi paling menarik sepanjang minggu.", "photo-1518770660439-4636190af475"],
  ["Kabar Pendidikan Indonesia Terkini", "Berita", "Update terbaru seputar dunia pendidikan di Indonesia.", "photo-1503676260728-1c00da094a0b"],
  ["Perkembangan Teknologi AI di Indonesia 2026", "Berita", "Bagaimana kecerdasan buatan tumbuh pesat di Tanah Air.", "photo-1535378917042-10a22c95931a"],
  ["Kebijakan Baru Dunia Pendidikan Nasional", "Berita", "Perubahan kebijakan pendidikan yang perlu diketahui pelajar dan guru.", "photo-1503676260728-1c00da094a0b"],
  ["Tips Sukses Kuliah di Era Digital", "Campus Life", "Strategi belajar dan bersosialisasi selama kuliah di era modern.", "photo-1522202176988-66273c2fd55f"],
  ["Persiapan Ujian Tengah Semester yang Efektif", "Campus Life", "Cara menyusun jadwal belajar menghadapi UTS tanpa panik.", "photo-1509062522246-3755977927d7"],
  ["Tips Memilih Jurusan Kuliah yang Tepat", "Campus Life", "Pertimbangan penting sebelum memutuskan jurusan kuliah.", "photo-1522202176988-66273c2fd55f"],
  ["Kehidupan Anak Kos: Tips Hemat dan Produktif", "Campus Life", "Pengalaman dan tips mengatur keuangan saat merantau kuliah.", "photo-1522708323590-d24dbb6b0267"],
  ["Cara Menulis CV yang Menarik Perhatian HRD", "Careers", "Struktur CV yang tepat agar lamaranmu dilirik recruiter.", "photo-1586281380349-632531db7ed4"],
  ["Persiapan Wawancara Kerja Pertama", "Careers", "Latihan pertanyaan wawancara dan cara menjawabnya dengan percaya diri.", "photo-1573496359142-b8d87734a5a2"],
  ["Skill yang Dibutuhkan Dunia Kerja 2026", "Careers", "Keterampilan yang paling dicari perusahaan tahun ini.", "photo-1521737711867-e3b97375f902"],
  ["Cara Membangun Portofolio Digital", "Careers", "Langkah menyusun portofolio online yang profesional.", "photo-1486312338219-ce68d2c6f44d"],
  ["Review Jurnal Ilmiah untuk Pemula", "Umum dan Lain-lain", "Cara membaca dan menilai jurnal ilmiah dengan kritis.", "photo-1507842217343-583bb7270b66"],
  ["Cara Menulis Artikel yang Menarik", "Umum dan Lain-lain", "Rahasia membuat tulisan yang enak dibaca dari awal sampai akhir.", "photo-1455390582262-044cdead277a"],
  ["Manfaat Membaca Buku bagi Otak", "Umum dan Lain-lain", "Alasan ilmiah mengapa membaca buku baik untukmu.", "photo-1512820790803-83ca734da794"],
  ["Cara Mengelola Waktu dengan Teknik Pomodoro", "Umum dan Lain-lain", "Teknik fokus 25 menit yang terbukti meningkatkan produktivitas.", "photo-1526379095098-d400fd0bf935"],
  ["Doa Memohon Kelancaran Rezeki", "Doa dan Ibadah", "Bacaan doa beserta artinya agar dimudahkan dalam mencari rezeki.", "photo-1519681393784-d120267933ba"],
  ["Doa Setelah Sholat Lengkap dengan Artinya", "Doa dan Ibadah", "Kumpulan doa setelah sholat yang bisa diamalkan sehari-hari.", "photo-1519681393784-d120267933ba"],
  ["Resep Nasi Goreng Spesial Rumahan", "Resep", "Nasi goreng lezat dengan bahan yang mudah ditemukan.", "photo-1512058564366-18510be2db19"],
  ["Resep Ayam Geprek Sambal Bawang", "Resep", "Ayam geprek renyah dengan sambal bawang yang menggugah selera.", "photo-1599022306117-b8057bbd7aa9"],
  ["VLOG: Review Laptop untuk Mahasiswa", "VLOG", "Rekomendasi laptop terjangkau untuk kebutuhan kuliah.", "photo-1496181133206-80ce9b88a853"],
  ["VLOG: Tour Perpustakaan Kampus", "VLOG", "Jelajah fasilitas perpustakaan kampus yang nyaman untuk belajar.", "photo-1521587760476-6c12a4b040da"],
  ["Prompt AI untuk Membuat Artikel Blog", "Prompt AI", "Contoh prompt agar AI menghasilkan artikel blog yang rapi.", "photo-1535378917042-10a22c95931a"],
  ["Prompt AI untuk Belajar Bahasa Inggris", "Prompt AI", "Prompt efektif untuk latihan speaking dan menulis bahasa Inggris.", "photo-1535378917042-10a22c95931a"],
  ["Cara Membuat Blog dengan Blogger untuk Pemula", "Tekno", "Langkah demi langkah membuat blog gratis di Blogger.", "photo-1461749280684-dccba630e2f6"],
  ["Tutorial Dasar HTML dan CSS", "Tekno", "Memulai belajar membangun halaman web dari nol.", "photo-1542831371-29b0f74f9713"],
];

const teknoblogStories: Story[] = [
  ["Review Smartphone Android Terbaik 2026", "Tekno", "Perbandingan spesifikasi dan harga ponsel Android unggulan tahun ini.", "photo-1511707171634-5f897ff02aa9"],
  ["Cara Mempercepat Koneksi WiFi di Rumah", "Tekno", "Tips sederhana mengatasi WiFi lemot tanpa ganti provider.", "photo-1558481795-7f0a7d906f5d"],
  ["Tutorial Membuat Website dengan React", "Tekno", "Panduan membangun aplikasi web modern menggunakan React.", "photo-1461749280684-dccba630e2f6"],
  ["Belajar JavaScript dari Nol", "Tekno", "Dasar-dasar JavaScript untuk pemula yang ingin jadi developer.", "photo-1461749280684-dccba630e2f6"],
  ["10 Ekstensi Chrome yang Wajib Dimiliki", "Tekno", "Ekstensi penghemat waktu untuk browsing dan bekerja.", "photo-1461749280684-dccba630e2f6"],
  ["Cara Mengamankan Akun Media Sosial", "Tekno", "Langkah mengaktifkan verifikasi dua langkah dan melindungi akunmu.", "photo-1563013544-824ae1b704d3"],
  ["Perbandingan iOS vs Android 2026", "Tekno", "Kelebihan dan kekurangan dua sistem operasi terbesar.", "photo-1511707171634-5f897ff02aa9"],
  ["Tips Membeli Laptop Bekas yang Masih Layak", "Tekno", "Checklist penting sebelum membeli laptop second hand.", "photo-1496181133206-80ce9b88a853"],
  ["Cara Install Windows di Mac dengan Boot Camp", "Tekno", "Panduan dual boot Windows dan macOS tanpa ribet.", "photo-1611186871348-b1ce696e52c9"],
  ["Mengenal Blockchain untuk Pemula", "Tekno", "Apa itu blockchain dan bagaimana cara kerjanya.", "photo-1639322537228-f710d846310a"],
  ["Cara Membuat Bot Telegram Sederhana", "Tekno", "Membangun bot Telegram otomatis dengan Python.", "photo-1555066931-4365d14bab8c"],
  ["Optimasi SEO untuk Website WordPress", "Tekno", "Cara menaikkan peringkat website di mesin pencari.", "photo-1460925895917-afdab827c52f"],
  ["Cara Menggunakan Git dan GitHub", "Tekno", "Version control untuk pemula dari commit sampai pull request.", "photo-1556075798-4825dfaaf498"],
  ["Tutorial Docker untuk Developer Pemula", "Tekno", "Kontainerisasi aplikasi dengan Docker dalam 10 menit.", "photo-1605745341112-85968b19335b"],
  ["Membangun REST API dengan Node.js", "Tekno", "Membuat API sederhana dengan Express dan MongoDB.", "photo-1461749280684-dccba630e2f6"],
  ["Cara Memonitor Suhu CPU dan GPU", "Tekno", "Tools dan cara menjaga suhu perangkat tetap stabil.", "photo-1591405351990-4726e331f141"],
  ["Tips Merawat Baterai Smartphone", "Tekno", "Kebiasaan kecil yang membuat baterai HP lebih awet.", "photo-1511707171634-5f897ff02aa9"],
  ["Review Headset Nirkabel Budget", "Tekno", "Headset bluetooth murah dengan kualitas suara terbaik.", "photo-1590658268037-6bf12165a8df"],
  ["Cara Backup Data di Google Drive", "Tekno", "Lindungi file pentingmu dengan backup otomatis.", "photo-1558494949-ef010cbdcc31"],
  ["Mengenal Cloud Computing Dasar", "Tekno", "Konsep dasar komputasi awan untuk pengguna umum.", "photo-1544197150-b99a580bb7a8"],
  ["Tutorial Next.js untuk Pemula", "Tekno", "React framework terpopuler untuk website modern.", "photo-1461749280684-dccba630e2f6"],
  ["Cara Membuat Aplikasi Android Sederhana", "Tekno", "Belajar Android Studio dengan project sederhana.", "photo-1511707171634-5f897ff02aa9"],
  ["Tips Menjaga Keamanan Data Pribadi", "Tekno", "Kebiasaan digital yang melindungi data pribadimu.", "photo-1563013544-824ae1b704d3"],
  ["Review Monitor 4K untuk Editing", "Tekno", "Monitor 4K terbaik untuk kebutuhan editing video dan foto.", "photo-1543589077-47d81606c1bf"],
  ["Cara Mengatasi Laptop Lemot", "Tekno", "Tips membersihkan dan mempercepat laptop Windows.", "photo-1496181133206-80ce9b88a853"],
  ["Belajar Python untuk Data Science", "Tekno", "Memulai data science dengan bahasa Python.", "photo-1526379879527-27aebd4dc73d"],
  ["Cara Membuat Chatbot dengan API GPT", "Tekno", "Integrasi API ChatGPT ke aplikasi sederhanamu.", "photo-1535378917042-10a22c95931a"],
  ["Tutorial CSS Flexbox dan Grid", "Tekno", "Menguasai layout modern dengan Flexbox dan CSS Grid.", "photo-1461749280684-dccba630e2f6"],
  ["Tips Memilih Smartwatch", "Tekno", "Fitur yang perlu diperhatikan sebelum membeli smartwatch.", "photo-1579586337278-3befd40fd17a"],
  ["Cara Berlangganan Domain Murah", "Tekno", "Tips memilih registrar domain dengan harga terjangkau.", "photo-1451187580459-43490279c0fa"],
  ["Mengenal Internet of Things (IoT)", "Tekno", "Bagaimana perangkat saling terhubung di era IoT.", "photo-1518444065439-e933c06ce9cd"],
  ["Review Printer All-in-One untuk Rumah", "Tekno", "Printer multifungsi yang pas untuk kebutuhan keluarga.", "photo-1585060544812-6b45742d762f"],
  ["Cara Edit Video dengan CapCut", "Tekno", "Tutorial editing video singkat menggunakan CapCut.", "photo-1536240478700-b869070f9279"],
];

const miniblogStories: Story[] = [
  ["Belajar Coding 5 Menit Sehari", "Artikel Pendek", "Konsistensi kecil lebih baik daripada belajar marathon sekali.", "photo-1518770660439-4636190af475"],
  ["Tips Menulis Jurnal Harian", "Artikel Pendek", "Cara sederhana memulai kebiasaan menulis setiap hari.", "photo-1455390582262-044cdead277a"],
  ["Kutipan Motivasi Pagi Hari", "Artikel Pendek", "Kalimat penyemangat untuk memulai harimu dengan baik.", "photo-1504384308090-c894fdcc538d"],
  ["Cara Cepat Mencuci Piring", "Artikel Pendek", "Trik mencuci piring lebih bersih dan hemat air.", "photo-1556911220-bff31c812dba"],
  ["Rutinitas Pagi yang Produktif", "Artikel Pendek", "Kebiasaan pagi sederhana yang mengubah hari-mu.", "photo-1504384308090-c894fdcc538d"],
  ["Manfaat Minum Air Putih", "Artikel Pendek", "Kenapa tubuhmu butuh delapan gelas air setiap hari.", "photo-1548839140-29a749e1cf4d"],
  ["Latihan Perut 10 Menit", "Artikel Pendek", "Gerakan cepat untuk membentuk otot perut di rumah.", "photo-1571019613454-1cb2f99b2d8b"],
  ["Cara Mengurangi Penggunaan HP", "Artikel Pendek", "Langkah praktis melawan kecanduan layar.", "photo-1511707171634-5f897ff02aa9"],
  ["Resep Smoothie Segar", "Resep", "Minuman sehat kaya vitamin dalam hitungan menit.", "photo-1502741224143-90386d7f8c82"],
  ["Resep Telur Dadar Gurih", "Resep", "Telur dadar lembut dengan tambahan bahan rahasia.", "photo-1518569656558-1f25e69d93d7"],
  ["Resep Es Teh Manis Segar", "Resep", "Es teh paling segar untuk menemani santai sore.", "photo-1556679343-c7306c1976bc"],
  ["Resep Pisang Goreng Renyah", "Resep", "Pisang goreng garing di luar lembut di dalam.", "photo-1603833665858-e61d17a86224"],
  ["Doa Sebelum Tidur", "Doa dan Ibadah", "Bacaan doa agar tidur tenang dan dilindungi.", "photo-1519681393784-d120267933ba"],
  ["Doa Bangun Tidur dan Artinya", "Doa dan Ibadah", "Doa pembuka hari yang penuh semangat.", "photo-1519681393784-d120267933ba"],
  ["Dzikir Pagi yang Singkat", "Doa dan Ibadah", "Amalan dzikir pembuka rezeki di waktu pagi.", "photo-1519681393784-d120267933ba"],
  ["Doa Masuk Kelas Agar Diberi Kemudahan", "Doa dan Ibadah", "Doa sebelum belajar agar diberi pemahaman.", "photo-1509062522246-3755977927d7"],
  ["Prompt AI untuk Membuat Caption Instagram", "Prompt AI", "Prompt siap pakai untuk caption menarik di media sosial.", "photo-1611162617213-7d7a39e9b1d7"],
  ["Prompt AI untuk Menulis Puisi", "Prompt AI", "Cara meminta AI menulis puisi yang menyentuh hati.", "photo-1535378917042-10a22c95931a"],
  ["Prompt AI untuk Rangkuman Buku", "Prompt AI", "Ringkas isi buku dengan bantuan AI dalam sekali prompt.", "photo-1456513080510-7bf3a84b82f8"],
  ["Prompt AI untuk Ide Konten", "Prompt AI", "Tingkatkan ide kreatifmu dengan prompt terarah.", "photo-1535378917042-10a22c95931a"],
  ["VLOG: 1 Menit di Dapur", "VLOG", "Momen singkat seru dari balik layar dapur.", "photo-1556911220-bff31c812dba"],
  ["VLOG: Jalan Pagi Keliling Kompleks", "VLOG", "Suasana tenang jalan pagi yang menyehatkan.", "photo-1507525428034-b723cf961d3e"],
  ["Fakta Unik yang Jarang Diketahui", "Artikel Pendek", "Fakta-fakta menarik untuk menambah pengetahuanmu.", "photo-1518709268805-4e9042af9f23"],
  ["Kata-kata Bijak Sebelum Tidur", "Artikel Pendek", "Renungan singkat untuk menutup hari dengan tenang.", "photo-1512820790803-83ca734da794"],
  ["Tips Menabung ala Anak Sekolah", "Artikel Pendek", "Mulai menabung dari uang jajan harianmu.", "photo-1579621970563-ebec7560ff3e"],
  ["Cara Membuat Catatan Aesthetic", "Artikel Pendek", "Catatan rapi dan indah yang bikin semangat belajar.", "photo-1517842645767-c639042777db"],
  ["Review Jajanan Kekinian", "Artikel Pendek", "Jajanan viral yang wajib kamu coba.", "photo-1504674900247-0877df9cc836"],
  ["Tips Cepat Membaca Buku", "Artikel Pendek", "Tingkatkan kecepatan membacamu dengan metode ini.", "photo-1512820790803-83ca734da794"],
  ["Ide Konten untuk Media Sosial", "Artikel Pendek", "Gagasan konten yang selalu siap diposting.", "photo-1611162617213-7d7a39e9b1d7"],
  ["Cara Menyusun To-Do List yang Efektif", "Artikel Pendek", "Metode menyusun daftar tugas agar semuanya tuntas.", "photo-1484480974693-6ca0a78fb36b"],
  ["Hal Kecil yang Membuat Hari Lebih Baik", "Artikel Pendek", "Tindakan sederhana dengan dampak besar.", "photo-1504384308090-c894fdcc538d"],
  ["Pertanyaan Refleksi Diri", "Artikel Pendek", "Beberapa pertanyaan untuk memahami dirimu lebih dalam.", "photo-1519834785169-98be25ec3f84"],
  ["Cara Mengucapkan Terima Kasih yang Tulus", "Artikel Pendek", "Seni berterima kasih yang mempererat hubungan.", "photo-1517486808906-6ca8b3f04846"],
];

const storiesBySource: Record<BlogSource, Story[]> = {
  legacy: legacyStories,
  teknoblog: teknoblogStories,
  miniblog: miniblogStories,
};

const sourceOrder: BlogSource[] = ["legacy", "teknoblog", "miniblog"];

const createArticle = (story: Story, source: BlogSource, index: number): Article => {
  const [title, label, intro, imageKey] = story;
  const content = `<p>${intro}</p><p>Kami terus mengembangkan tulisan ini agar mudah dipahami dan bermanfaat bagi pembaca setia Inzaghi's Blog.</p><h2>Mengapa ini penting</h2><p>Setiap topik yang dibahas dipilih berdasarkan pertanyaan yang paling sering muncul dari pembaca kami.</p><h2>Kesimpulan</h2><p>Terapkan langkah-langkah di atas, dan jangan lupa bagikan pengalamanmu di kolom komentar.</p>`;
  return {
    id: `demo-${index + 1}`,
    blogId: `demo-${sourceOrder.indexOf(source)}`,
    source,
    title,
    content,
    excerpt: excerpt(content),
    published: new Date(Date.now() - index * 86400000 * 3).toISOString(),
    url: `/posts/demo-${index + 1}`,
    cover: `https://images.unsplash.com/${coverPool[index % coverPool.length]}?auto=format&fit=crop&w=1400&q=85`,
    labels: [label, index % 2 ? "Technology" : "Developer Experience"],
    author: {
      name: index % 2 ? "Inzaghi Posuma" : "Izzumi Poshaf",
      bio: "Writer, builder, and lifelong learner.",
    },
    views: 1200 + index * 438,
    comments: 4 + index * 3,
  };
};

export const mockArticles: Article[] = (() => {
  const remaining = {
    legacy: [...storiesBySource.legacy],
    teknoblog: [...storiesBySource.teknoblog],
    miniblog: [...storiesBySource.miniblog],
  };
  const articles: Article[] = [];
  let index = 0;
  while (remaining.legacy.length || remaining.teknoblog.length || remaining.miniblog.length) {
    for (const source of sourceOrder) {
      const story = remaining[source].shift();
      if (!story) continue;
      articles.push(createArticle(story, source, index++));
    }
  }
  return articles;
})();

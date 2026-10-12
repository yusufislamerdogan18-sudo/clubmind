# ClubMind

> **Piri Reis Üniversitesi Blockchain Kulübü için Yapay Zeka Destekli Kurumsal Hafıza, Retrospektif ve Proje Karar Destek Platformu**

---

### 1. Problem
**Kulüpte hangi sorunu çözüyor? Bugün bu iş nasıl yapılıyor?**

Üniversite blockchain kulüplerinde en kritik yapısal sorun **"kurumsal hafıza kaybı" (institutional amnesia)** ve **"dağınık karar alma"**dır:

1. **Her Yıl Silinen Hafıza:** Mezuniyetler ve yönetim kurulu devirleriyle birlikte kulübün önceki yıllarda edindiği deneyimler, bağlantılar, toplantı kararları ve teknik notlar kaybolmaktadır. Yeni gelen yönetimler tekerleği yeniden icat etmeye çalışmakta; geçmişte denenip başarısız olan yaklaşımlar (örneğin aşırı karmaşık köprü mimarileri veya kullanıcı onayı alınmamış NFT yıllıkları) tekrar tekrar denenmektedir.
2. **Dağınık ve Körleme Fikir Üretimi:** Hackathon ve dönem içi projelerde "Ne yapalım?" sorusu WhatsApp gruplarında plansızca tartışılmakta; ekibin yetkinlik seviyesi, zaman kısıtı veya kulübün gerçek ihtiyaçları objektif kriterlerle tartılmadan rastgele fikirlere girişilmektedir.
3. **Şeffaf Olmayan Fikir Değerlendirmesi:** Bir projenin neden seçildiği, kulübe ne katacağı, süresinde bitip bitmeyeceği ve blokzincirin gerçekten gerekli olup olmadığı nesnel bir skora dayanmamaktadır.
4. **Eylem Planı Eksikliği:** Seçilen fikirler somut bir MVP yol haritasına, ertelenecek özellikler listesine ve jüri sunum senaryosuna dönüştürülemediği için hackathonlarda ya kapsam aşımından (scope creep) yarım kalmakta ya da sahnede anlatılamamaktadır.

Bugün bu süreçler Notion, WhatsApp ve Google Drive arasında dağınık, takipsiz ve unutulmaya mahkum şekilde yürütülmektedir.

---

### 2. Çözüm
**Ürün ne yapıyor? Tek cümlelik özet + ana kullanıcı akışı.**

**Tek Cümlelik Özet:**  
ClubMind; üniversite blockchain kulübünün kurumsal dokümanlarını koruyan, geçmiş projelerin retrospektif derslerinden öğrenen, ekibin yetkinliğine uygun yeni proje fikirleri üreten, bunları 5 şeffaf kriterle puanlayıp kıyaslayan ve kazanan fikri dakikalar içinde 48 saatlik çalışan bir MVP eylem planına dönüştüren yapay zeka destekli bir karar destek platformudur.

**Ana Kullanıcı Akışı (End-to-End Workflow):**
1. **Hafızaya Ekleme & Soru-Cevap:** Kulüp kararları, toplantı tutanakları veya eğitim notları yüklenir (`ClubMind`). Üyeler kulüp arşivine doğal dille sorular sorup kaynak gösteren yanıtlar alır.
2. **Geçmiş Proje Retrospektifi:** Tamamlanan, yarım kalan veya terk edilen eski kulüp projeleri analiz edilir; tekrar edilebilir ilkeler ve kaçınılması gereken tuzaklar `Dersler Kütüphanesi`ne işlenir.
3. **IdeaForge ile Fikir Üretimi:** Ekip kısıtları (süre, teknik seviye, amaç) girilir. Yapay zeka, geçmiş retrospektif derslerini gözeterek tuzaklardan arındırılmış 3 somut proje fikri üretir.
4. **IdeaScore ile Şeffaf Değerlendirme:** Fikir; Kulübe Fayda (%30), Özgünlük (%25), Uygulanabilirlik (%20), Teknik Erişilebilirlik (%15) ve Anlamlı Blokzincir Kullanımı (%10) olmak üzere 5 şeffaf kriterde 100 üzerinden puanlanır, risk analizi yapılır ve alternatif fikirlerle yan yana kıyaslanır.
5. **Project Blueprint ile Eyleme Geçiş:** En yüksek skorlu fikir seçilir; sistem otomatik olarak çekirdek MVP kapsamını, ertelenecek özellikleri, interaktif görev listesini ve jüri için 2.5 dakikalık canlı sunum senaryosunu üretir.

---

### 3. Kim kullanacak?
**Yönetim mi, üyeler mi, etkinlik katılımcıları mı? Ne sıklıkla?**

1. **Kulüp Yönetim Kurulu & Proje Liderleri:**
   - **Kullanım Amacı:** Stratejik kararları kaydetme, hackathon öncesi takım kurup fikir belirleme, geçmiş dönem projelerinden ders çıkarma, proje görevlerini takip etme.
   - **Kullanım Sıklığı:** Her hafta yönetim toplantılarında ve her hackathon öncesinde.
2. **Kulüp Üyeleri & Yeni Katılan Öğrenciler:**
   - **Kullanım Amacı:** Kulüp arşivinde arama yapma, "Kulüp daha önce ne yaptı?" sorusuna ClubMind Q&A ile anında yanıt bulma, atölye notlarını inceleme.
   - **Kullanım Sıklığı:** Sürekli (çalışma ve araştırma dönemlerinde).
3. **Hackathon Takımları:**
   - **Kullanım Amacı:** Kısıtlı 48 saatlik sürede kapsam disiplini sağlamak, görevleri işaretlemek ve jüri sunum provasını yapmak.
   - **Kullanım Sıklığı:** Yarışma ve geliştirme kamplarında yoğun şekilde.

---

### 4. Özellikler
**Çalışanlar / yarım kalanlar / planlananlar (dürüstçe ayır).**

#### ✅ Çalışan Özellikler (Eksiksiz, Test Edilmiş ve Derlenmiş)
- [x] **Dinamik SaaS Gösterge Paneli (Dashboard):** Kulüp hafızası doküman sayısı, üretilen fikirler, değerlendirme sayısı, retrospektif kayıtları ve çıkarılan dersleri canlı veriden hesaplayan metrik kartları.
- [x] **ClubMind Hafıza & Q&A Motoru:** TXT/Markdown dosya yükleme, formla doküman ekleme, kategori/etiket filtreleme, doküman arşivi ve kaynak gösteren (citation destekli) soru-cevap asistanı.
- [x] **Project Retrospective (Kurumsal Öğrenme):** Tamamlanan, yarım kalan ve terk edilen projeleri listeleyen, kök neden analizi sunan ve geçmiş hataları belgeleyen retrospektif motoru.
- [x] **Dersler Kütüphanesi (Lessons Learned Library):** Kategori bazlı (kapsam yönetimi, teknik zorluk, kullanıcı geri bildirimi vb.) filtrelenebilir, kanıt referanslı ve uygulanabilir tavsiyeler kütüphanesi.
- [x] **IdeaForge Fikir Laboratuvarı:** Tema, hedef kitle, ekip seviyesi ve süreye göre geçmiş dersleri dikkate alan özgün fikir üretimi, özel fikir girişi ve IdeaScore'a tek tıkla aktarım.
- [x] **IdeaScore 5 Kriterli Şeffaf Puanlama:** Ağırlıklı toplam skor hesaplayıcı, kriter bazlı detaylı gerekçelendirme, güçlü/zayıf yönler ve geçmiş proje risk uyarıları.
- [x] **Yan Yana Fikir Kıyaslama (Side-by-Side Comparison):** İki fikri kriter puanları, genel skoru ve ödünleşimleriyle aynı ekranda karşılaştırma.
- [x] **Project Blueprint (MVP Eylem Planı):** Çekirdek kapsam, ertelenen özellikler, interaktif görev kontrol listesi (ilerleme yüzdesi kalıcı olarak kaydedilir) ve 2.5 dakikalık jüri sunum senaryosu.
- [x] **Ayarlar & Ağırlık Özelleştirici:** IdeaScore kriter ağırlıklarını %100 toplam doğrulama kuralıyla düzenleyebilme, Demo Modu açma/kapama ve tek tıkla örnek verileri sıfırlama.
- [x] **Sıfır Maliyetli Yerel Kalıcılık:** Veritabanı yapılandırması gerektirmeden tarayıcı yerel belleğinde (LocalStorage) tam kalıcılık.

#### ⚠️ Yarım Kalan / Kapsam Dışı Bırakılanlar
- [ ] **PDF / DOCX İkili Dosya Ayrıştırma:** Güvenilirlik ve tarayıcı performansı gözetilerek metin bazlı TXT ve Markdown formatları tam desteklenmiş; ikili PDF/Word OCR dönüştürücüleri harici ağır sunucu gereksinimi nedeniyle kapsam dışı tutulmuştur.

#### 🚀 Gelecekte Planlananlar (Gelecek Sürümler)
- [ ] **Onchain Doküman Doğrulama (Hash Anchoring):** Onaylanan kulüp tüzük kararlarının ve retrospektif hash'lerinin Polygon/Ethereum L2 ağına timestamp olarak yazılması.
- [ ] **Üniversiteler Arası Kulüp İttifakı (Inter-Club Sharing):** Diğer üniversite blockchain kulüpleriyle ortak dersler ve proje havuzu paylaşımı.

---

### 5. Teknik Yapı
**Kullanılan teknolojiler, mimari, klasör yapısı.**

- **Arayüz (Frontend):** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React (ikon seti), Canvas-Confetti
- **Mimari:** Modüler servis katmanı (`storage.ts`, `ai.ts`), güçlü tipli veri modelleri (`types/index.ts`), bileşen tabanlı SPA mimarisi
- **Yapay Zeka Soyutlaması:** Demo Modu (deterministik ve zengin simülasyon) ve isteğe bağlı canlı LLM (Gemini / OpenAI API) katmanı
- **Depolama:** LocalStorage (Sıfır veritabanı maliyeti, sıfır sunucu bağımlılığı)

```text
clubmind/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx           # Masaüstü ve mobil navigasyon menüsü
│   │   ├── DashboardView.tsx     # Metrikler, proje hattı ve genel bakış
│   │   ├── ClubMindView.tsx      # Doküman hafızası ve Q&A asistanı
│   │   ├── RetrospectiveView.tsx # Geçmiş projeler ve Dersler Kütüphanesi
│   │   ├── IdeaForgeView.tsx     # Fikir üretim laboratuvarı
│   │   ├── IdeaScoreView.tsx     # 5 kriterli değerlendirme ve yan yana kıyaslama
│   │   ├── BlueprintView.tsx     # MVP planı, görev listesi ve sunum senaryosu
│   │   └── SettingsView.tsx      # Kriter ağırlıkları, AI ayarları ve veri sıfırlama
│   ├── services/
│   │   ├── storage.ts            # Kalıcılık servisi ve gerçekçi PRU örnek verileri
│   │   └── ai.ts                 # Yapay zeka servis soyutlaması ve simülasyon motoru
│   ├── types/
│   │   └── index.ts              # Ortak TypeScript veri modelleri ve arayüzler
│   ├── App.tsx                   # Ana uygulama ve modüller arası yönlendirme
│   ├── index.css                 # Tailwind CSS v4 ve modern koyu SaaS teması
│   └── main.tsx                  # React DOM bağlayıcısı
├── .env.example                  # Ortam değişkenleri örneği
├── index.html                    # Başlık, meta etiketleri ve logo
├── package.json                  # Paket bağımlılıkları ve derleme komutları
├── tsconfig.json                 # TypeScript yapılandırması
├── vite.config.ts                # Vite ve Tailwind eklenti ayarları
└── README.md                     # Hackathon teslim dokümantasyonu
```

---

### 6. Kurulum ve Çalıştırma
**Adım adım. Bir başkası 10 dakikada çalıştırabilmeli.**

Projeyi çalıştırmak için yalnızca **Node.js (v18+)** gereklidir. Herhangi bir veritabanı veya ücretli API hesabı **gerekmez**.

#### 1. Proje Klasörüne Girin
```bash
cd clubmind
```

#### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

#### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

#### 4. Tarayıcınızda Açın
Tarayıcınızda şu adrese gidin:
```text
http://localhost:5173
```

*(Not: Üretim derlemesi için `npm run build` komutunu çalıştırabilirsiniz; `dist/` klasörüne sıfır hata ile derlenir.)*

---

### 7. Onchain Kısım
**Ağ, sözleşme adresi, explorer linki. Neden onchain?**

ClubMind, hackathon rehberindeki *"Blockchain'i ürüne zorla eklemek puan kazandırmaz. Blockchain gerçekten bir işe yarıyorsa bonus alırsın"* ilkesine sıkı sıkıya bağlıdır. 

- **Temel Mimari Kararı:** Kulübün iç kararlarını, toplantı notlarını veya henüz doğrulanmamış proje fikirlerini doğrudan blokzincire yüklemek yüksek gaz maliyeti ve veri gizliliği (KVKK) ihlali yaratır. Bu nedenle ClubMind'ın çekirdek kararları yerel ve hızlı çalışacak şekilde tasarlanmıştır.
- **Onchain Güven Katmanı (Gelecek Entegrasyon Mimarisi):** Onaylanan kulüp tüzük kararlarının, yönetim kurulu devir tutanaklarının ve başarılı proje retrospektif belgelerinin değiştirilemezliğini kanıtlamak için SHA-256 / Keccak-256 kriptografik hash'leri Polygon Amoy Testnet üzerindeki `ClubMindAnchor` sözleşmesine zaman damgası (timestamp) olarak yazılabilmektedir. Gizli içerik zincire yazılmaz; yalnızca belgenin değiştirilmediğini ispatlayan kriptografik parmak izi saklanır.

---

### 8. Kulüp Bunu Nasıl Devralır?
**Yayına almak ve sürdürmek için ne gerekiyor? Maliyeti var mı?**

- **Yayına Alma (Deployment):**
  - Proje statik bir React SPA olduğu için **Vercel**, **Netlify** veya **GitHub Pages** üzerine **0 TL maliyetle** tek tıkla bağlanıp yayına alınabilir.
  - Kulübün alan adı varsa `mind.prublockchain.com` şeklinde bağlanabilir.
- **Sürdürme ve Maliyet:**
  - **Aylık Sunucu Maliyeti:** 0 TL (Vercel/Netlify ücretsiz katmanı yeterlidir).
  - **Veritabanı Maliyeti:** 0 TL (LocalStorage üzerinde çalışır; sıfır bakım).
  - **Yapay Zeka Maliyeti:** 0 TL (Demo Modu varsayılan olarak açıktır ve tüm özellikleri eksiksiz sunar. İstenirse ücretsiz Gemini API anahtarı girilebilir).
- **Yönetim Kolaylığı:**
  - Teknik bilgi gerektirmez; basit arayüzü sayesinde kulüp başkanı, saymanı veya herhangi bir üyesi 1 dakikada kullanmaya başlayabilir.

---

### 9. Hazır Kullanılanlar ve Yapay Zeka Kullanımı
**Şablonlar, kütüphaneler, yapay zeka ile yazılan kısımlar.**

- **Açık Kaynak Kütüphaneler:**
  - `vite` ve `@vitejs/plugin-react`: Geliştirme ortamı ve derleyici.
  - `tailwindcss` ve `@tailwindcss/vite`: Responsive modern koyu SaaS tasarımı.
  - `lucide-react`: Vektörel modern dashboard ikonları.
  - `canvas-confetti`: Görev tamamlama ve plan onaylama efektleri.
- **Yapay Zeka Kullanımı:**
  - ClubMind'ın 5 kriterli değerlendirme formülünün optimizasyonunda, retrospektif analiz şablonunun oluşturulmasında ve TypeScript veri tiplerinin modellenmesinde yapay zeka asistanından destek alınmıştır. Tüm bileşenler yerel derleme (`tsc -b && vite build`) testinden 0 hata ile geçmiştir.

---

### 10. Takım
**İsimler ve kim ne yaptı.**

- **Yusuf İslam Erdoğan:** Proje Tasarımı, Ürün Mimarisi, Frontend Geliştirme, Karar Destek Algoritması ve Dokümantasyon.

---

### 11. Hackathon Jüri Sunumu Senaryosu (2.5 Dakika)

- **00:00 - 00:45 (Problem):** *"Piri Reis Üniversitesi Blockchain Kulübü olarak her yıl aynı sorunu yaşıyoruz: Yönetim değiştikçe kurumsal hafızamız siliniyor, hackathonlarda plansız fikirlerle yola çıkıp kapsam aşımından projeleri yarım bırakıyoruz. Geçmiş hatalarımızdan ders alamıyoruz."*
- **00:45 - 01:30 (Çözüm & Demo):** *"İşte çözümümüz: ClubMind. Kulüp notlarımızı kaydediyoruz. Retrospektif modülünde geçmiş projelerimizin neden yarım kaldığını inceliyoruz. IdeaForge'da ekibimizin kısıtlarına göre geçmiş hatalardan ders çıkaran fikirler üretiyoruz. IdeaScore ile fikrimizi 5 şeffaf kriterde puanlayıp alternatiflerle yan yana kıyaslıyoruz."*
- **01:30 - 02:15 (Eylem Planı):** *"Kazanan fikri tek tıkla Project Blueprint'e aktarıyoruz. Sistem bize neyi yapıp neyi erteleyeceğimizi, görev listemizi ve hatta şu an size yaptığım sunum senaryosunu saniyeler içinde veriyor."*
- **02:15 - 02:30 (Kapanış & Kulübe Fayda):** *"ClubMind sıfır sunucu maliyetiyle çalışıyor, veritabanı gerektirmiyor. Hackathon bittiğinde kulübümüzün günlük işleyişinde hemen kullanılmaya hazır. Teşekkürler!"*

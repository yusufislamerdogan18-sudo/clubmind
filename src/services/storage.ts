/**
 * ClubMind - Persistence and Seed Data Service
 * LocalStorage backed state management with realistic Piri Reis University Blockchain Club data.
 */

import { 
  ClubDocument, HistoricalProject, LessonLearned, 
  ProjectIdea, IdeaEvaluation, ProjectBlueprint, AppSettings, CriteriaWeights 
} from '../types';

const STORAGE_KEYS = {
  DOCUMENTS: 'clubmind_documents_v1',
  PROJECTS: 'clubmind_projects_v1',
  LESSONS: 'clubmind_lessons_v1',
  IDEAS: 'clubmind_ideas_v1',
  EVALUATIONS: 'clubmind_evaluations_v1',
  BLUEPRINTS: 'clubmind_blueprints_v1',
  SETTINGS: 'clubmind_settings_v1',
};

export const DEFAULT_WEIGHTS: CriteriaWeights = {
  clubValue: 30,
  novelty: 25,
  feasibility: 20,
  technicalAccessibility: 15,
  blockchainRelevance: 10,
};

export const DEFAULT_SETTINGS: AppSettings = {
  criteriaWeights: DEFAULT_WEIGHTS,
  aiProvider: 'demo',
  apiKey: '',
  isDemoMode: true,
};

// Initial Seed Data (Realistic PRU Blockchain Club Documents)
const INITIAL_DOCUMENTS: ClubDocument[] = [
  {
    id: 'doc-1',
    title: 'PRU Blockchain Kulübü 2026 Stratejik Yol Haritası ve Hedefler',
    category: 'Decisions',
    date: '2026-02-15',
    tags: ['strateji', '2026', 'yonetim', 'hedef'],
    content: `Piri Reis Üniversitesi Blockchain Kulübü 2026 Dönemi Kararları:
1. Yeni üyelerin Web3 okuryazarlığını artırmak için her ay en az bir hands-on atölye yapılacak.
2. Kulüp projelerinde teorik kavramlar yerine kampüste ve kulüpte bizzat çalışan MVP'ler geliştirilecek.
3. Üniversite yönetimi ve rektörlük ile ortaklaşa doğrulanabilir sertifika çözümleri araştırılacak.
4. Kulüp içi iş bölümünü şeffaflaştırmak için katkı takibi ve karar alma süreçleri dijitalleştirilecek.`,
    author: 'Yönetim Kurulu',
    createdAt: new Date('2026-02-15').toISOString(),
  },
  {
    id: 'doc-2',
    title: 'Solidity 101 Atölyesi Geri Bildirim ve Katılım Notları',
    category: 'Education',
    date: '2026-03-04',
    tags: ['egitim', 'solidity', 'atolye', 'ogrenci'],
    content: `Mühendislik Fakültesi Lab-3'te düzenlenen Solidity 101 atölyesine 28 öğrenci katıldı.
Bulgular:
- Öğrencilerin %70'i ilk defa MetaMask kurdu ve testnet token aldı.
- Akıllı sözleşme derlerken gaz kavramı ve ABI mantığı en çok soru gelen konu oldu.
- Bir sonraki eğitimde doğrudan karmaşık kontratlar yerine basit bir arayüzle bağlanan demo uygulamaları gösterilmeli.`,
    author: 'Eğitim Komitesi',
    createdAt: new Date('2026-03-04').toISOString(),
  },
  {
    id: 'doc-3',
    title: 'Sponsorluk Görüşmeleri ve Bütçe Harcama Raporu',
    category: 'Meeting Notes',
    date: '2026-03-20',
    tags: ['sponsor', 'butce', 'toplanti'],
    content: `Etkinlik sponsorluğu için 3 Web3 şirketiyle görüşüldü.
Kararlar:
- Sponsorların en büyük beklentisi öğrencilerin sadece teoride kalmayıp gerçek çalışan GitHub projeleri üretmesi.
- Hackathon ödül havuzu yerine katılımcıların öğrenme deneyimini artıracak mentorluk ve sertifika altyapılarına bütçe ayrılması kararlaştırıldı.`,
    author: 'Finans Ekibi',
    createdAt: new Date('2026-03-20').toISOString(),
  },
  {
    id: 'doc-4',
    title: 'Kampüs İçi DAO ve Oylama Sistemleri Fizibilite Araştırması',
    category: 'Research',
    date: '2026-04-02',
    tags: ['dao', 'oylama', 'arastirma', 'governance'],
    content: `Üniversite kulüplerinde DAO modellerinin uygulanabilirliği incelendi.
Temel Çıkarım:
- Onchain oylamalarda gaz ücreti öğrencilere yüklenirse katılım %90 oranında düşüyor.
- Snapshot tarzı zincir dışı imzalama veya L2 / gasless yaklaşımlar öğrenci kulüpleri için en uygulanabilir çözümdür.`,
    author: 'Araştırma Ekibi',
    createdAt: new Date('2026-04-02').toISOString(),
  }
];

// 3 Fictional Historical Projects as specified in the prompt
const INITIAL_PROJECTS: HistoricalProject[] = [
  {
    id: 'proj-1',
    name: 'PRU Kampüs Cüzdanı (Campus Wallet)',
    objective: 'Öğrencilerin kulüp etkinliklerinde ve kantinde mikro-puan transferi yapabileceği basit bir Web3 cüzdan arayüzü geliştirmek.',
    originalGoals: [
      'Temel cüzdan oluşturma ve özel anahtar yönetimi',
      'QR kod ile puan transferi',
      'Testnet musluğu entegrasyonu',
      'Kantin simülasyonu'
    ],
    completedFeatures: [
      'Temel cüzdan oluşturma',
      'QR kod ile puan transferi',
      'Testnet musluğu'
    ],
    status: 'completed',
    technologies: ['React', 'Ethers.js', 'Polygon Testnet'],
    plannedDuration: '3 hafta',
    actualDuration: '4 hafta',
    challenges: [
      'İlk başta çok fazla özellik planlanmıştı ancak kapsam daraltıldı.',
      'Öğrencilere seed phrase saklamayı öğretmek ekstra zaman aldı.'
    ],
    documentedCauses: 'Kapsamın erkenden kısıtlanması (küçük MVP odağı) projenin başarıyla tamamlanmasını sağladı.',
    whatWentWell: [
      'MVP kapsamı 3 temel özellikle sınırlandırıldı.',
      'Kullanıcı testi erkenden 10 kulüp üyesiyle yapıldı.',
      'Testnet üzerinde gazsız işlem simülasyonu sağlandı.'
    ],
    whatWentWrong: [
      'Kantin POS entegrasyonu fazla iddialıydı ve zaman yetmedi.'
    ],
    lessonsLearned: [
      'Küçük MVP kapsamı öğrenci hackathonlarında başarıyı doğrudan belirler.',
      'Gereksiz üçüncü parti donanım entegrasyonlarından kaçınılmalıdır.'
    ],
    isDemo: true,
  },
  {
    id: 'proj-2',
    name: 'PRU Cross-Chain Köprüsü & Likidite Havuzu',
    objective: 'Polygon ve Arbitrum arasında kulüp tokenlerini transfer eden özel köprü ve takas protokolü oluşturmak.',
    originalGoals: [
      'Akıllı sözleşme tabanlı lock & mint köprü mimarisi',
      'Cross-chain mesajlaşma relay servisi',
      'Kullanıcı dostu takas arayüzü',
      'Otomatik likidite sağlayıcı botu'
    ],
    completedFeatures: [
      'Tek zincir üzerinde ERC-20 token',
      'Temel frontend taslağı'
    ],
    status: 'partially completed',
    technologies: ['Solidity', 'LayerZero Mock', 'Next.js', 'Hardhat'],
    plannedDuration: '4 hafta',
    actualDuration: '6 hafta (yarım bırakıldı)',
    challenges: [
      'Üçüncü parti köprü SDK dokümantasyonu yetersiz ve hatalıydı.',
      'Testnet RPC hız sınırları nedeniyle işlemler sürekli düştü.',
      'Ekip üyelerinin cross-chain güvenlik bilgisi yetersiz kaldı.'
    ],
    documentedCauses: 'Ekibin teknik yetkinliğini aşan ve olgunlaşmamış harici kütüphanelere bağımlı bir mimari seçildi.',
    whatWentWell: [
      'ERC-20 sözleşmesi başarıyla yazıldı ve test edildi.'
    ],
    whatWentWrong: [
      'Entegrasyon testi yapmadan önce karmaşık UI geliştirilmeye başlandı.',
      'RPC rate limitleri önceden öngörülmedi.'
    ],
    lessonsLearned: [
      'Deneysel ve olgunlaşmamış cross-chain kütüphanelerine öğrenci hackathonlarında bel bağlanmamalı.',
      'Bağımlı özellikleri geliştirmeden önce dış entegrasyonlar prototiplenmeli.'
    ],
    isDemo: true,
  },
  {
    id: 'proj-3',
    name: 'PRU Onchain Mezuniyet Yıllığı (NFT Yearbook)',
    objective: 'Tüm kulüp ve üniversite mezunlarının fotoğraflarını ve anılarını silinmez şekilde IPFS ve blokzincirde saklayan NFT yıllığı.',
    originalGoals: [
      'Öğrencilerin profil ve anı yüklemesi',
      'IPFS dosya depolama entegrasyonu',
      'Dönem sonu NFT mintleme',
      'Yıllık gezinme galerisi'
    ],
    completedFeatures: [
      'Fotoğraf yükleme formu prototipi'
    ],
    status: 'abandoned',
    technologies: ['React', 'IPFS/Pinata', 'Solidity ERC-721'],
    plannedDuration: '5 hafta',
    actualDuration: '3 hafta (terk edildi)',
    challenges: [
      'Öğrencilerin %85i fotoğraflarının ve anılarının halka açık blokzincirde kalıcı olmasını gizlilik nedeniyle istemedi.',
      'Kullanıcı doğrulaması yapılmadan teknik geliştirmeye başlandı.'
    ],
    documentedCauses: 'Kullanıcı ihtiyacı ve veri gizliliği doğrulanmadan doğrudan kodlamaya geçildi; talep sıfır çıktı.',
    whatWentWell: [
      'Erken fark edilip zaman kaybedilmeden terk edildi.'
    ],
    whatWentWrong: [
      'Öğrencilerle ön anket yapılmadı.',
      'KVKK ve kişisel veri gizliliği boyutları düşünülmedi.'
    ],
    lessonsLearned: [
      'Kişisel verileri veya fotoğrafları blokzincire taşımadan önce kullanıcı gizlilik talebi doğrulanmalıdır.',
      'Teknoloji zorlaması yerine gerçek kullanıcı problemi çözülmelidir.'
    ],
    isDemo: true,
  }
];

// Initial Reusable Lessons Learned
const INITIAL_LESSONS: LessonLearned[] = [
  {
    id: 'lesson-1',
    title: 'Kapsam Disiplini & Küçük MVP Kuralı',
    lesson: 'Öğrenci hackathonlarında 3-4 ana özellikten fazla planlanan projeler zaman aşımı nedeniyle başarısız oluyor. 1 ana akışı kusursuz çalışan küçük MVP daima kazanır.',
    projectId: 'proj-1',
    projectName: 'PRU Kampüs Cüzdanı (Campus Wallet)',
    evidenceOrSource: 'Proje 1 retrospektifi: Kapsam daraltıldıktan sonra 4 haftada canlıya alındı.',
    category: 'scope management',
    confidence: 'high',
    isDocumentedFact: true,
    practicalRecommendation: 'Proje kapsamını maksimum 3 temel kullanıcı adımına indirin; opsiyonel özellikleri "Gelecek Sürüm" olarak etiketleyin.',
  },
  {
    id: 'lesson-2',
    title: 'Dış Entegrasyonları Erkenden Test Et',
    lesson: 'Köprü, cüzdan veya harici RPC gibi üçüncü parti SDKlara bağımlı projelerde önce entegrasyonun çalıştığı kanıtlanmalı, ardından UI yazılmalıdır.',
    projectId: 'proj-2',
    projectName: 'PRU Cross-Chain Köprüsü & Likidite Havuzu',
    evidenceOrSource: 'Proje 2 retrospektifi: Bridge SDK çöktüğü için tüm UI boşa gitti.',
    category: 'technical difficulty',
    confidence: 'high',
    isDocumentedFact: true,
    practicalRecommendation: 'Frontend tasarımına başlamadan önce en riskli dış API veya kütüphaneyi 1 saatlik spike test ile doğrulayın.',
  },
  {
    id: 'lesson-3',
    title: 'Kodlamadan Önce Kullanıcı İhtiyacını ve Gizliliğini Doğrula',
    lesson: 'Blokzincirin şeffaflığı ve kalıcılığı kişisel veriler için dezavantajdır. Öğrencilerin kalıcı olmasını istemeyeceği hiçbir veri onchain yapılmamalıdır.',
    projectId: 'proj-3',
    projectName: 'PRU Onchain Mezuniyet Yıllığı (NFT Yearbook)',
    evidenceOrSource: 'Proje 3 retrospektifi: Öğrenciler gizlilik endişesiyle sistemi kullanmayı reddetti.',
    category: 'user feedback',
    confidence: 'high',
    isDocumentedFact: true,
    practicalRecommendation: 'Proje fikrini hayata geçirmeden önce en az 5 kulüp üyesine "Bunu gerçekten kullanır mısın?" sorusunu sorun.',
  },
  {
    id: 'lesson-4',
    title: 'Gaz Masrafını Öğrenciye Yansıtma',
    lesson: 'Üniversite ortamında kullanıcıdan işlem ücreti (gas fee) talep eden Web3 projelerinin kullanım oranı %90 düşüyor.',
    projectId: 'proj-1',
    projectName: 'PRU Kampüs Cüzdanı (Campus Wallet)',
    evidenceOrSource: 'Proje 1 ve Doküman 4 bulguları.',
    category: 'blockchain architecture',
    confidence: 'high',
    isDocumentedFact: true,
    practicalRecommendation: 'Ya gasless/sponsorlu işlem altyapısı kurun ya da Web2.5 hibrit bir mimari tercih edin.',
  }
];

// Initial Generated Ideas (IdeaForge)
const INITIAL_IDEAS: ProjectIdea[] = [
  {
    id: 'idea-1',
    name: 'PRU ChainCert: Doğrulanabilir Kulüp Başarı ve Görev Rozetleri',
    pitch: 'Kulüp etkinliklerine katılan veya görev tamamlayan üyelere şeffaf, transfer edilemez Soulbound katılım belgeleri veren doğrulanabilir itibar portalı.',
    problem: 'Kulüp eğitim ve etkinlik belgeleri Canva ile elle hazırlanıyor, kopyalanabiliyor ve iş başvurularında güvenilir bir doğrulama linki sunulamıyor.',
    solution: 'Yönetimin tek tıkla QR ile onayladığı ve öğrencinin LinkedIn profilinde paylaşabileceği ERC-721 SBT katılım rozeti sistemi.',
    targetAudience: 'Kulüp üyeleri, mezunlar ve potansiyel işverenler.',
    whyItMatters: 'Kulüp üyelerinin emeklerini somut CV değerine dönüştürür ve aktif üye takibini sağlar.',
    mvpFeatures: [
      'Etkinlik oluşturma ve katılım onayı',
      'Kişiye özel doğrulanabilir dijital rozet kartı',
      'Herkese açık tek tıkla doğrulama URLsi'
    ],
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hafta',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Solidity (SBT)', 'Polygon Testnet'],
    potentialRisks: ['Öğrencilerin cüzdanının olmaması riski (Web2.5 hibrit fallback ile çözülür)'],
    isBlockchainNecessary: true,
    blockchainJustification: 'Sertifikanın kopyalanamaz ve kulüp sunucusu kapansa bile bağımsız doğrulanabilir olması için Soulbound Token gereklidir.',
    avoidedPastPitfalls: [
      'Proje 3 dersi: Kişisel fotoğraflar yerine sadece resmi sertifika hash\'i tutularak gizlilik korundu.',
      'Proje 1 dersi: Kapsam sadece 3 ana özellikle sınırlandırıldı.'
    ],
    builtOnPastSuccesses: [
      'Proje 1 dersi: Basit QR check-in ve Polygon Testnet kullanımı tekrarlandı.'
    ],
    createdAt: new Date('2026-04-10').toISOString(),
  },
  {
    id: 'idea-2',
    name: 'PRU Micro-Bounties: Kulüp Katkı ve Görev Ödül Pazarı',
    pitch: 'Afiş tasarımı, sosyal medya veya stant gibi kulüp işlerini görev olarak listeleyen ve tamamlayan üyelere kulüp puanı veren katkı portalı.',
    problem: 'Kulüp operasyonları birkaç yöneticinin üzerine kalıyor; WhatsApp gruplarında kaybolan işlere kimse gönüllü olmuyor.',
    solution: 'Yönetimin ödüllü görev açtığı, üyelerin başvurup teslim ettiği ve liderlik tablosunda yükseldiği şeffaf görev panosu.',
    targetAudience: 'Kulüp yönetimi ve aktif olmak isteyen yeni üyeler.',
    whyItMatters: 'Kulüpteki iş yükünü tabana yayar ve üyelerin kulübe aidiyetini artırır.',
    mvpFeatures: [
      'Görev açma ve bütçe belirleme',
      'Görev teslimi ve yönetici onayı',
      'Aktif üye liderlik sıralaması'
    ],
    difficulty: 'Beginner',
    estimatedTime: '1-2 hafta',
    techStack: ['React', 'TypeScript', 'Tailwind', 'LocalStorage'],
    potentialRisks: ['Görevlerin kalitesiz teslim edilmesi (yönetici onay mekanizmasıyla çözülür)'],
    isBlockchainNecessary: false,
    blockchainJustification: 'Temel MVP için blokzincir şart değildir; puanlar yerel tutulabilir, ileride onchain tokena bağlanabilir.',
    avoidedPastPitfalls: [
      'Proje 2 dersi: Karmaşık smart contract yerine hafif frontend ve off-chain puanlama tercih edildi.'
    ],
    builtOnPastSuccesses: [
      'Küçük MVP prensibi tam olarak uygulandı.'
    ],
    createdAt: new Date('2026-04-11').toISOString(),
  }
];

// Initial IdeaScore Evaluation
const INITIAL_EVALUATIONS: IdeaEvaluation[] = [
  {
    id: 'eval-1',
    ideaId: 'idea-1',
    ideaName: 'PRU ChainCert: Doğrulanabilir Kulüp Başarı ve Görev Rozetleri',
    overallScore: 86.5,
    criteriaScores: {
      clubValue: 90,
      novelty: 85,
      feasibility: 85,
      technicalAccessibility: 80,
      blockchainRelevance: 95,
    },
    criteriaReasoning: {
      clubValue: 'Kulübün hem üye bağlılığını hem de öğrencilerin kariyer gelişimini doğrudan destekler.',
      novelty: 'Standart katılım belgelerini doğrulanabilir Soulbound Token ve dinamik QR ile birleştirir.',
      feasibility: 'Kapsam dar tutulduğu için 2 haftalık hackathon süresinde rahatlıkla tamamlanabilir.',
      technicalAccessibility: 'Ekip React ve temel ERC-721 geliştirmesinde yetkindir; karmaşık DeFi protokolü gerektirmez.',
      blockchainRelevance: 'Sertifikanın devredilemez ve manipüle edilemez olması için Soulbound blokzincir mimarisi gerçek bir değer katar.'
    },
    strengths: [
      'Kulübün gerçek bir operasyonel sorununu çözüyor.',
      'Küçük ve net MVP kapsamı ile yüksek başarı şansı.',
      'Blokzincir zorlama değil, bağımsız doğrulama için gerekli.'
    ],
    weaknesses: [
      'Cüzdansız üyeler için Web2 yedek akışına ihtiyaç duyar.'
    ],
    implementationRisks: [
      'Kullanıcıların testnet cüzdan kurulumunda zorlanması (otomatik demo cüzdanla aşılmalı).'
    ],
    recommendedImprovements: [
      'Öğrencilerin cüzdanı yoksa öğrenci numarasıyla kaydolabilmelerini sağlayan Web2.5 hibrit mod ekleyin.'
    ],
    recommendation: 'Strong Candidate',
    historicalLessonsAnalysis: {
      relevantProjects: ['PRU Kampüs Cüzdanı (Campus Wallet)', 'PRU Onchain Mezuniyet Yıllığı (NFT Yearbook)'],
      recurringProblemsWarning: [
        'Geçmişte PRU NFT Yıllığı projesinde kişisel verilerin zincire yazılması tepki çekmişti. Burada sadece sertifika hash\'i tutulmalı, kişisel veri onchain olmamalıdır.'
      ],
      specificMitigations: [
        '1. Kişisel verileri onchain yapmayın (Sadece keccak256 hash saklayın).',
        '2. MVP kapsamını 3 ekranla sınırlayın (Proje 1 dersi).',
        '3. Cüzdanı olmayan öğrencilere Web2 katılım hakkı tanıyın.'
      ],
      relevantLessonsExplanation: 'Geçmişte başarılı olan Kampüs Cüzdanı gibi odaklanmış bir MVP stratejisi izlenmeli; cross-chain gibi karmaşık bağımlılıklardan kaçınılmalıdır.'
    },
    evaluatedAt: new Date('2026-04-11').toISOString(),
    isSimulated: false,
  }
];

// Initial Blueprint
const INITIAL_BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: 'bp-1',
    ideaId: 'idea-1',
    projectName: 'PRU ChainCert (MVP Blueprint)',
    objective: 'Piri Reis Üniversitesi Blockchain Kulübü için 48 saatlik hackathon kapsamında çalışan bir doğrulanabilir katılım ve sertifika MVPsi üretmek.',
    targetUser: 'Kulüp yöneticileri, katılımcı öğrenciler ve staj mülakatı yapan şirketler.',
    problemStatement: 'Kağıt veya Canva ile hazırlanan katılım belgeleri kopyalanabilir ve işverenlerce teyit edilemez durumdadır.',
    coreMvpScope: [
      'Yönetici ekranı: Yeni etkinlik oluşturma ve tekil katılım kodu üretme',
      'Katılımcı ekranı: Öğrenci no veya cüzdan ile kayıt olma ve rozet kartını alma',
      'Doğrulama portalı: Hash veya Token ID ile herkese açık teyit ekranı'
    ],
    postponedFeatures: [
      'Otomatik SMTP e-posta kuyruğu',
      'IPFS üzerinde görsel pinning',
      'Cross-chain sertifika köprüsü'
    ],
    recommendedTechStack: [
      'Frontend: React 19 + TypeScript + Vite + Tailwind CSS',
      'İkonlar: Lucide React',
      'Onchain Katmanı: Polygon Amoy Testnet (ERC-721 SBT)',
      'Durum: LocalStorage (Sıfır veritabanı maliyeti)'
    ],
    milestones: [
      { title: 'Milestone 1: Temel Arayüz ve Veri Modeli', deadline: 'Saat 12', description: 'React SPA iskeleti, yönetim ve katılımcı formlarının kurulması.' },
      { title: 'Milestone 2: Soulbound Sözleşmesi ve Mintleme', deadline: 'Saat 24', description: 'PRUPassSBT.sol sözleşmesi ve Web3 cüzdan bağlantısı.' },
      { title: 'Milestone 3: Doğrulama Portalı ve Test', deadline: 'Saat 36', description: 'Açık sorgulama portalı ve uçtan uca testlerin yapılması.' },
      { title: 'Milestone 4: Demo Sunumu Hazırlığı', deadline: 'Saat 44', description: 'Jüri için canlı demo akışı ve sunum provası.' }
    ],
    tasks: [
      { id: 't-1', title: 'Proje iskeletini React + Vite + Tailwind ile kur', completed: true, category: 'setup' },
      { id: 't-2', title: 'Kulüp veri modellerini ve mock verileri tanımla', completed: true, category: 'setup' },
      { id: 't-3', title: 'Yönetici etkinlik açma arayüzünü geliştir', completed: true, category: 'core' },
      { id: 't-4', title: 'Katılımcı hızlı kayıt formunu oluştur', completed: true, category: 'core' },
      { id: 't-5', title: 'Açık sorgulama (Public Verifier) sayfasını bağla', completed: true, category: 'ui' },
      { id: 't-6', title: 'Solidity Soulbound akıllı sözleşmesini hazırla', completed: true, category: 'core' },
      { id: 't-7', title: 'Jüri için 3 dakikalık sunum akışını test et', completed: false, category: 'demo' }
    ],
    appliedHistoricalLessons: [
      {
        lessonTitle: 'Kapsam Disiplini (Proje 1)',
        actionableMeasure: 'E-posta SMTP sunucusu ve IPFS pinning ertelendi; sadece 3 temel ekran MVP kapsamına alındı.',
        accepted: true
      },
      {
        lessonTitle: 'Dış Entegrasyon Riski (Proje 2)',
        actionableMeasure: 'Karmaşık üçüncü parti köprüler yerine tek zincir (Polygon Amoy) ve simülasyon fallbacki tercih edildi.',
        accepted: true
      },
      {
        lessonTitle: 'Kullanıcı Gizliliği (Proje 3)',
        actionableMeasure: 'Kişisel fotoğraflar yerine sadece kriptografik hash ve öğrenci no doğrulandı.',
        accepted: true
      }
    ],
    testingChecklist: [
      'Form boş bırakıldığında hata mesajı veriyor mu?',
      'Doğrulama ekranında geçerli ve geçersiz hash senaryoları çalışıyor mu?',
      'Sayfa yenilendiğinde veriler korunuyor mu?',
      'Mobil ekranda arayüz düzgün görünüyor mu?'
    ],
    demoScript: [
      {
        timing: '00:00 - 00:45',
        section: 'Problem & Kulüp Gerçeği',
        whatToSayAndShow: '"Kulübümüzde her dönem onlarca etkinlik yapıyoruz ama Canva ile hazırlanan PDF sertifikalar günlerce sürüyor ve photoshop ile kolayca taklit edilebiliyor."'
      },
      {
        timing: '00:45 - 01:45',
        section: 'Canlı Çözüm Demosu',
        whatToSayAndShow: '"Yönetici olarak etkinliği başlatıyorum. Katılımcı formu dolduruyor ve 3 saniyede Soulbound katılım rozetini alıyor. İşte canlı doğrulama linki!"'
      },
      {
        timing: '01:45 - 02:30',
        section: 'Geçmiş Dersler & Mimari',
        whatToSayAndShow: '"Geçmiş projelerimizdeki kapsam hatalarından ders alarak sıfır maliyetli ve gaz masrafsız bu mimariyi kurduk. Kulüp yarın sabah kullanabilir."'
      }
    ],
    nextSteps: [
      'Üniversite rektörlüğü ile OBS sistemi entegrasyonu',
      'Polygon ana ağına geçiş ve sponsorluk fonlaması',
      'Mezunlar ağı için doğrulama APIsi'
    ],
    createdAt: new Date('2026-04-11').toISOString(),
  }
];

export const StorageService = {
  // Documents
  getDocuments(): ClubDocument[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
        return INITIAL_DOCUMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DOCUMENTS;
    }
  },

  saveDocument(doc: Omit<ClubDocument, 'id' | 'createdAt'>): ClubDocument {
    const docs = this.getDocuments();
    const newDoc: ClubDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newDoc, ...docs];
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(updated));
    return newDoc;
  },

  deleteDocument(id: string): void {
    const docs = this.getDocuments().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
  },

  // Historical Projects
  getProjects(): HistoricalProject[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  saveProject(project: Omit<HistoricalProject, 'id'>): HistoricalProject {
    const projects = this.getProjects();
    const newProject: HistoricalProject = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    const updated = [newProject, ...projects];
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    return newProject;
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  // Lessons Learned
  getLessons(): LessonLearned[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LESSONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(INITIAL_LESSONS));
        return INITIAL_LESSONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LESSONS;
    }
  },

  saveLesson(lesson: Omit<LessonLearned, 'id'>): LessonLearned {
    const lessons = this.getLessons();
    const newLesson: LessonLearned = {
      ...lesson,
      id: `lesson-${Date.now()}`,
    };
    const updated = [newLesson, ...lessons];
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(updated));
    return newLesson;
  },

  deleteLesson(id: string): void {
    const lessons = this.getLessons().filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
  },

  // Ideas
  getIdeas(): ProjectIdea[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.IDEAS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(INITIAL_IDEAS));
        return INITIAL_IDEAS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_IDEAS;
    }
  },

  saveIdea(idea: Omit<ProjectIdea, 'id' | 'createdAt'>): ProjectIdea {
    const ideas = this.getIdeas();
    const newIdea: ProjectIdea = {
      ...idea,
      id: `idea-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newIdea, ...ideas];
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(updated));
    return newIdea;
  },

  deleteIdea(id: string): void {
    const ideas = this.getIdeas().filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(ideas));
  },

  // Evaluations
  getEvaluations(): IdeaEvaluation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVALUATIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(INITIAL_EVALUATIONS));
        return INITIAL_EVALUATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_EVALUATIONS;
    }
  },

  saveEvaluation(evaluation: Omit<IdeaEvaluation, 'id' | 'evaluatedAt'>): IdeaEvaluation {
    const evals = this.getEvaluations();
    const newEval: IdeaEvaluation = {
      ...evaluation,
      id: `eval-${Date.now()}`,
      evaluatedAt: new Date().toISOString(),
    };
    // Replace if same idea exists, else prepend
    const filtered = evals.filter(e => e.ideaId !== evaluation.ideaId);
    const updated = [newEval, ...filtered];
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(updated));
    return newEval;
  },

  // Blueprints
  getBlueprints(): ProjectBlueprint[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLUEPRINTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.BLUEPRINTS, JSON.stringify(INITIAL_BLUEPRINTS));
        return INITIAL_BLUEPRINTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_BLUEPRINTS;
    }
  },

  saveBlueprint(blueprint: Omit<ProjectBlueprint, 'id' | 'createdAt'>): ProjectBlueprint {
    const blueprints = this.getBlueprints();
    const newBp: ProjectBlueprint = {
      ...blueprint,
      id: `bp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const filtered = blueprints.filter(b => b.ideaId !== blueprint.ideaId);
    const updated = [newBp, ...filtered];
    localStorage.setItem(STORAGE_KEYS.BLUEPRINTS, JSON.stringify(updated));
    return newBp;
  },

  updateBlueprintTask(blueprintId: string, taskId: string, completed: boolean): void {
    const blueprints = this.getBlueprints().map(bp => {
      if (bp.id === blueprintId) {
        return {
          ...bp,
          tasks: bp.tasks.map(t => t.id === taskId ? { ...t, completed } : t),
        };
      }
      return bp;
    });
    localStorage.setItem(STORAGE_KEYS.BLUEPRINTS, JSON.stringify(blueprints));
  },

  // Settings
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  resetAllData(): void {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(INITIAL_LESSONS));
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(INITIAL_IDEAS));
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(INITIAL_EVALUATIONS));
    localStorage.setItem(STORAGE_KEYS.BLUEPRINTS, JSON.stringify(INITIAL_BLUEPRINTS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  }
};

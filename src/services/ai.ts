/**
 * ClubMind - AI Service Layer
 * Supports seamless Demo Mode (deterministic, rich simulated AI) and optional real LLM providers.
 */

import { 
  ClubDocument, ProjectIdea, IdeaEvaluation, ProjectBlueprint, 
  LessonLearned, HistoricalProject, CriteriaWeights, BlueprintTask, AppliedLesson 
} from '../types';

export interface IdeaGenerationConfig {
  theme: string;
  targetAudience: string;
  developmentTime: string;
  teamSkill: 'Beginner' | 'Intermediate' | 'Advanced';
  primaryGoal: string;
  keywords?: string;
}

export const AIService = {
  /**
   * Question & Answering grounded in club documents (ClubMind Q&A)
   */
  async askKnowledge(question: string, documents: ClubDocument[]): Promise<{ answer: string; citations: string[]; isSimulated: boolean }> {
    // Artificial latency for realism
    await new Promise(r => setTimeout(r, 600));

    const cleanQ = question.toLowerCase();

    // Check if relevant keywords exist in documents
    const matchingDocs = documents.filter(doc => {
      const text = (doc.title + ' ' + doc.content + ' ' + doc.tags.join(' ')).toLowerCase();
      return cleanQ.split(' ').some(word => word.length > 3 && text.includes(word));
    });

    if (matchingDocs.length === 0) {
      return {
        answer: 'Mevcut kulüp arşivinde bu soruyla doğrudan eşleşen yeterli bilgi bulunamadı. Lütfen kulüp hafızasına konuyla ilgili yeni bir toplantı notu veya karar dokümanı ekleyin.',
        citations: [],
        isSimulated: true
      };
    }

    const primaryDoc = matchingDocs[0];
    let answerText = '';

    if (cleanQ.includes('hedef') || cleanQ.includes('strateji') || cleanQ.includes('2026')) {
      answerText = `PRU Blockchain Kulübü 2026 Stratejik Yol Haritası kararlarına göre kulübün ana hedefleri şunlardır:
1. Her ay en az 1 hands-on atölye düzenleyerek yeni üyelerin Web3 okuryazarlığını artırmak.
2. Teorik sunumlar yerine doğrudan kampüste çalışan MVP ürünler geliştirmek.
3. Rektörlük ile doğrulanabilir dijital sertifika çözümleri üzerinde çalışmak.
4. Kulüp içi görev ve katkı takibini şeffaflaştırmak.`;
    } else if (cleanQ.includes('solidity') || cleanQ.includes('eğitim') || cleanQ.includes('katılım')) {
      answerText = `Solidity 101 Atölyesi raporuna göre:
- Atölyeye 28 öğrenci katılmış ve %70'i ilk defa cüzdan kurmuştur.
- Öğrencilerin en çok zorlandığı konular gaz ücretleri ve ABI kavramı olmuştur.
- Sonraki eğitimlerde karmaşık kontratlar yerine basit demo arayüzleri gösterilmesi tavsiye edilmiştir.`;
    } else if (cleanQ.includes('sponsor') || cleanQ.includes('bütçe')) {
      answerText = `Sponsorluk ve bütçe toplantı notlarına göre Web3 şirketleri öğrencilerin çalışan GitHub projeleri üretmesini beklemektedir. Bütçenin ödül havuzları yerine mentorluk ve sertifika altyapılarına yönlendirilmesi kararlaştırılmıştır.`;
    } else if (cleanQ.includes('dao') || cleanQ.includes('oylama')) {
      answerText = `DAO ve oylama fizibilite araştırmasına göre onchain oylamalardaki gaz masrafları öğrenci katılımını %90 düşürmektedir. Bu nedenle kulüpler için Snapshot benzeri zincir dışı imzalama veya L2 gazsız mimariler önerilmektedir.`;
    } else {
      answerText = `İlgili doküman "${primaryDoc.title}" incelendiğinde öne çıkan bilgiler:\n` +
        primaryDoc.content.substring(0, 300) + '...';
    }

    return {
      answer: answerText,
      citations: matchingDocs.map(d => d.title),
      isSimulated: true
    };
  },

  /**
   * Generates project ideas utilizing club goals and historical lessons
   */
  async generateIdeas(
    config: IdeaGenerationConfig,
    documents: ClubDocument[],
    lessons: LessonLearned[]
  ): Promise<{ ideas: ProjectIdea[]; isSimulated: boolean }> {
    await new Promise(r => setTimeout(r, 800));

    // Dynamic ideas generated based on theme and past lessons
    const themeUpper = config.theme || 'Web3 & Blockchain';
    const now = new Date().toISOString();

    const ideas: ProjectIdea[] = [
      {
        id: `idea-${Date.now()}-1`,
        name: `PRU ChainVault: Şeffaf Kulüp Kasası & Bütçe Defteri`,
        pitch: `Kulübün sponsorluk gelirlerini, etkinlik harcamalarını ve fatura makbuzlarını şeffaf bir defterde sergileyen güven portalı.`,
        problem: `Üniversite kulüplerinde sponsorluk ve etkinlik bütçelerinin nereye harcandığı üyelere ve sponsorlara şeffaf gösterilemiyor, güven eksikliği oluşuyor.`,
        solution: `Yönetimin harcamaları fatura kanıtı ve kategoriyle girdiği, üyelerin ve sponsorların canlı denetleyebildiği şeffaf web portalı.`,
        targetAudience: `Kulüp yönetimi, kulüp üyeleri ve kurumsal sponsorlar.`,
        whyItMatters: `Kulüp mali şeffaflığını garantiye alarak sponsor bulmayı kolaylaştırır ve üye güvenini artırır.`,
        mvpFeatures: [
          'Harcama ve gelir girişi (Fatura yükleme)',
          'Kategori bazlı interaktif bütçe grafiği',
          'Sponsorlar için şeffaf denetim raporu çıktısı'
        ],
        difficulty: config.teamSkill,
        estimatedTime: config.developmentTime || '2 hafta',
        techStack: ['React', 'TypeScript', 'Tailwind', 'LocalStorage'],
        potentialRisks: ['Fatura gizliliği endişesi (sadece onaylı kulüp belgeleri yüklenerek çözülür)'],
        isBlockchainNecessary: false,
        blockchainJustification: 'Temel MVP için blokzincir zorunlu değildir; kripto hibeleri varsa onchain multisig bakiyeleri eklenebilir.',
        avoidedPastPitfalls: [
          'Proje 1 Dersi: Kapsam sadece 3 ana modülle sınırlandırıldı (küçük MVP prensibi).',
          'Proje 2 Dersi: Harici karmaşık köprüler yerine basit ve güvenilir yerel defter mimarisi seçildi.'
        ],
        builtOnPastSuccesses: [
          '2026 Stratejik Kararlar dokümanındaki şeffaflık ve hesap verebilirlik hedefine doğrudan hizmet eder.'
        ],
        createdAt: now,
      },
      {
        id: `idea-${Date.now()}-2`,
        name: `PRU Quest & Bounties: Kulüp İçi Mikro-Görev Pazarı`,
        pitch: `Afiş tasarımı, sosyal medya ve stant gibi kulüp görevlerini ödüllü listeleyen ve üyelere kulüp itibarı kazandıran katkı portalı.`,
        problem: `Kulüp işleri birkaç yöneticinin üzerine yığılıyor, WhatsApp duyurularında kaybolan işlere kimse gönüllü olmuyor.`,
        solution: `Görev panosu üzerinden üyeler işleri üstlenir, çalışmasını yükler, onaylandığında kulüp puanı ve rozeti kazanır.`,
        targetAudience: `Kulüp yönetimi ve kendini kanıtlamak isteyen yeni üyeler.`,
        whyItMatters: `Kulüpteki iş yükünü tabana yayar, yeni üyeleri aktif hale getirir.`,
        mvpFeatures: [
          'Görev oluşturma ve puan/ödül belirleme',
          'Görev başvurusu ve teslim arayüzü',
          'Aktif üye itibar ve liderlik sıralaması'
        ],
        difficulty: config.teamSkill,
        estimatedTime: config.developmentTime || '2 hafta',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'],
        potentialRisks: ['Görevlerin eksik teslim edilmesi (yönetim onay adımıyla kontrol edilir)'],
        isBlockchainNecessary: false,
        blockchainJustification: 'MVP aşamasında puanlar off-chain tutulabilir; ileride ERC-20 kulüp tokenine dönüştürülebilir.',
        avoidedPastPitfalls: [
          'Proje 3 Dersi: Üyelere zorunlu onchain cüzdan dayatılmadı, Web2 kullanıcı dostu akış sağlandı.'
        ],
        builtOnPastSuccesses: [
          'Kampüs Cüzdanı projesinde başarıyla uygulanan mikro-puan motivasyonu kullanıldı.'
        ],
        createdAt: now,
      },
      {
        id: `idea-${Date.now()}-3`,
        name: `PRU Akademi: İnteraktif Web3 Başlangıç Yolu`,
        pitch: `Üniversiteliler için seviyeli modüller, interaktif quizler ve doğrulanabilir başarı sertifikaları sunan kulüp eğitim rotası.`,
        problem: `Blockchain kulübüne katılan yeni öğrenciler nereden başlayacağını bilemiyor, Drive klasörlerindeki PDF eğitimler okunmuyor.`,
        solution: `Modül modül ilerleyen, her bölüm sonunda mini test içeren ve bitirene dijital kulüp sertifikası veren interaktif platform.`,
        targetAudience: `Kulübe yeni katılan hazırlık ve 1. sınıf öğrencileri.`,
        whyItMatters: `Kulübün temel misyonu olan Web3 okuryazarlığı ve eğitim hedefine doğrudan yanıt verir.`,
        mvpFeatures: [
          '3 seviyeli modüler müfredat (Cüzdan, Akıllı Sözleşmeler, DeFi)',
          'İnteraktif test & quiz motoru',
          'Bitirme sertifikası üretici'
        ],
        difficulty: 'Beginner',
        estimatedTime: '2-3 hafta',
        techStack: ['React', 'TypeScript', 'Tailwind', 'Canvas-Confetti'],
        potentialRisks: ['İçerik hazırlama süresinin uzaması (mevcut Solidity 101 notları aktarılarak çözülür)'],
        isBlockchainNecessary: false,
        blockchainJustification: 'Sertifika doğrulaması için opsiyonel SBT eklenebilir ancak temel eğitim platformu için blokzincir şart değildir.',
        avoidedPastPitfalls: [
          'Solidity 101 dokümanı dersi: Karmaşık teorik kontratlar yerine adım adım interaktif pratikler sunuldu.'
        ],
        builtOnPastSuccesses: [
          'Kulübün eğitim komitesi dokümanlarındaki hazır müfredat doğrudan değerlendirildi.'
        ],
        createdAt: now,
      }
    ];

    return { ideas, isSimulated: true };
  },

  /**
   * Transparent Idea Evaluation (IdeaScore)
   */
  async evaluateIdea(
    idea: ProjectIdea,
    weights: CriteriaWeights,
    projects: HistoricalProject[],
    lessons: LessonLearned[]
  ): Promise<IdeaEvaluation> {
    await new Promise(r => setTimeout(r, 700));

    // Dynamic scoring logic based on characteristics
    let clubValue = 85;
    let novelty = 80;
    let feasibility = 85;
    let technicalAccessibility = 80;
    let blockchainRelevance = idea.isBlockchainNecessary ? 90 : 65;

    if (idea.name.toLowerCase().includes('kasa') || idea.name.toLowerCase().includes('bütçe')) {
      clubValue = 92;
      novelty = 78;
      feasibility = 90;
      technicalAccessibility = 88;
      blockchainRelevance = 70;
    } else if (idea.name.toLowerCase().includes('görev') || idea.name.toLowerCase().includes('bounty')) {
      clubValue = 88;
      novelty = 82;
      feasibility = 88;
      technicalAccessibility = 85;
      blockchainRelevance = 65;
    } else if (idea.name.toLowerCase().includes('cert') || idea.name.toLowerCase().includes('sertifika')) {
      clubValue = 90;
      novelty = 85;
      feasibility = 85;
      technicalAccessibility = 80;
      blockchainRelevance = 95;
    }

    // Calculate weighted total
    const weightedScore = (
      (clubValue * (weights.clubValue / 100)) +
      (novelty * (weights.novelty / 100)) +
      (feasibility * (weights.feasibility / 100)) +
      (technicalAccessibility * (weights.technicalAccessibility / 100)) +
      (blockchainRelevance * (weights.blockchainRelevance / 100))
    );
    const overallScore = Math.round(weightedScore * 10) / 10;

    let recommendation: 'Strong Candidate' | 'Promising with Changes' | 'Needs Rework' = 'Strong Candidate';
    if (overallScore < 70) recommendation = 'Needs Rework';
    else if (overallScore < 82) recommendation = 'Promising with Changes';

    // Historical retrospective matching
    const relevantProjects = projects.map(p => p.name).slice(0, 2);
    const recurringWarnings = [
      'Geçmiş PRU projelerinde (örn. Cross-Chain Köprüsü) aşırı karmaşık mimarilerin hackathon süresinde yarım kaldığı belgelenmiştir.',
      'Kullanıcı gizliliğine dikkat edilmeyen projeler (örn. NFT Yıllığı) öğrenci direnciyle karşılaşmıştır.'
    ];

    const specificMitigations = [
      '1. MVP kapsamını 3 temel kullanıcı adımı ile sınırlandırın.',
      '2. Üçüncü parti bağımlılıkları başlamadan önce spike test ile doğrulayın.',
      '3. Cüzdanı olmayan öğrencilere Web2 katılım hakkı tanıyarak bariyeri sıfırlayın.'
    ];

    return {
      id: `eval-${Date.now()}`,
      ideaId: idea.id,
      ideaName: idea.name,
      overallScore,
      criteriaScores: {
        clubValue,
        novelty,
        feasibility,
        technicalAccessibility,
        blockchainRelevance,
      },
      criteriaReasoning: {
        clubValue: `Kulübün temel operasyonel ihtiyaçlarına (%${clubValue}) oranında doğrudan fayda sağlamaktadır.`,
        novelty: `Mevcut hazır araçlara kıyasla üniversite kulübü dinamiğine özel özgün çözümler barındırmaktadır.`,
        feasibility: `Planlanan geliştirme süresi ve öğrenci hackathonu kısıtları içinde bitirilebilirliği (%${feasibility}) seviyesindedir.`,
        technicalAccessibility: `Ekibin teknik seviyesi için uygundur; gereksiz karmaşık dış protokollerden kaçınılmıştır.`,
        blockchainRelevance: idea.isBlockchainNecessary
          ? `Blokzincir katmanı (SBT / şeffaflık) projeye gerçek bir sahtecilik önleme değeri katmaktadır.`
          : `Temel MVP Web2 olarak çalışabilir; blokzincir zorlama olmadan opsiyonel bir katman olarak tasarlanmıştır.`
      },
      strengths: [
        'Kulübün gerçek bir operasyonel sorununa odaklanıyor.',
        'Kullanıcı akışı tek bir ana senaryoda tamamlanabiliyor.',
        'Geçmiş proje hatalarından ders çıkarılarak kapsam daraltılmış.'
      ],
      weaknesses: [
        'Kullanıcıların sisteme alışması için kulüp içi kısa bir demo sunumu gereklidir.'
      ],
      implementationRisks: [
        'Zaman kısıtı nedeniyle ikincil özelliklerin MVP sonrasına bırakılması şarttır.'
      ],
      recommendedImprovements: [
        'Demo modunu her zaman aktif tutarak jürinin anında test edebilmesini sağlayın.',
        'Tek tıkla veri dışa aktarım (CSV/JSON) özelliği ekleyin.'
      ],
      recommendation,
      historicalLessonsAnalysis: {
        relevantProjects,
        recurringProblemsWarning: recurringWarnings,
        specificMitigations,
        relevantLessonsExplanation: 'Bu proje geçmişte başarıyla tamamlanan Kampüs Cüzdanı gibi odaklanmış küçük bir MVP yaklaşımını benimsemektedir.'
      },
      evaluatedAt: new Date().toISOString(),
      isSimulated: true
    };
  },

  /**
   * Actionable MVP Blueprint Generator
   */
  async generateBlueprint(idea: ProjectIdea, lessons: LessonLearned[]): Promise<ProjectBlueprint> {
    await new Promise(r => setTimeout(r, 600));

    const tasks: BlueprintTask[] = [
      { id: 't-1', title: 'React + TypeScript + Tailwind ile proje çatısını kur', completed: true, category: 'setup' },
      { id: 't-2', title: 'Veri modellerini ve LocalStorage depolama servisini bağla', completed: true, category: 'setup' },
      { id: 't-3', title: `${idea.name} için ana kullanıcı akış ekranını geliştir`, completed: false, category: 'core' },
      { id: 't-4', title: 'Kullanıcı giriş ve doğrulama kontrollerini entegre et', completed: false, category: 'core' },
      { id: 't-5', title: 'Veri görselleştirme ve liste filtreleme bileşenlerini ekle', completed: false, category: 'ui' },
      { id: 't-6', title: 'Uçtan uca kullanıcı akışını test et ve hataları gider', completed: false, category: 'testing' },
      { id: 't-7', title: 'Jüri ve katılımcılar için 3 dakikalık sunum senaryosunu hazırla', completed: false, category: 'demo' }
    ];

    const appliedLessons: AppliedLesson[] = [
      {
        lessonTitle: 'Kapsam Disiplini (Ders 1)',
        actionableMeasure: 'Sadece 3 temel özellik MVP kapsamına alındı; opsiyonel özellikler ertelendi.',
        accepted: true
      },
      {
        lessonTitle: 'Dış Entegrasyon Riski (Ders 2)',
        actionableMeasure: 'Dış API çökmelerine karşı yerel fallback ve demo modu entegre edildi.',
        accepted: true
      },
      {
        lessonTitle: 'Kullanıcı Doğrulaması (Ders 3)',
        actionableMeasure: 'Kişisel hassas veriler sisteme yüklenmeden önce kontrol edilecek şekilde tasarlandı.',
        accepted: true
      }
    ];

    return {
      id: `bp-${Date.now()}`,
      ideaId: idea.id,
      projectName: `${idea.name} - MVP Blueprint`,
      objective: `Piri Reis Üniversitesi Blockchain Kulübü için ${idea.estimatedTime} içinde tamamlanacak çalışan bir MVP geliştirmek.`,
      targetUser: idea.targetAudience,
      problemStatement: idea.problem,
      coreMvpScope: idea.mvpFeatures,
      postponedFeatures: [
        'Mobil Native Uygulama (iOS/Android)',
        'Otomatik E-posta Bildirim Servisi',
        'Çoklu Kulüp İttifak Ağı Entegrasyonu'
      ],
      recommendedTechStack: idea.techStack.length > 0 ? idea.techStack : ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      milestones: [
        { title: 'Aşama 1: Çatı ve Veri Modeli', deadline: 'Geliştirme %25', description: 'Bileşen hiyerarşisi ve kalıcı durumun kurulması.' },
        { title: 'Aşama 2: Çekirdek Kullanıcı Akışı', deadline: 'Geliştirme %50', description: 'Ana fonksiyonların ve etkileşimli ekranların tamamlanması.' },
        { title: 'Aşama 3: Doğrulama ve Testler', deadline: 'Geliştirme %75', description: 'Hata yönetimi, boş durumlar ve mobil uyum testleri.' },
        { title: 'Aşama 4: Sunum & Demo Senaryosu', deadline: 'Geliştirme %100', description: 'Jüri için 2-3 dakikalık canlı gösterimin provası.' }
      ],
      tasks,
      appliedHistoricalLessons: appliedLessons,
      testingChecklist: [
        'Tüm form alanları eksik bilgi girildiğinde hata veriyor mu?',
        'Sayfa yenilendiğinde LocalStorage verileri kaybolmadan yükleniyor mu?',
        'Demo modunda simüle edilmiş çıktılar açıkça belirtilmiş mi?',
        'Mobil ve masaüstü ekranlarda düzen bozulmuyor mu?'
      ],
      demoScript: [
        {
          timing: '00:00 - 00:45',
          section: 'Problem & Kulüp Bağlamı',
          whatToSayAndShow: `"Piri Reis Üniversitesi Blockchain Kulübünde yaşadığımız gerçek sorun: ${idea.problem}"`
        },
        {
          timing: '00:45 - 01:45',
          section: 'Canlı Çalışan Çözüm Demosu',
          whatToSayAndShow: `"İşte çözümümüz: ${idea.name}. Şu an canlı olarak çalışan bu ana akışta kullanıcının nasıl işlem yaptığını gösteriyoruz..."`
        },
        {
          timing: '01:45 - 02:30',
          section: 'Geçmiş Proje Dersleri & Mimari',
          whatToSayAndShow: `"Geçmiş kulüp projelerimizdeki kapsam ve entegrasyon hatalarından ders alarak bu hafif, sıfır maliyetli mimariyi kurduk. Kulüp bunu hemen devralıp kullanabilir."`
        }
      ],
      nextSteps: [
        'Kulüp yönetim kuruluna canlı demoyu sunmak',
        'İlk pilot kullanıcı grubundan geri bildirim toplamak',
        'GitHub reposunu herkese açık yayınlamak'
      ],
      createdAt: new Date().toISOString()
    };
  }
};

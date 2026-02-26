(function() {
  'use strict';

  window.__i18nPreloaderHandled = true;

  var SUPPORTED_LANGS = ['es', 'pt', 'en'];
  var PREF_KEY = 'aem_lang_pref_v1';
  var LEGACY_THEME_KEY = 'aem_theme_pref_v1';
  var THEME_STATE_KEY = 'aem_theme_state_v2';
  var GEO_KEY = 'aem_geo_cache_v1';
  var GEO_TTL = 7 * 24 * 60 * 60 * 1000;
  var AUTO_THEME_TICK_MS = 60 * 1000;
  var PRELOADER_MIN_MS = 2500;
  var detectedCountryCode = '';
  var currentTheme = '';
  var autoThemeTimer = 0;

  // =====================================================
  // TRADUCCIONES - SER EN EL CUERPO
  // =====================================================

  var BASE_EN = {
    flag: '\u{1F1EC}\u{1F1E7}',
    metaTitle: 'Ser en el Cuerpo \u2014 Florencia Serruya | Movement, Creativity & Transformation',
    metaDescription: 'Annual journey of movement, creativity and personal transformation with Florencia Serruya in Mendoza, Argentina. Biodanza, contemporary dance, improvisation and creative play.',
    preloaderDetecting: 'Detecting country and language...',
    preloaderReady: 'Welcome, visitor from {country}.',
    brandSub: 'Florencia Serruya',
    nav: { home: 'Home', method: 'Method', about: 'About me', gallery: 'Gallery', projects: 'Projects', contact: 'Contact', book: 'Reserve your spot', menuAria: 'Open navigation menu', langAria: 'Select language' },
    hero: {
      badge: 'Florencia Serruya',
      title: 'Ser en el <em>Cuerpo</em>',
      subtitle: 'Movement, creativity and personal transformation throughout a full year. A unique method that weaves biodanza, conscious movement, creative play, writing and improvisation dynamics to awaken what your body already knows.',
      primary: 'Reserve your spot',
      secondary: 'Discover the method',
      scroll: 'Discover more'
    },
    method: {
      label: 'Flagship project',
      title: 'Ser en el <em>Cuerpo</em>',
      subtitle: 'Small groups with individual care and personalized guidance. Generates authentic expression, healthier bonds, identity strengthening and the transformation of painful memories. Accessible from anywhere in the world through online sessions.',
      desc: '<strong>Ser en el Cuerpo</strong> is a space to encounter yourself through movement, music and creativity. A method that integrates biodanza, conscious movement, creative play, writing and improvisation so you can discover real tools for your daily life. Each session is an invitation to inhabit your body with greater freedom and presence.',
      tags: ['Authentic expression', 'Tools for life', 'Healthy bonds', 'Identity', 'Healing'],
      scheduleTitle: 'In-person schedules',
      days: {
        wed: 'Wednesday',
        thu: 'Thursday',
        mon: 'Monday'
      },
      locations: {
        parana: 'Espacio Parana',
        dorrego: 'Centro de Luz Yo Soy, Dorrego'
      },
      startInfo: 'Start: first week of March \u2014 Limited spots',
      pricing: {
        amount: '$50.000',
        detail: 'Monthly fee',
        discount: '10% discount paying in February'
      },
      benefits: [
        'Health form for individual and group care',
        'Material of the annual journey and themes',
        'Integration of the experience into daily life'
      ],
      onlineNote: 'Online sessions available \u2014 inquire via direct message',
      healthFormDesc: 'Health form upload',
      healthFormBtn: 'Complete form',
      healthFormHuman: 'I am human'
    },
    about: {
      label: 'About me',
      title: 'Florencia <em>Serruya</em>',
      p1: 'Contemporary dance teacher and biodanza facilitator. Choreographer, dancer and director of the Intempo company. Creator of the Ser en el Cuerpo method.',
      p2: 'Director of the award-winning short film "Identidad". My work integrates movement, creativity and human connection as tools for personal and collective transformation.',
      features: [
        { title: 'Contemporary dance', desc: 'Trained in contemporary dance techniques, improvisation and choreographic composition.' },
        { title: 'Biodanza', desc: 'Biodanza facilitator in the Rolando Toro System, integrating music, movement and encounter for human development.' },
        { title: 'Intempo Company', desc: 'Director and choreographer of the Intempo dance company, with performances at venues and festivals.' }
      ]
    },
    projects: {
      label: 'Other work',
      title: 'Beyond the <em>method</em>',
      subtitle: 'Workshops, artistic projects and collaborations that nourish my work as a creator and teacher.',
      cards: [
        { title: 'Workshops & training', desc: 'Complementary workshops in contemporary dance, conscious movement and improvisation. Intensive training for those who want to deepen the language of the body.' },
        { title: 'Film & artistic projects', desc: 'Participation in short films and audiovisual projects. Director of the award-winning short film "Identidad", exploring the body as territory of memory and transformation.' },
        { title: 'Collaborations & events', desc: 'Workshops, special events and collaborations with other artists and spaces. Movement experiences in diverse contexts: festivals, gatherings and wellness events.' }
      ]
    },
    form: {
      title: 'Reserve your spot',
      name: 'Full name', email: 'Email', phone: 'Phone / WhatsApp', unit: 'Interest', message: 'Message (optional)',
      phName: 'Your name', phEmail: 'you@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Tell us about your interest, questions or comments...',
      errName: 'Please enter your name', errEmail: 'Please enter a valid email', errPhone: 'Please enter a valid phone',
      unitOptions: ['Select...', 'Ser en el Cuerpo', 'Workshops & training', 'General inquiry'],
      submit: 'Send inquiry', sending: 'Sending...', successTitle: 'Inquiry sent', successText: 'Thank you for your interest. I will reply shortly by email or WhatsApp.',
      infoTitle: 'Contact information', infoLabels: ['Location', 'WhatsApp', 'Email', 'Class schedule']
    },
    footer: {
      desc: 'Annual journey of movement, creativity and personal transformation with Florencia Serruya in Mendoza, Argentina.',
      navHeading: 'Navigation', unitsHeading: 'Spaces', contactHeading: 'Contact',
      navLinks: ['Home', 'Method', 'About me', 'Gallery', 'Projects', 'Contact'],
      unitLinks: ['Ser en el Cuerpo', 'Workshops & training', 'Intempo Company'],
      rights: 'All rights reserved.'
    },
    whatsapp: { tooltip: 'Contact on WhatsApp', message: 'Hi! I want to reserve my spot at Ser en el Cuerpo' }
  };

  var TRANSLATIONS = {
    es: {
      flag: '\u{1F1E6}\u{1F1F7}',
      metaTitle: 'Ser en el Cuerpo \u2014 Florencia Serruya | Movimiento, Creatividad y Transformaci\u00f3n',
      metaDescription: 'Recorrido anual de movimiento, creatividad y transformaci\u00f3n personal con Florencia Serruya en Mendoza, Argentina. Biodanza, danza contempor\u00e1nea, improvisaci\u00f3n y juego creativo.',
      preloaderDetecting: 'Detectando pa\u00eds e idioma...',
      preloaderReady: 'Bienvenido, visitante de {country}.',
      brandSub: 'Florencia Serruya',
      nav: { home: 'Inicio', method: 'M\u00e9todo', about: 'Sobre m\u00ed', gallery: 'Galer\u00eda', projects: 'Proyectos', contact: 'Contacto', book: 'Confirm\u00e1 tu lugar', menuAria: 'Abrir men\u00fa de navegaci\u00f3n', langAria: 'Seleccionar idioma' },
      hero: {
        badge: 'Florencia Serruya',
        title: 'Ser en el <em>Cuerpo</em>',
        subtitle: 'Movimiento, creatividad y transformaci\u00f3n personal a lo largo de todo un a\u00f1o. Un m\u00e9todo propio que entrelaza biodanza, movimiento consciente, juego creativo, escritura y din\u00e1micas de improvisaci\u00f3n para despertar lo que tu cuerpo ya sabe.',
        primary: 'Confirm\u00e1 tu lugar',
        secondary: 'Conocer el m\u00e9todo',
        scroll: 'Descubr\u00ed m\u00e1s'
      },
      method: {
        label: 'Proyecto insignia',
        title: 'Ser en el <em>Cuerpo</em>',
        subtitle: 'Grupos reducidos con cuidado individual y seguimiento personalizado. Genera expresi\u00f3n aut\u00e9ntica, v\u00ednculos m\u00e1s sanos, fortalecimiento de la identidad y la transformaci\u00f3n de las memorias de dolor. Accesible desde cualquier lugar del mundo a trav\u00e9s de sesiones online.',
        desc: '<strong>Ser en el Cuerpo</strong> es un espacio de encuentro con vos mismo a trav\u00e9s del movimiento, la m\u00fasica y la creatividad. Un m\u00e9todo que integra biodanza, movimiento consciente, juego creativo, escritura e improvisaci\u00f3n para que descubras herramientas reales para tu vida cotidiana. Cada sesi\u00f3n es una invitaci\u00f3n a habitar tu cuerpo con mayor libertad y presencia.',
        tags: ['Expresi\u00f3n aut\u00e9ntica', 'Herramientas para la vida', 'V\u00ednculos sanos', 'Identidad', 'Sanaci\u00f3n'],
        scheduleTitle: 'Horarios presenciales',
        days: {
          wed: 'Mi\u00e9rcoles',
          thu: 'Jueves',
          mon: 'Lunes'
        },
        locations: {
          parana: 'Espacio Paran\u00e1',
          dorrego: 'Centro de Luz Yo Soy, Dorrego'
        },
        startInfo: 'Inicio: primera semana de marzo \u2014 Cupos limitados',
        pricing: {
          amount: '$50.000',
          detail: 'Cuota mensual',
          discount: '10% dto. abonando en febrero'
        },
        benefits: [
          'Ficha de salud para cuidado individual y grupal',
          'Material del recorrido anual y tem\u00e1ticas',
          'Integraci\u00f3n de lo vivido en la vida diaria'
        ],
        onlineNote: 'Sesiones online disponibles \u2014 consult\u00e1 por mensaje directo',
        healthFormDesc: 'Carga de ficha de salud',
        healthFormBtn: 'Completar ficha',
        healthFormHuman: 'Soy humano'
      }
    },
    pt: {
      flag: '\u{1F1E7}\u{1F1F7}',
      metaTitle: 'Ser en el Cuerpo \u2014 Florencia Serruya | Movimento, Criatividade e Transforma\u00e7\u00e3o',
      metaDescription: 'Jornada anual de movimento, criatividade e transforma\u00e7\u00e3o pessoal com Florencia Serruya em Mendoza, Argentina. Biodan\u00e7a, dan\u00e7a contempor\u00e2nea, improvisa\u00e7\u00e3o e jogo criativo.',
      preloaderDetecting: 'Detectando pa\u00eds e idioma...',
      preloaderReady: 'Bem-vindo, visitante de {country}.',
      brandSub: 'Florencia Serruya',
      nav: { home: 'In\u00edcio', method: 'M\u00e9todo', about: 'Sobre mim', gallery: 'Galeria', projects: 'Projetos', contact: 'Contato', book: 'Reserve seu lugar', menuAria: 'Abrir menu de navega\u00e7\u00e3o', langAria: 'Selecionar idioma' },
      hero: {
        badge: 'Florencia Serruya',
        title: 'Ser en el <em>Cuerpo</em>',
        subtitle: 'Movimento, criatividade e transforma\u00e7\u00e3o pessoal ao longo de todo um ano. Um m\u00e9todo pr\u00f3prio que entrelan\u00e7a biodan\u00e7a, movimento consciente, jogo criativo, escrita e din\u00e2micas de improvisa\u00e7\u00e3o para despertar o que seu corpo j\u00e1 sabe.',
        primary: 'Reserve seu lugar',
        secondary: 'Conhecer o m\u00e9todo',
        scroll: 'Descubra mais'
      },
      method: {
        label: 'Projeto insignia',
        title: 'Ser en el <em>Cuerpo</em>',
        subtitle: 'Grupos reduzidos com cuidado individual e acompanhamento personalizado. Gera express\u00e3o aut\u00eantica, v\u00ednculos mais saud\u00e1veis, fortalecimento da identidade e a transforma\u00e7\u00e3o das mem\u00f3rias de dor. Acess\u00edvel de qualquer lugar do mundo atrav\u00e9s de sess\u00f5es online.',
        desc: '<strong>Ser en el Cuerpo</strong> \u00e9 um espa\u00e7o de encontro consigo mesmo atrav\u00e9s do movimento, da m\u00fasica e da criatividade. Um m\u00e9todo que integra biodan\u00e7a, movimento consciente, jogo criativo, escrita e improvisa\u00e7\u00e3o para que voc\u00ea descubra ferramentas reais para sua vida cotidiana. Cada sess\u00e3o \u00e9 um convite para habitar seu corpo com maior liberdade e presen\u00e7a.',
        tags: ['Express\u00e3o aut\u00eantica', 'Ferramentas para a vida', 'V\u00ednculos saud\u00e1veis', 'Identidade', 'Cura'],
        scheduleTitle: 'Hor\u00e1rios presenciais',
        days: {
          wed: 'Quarta-feira',
          thu: 'Quinta-feira',
          mon: 'Segunda-feira'
        },
        locations: {
          parana: 'Espacio Paran\u00e1',
          dorrego: 'Centro de Luz Yo Soy, Dorrego'
        },
        startInfo: 'In\u00edcio: primeira semana de mar\u00e7o \u2014 Vagas limitadas',
        pricing: {
          amount: '$50.000',
          detail: 'Mensalidade',
          discount: '10% de desconto pagando em fevereiro'
        },
        benefits: [
          'Ficha de sa\u00fade para cuidado individual e grupal',
          'Material da jornada anual e temas',
          'Integra\u00e7\u00e3o do vivenciado na vida di\u00e1ria'
        ],
        onlineNote: 'Sess\u00f5es online dispon\u00edveis \u2014 consulte por mensagem direta',
        healthFormDesc: 'Carregamento da ficha de sa\u00fade',
        healthFormBtn: 'Preencher ficha',
        healthFormHuman: 'Sou humano'
      }
    }
  };

  // === TRADUCCIONES EXTENDIDAS - ESPA\u00d1OL ===
  TRANSLATIONS.es.about = {
    label: 'Sobre m\u00ed',
    title: 'Florencia <em>Serruya</em>',
    p1: 'Profesora de danza contempor\u00e1nea y facilitadora de biodanza. Core\u00f3grafa, bailarina y directora de la compa\u00f1\u00eda Intempo. Creadora del m\u00e9todo Ser en el Cuerpo.',
    p2: 'Directora del cortometraje ganador \u201cIdentidad\u201d. Mi trabajo integra el movimiento, la creatividad y la conexi\u00f3n humana como herramientas de transformaci\u00f3n personal y colectiva.',
    features: [
      { title: 'Danza contempor\u00e1nea', desc: 'Profesora formada en t\u00e9cnicas de danza contempor\u00e1nea, improvisaci\u00f3n y composici\u00f3n coreogr\u00e1fica.' },
      { title: 'Biodanza', desc: 'Facilitadora de Biodanza Sistema Rolando Toro, integrando m\u00fasica, movimiento y encuentro para el desarrollo humano.' },
      { title: 'Compa\u00f1\u00eda Intempo', desc: 'Directora y core\u00f3grafa de la compa\u00f1\u00eda de danza Intempo, con presentaciones en escenarios y festivales.' }
    ]
  };
  TRANSLATIONS.es.projects = {
    label: 'Otros trabajos',
    title: 'M\u00e1s all\u00e1 del <em>m\u00e9todo</em>',
    subtitle: 'Talleres, proyectos art\u00edsticos y colaboraciones que nutren mi trabajo como creadora y docente.',
    cards: [
      { title: 'Talleres y formaciones', desc: 'Talleres complementarios de danza contempor\u00e1nea, movimiento consciente e improvisaci\u00f3n. Formaciones intensivas para quienes quieren profundizar en el lenguaje del cuerpo.' },
      { title: 'Cine y proyectos art\u00edsticos', desc: 'Participaci\u00f3n en cortometrajes y proyectos audiovisuales. Directora del cortometraje ganador \u201cIdentidad\u201d, que explora el cuerpo como territorio de memoria y transformaci\u00f3n.' },
      { title: 'Colaboraciones y eventos', desc: 'Workshops, eventos especiales y colaboraciones con otros artistas y espacios. Experiencias de movimiento en contextos diversos: festivales, encuentros y jornadas de bienestar.' }
    ]
  };
  TRANSLATIONS.es.form = {
    title: 'Confirm\u00e1 tu lugar',
    name: 'Nombre completo', email: 'Email', phone: 'Tel\u00e9fono / WhatsApp', unit: 'Inter\u00e9s', message: 'Mensaje (opcional)',
    phName: 'Tu nombre', phEmail: 'tu@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Cont\u00e1 tu inter\u00e9s, dudas o comentarios...',
    errName: 'Ingres\u00e1 tu nombre', errEmail: 'Ingres\u00e1 un email v\u00e1lido', errPhone: 'Ingres\u00e1 un tel\u00e9fono v\u00e1lido',
    unitOptions: ['Seleccionar...', 'Ser en el Cuerpo', 'Talleres y formaciones', 'Consulta general'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Gracias por tu inter\u00e9s. Te responder\u00e9 a la brevedad por email o WhatsApp.',
    infoTitle: 'Informaci\u00f3n de contacto', infoLabels: ['Ubicaci\u00f3n', 'WhatsApp', 'Email', 'Horarios de clases']
  };
  TRANSLATIONS.es.footer = {
    desc: 'Recorrido anual de movimiento, creatividad y transformaci\u00f3n personal con Florencia Serruya en Mendoza, Argentina.',
    navHeading: 'Navegaci\u00f3n', unitsHeading: 'Espacios', contactHeading: 'Contacto',
    navLinks: ['Inicio', 'M\u00e9todo', 'Sobre m\u00ed', 'Galer\u00eda', 'Proyectos', 'Contacto'],
    unitLinks: ['Ser en el Cuerpo', 'Talleres y formaciones', 'Compa\u00f1\u00eda Intempo'],
    rights: 'Todos los derechos reservados.'
  };
  TRANSLATIONS.es.whatsapp = { tooltip: 'Contactame por WhatsApp', message: 'Hola! Quiero confirmar mi lugar en Ser en el Cuerpo' };

  // === TRADUCCIONES EXTENDIDAS - PORTUGU\u00c9S ===
  TRANSLATIONS.pt.about = {
    label: 'Sobre mim',
    title: 'Florencia <em>Serruya</em>',
    p1: 'Professora de dan\u00e7a contempor\u00e2nea e facilitadora de biodan\u00e7a. Core\u00f3grafa, bailarina e diretora da companhia Intempo. Criadora do m\u00e9todo Ser en el Cuerpo.',
    p2: 'Diretora do curta-metragem premiado \u201cIdentidad\u201d. Meu trabalho integra o movimento, a criatividade e a conex\u00e3o humana como ferramentas de transforma\u00e7\u00e3o pessoal e coletiva.',
    features: [
      { title: 'Dan\u00e7a contempor\u00e2nea', desc: 'Professora formada em t\u00e9cnicas de dan\u00e7a contempor\u00e2nea, improvisa\u00e7\u00e3o e composi\u00e7\u00e3o coreogr\u00e1fica.' },
      { title: 'Biodan\u00e7a', desc: 'Facilitadora de Biodan\u00e7a Sistema Rolando Toro, integrando m\u00fasica, movimento e encontro para o desenvolvimento humano.' },
      { title: 'Companhia Intempo', desc: 'Diretora e core\u00f3grafa da companhia de dan\u00e7a Intempo, com apresenta\u00e7\u00f5es em palcos e festivais.' }
    ]
  };
  TRANSLATIONS.pt.projects = {
    label: 'Outros trabalhos',
    title: 'Al\u00e9m do <em>m\u00e9todo</em>',
    subtitle: 'Workshops, projetos art\u00edsticos e colabora\u00e7\u00f5es que nutrem meu trabalho como criadora e docente.',
    cards: [
      { title: 'Workshops e forma\u00e7\u00f5es', desc: 'Workshops complementares de dan\u00e7a contempor\u00e2nea, movimento consciente e improvisa\u00e7\u00e3o. Forma\u00e7\u00f5es intensivas para quem quer aprofundar a linguagem do corpo.' },
      { title: 'Cinema e projetos art\u00edsticos', desc: 'Participa\u00e7\u00e3o em curtas-metragens e projetos audiovisuais. Diretora do curta premiado \u201cIdentidad\u201d, que explora o corpo como territ\u00f3rio de mem\u00f3ria e transforma\u00e7\u00e3o.' },
      { title: 'Colabora\u00e7\u00f5es e eventos', desc: 'Workshops, eventos especiais e colabora\u00e7\u00f5es com outros artistas e espa\u00e7os. Experi\u00eancias de movimento em contextos diversos: festivais, encontros e jornadas de bem-estar.' }
    ]
  };
  TRANSLATIONS.pt.form = {
    title: 'Reserve seu lugar',
    name: 'Nome completo', email: 'Email', phone: 'Telefone / WhatsApp', unit: 'Interesse', message: 'Mensagem (opcional)',
    phName: 'Seu nome', phEmail: 'seu@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Conte seu interesse, d\u00favidas ou coment\u00e1rios...',
    errName: 'Informe seu nome', errEmail: 'Informe um email v\u00e1lido', errPhone: 'Informe um telefone v\u00e1lido',
    unitOptions: ['Selecionar...', 'Ser en el Cuerpo', 'Workshops e forma\u00e7\u00f5es', 'Consulta geral'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Obrigado pelo seu interesse. Responderei em breve por email ou WhatsApp.',
    infoTitle: 'Informa\u00e7\u00f5es de contato', infoLabels: ['Localiza\u00e7\u00e3o', 'WhatsApp', 'Email', 'Hor\u00e1rios das aulas']
  };
  TRANSLATIONS.pt.footer = {
    desc: 'Jornada anual de movimento, criatividade e transforma\u00e7\u00e3o pessoal com Florencia Serruya em Mendoza, Argentina.',
    navHeading: 'Navega\u00e7\u00e3o', unitsHeading: 'Espa\u00e7os', contactHeading: 'Contato',
    navLinks: ['In\u00edcio', 'M\u00e9todo', 'Sobre mim', 'Galeria', 'Projetos', 'Contato'],
    unitLinks: ['Ser en el Cuerpo', 'Workshops e forma\u00e7\u00f5es', 'Companhia Intempo'],
    rights: 'Todos os direitos reservados.'
  };
  TRANSLATIONS.pt.whatsapp = { tooltip: 'Entre em contato pelo WhatsApp', message: 'Ol\u00e1! Quero reservar meu lugar no Ser en el Cuerpo' };

  // =====================================================
  // MAPEOS DE PAÍS → IDIOMA
  // =====================================================

  var COUNTRY_TO_LANG = {
    AR: 'es', BO: 'es', CL: 'es', CO: 'es', CR: 'es', CU: 'es', DO: 'es', EC: 'es', ES: 'es', GT: 'es', HN: 'es', MX: 'es', NI: 'es', PA: 'es', PE: 'es', PR: 'es', PY: 'es', SV: 'es', UY: 'es', VE: 'es',
    BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt', GW: 'pt', ST: 'pt', TL: 'pt',
    US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en',
    FR: 'en', DE: 'en', IT: 'en', NL: 'en', BE: 'en', SE: 'en', DK: 'en', NO: 'en', FI: 'en',
    JP: 'en', CN: 'en', KR: 'en', IN: 'en', RU: 'en', AT: 'en', CH: 'en'
  };

  var LANG_TO_FLAG_COUNTRY = {
    es: 'AR',
    pt: 'BR',
    en: 'GB'
  };

  var LANG_LABELS = {
    es: 'Espa\u00f1ol',
    pt: 'Portugu\u00eas',
    en: 'English'
  };

  // =====================================================
  // FUNCIONES UTILITARIAS
  // =====================================================

  function merge(base, override) {
    if (Array.isArray(base)) return Array.isArray(override) && override.length ? override : base.slice();
    if (typeof base !== 'object' || base === null) return override === undefined ? base : override;
    var out = {};
    Object.keys(base).forEach(function(key) {
      out[key] = merge(base[key], override ? override[key] : undefined);
    });
    if (override && typeof override === 'object') {
      Object.keys(override).forEach(function(key) {
        if (!(key in out)) out[key] = override[key];
      });
    }
    return out;
  }

  function normalizeLang(raw) {
    if (!raw) return '';
    var code = String(raw).toLowerCase().replace('_', '-').split('-')[0];
    return SUPPORTED_LANGS.indexOf(code) !== -1 ? code : '';
  }

  function normalizeCountry(raw) {
    if (!raw) return '';
    var code = String(raw).trim().toUpperCase();
    return code.length === 2 ? code : '';
  }

  function getLanguageFlagCountry(lang, countryCode) {
    var code = normalizeLang(lang) || 'en';
    var country = normalizeCountry(countryCode);
    if (code === 'es' && country && COUNTRY_TO_LANG[country] === 'es') return country;
    return LANG_TO_FLAG_COUNTRY[code] || '';
  }

  function getPack(lang) {
    var code = normalizeLang(lang) || 'en';
    if (code === 'en') return BASE_EN;
    return merge(BASE_EN, TRANSLATIONS[code] || {});
  }

  function flagFromCountry(countryCode) {
    var code = normalizeCountry(countryCode);
    if (!code) return '\u{1F30D}';
    return code.replace(/./g, function(ch) { return String.fromCodePoint(127397 + ch.charCodeAt()); });
  }

  function countryName(countryCode, lang) {
    var code = normalizeCountry(countryCode);
    if (!code) return '';
    try {
      if (Intl && Intl.DisplayNames) {
        return new Intl.DisplayNames([lang || 'en'], { type: 'region' }).of(code) || code;
      }
    } catch (e) {}
    return code;
  }

  function setFlagVisual(target, countryCode, fallback) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    var code = normalizeCountry(countryCode);
    el.innerHTML = '';
    if (code) {
      var lower = code.toLowerCase();
      var img = document.createElement('img');
      img.src = 'https://flagcdn.com/w80/' + lower + '.png';
      img.alt = '';
      img.loading = 'eager';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.addEventListener('error', function() {
        el.textContent = fallback || '\u{1F310}';
      });
      el.appendChild(img);
    } else {
      el.textContent = fallback || '\u{1F310}';
    }
  }

  // =====================================================
  // SISTEMA DE TEMAS (LIGHT/DARK)
  // =====================================================

  function themeLabel(theme, lang) {
    var code = normalizeLang(lang) || 'es';
    var isDark = theme === 'dark';
    var labels = {
      es: isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
      pt: isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro',
      en: isDark ? 'Switch to light mode' : 'Switch to dark mode'
    };
    return labels[code] || labels.en;
  }

  var COUNTRY_TO_TIMEZONE = {
    UY: 'America/Montevideo',
    BR: 'America/Sao_Paulo',
    PY: 'America/Asuncion',
    AR: 'America/Argentina/Buenos_Aires',
    CL: 'America/Santiago',
    PE: 'America/Lima',
    CO: 'America/Bogota',
    MX: 'America/Mexico_City',
    ES: 'Europe/Madrid',
    PT: 'Europe/Lisbon',
    IT: 'Europe/Rome',
    DE: 'Europe/Berlin',
    BE: 'Europe/Brussels',
    SE: 'Europe/Stockholm',
    DK: 'Europe/Copenhagen',
    RU: 'Europe/Moscow',
    CN: 'Asia/Shanghai',
    JP: 'Asia/Tokyo',
    US: 'America/New_York',
    CA: 'America/Toronto',
    GB: 'Europe/London',
    FR: 'Europe/Paris',
    NL: 'Europe/Amsterdam',
    AU: 'Australia/Sydney',
    NZ: 'Pacific/Auckland'
  };

  function getTimezoneForCountry(countryCode) {
    var code = normalizeCountry(countryCode);
    if (!code) return '';
    return COUNTRY_TO_TIMEZONE[code] || '';
  }

  function getHourForTimezone(timezone) {
    if (!timezone) return null;
    try {
      var hourStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        hour: '2-digit',
        hourCycle: 'h23'
      }).format(new Date());
      var hour = parseInt(hourStr, 10);
      if (!isNaN(hour) && hour >= 0 && hour <= 23) return hour;
    } catch (e) {}
    return null;
  }

  function themeFromHour(hour) {
    return (hour >= 7 && hour < 19) ? 'light' : 'dark';
  }

  function getAutoThemeByCountry(countryCode) {
    var timezone = getTimezoneForCountry(countryCode);
    var hour = getHourForTimezone(timezone);
    if (hour === null) {
      try { hour = new Date().getHours(); } catch (e) { hour = 12; }
    }
    return themeFromHour(hour);
  }

  function getStoredThemeState() {
    try {
      var raw = localStorage.getItem(THEME_STATE_KEY);
      if (!raw) return null;
      var state = JSON.parse(raw);
      if (!state || typeof state !== 'object') return null;
      if ((state.manualTheme !== 'light' && state.manualTheme !== 'dark') || (state.autoThemeAtSet !== 'light' && state.autoThemeAtSet !== 'dark')) return null;
      return state;
    } catch (e) { return null; }
  }

  function setStoredThemeState(state) {
    try {
      if (!state) localStorage.removeItem(THEME_STATE_KEY);
      else localStorage.setItem(THEME_STATE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function clearLegacyThemePreference() {
    try { localStorage.removeItem(LEGACY_THEME_KEY); } catch (e) {}
  }

  function getCurrentAutoTheme() {
    return getAutoThemeByCountry(detectedCountryCode || detectCountryByTimezone());
  }

  function setManualThemePreference(theme) {
    var nextTheme = theme === 'dark' ? 'dark' : 'light';
    var autoTheme = getCurrentAutoTheme();
    setStoredThemeState({ manualTheme: nextTheme, autoThemeAtSet: autoTheme });
  }

  function setThemeColorMeta(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute('content', theme === 'dark' ? '#120a18' : '#7b2cbf');
  }

  function updateThemeToggleUI(theme) {
    var iconEl = document.getElementById('themeToggleIcon');
    var buttonEl = document.getElementById('themeToggle');
    if (iconEl) iconEl.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}';
    if (buttonEl) {
      var label = themeLabel(theme, document.documentElement.lang);
      buttonEl.setAttribute('aria-label', label);
      buttonEl.setAttribute('title', label);
    }
  }

  function applyTheme(theme, persist) {
    var nextTheme = theme === 'dark' ? 'dark' : 'light';
    currentTheme = nextTheme;
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('theme-dark');
      document.documentElement.classList.remove('theme-light');
    } else {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark');
    }
    updateThemeToggleUI(nextTheme);
    setThemeColorMeta(nextTheme);
    if (persist) setManualThemePreference(nextTheme);
  }

  function detectThemePreference() {
    var autoTheme = getCurrentAutoTheme();
    var state = getStoredThemeState();
    if (!state) return autoTheme;
    if (state.autoThemeAtSet === autoTheme) return state.manualTheme;
    setStoredThemeState(null);
    return autoTheme;
  }

  function syncAutoThemeByCountry(countryCode) {
    var autoTheme = getAutoThemeByCountry(countryCode || detectCountryByTimezone());
    var state = getStoredThemeState();
    if (state && state.manualTheme) return;
    if (currentTheme !== autoTheme) applyTheme(autoTheme, false);
  }

  function startAutoThemeSync() {
    if (autoThemeTimer) clearInterval(autoThemeTimer);
    autoThemeTimer = setInterval(function() {
      syncAutoThemeByCountry(detectedCountryCode || detectCountryByTimezone());
    }, AUTO_THEME_TICK_MS);
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) syncAutoThemeByCountry(detectedCountryCode || detectCountryByTimezone());
    });
  }

  // =====================================================
  // MANIPULACIÓN DEL DOM
  // =====================================================

  function setText(selector, text) {
    var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el && typeof text === 'string') el.textContent = text;
  }

  function setHTML(selector, html) {
    var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el && typeof html === 'string') el.innerHTML = html;
  }

  function setAttr(selector, attr, value) {
    var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el && typeof value === 'string') el.setAttribute(attr, value);
  }

  function setIconText(selector, text) {
    var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el || typeof text !== 'string') return;
    var found = false;
    Array.prototype.forEach.call(el.childNodes, function(node) {
      if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
        node.nodeValue = ' ' + text;
        found = true;
      }
    });
    if (!found) el.appendChild(document.createTextNode(' ' + text));
  }

  function setListText(selector, values) {
    var nodes = document.querySelectorAll(selector);
    if (!nodes.length || !values || !values.length) return;
    values.forEach(function(value, idx) {
      if (nodes[idx] && typeof value === 'string') nodes[idx].textContent = value;
    });
  }

  function setWhatsAppMessage(message) {
    var href = 'https://wa.me/5492616118455?text=' + encodeURIComponent(message);
    document.querySelectorAll('a[href*="wa.me/5492616118455"]').forEach(function(link) {
      link.setAttribute('href', href);
    });
  }

  function updateStructuredData(description) {
    var script = document.querySelector('script[type="application/ld+json"]');
    if (!script) return;
    try {
      var data = JSON.parse(script.textContent);
      data.description = description;
      script.textContent = JSON.stringify(data, null, 2);
    } catch (e) {}
  }

  // =====================================================
  // APLICAR IDIOMA AL DOM
  // =====================================================

  function applyLanguage(lang, options) {
    var code = normalizeLang(lang) || 'en';
    var pack = getPack(code);
    var hasCountryOption = !!(options && Object.prototype.hasOwnProperty.call(options, 'countryCode'));
    var optionCountryCode = hasCountryOption ? normalizeCountry(options.countryCode) : '';
    if (optionCountryCode) detectedCountryCode = optionCountryCode;
    var countryCode = optionCountryCode || detectedCountryCode;

    document.documentElement.lang = code;
    if (pack.metaTitle) document.title = pack.metaTitle;
    if (pack.metaDescription) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', pack.metaDescription);
      updateStructuredData(pack.metaDescription);
    }

    setText('.nav-brand-sub', pack.brandSub);
    setText('.nav-links .nav-link[href="#inicio"]', pack.nav.home);
    setText('.nav-links .nav-link[href="#ser-en-el-cuerpo"]', pack.nav.method);
    setText('.nav-links .nav-link[href="#sobre-mi"]', pack.nav.about);
    setText('.nav-links .nav-link[href="#galeria"]', pack.nav.gallery);
    setText('.nav-links .nav-link[href="#proyectos"]', pack.nav.projects);
    setText('.nav-links .nav-link[href="#contacto"]', pack.nav.contact);
    setText('.nav-links .nav-cta', pack.nav.book);
    setAttr('#navHamburger', 'aria-label', pack.nav.menuAria || BASE_EN.nav.menuAria);
    setAttr('#languageSelect', 'aria-label', pack.nav.langAria || BASE_EN.nav.langAria);
    setAttr('#langTrigger', 'aria-label', pack.nav.langAria || BASE_EN.nav.langAria);
    setAttr('#languageMenu', 'aria-label', pack.nav.langAria || BASE_EN.nav.langAria);

    var mobileLinks = document.querySelectorAll('#navMobile a');
    if (mobileLinks.length >= 7) {
      setText(mobileLinks[0], pack.nav.home);
      setText(mobileLinks[1], pack.nav.method);
      setText(mobileLinks[2], pack.nav.about);
      setText(mobileLinks[3], pack.nav.gallery);
      setText(mobileLinks[4], pack.nav.projects);
      setText(mobileLinks[5], pack.nav.contact);
      setText(mobileLinks[6], pack.nav.book);
    }

    setIconText('.hero-badge', pack.hero.badge);
    setHTML('.hero-title', pack.hero.title);
    setText('.hero-subtitle', pack.hero.subtitle);
    setIconText('.hero-buttons .btn-primary', pack.hero.primary);
    setText('.hero-buttons .btn-outline', pack.hero.secondary);
    setText('.hero-scroll span', pack.hero.scroll);

    setIconText('#ser-en-el-cuerpo .section-label', pack.method.label);
    setHTML('#ser-en-el-cuerpo .section-title', pack.method.title);
    setText('#ser-en-el-cuerpo .section-subtitle', pack.method.subtitle);
    setHTML('.metodo-desc', pack.method.desc);
    setListText('.metodo-genera-tag', pack.method.tags);
    setText('.metodo-horarios-title', pack.method.scheduleTitle);
    
    var scheduleItems = document.querySelectorAll('.metodo-horario-item');
    if (scheduleItems.length >= 3) {
      // Wed
      setText(scheduleItems[0].querySelector('.metodo-horario-dia'), pack.method.days.wed);
      setText(scheduleItems[0].querySelector('.metodo-horario-lugar'), pack.method.locations.parana);
      // Thu
      setText(scheduleItems[1].querySelector('.metodo-horario-dia'), pack.method.days.thu);
      setText(scheduleItems[1].querySelector('.metodo-horario-lugar'), pack.method.locations.parana);
      // Mon
      setText(scheduleItems[2].querySelector('.metodo-horario-dia'), pack.method.days.mon);
      setText(scheduleItems[2].querySelector('.metodo-horario-lugar'), pack.method.locations.dorrego);
    }

    setIconText('.metodo-inicio', pack.method.startInfo);
    setText('.metodo-precio-monto', pack.method.pricing.amount);
    setText('.metodo-precio-detail', pack.method.pricing.detail);
    setText('.metodo-precio-descuento', pack.method.pricing.discount);
    setListText('.metodo-beneficio span', pack.method.benefits);
    setText('.metodo-online-note', pack.method.onlineNote);
    setText('.metodo-health-desc', pack.method.healthFormDesc);
    setText('.metodo-health-btn .btn-text', pack.method.healthFormBtn);
    setText('.metodo-health-check label', pack.method.healthFormHuman);

    setText('.about-label', pack.about.label);
    setHTML('.about-title', pack.about.title);
    var aboutTexts = document.querySelectorAll('.about-text');
    if (aboutTexts[0]) aboutTexts[0].textContent = pack.about.p1;
    if (aboutTexts[1]) aboutTexts[1].textContent = pack.about.p2;
    var aboutFeatureTitles = document.querySelectorAll('.about-feature-title');
    var aboutFeatureDescs = document.querySelectorAll('.about-feature-desc');
    pack.about.features.forEach(function(feature, i) {
      if (aboutFeatureTitles[i]) aboutFeatureTitles[i].textContent = feature.title;
      if (aboutFeatureDescs[i]) aboutFeatureDescs[i].textContent = feature.desc;
    });

    setIconText('#proyectos .section-label', pack.projects.label);
    setHTML('#proyectos .section-title', pack.projects.title);
    setText('#proyectos .section-subtitle', pack.projects.subtitle);
    var proyectoTitles = document.querySelectorAll('.proyecto-card-title');
    var proyectoDescs = document.querySelectorAll('.proyecto-card-desc');
    pack.projects.cards.forEach(function(card, i) {
      if (proyectoTitles[i]) proyectoTitles[i].textContent = card.title;
      if (proyectoDescs[i]) proyectoDescs[i].textContent = card.desc;
    });

    setText('.contact-form-title', pack.form.title);
    setText('label[for="nombre"]', pack.form.name);
    setText('label[for="email"]', pack.form.email);
    setText('label[for="telefono"]', pack.form.phone);
    setText('label[for="alojamiento"]', pack.form.unit);
    setText('label[for="mensaje"]', pack.form.message);
    setAttr('#nombre', 'placeholder', pack.form.phName);
    setAttr('#email', 'placeholder', pack.form.phEmail);
    setAttr('#telefono', 'placeholder', pack.form.phPhone);
    setAttr('#mensaje', 'placeholder', pack.form.phMessage);
    setText('#errorNombre', pack.form.errName);
    setText('#errorEmail', pack.form.errEmail);
    setText('#errorTelefono', pack.form.errPhone);

    var alojSelect = document.getElementById('alojamiento');
    if (alojSelect) {
      var alojOpts = alojSelect.querySelectorAll('option');
      pack.form.unitOptions.forEach(function(text, i) {
        if (alojOpts[i]) alojOpts[i].textContent = text;
      });
    }

    setText('#btnSubmit .btn-text', pack.form.submit);
    setText('#btnSubmit .btn-loading-text', pack.form.sending);
    setText('.form-success-title', pack.form.successTitle);
    setText('.form-success-text', pack.form.successText);
    setText('.contact-info-title', pack.form.infoTitle);
    setListText('.contact-item-label', pack.form.infoLabels);

    setText('.footer-brand-desc', pack.footer.desc);
    var footerHeadings = document.querySelectorAll('.footer-heading');
    if (footerHeadings[0]) footerHeadings[0].textContent = pack.footer.navHeading;
    if (footerHeadings[1]) footerHeadings[1].textContent = pack.footer.unitsHeading;
    if (footerHeadings[2]) footerHeadings[2].textContent = pack.footer.contactHeading;
    setListText('.footer-grid > div:nth-child(2) .footer-link', pack.footer.navLinks);
    setListText('.footer-grid > div:nth-child(3) .footer-link', pack.footer.unitLinks);
    setText('.footer-bottom span', '\u00A9 2026 Ser en el Cuerpo \u2014 Florencia Serruya. ' + pack.footer.rights);

    setText('.whatsapp-tooltip', pack.whatsapp.tooltip);
    setWhatsAppMessage(pack.whatsapp.message);

    var select = document.getElementById('languageSelect');
    if (select) select.value = code;
    setFlagVisual('#langIcon', getLanguageFlagCountry(code, countryCode), pack.flag || '\u{1F310}');
    refreshLanguageMenuFlags(countryCode);
    syncLanguageMenuSelection(code);
    setFlagVisual('#preloaderFlag', countryCode, pack.flag || '\u{1F310}');
    setText('#preloaderCountry', countryCode ? (pack.preloaderReady || BASE_EN.preloaderReady).replace('{country}', countryName(countryCode, code)) : (pack.preloaderDetecting || BASE_EN.preloaderDetecting));
    updateThemeToggleUI(currentTheme || detectThemePreference());
  }

  // =====================================================
  // DETECCIÓN DE PAÍS Y GEOLOCALIZACIÓN
  // =====================================================

  function clearStoredLangPreference() {
    try { localStorage.removeItem(PREF_KEY); } catch (e) {}
  }

  function getCachedCountry() {
    try {
      var cached = JSON.parse(localStorage.getItem(GEO_KEY) || 'null');
      if (!cached || !cached.countryCode || !cached.timestamp) return '';
      if ((Date.now() - cached.timestamp) > GEO_TTL) return '';
      return normalizeCountry(cached.countryCode);
    } catch (e) { return ''; }
  }

  function setCachedCountry(countryCode) {
    try {
      localStorage.setItem(GEO_KEY, JSON.stringify({ countryCode: countryCode, timestamp: Date.now() }));
    } catch (e) {}
  }

  function fetchJsonWithTimeout(url, timeoutMs) {
    if (typeof fetch !== 'function') return Promise.reject(new Error('fetch-not-supported'));
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = null;
    var options = { cache: 'no-store' };
    if (controller) {
      options.signal = controller.signal;
      timer = setTimeout(function() { controller.abort(); }, timeoutMs);
    }
    return fetch(url, options).then(function(response) {
      if (!response.ok) throw new Error('http-' + response.status);
      return response.json();
    }).finally(function() {
      if (timer) clearTimeout(timer);
    });
  }

  function detectCountryByIP() {
    var cached = getCachedCountry();

    var providers = [
      function() {
        return fetchJsonWithTimeout('https://ipapi.co/json/', 1800).then(function(data) {
          return normalizeCountry(data && (data.country_code || data.country));
        });
      },
      function() {
        return fetchJsonWithTimeout('https://ipwho.is/', 1800).then(function(data) {
          if (data && data.success === false) return '';
          return normalizeCountry(data && data.country_code);
        });
      }
    ];

    var idx = 0;
    function next() {
      if (idx >= providers.length) return Promise.resolve('');
      var provider = providers[idx++];
      return provider().then(function(countryCode) {
        if (countryCode) {
          setCachedCountry(countryCode);
          return countryCode;
        }
        return next();
      }).catch(function() { return next(); });
    }

    if (cached) return Promise.resolve(cached);
    return next();
  }

  function detectLanguageByBrowser() {
    var langs = [];
    if (navigator.languages && navigator.languages.length) langs = langs.concat(navigator.languages);
    if (navigator.language) langs.push(navigator.language);
    for (var i = 0; i < langs.length; i++) {
      var code = normalizeLang(langs[i]);
      if (code) return code;
    }
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (tz.indexOf('America/Argentina') === 0 || tz.indexOf('America/Montevideo') === 0 || tz.indexOf('Europe/Madrid') === 0 || tz.indexOf('America/Santiago') === 0 || tz.indexOf('America/Lima') === 0 || tz.indexOf('America/Bogota') === 0 || tz.indexOf('America/Mexico_City') === 0) return 'es';
    if (tz.indexOf('America/Sao_Paulo') === 0 || tz.indexOf('Europe/Lisbon') === 0) return 'pt';
    return 'en';
  }

  function detectCountryByTimezone() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (tz.indexOf('America/Argentina') === 0) return 'AR';
    if (tz.indexOf('America/Montevideo') === 0) return 'UY';
    if (tz.indexOf('America/Sao_Paulo') === 0) return 'BR';
    if (tz.indexOf('America/Asuncion') === 0) return 'PY';
    if (tz.indexOf('Europe/Madrid') === 0) return 'ES';
    if (tz.indexOf('Europe/Paris') === 0) return 'FR';
    if (tz.indexOf('Europe/Brussels') === 0) return 'BE';
    if (tz.indexOf('Europe/Rome') === 0) return 'IT';
    if (tz.indexOf('Europe/Berlin') === 0) return 'DE';
    if (tz.indexOf('Europe/Stockholm') === 0) return 'SE';
    if (tz.indexOf('Europe/Copenhagen') === 0) return 'DK';
    if (tz.indexOf('Europe/Moscow') === 0) return 'RU';
    if (tz.indexOf('Europe/London') === 0) return 'GB';
    if (tz.indexOf('Asia/Shanghai') === 0 || tz.indexOf('Asia/Hong_Kong') === 0 || tz.indexOf('Asia/Taipei') === 0) return 'CN';
    if (tz.indexOf('Asia/Tokyo') === 0) return 'JP';
    if (tz.indexOf('America/New_York') === 0 || tz.indexOf('America/Chicago') === 0 || tz.indexOf('America/Denver') === 0 || tz.indexOf('America/Los_Angeles') === 0) return 'US';
    if (tz.indexOf('Australia/Sydney') === 0 || tz.indexOf('Australia/Melbourne') === 0) return 'AU';
    return '';
  }

  // =====================================================
  // MENÚ DE IDIOMAS
  // =====================================================

  function hydrateSelectorOptions() {
    var select = document.getElementById('languageSelect');
    if (!select) return;
    Array.prototype.forEach.call(select.options, function(option) {
      if (LANG_LABELS[option.value]) option.textContent = LANG_LABELS[option.value];
    });
  }

  function setLanguageMenuOpen(open) {
    var switcher = document.getElementById('langSwitcher');
    var trigger = document.getElementById('langTrigger');
    if (!switcher || !trigger) return;
    if (open) switcher.classList.add('open');
    else switcher.classList.remove('open');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function syncLanguageMenuSelection(lang) {
    var selected = normalizeLang(lang) || 'en';
    var items = document.querySelectorAll('#languageMenu .lang-option');
    Array.prototype.forEach.call(items, function(item) {
      var isActive = item.getAttribute('data-lang') === selected;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function refreshLanguageMenuFlags(countryCode) {
    var menu = document.getElementById('languageMenu');
    if (!menu) return;
    var items = menu.querySelectorAll('.lang-option');
    Array.prototype.forEach.call(items, function(item) {
      var langCode = item.getAttribute('data-lang');
      var flagEl = item.querySelector('.lang-option-flag');
      if (!langCode || !flagEl) return;
      setFlagVisual(flagEl, getLanguageFlagCountry(langCode, countryCode), '\u{1F310}');
    });
  }

  function buildLanguageMenu() {
    var menu = document.getElementById('languageMenu');
    var select = document.getElementById('languageSelect');
    if (!menu || !select) return;

    menu.innerHTML = '';
    SUPPORTED_LANGS.forEach(function(langCode) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'lang-option';
      button.setAttribute('role', 'option');
      button.setAttribute('data-lang', langCode);
      button.setAttribute('aria-selected', 'false');

      var flag = document.createElement('span');
      flag.className = 'lang-option-flag';
      setFlagVisual(flag, getLanguageFlagCountry(langCode, detectedCountryCode), '\u{1F310}');

      var label = document.createElement('span');
      label.className = 'lang-option-label';
      label.textContent = LANG_LABELS[langCode] || langCode;

      button.appendChild(flag);
      button.appendChild(label);
      button.addEventListener('click', function() {
        select.value = langCode;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        setLanguageMenuOpen(false);
      });

      menu.appendChild(button);
    });

    refreshLanguageMenuFlags(detectedCountryCode);
    syncLanguageMenuSelection(select.value);
  }

  function setupLanguageMenu() {
    var switcher = document.getElementById('langSwitcher');
    var trigger = document.getElementById('langTrigger');
    var menu = document.getElementById('languageMenu');
    if (!switcher || !trigger || !menu) return;

    buildLanguageMenu();
    if (switcher.getAttribute('data-menu-bound') === '1') return;
    switcher.setAttribute('data-menu-bound', '1');

    switcher.addEventListener('click', function(ev) {
      if (menu.contains(ev.target)) return;
      ev.preventDefault();
      ev.stopPropagation();
      setLanguageMenuOpen(!switcher.classList.contains('open'));
    });

    document.addEventListener('click', function(ev) {
      if (!switcher.contains(ev.target)) setLanguageMenuOpen(false);
    });

    document.addEventListener('keydown', function(ev) {
      if (ev.key === 'Escape') setLanguageMenuOpen(false);
    });
  }

  // =====================================================
  // INICIALIZACIÓN
  // =====================================================

  function initTheme() {
    clearLegacyThemePreference();
    applyTheme(detectThemePreference(), false);
    startAutoThemeSync();

    var toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function() {
        var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setManualThemePreference(nextTheme);
        applyTheme(nextTheme, false);
      });
    }
  }

  var preloader = document.getElementById('preloader');
  var preloaderStart = Date.now();
  var loadReady = false;
  var langReady = false;
  var hideScheduled = false;

  function maybeHidePreloader() {
    if (!preloader || hideScheduled || !loadReady || !langReady) return;
    hideScheduled = true;
    var remaining = Math.max(0, PRELOADER_MIN_MS - (Date.now() - preloaderStart));
    setTimeout(function() {
      preloader.classList.add('hidden');
    }, remaining);
  }

  window.addEventListener('load', function() {
    loadReady = true;
    maybeHidePreloader();
  });

  function initLanguage() {
    clearStoredLangPreference();
    hydrateSelectorOptions();
    setupLanguageMenu();
    detectedCountryCode = getCachedCountry() || detectCountryByTimezone() || '';
    setFlagVisual('#preloaderFlag', detectedCountryCode, '\u{1F30D}');
    syncAutoThemeByCountry(detectedCountryCode);
    setText('#preloaderCountry', (TRANSLATIONS.es && TRANSLATIONS.es.preloaderDetecting) || BASE_EN.preloaderDetecting);

    return detectCountryByIP().then(function(countryCode) {
      var resolvedCountryCode = normalizeCountry(countryCode) || detectCountryByTimezone() || detectedCountryCode || '';
      detectedCountryCode = resolvedCountryCode;
      syncAutoThemeByCountry(resolvedCountryCode);
      var ipLang = COUNTRY_TO_LANG[normalizeCountry(resolvedCountryCode)] || '';
      var fallbackLang = detectLanguageByBrowser();
      applyLanguage(ipLang || fallbackLang || 'es', { countryCode: resolvedCountryCode });
    }).catch(function() {
      var fallbackCountryCode = detectCountryByTimezone() || detectedCountryCode || '';
      detectedCountryCode = normalizeCountry(fallbackCountryCode) || detectedCountryCode;
      syncAutoThemeByCountry(detectedCountryCode);
      var fallbackLangByCountry = COUNTRY_TO_LANG[normalizeCountry(fallbackCountryCode)] || '';
      applyLanguage(fallbackLangByCountry || detectLanguageByBrowser(), { countryCode: fallbackCountryCode });
    }).finally(function() {
      langReady = true;
      maybeHidePreloader();
    });
  }

  initTheme();
  initLanguage();

  var languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      var nextLang = normalizeLang(this.value) || 'es';
      applyLanguage(nextLang, { countryCode: detectedCountryCode });
      setLanguageMenuOpen(false);
    });
  }

})();

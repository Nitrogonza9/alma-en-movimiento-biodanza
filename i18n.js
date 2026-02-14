(function() {
  'use strict';

  window.__i18nPreloaderHandled = true;

  var SUPPORTED_LANGS = ['es', 'pt', 'en'];
  var PREF_KEY = 'aem_lang_pref_v1';
  var LEGACY_THEME_KEY = 'aem_theme_pref_v1';
  var THEME_STATE_KEY = 'aem_theme_state_v2';
  var GEO_KEY = 'aem_geo_cache_v1';
  var GEO_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
  var AUTO_THEME_TICK_MS = 60 * 1000;
  var PRELOADER_MIN_MS = 2500;
  var detectedCountryCode = '';
  var currentTheme = '';
  var autoThemeTimer = 0;

  var BASE_EN = {
    flag: '🇬🇧',
    metaTitle: 'Entre Palmeras y Lavandas - Biodanza System in Mendoza, Argentina',
    metaDescription: 'Design units among century-old palms and lavender fields in Colonia, Uruguay. Three independent units where nature and comfort meet.',
    preloaderDetecting: 'Detecting country and language...',
    preloaderReady: 'Welcome, guest from {country}.',
    brandSub: 'Design units',
    nav: { home: 'Home', about: 'About', units: 'Units', experiences: 'Experiences', gallery: 'Gallery', contact: 'Contact', book: 'Book', menuAria: 'Open navigation menu', langAria: 'Select language' },
    hero: {
      badge: 'Exclusive experience',
      title: 'Disconnect to <em>reconnect</em>',
      subtitle: 'Design units among century-old palms and lavender fields in Colonia, Uruguay. Three independent units where nature and comfort meet.',
      primary: 'Book your stay',
      secondary: 'Learn more',
      scroll: 'Discover more'
    },
    stats: { units: 'Independent units', guests: 'Dreamy hectares', rating: 'Google rating', nature: 'Nature' },
    about: {
      label: 'Our story',
      title: 'Where <em>nature</em> embraces you.',
      p1: 'Entre Palmeras y Lavandas was born from its creator\'s dream: a place where design does not compete with nature, but celebrates it. In Colonia, Uruguay, we transformed contemporary design units to blend into the landscape.',
      p2: 'Surrounded by century-old palms, lavender fields and star-filled skies, every detail is curated so your only concern is choosing whether to watch the sunset from the hammock or from the pool.',
      features: [
        { title: 'Sustainable design', desc: 'Contemporary design units with curated interiors and noble materials, created to integrate naturally with the environment.' },
        { title: 'Immersive nature', desc: 'Native flowers and wildlife, ancient palms and endless skies invite you to slow down.' },
        { title: 'Total privacy', desc: 'Only three independent units, designed for complete tranquility and a no-distraction experience.' }
      ]
    },
    units: {
      label: 'Our spaces',
      title: 'Three <em>design</em> units',
      subtitle: 'Each unit was transformed with artisanal care into a unique space, where contemporary architecture meets the warmth of the Uruguayan countryside.',
      cards: [
        {
          name: 'Las Rosas Unit',
          desc: 'Surrounded by Iceberg roses, this unit offers full comfort for an intimate and peaceful stay. It includes a private grill, views to the lit palm-lined path and a delicate water path crossed by a charming bridge. Designed for two guests, fully equipped, with private covered parking.',
          cap: 'Capacity: 2 guests'
        },
        {
          name: 'El Jardin Unit',
          desc: 'Known for its spacious galleries with private grill and panoramic windows over open fields. An ideal private setting to enjoy Colonia sunsets in calm and nature. Perfect for couples or small groups.',
          cap: 'Capacity: 2 to 3 guests'
        },
        {
          name: 'Las Glicinas Unit',
          desc: 'Large windows overlook the lit palm path, plus an elevated private terrace with a 360 degrees view of the lake, waterfall and pergolas covered in wisteria. The most romantic unit on the property, ideal for couples or small groups.',
          cap: 'Capacity: 2 to 4 guests'
        }
      ]
    },
    experiences: {
      label: 'Why choose us',
      title: 'Experiences that <em>transform</em>',
      subtitle: 'Every moment is designed so you can live something you will not find anywhere else.',
      cards: [
        { title: 'Pool with countryside views', desc: 'Seasonal heated pool with a natural wooden deck integrated into the landscape and panoramic countryside views.' },
        { title: 'Outdoor activities', desc: 'Walks among palms, night bonfires, birdwatching and countryside strolls at your own pace.' },
        { title: 'True disconnection', desc: 'No noise, no rush, just you and nature. Optional Wi-Fi so you decide when to reconnect.' }
      ]
    },
    process: {
      label: 'Your escape',
      title: 'How to <em>book</em>',
      subtitle: 'In four simple steps you are enjoying Colonia\'s most exclusive design units experience.',
      steps: [
        { title: 'Choose your date', desc: 'Check availability and pick the perfect escape for you.' },
        { title: 'Book online', desc: 'Confirm with a 50% deposit by bank transfer or cash at check-in.' },
        { title: 'We prepare everything', desc: 'We tailor your experience, from unit ambiance to every detail of your stay.' },
        { title: 'Enjoy', desc: 'Check-in, relax and pure nature. We handle everything so you can simply enjoy.' }
      ]
    },
    form: {
      title: 'Check availability',
      name: 'Full name', email: 'Email', phone: 'Phone / WhatsApp', checkin: 'Check-in date', nights: 'Number of nights', unit: 'Preferred unit', message: 'Message (optional)',
      phName: 'Your name', phEmail: 'you@email.com', phPhone: '+1 555 123 4567', phMessage: 'Tell us about your ideal getaway...',
      errName: 'Please enter your name', errEmail: 'Please enter a valid email', errPhone: 'Please enter a valid phone number', errCheckin: 'Please select a date', errNights: 'Please select nights',
      nightsOptions: ['Select...', '1 night', '2 nights', '3 nights', '4 nights', '5 nights', '6 nights', '7 nights'],
      unitOptions: ['No preference', 'Las Rosas Unit', 'El Jardin Unit', 'Las Glicinas Unit'],
      submit: 'Send inquiry', sending: 'Sending...', successTitle: 'Inquiry sent', successText: 'Thank you for your interest. We will reply shortly by email or WhatsApp.',
      infoTitle: 'Contact information', infoLabels: ['Location', 'WhatsApp', 'Email', 'Schedule']
    },
    footer: {
      desc: 'Design units among century-old palms and lavender fields, Colonia, Uruguay. Three independent units where nature and comfort meet.',
      navHeading: 'Navigation', unitsHeading: 'Units', contactHeading: 'Contact',
      navLinks: ['Home', 'About', 'Units', 'Experiences', 'Gallery', 'Contact'],
      unitLinks: ['Las Rosas Unit', 'El Jardin Unit', 'Las Glicinas Unit'],
      rights: 'All rights reserved.'
    },
    whatsapp: { tooltip: 'Chat with us', message: 'Hi! I would like to check availability at Entre Palmeras y Lavandas' }
  };

  var TRANSLATIONS = {
    es: {
      flag: '🇪🇸',
      metaTitle: 'Entre Palmeras y Lavandas - Unidades de Diseño en Colonia, Uruguay',
      metaDescription: 'Unidades de diseño entre palmeras centenarias y lavandas, Colonia, Uruguay. Tres unidades independientes donde la naturaleza y el confort se encuentran.',
      preloaderDetecting: 'Detectando país e idioma...',
      preloaderReady: 'Bienvenido, huésped de {country}.',
      brandSub: 'Unidades de diseño',
      nav: { home: 'Inicio', about: 'Nosotros', units: 'Unidades', experiences: 'Experiencias', gallery: 'Galería', contact: 'Contacto', book: 'Reservar', menuAria: 'Abrir menú de navegación', langAria: 'Seleccionar idioma' },
      hero: {
        badge: 'Experiencia exclusiva',
        title: 'Desconecta para <em>reconectarte</em>',
        subtitle: 'Unidades de diseño entre palmeras centenarias y lavandas, Colonia, Uruguay. Tres unidades independientes donde la naturaleza y el confort se encuentran.',
        primary: 'Reservar estadia',
        secondary: 'Conocer mas',
        scroll: 'Descubri mas'
      },
      stats: { units: 'Unidades independientes', guests: 'Hectáreas soñadas', rating: 'Rating en Google', nature: 'Naturaleza' }
    },
    pt: {
      flag: '🇧🇷',
      metaTitle: 'Entre Palmeras y Lavandas - Unidades de Design em Colonia, Uruguai',
      metaDescription: 'Unidades de design entre palmeiras centenarias e lavandas em Colonia, Uruguai. Tres unidades independentes onde natureza e conforto se encontram.',
      preloaderDetecting: 'Detectando país e idioma...',
      preloaderReady: 'Bem-vindo, hóspede de {country}.',
      brandSub: 'Unidades de design',
      nav: { home: 'Inicio', about: 'Sobre', units: 'Unidades', experiences: 'Experiencias', gallery: 'Galería', contact: 'Contato', book: 'Reservar', menuAria: 'Abrir menu de navegação', langAria: 'Selecionar idioma' },
      hero: {
        badge: 'Experiencia exclusiva',
        title: 'Desconecte para <em>se reconectar</em>',
        subtitle: 'Unidades de design entre palmeiras centenarias e lavandas em Colonia, Uruguai. Tres unidades independentes onde natureza e conforto se encontram.',
        primary: 'Reservar estadia',
        secondary: 'Conhecer mais',
        scroll: 'Descobrir mais'
      },
      stats: { units: 'Unidades independentes', guests: 'Hectares de sonho', rating: 'Avaliacao no Google', nature: 'Natureza' }
    },
    it: {
      flag: '🇮🇹',
      preloaderReady: 'Benvenuto, ospite da {country}.',
      brandSub: 'Unita di design',
      nav: { home: 'Home', about: 'Chi siamo', units: 'Unita', experiences: 'Esperienze', gallery: 'Galleria', contact: 'Contatto', book: 'Prenota' },
      hero: { badge: 'Esperienza esclusiva', title: 'Disconnettiti per <em>ritrovarti</em>', primary: 'Prenota soggiorno', secondary: 'Scopri di piu', scroll: 'Scopri di piu' },
      stats: { units: 'Unita indipendenti', guests: 'Ettari da sogno', rating: 'Valutazione Google', nature: 'Natura' },
      form: { title: 'Verifica disponibilita', submit: 'Invia richiesta', sending: 'Invio...' },
      footer: { navHeading: 'Navigazione', unitsHeading: 'Unita', contactHeading: 'Contatto', rights: 'Tutti i diritti riservati.' },
      whatsapp: { tooltip: 'Chatta con noi', message: 'Ciao! Vorrei verificare la disponibilita.' }
    },
    de: {
      flag: '🇩🇪',
      preloaderReady: 'Willkommen, Gast aus {country}.',
      brandSub: 'Design-Unterkunfte',
      nav: { home: 'Start', about: 'Uber uns', units: 'Einheiten', experiences: 'Erlebnisse', gallery: 'Galerie', contact: 'Kontakt', book: 'Buchen' },
      hero: { badge: 'Exklusives Erlebnis', title: 'Abschalten, um dich <em>neu zu verbinden</em>', primary: 'Aufenthalt buchen', secondary: 'Mehr erfahren', scroll: 'Mehr entdecken' },
      stats: { units: 'Unabhangige Einheiten', guests: 'Traumhafte Hektar', rating: 'Google-Bewertung', nature: 'Natur' },
      form: { title: 'Verfugbarkeit anfragen', submit: 'Anfrage senden', sending: 'Wird gesendet...' },
      footer: { navHeading: 'Navigation', unitsHeading: 'Einheiten', contactHeading: 'Kontakt', rights: 'Alle Rechte vorbehalten.' },
      whatsapp: { tooltip: 'Chatte mit uns', message: 'Hallo! Ich mochte die Verfugbarkeit prufen.' }
    },
    sv: {
      flag: '🇸🇪',
      preloaderReady: 'Välkommen, gäst från {country}.',
      brandSub: 'Designboenden',
      nav: { home: 'Hem', about: 'Om oss', units: 'Enheter', experiences: 'Upplevelser', gallery: 'Galleri', contact: 'Kontakt', book: 'Boka' },
      hero: { badge: 'Exklusiv upplevelse', title: 'Koppla bort for att <em>hitta tillbaka</em>', primary: 'Boka vistelse', secondary: 'Las mer', scroll: 'Upptack mer' },
      footer: { navHeading: 'Navigering', unitsHeading: 'Enheter', contactHeading: 'Kontakt' },
      whatsapp: { tooltip: 'Chatta med oss', message: 'Hej! Jag vill kontrollera tillganglighet.' }
    },
    da: {
      flag: '🇩🇰',
      preloaderReady: 'Velkommen, gæst fra {country}.',
      brandSub: 'Designenheder',
      nav: { home: 'Hjem', about: 'Om os', units: 'Enheder', experiences: 'Oplevelser', gallery: 'Galleri', contact: 'Kontakt', book: 'Book' },
      hero: { badge: 'Eksklusiv oplevelse', title: 'Kobl af for at <em>finde tilbage</em>', primary: 'Book ophold', secondary: 'Las mere', scroll: 'Opdag mere' },
      footer: { navHeading: 'Navigation', unitsHeading: 'Enheder', contactHeading: 'Kontakt' },
      whatsapp: { tooltip: 'Chat med os', message: 'Hej! Jeg vil gerne tjekke tilgaengelighed.' }
    },
    ru: {
      flag: '🇷🇺',
      preloaderReady: 'Добро пожаловать, гость из {country}.',
      brandSub: 'Дизайнерские дома',
      nav: { home: 'Главная', about: 'О нас', units: 'Дома', experiences: 'Впечатления', gallery: 'Галерея', contact: 'Контакт', book: 'Забронировать' },
      hero: { badge: 'Эксклюзивный опыт', title: 'Отключитесь, чтобы <em>снова почувствовать связь</em>', primary: 'Забронировать', secondary: 'Подробнее', scroll: 'Смотреть больше' },
      footer: { navHeading: 'Навигация', unitsHeading: 'Дома', contactHeading: 'Контакт' },
      whatsapp: { tooltip: 'Напишите нам', message: 'Здравствуйте! Хочу уточнить доступность.' }
    },
    zh: {
      flag: '🇨🇳',
      preloaderReady: '欢迎来自 {country} 的住客。',
      brandSub: '设计独栋单元',
      nav: { home: '首页', about: '关于我们', units: '房型', experiences: '体验', gallery: '画廊', contact: '联系', book: '预订' },
      hero: { badge: '专属体验', title: '暂别喧嚣，<em>重新连接自己</em>', primary: '预订入住', secondary: '了解更多', scroll: '继续探索' },
      footer: { navHeading: '导航', unitsHeading: '房型', contactHeading: '联系' },
      whatsapp: { tooltip: '与我们聊天', message: '你好！我想咨询可订日期。' }
    },
    ja: {
      flag: '🇯🇵',
      preloaderReady: '{country} からのゲストの皆さま、ようこそ。',
      brandSub: 'デザインユニット',
      nav: { home: 'ホーム', about: '私たちについて', units: 'ユニット', experiences: '体験', gallery: 'ギャラリー', contact: 'お問い合わせ', book: '予約する' },
      hero: { badge: '特別な体験', title: 'いったん離れて、<em>本当の自分とつながる</em>', primary: '宿泊を予約', secondary: 'もっと見る', scroll: 'さらに見る' },
      footer: { navHeading: 'ナビゲーション', unitsHeading: 'ユニット', contactHeading: 'お問い合わせ' },
      whatsapp: { tooltip: 'チャットで相談', message: 'こんにちは。空き状況を確認したいです。' }
    }
  };

  TRANSLATIONS.es.about = {
    label: 'Nuestra historia',
    title: 'Donde la <em>naturaleza</em> abraza.',
    p1: 'Entre Palmeras y Lavandas nació del sueño de su creadora: dar vida a un espacio donde el diseño no compita con la naturaleza, sino que la celebre. En Colonia, Uruguay, transformamos unidades de diseño contemporáneo pensadas para integrarse al entorno.',
    p2: 'Rodeadas de palmeras centenarias, campos de lavanda y cielos estrellados, cada detalle está cuidado para que tu única preocupación sea decidir si el atardecer lo mirás desde la hamaca o desde la pileta.',
    features: [
      { title: 'Diseño sustentable', desc: 'Unidades de diseño contemporáneo, transformadas con interiorismo cuidado y materiales nobles, pensadas para integrarse al entorno.' },
      { title: 'Naturaleza inmersa', desc: 'Rodeadas de flores y fauna autóctona, palmeras centenarias y cielos infinitos que invitan a bajar el ritmo.' },
      { title: 'Privacidad total', desc: 'Solo tres unidades independientes, pensadas para disfrutar de máxima tranquilidad y una experiencia sin interferencias.' }
    ]
  };
  TRANSLATIONS.es.units = {
    label: 'Nuestros espacios',
    title: 'Tres unidades de <em>diseño</em>',
    subtitle: 'Cada unidad fue transformada con mimo artesanal en un espacio único, donde la arquitectura contemporánea se fusiona con la calidez del campo uruguayo.',
    cards: [
      { name: 'Unidad Las Rosas', desc: 'Rodeada de rosas Iceberg, esta unidad ofrece todo el confort para una estadía íntima y tranquila. Cuenta con parrilla privada, vistas al camino de palmeras centenarias iluminadas y a un delicado camino de agua con piedras y plantas, atravesado por un pequeño puente que enamora. Pensada para dos personas, está totalmente equipada y dispone de cochera techada y privada.', cap: 'Capacidad: 2 personas' },
      { name: 'Unidad El Jardín', desc: 'Destaca por sus amplias galerías con parrilla propia y ventanales con vistas panorámicas al campo abierto. Un espacio ideal para disfrutar en privado los atardeceres de Colonia, rodeados de calma y naturaleza. Pensada para parejas o pequeños grupos, combina comodidad, amplitud y una conexión directa con el entorno.', cap: 'Capacidad: 2 a 3 personas' },
      { name: 'Unidad Las Glicinas', desc: 'Grandes ventanales con vistas al camino de palmeras iluminadas y una terraza privada elevada que ofrece una vista 360° al lago con cascada y a las pérgolas cubiertas de glicinas. Una unidad pensada para disfrutar de una experiencia íntima y especial, considerada la más romántica del lugar, ideal para parejas o pequeños grupos.', cap: 'Capacidad: 2 a 4 personas' }
    ]
  };
  TRANSLATIONS.es.experiences = {
    label: 'Por que elegirnos',
    title: 'Experiencias que <em>transforman</em>',
    subtitle: 'Cada momento esta disenado para que vivas algo que no encontrás en ningún otro lugar.',
    cards: [
      { title: 'Pileta con vista al campo', desc: 'Pileta climatizada en temporada con deck de madera natural integrada al paisaje, con vista panorámica al campo uruguayo. Reposeras, sombrillas y todo el relax que necesitás.' },
      { title: 'Actividades al aire libre', desc: 'Caminatas entre palmeras, fogones nocturnos con guitarra, avistaje de aves y paseos por el campo. Cada día trae una aventura nueva a tu ritmo.' },
      { title: 'Desconexión real', desc: 'Sin ruido, sin apuro, solo vos y la naturaleza. WiFi opcional para que decidas vos cuando volver a conectarte. Hamacas, lectura y atardeceres infinitos.' }
    ]
  };
  TRANSLATIONS.es.process = {
    label: 'Tu escapada',
    title: 'Como <em>reservar</em>',
    subtitle: 'En cuatro simples pasos estás disfrutando de la experiencia en unidades de diseño más exclusiva de Colonia.',
    steps: [
      { title: 'Elegí tu fecha', desc: 'Consulta disponibilidad y elegí la escapada ideal para vos. Fines de semana, semanas completas o lo que necesites.' },
      { title: 'Reserva online', desc: 'Confirmá tu reserva con una seña del 50% por transferencia bancaria o en efectivo al hacer el check-in.' },
      { title: 'Preparamos todo', desc: 'Armamos tu experiencia personalizada: desde la ambientación de la unidad hasta cada detalle para que tu estadía sea perfecta.' },
      { title: 'Disfruta', desc: 'Check-in, relax y naturaleza pura. Nosotros nos encargamos de todo para que vos solo disfrutes.' }
    ]
  };
  TRANSLATIONS.es.form = {
    title: 'Consulta disponibilidad',
    name: 'Nombre completo', email: 'Email', phone: 'Telefono / WhatsApp', checkin: 'Fecha de check-in', nights: 'Cantidad de noches', unit: 'Unidad preferida', message: 'Mensaje (opcional)',
    phName: 'Tu nombre', phEmail: 'tu@email.com', phPhone: '+598 99 123 456', phMessage: 'Conta nos algo sobre tu escapada ideal...',
    errName: 'Ingresa tu nombre', errEmail: 'Ingresa un email valido', errPhone: 'Ingresa un telefono valido', errCheckin: 'Selecciona una fecha', errNights: 'Selecciona las noches',
    nightsOptions: ['Seleccionar...', '1 noche', '2 noches', '3 noches', '4 noches', '5 noches', '6 noches', '7 noches'],
    unitOptions: ['Sin preferencia', 'Unidad Las Rosas', 'Unidad El Jardín', 'Unidad Las Glicinas'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Gracias por tu interes. Te responderemos a la brevedad por email o WhatsApp.',
    infoTitle: 'Información de contacto', infoLabels: ['Ubicación', 'WhatsApp', 'Email', 'Horarios']
  };
  TRANSLATIONS.es.footer = {
    desc: 'Unidades de diseño entre palmeras centenarias y lavandas, Colonia, Uruguay. Tres unidades independientes donde la naturaleza y el confort se encuentran.',
    navHeading: 'Navegación', unitsHeading: 'Unidades', contactHeading: 'Contacto',
    navLinks: ['Inicio', 'Nosotros', 'Unidades', 'Experiencias', 'Galería', 'Contacto'],
    unitLinks: ['Unidad Las Rosas', 'Unidad El Jardín', 'Unidad Las Glicinas'],
    rights: 'Todos los derechos reservados.'
  };
  TRANSLATIONS.es.whatsapp = { tooltip: 'Chatea con nosotros', message: 'Hola! Quiero consultar disponibilidad en Entre Palmeras y Lavandas' };

  TRANSLATIONS.pt.about = {
    label: 'Nossa história',
    title: 'Onde a <em>natureza</em> abraça.',
    p1: 'Entre Palmeras y Lavandas nasceu do sonho de sua criadora: criar um espaço onde o design não compete com a natureza, mas a celebra. Em Colonia, Uruguai, transformamos unidades contemporâneas para integrar-se ao entorno.',
    p2: 'Cercadas por palmeiras centenárias, campos de lavanda e céus estrelados, cada detalhe é cuidado para que sua única preocupação seja escolher se verá o pôr do sol na rede ou na piscina.',
    features: [
      { title: 'Design sustentável', desc: 'Unidades de design contemporâneo com interiores cuidados e materiais nobres, pensadas para integrar-se ao ambiente.' },
      { title: 'Natureza imersiva', desc: 'Flores e fauna nativa, palmeiras centenárias e céus infinitos convidam você a desacelerar.' },
      { title: 'Privacidade total', desc: 'Apenas três unidades independentes para máxima tranquilidade.' }
    ]
  };
  TRANSLATIONS.pt.units = {
    label: 'Nossos espaços',
    title: 'Três unidades de <em>design</em>',
    subtitle: 'Cada unidade foi transformada com cuidado artesanal em um espaço único.',
    cards: [
      { name: 'Unidade Las Rosas', desc: 'Cercada por rosas Iceberg, com churrasqueira privada, vista para o caminho de palmeiras iluminadas e para um delicado caminho de água com pequena ponte. Totalmente equipada para duas pessoas e com garagem coberta privada.', cap: 'Capacidade: 2 pessoas' },
      { name: 'Unidade El Jardín', desc: 'Amplas galerias com churrasqueira própria e janelas panorâmicas para o campo aberto. Ideal para casais ou pequenos grupos.', cap: 'Capacidade: 2 a 3 pessoas' },
      { name: 'Unidade Las Glicinas', desc: 'Grandes janelas e terraço elevado privado com vista 360° para lago, cascata e pérgolas cobertas de glicínias. A unidade mais romântica.', cap: 'Capacidade: 2 a 4 pessoas' }
    ]
  };
  TRANSLATIONS.pt.experiences = {
    label: 'Por que nos escolher',
    title: 'Experiências que <em>transformam</em>',
    subtitle: 'Cada momento foi pensado para você viver algo único.',
    cards: [
      { title: 'Piscina com vista para o campo', desc: 'Piscina aquecida em temporada com deck de madeira natural e vista panorâmica.' },
      { title: 'Atividades ao ar livre', desc: 'Caminhadas entre palmeiras, fogueiras noturnas, observação de aves e passeios no campo.' },
      { title: 'Desconexão real', desc: 'Sem ruído e sem pressa, apenas você e a natureza. Wi-Fi opcional.' }
    ]
  };
  TRANSLATIONS.pt.process = {
    label: 'Sua escapada',
    title: 'Como <em>reservar</em>',
    subtitle: 'Em quatro passos simples você estará curtindo a experiência.',
    steps: [
      { title: 'Escolha sua data', desc: 'Consulte disponibilidade e escolha o período ideal.' },
      { title: 'Reserve online', desc: 'Confirme com sinal de 50% por transferência ou dinheiro no check-in.' },
      { title: 'Preparamos tudo', desc: 'Personalizamos sua experiência em cada detalhe da estadia.' },
      { title: 'Aproveite', desc: 'Check-in, relaxamento e natureza pura. Nós cuidamos de tudo.' }
    ]
  };
  TRANSLATIONS.pt.form = {
    title: 'Consultar disponibilidade',
    name: 'Nome completo', email: 'Email', phone: 'Telefone / WhatsApp', checkin: 'Data de check-in', nights: 'Quantidade de noites', unit: 'Unidade preferida', message: 'Mensagem (opcional)',
    phName: 'Seu nome', phEmail: 'seu@email.com', phPhone: '+55 11 99999 9999', phMessage: 'Conte-nos sobre sua escapada ideal...',
    errName: 'Informe seu nome', errEmail: 'Informe um email válido', errPhone: 'Informe um telefone válido', errCheckin: 'Selecione uma data', errNights: 'Selecione as noites',
    nightsOptions: ['Selecionar...', '1 noite', '2 noites', '3 noites', '4 noites', '5 noites', '6 noites', '7 noites'],
    unitOptions: ['Sem preferência', 'Unidade Las Rosas', 'Unidade El Jardín', 'Unidade Las Glicinas'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Obrigado pelo interesse. Responderemos em breve por email ou WhatsApp.',
    infoTitle: 'Informações de contato', infoLabels: ['Localização', 'WhatsApp', 'Email', 'Horários']
  };
  TRANSLATIONS.pt.footer = {
    desc: 'Unidades de design entre palmeiras centenárias e lavandas em Colonia, Uruguai. Três unidades independentes onde natureza e conforto se encontram.',
    navHeading: 'Navegação', unitsHeading: 'Unidades', contactHeading: 'Contato',
    navLinks: ['Início', 'Sobre', 'Unidades', 'Experiências', 'Galería', 'Contato'],
    unitLinks: ['Unidade Las Rosas', 'Unidade El Jardín', 'Unidade Las Glicinas'],
    rights: 'Todos os direitos reservados.'
  };
  TRANSLATIONS.pt.whatsapp = { tooltip: 'Fale com a gente', message: 'Olá! Quero consultar disponibilidade em Entre Palmeras y Lavandas' };

  TRANSLATIONS.fr = {
    flag: '🇫🇷',
    metaTitle: 'Entre Palmeras y Lavandas - Unités design à Colonia, Uruguay',
    metaDescription: 'Unités design parmi des palmiers centenaires et la lavande à Colonia, Uruguay. Trois unités indépendantes où la nature et le confort se rencontrent.',
    preloaderDetecting: 'Détection du pays et de la langue...',
    preloaderReady: 'Bienvenue, hôte de {country}.',
    brandSub: 'Unités design',
    nav: {
      home: 'Accueil', about: 'À propos', units: 'Unités', experiences: 'Expériences', gallery: 'Galerie', contact: 'Contact', book: 'Réserver',
      menuAria: 'Ouvrir le menu de navigation', langAria: 'Sélectionner la langue'
    },
    hero: {
      badge: 'Expérience exclusive',
      title: 'Déconnectez-vous pour <em>vous reconnecter</em>',
      subtitle: 'Unités design parmi des palmiers centenaires et la lavande à Colonia, Uruguay. Trois unités indépendantes où la nature et le confort se rencontrent.',
      primary: 'Réserver le séjour',
      secondary: 'En savoir plus',
      scroll: 'Découvrir plus'
    },
    stats: { units: 'Unités indépendantes', guests: 'Hectares de rêve', rating: 'Note Google', nature: 'Nature' },
    about: {
      label: 'Notre histoire',
      title: 'Là où la <em>nature</em> vous enlace.',
      p1: 'Entre Palmeras y Lavandas est né du rêve de sa créatrice : donner vie à un espace où le design ne rivalise pas avec la nature, mais la célèbre. À Colonia, en Uruguay, nous avons transformé des unités de design contemporain pensées pour s\'intégrer au paysage.',
      p2: 'Entouré de palmiers centenaires, de champs de lavande et de ciels étoilés, chaque détail est soigné pour que votre seule préoccupation soit de choisir où admirer le coucher du soleil : depuis le hamac ou depuis la piscine.',
      features: [
        { title: 'Design durable', desc: 'Unités de design contemporain, avec un intérieur soigné et des matériaux nobles, pensées pour s\'intégrer à l\'environnement.' },
        { title: 'Nature immersive', desc: 'Fleurs et faune autochtones, palmiers centenaires et ciels infinis invitent à ralentir le rythme.' },
        { title: 'Intimité totale', desc: 'Seulement trois unités indépendantes, pensées pour une tranquillité maximale et une expérience sans interférences.' }
      ]
    },
    units: {
      label: 'Nos espaces',
      title: 'Trois unités de <em>design</em>',
      subtitle: 'Chaque unité a été transformée avec un soin artisanal en un espace unique, où l\'architecture contemporaine rencontre la chaleur de la campagne uruguayenne.',
      cards: [
        {
          name: 'Unité Las Rosas',
          desc: 'Entourée de roses Iceberg, cette unité offre tout le confort pour un séjour intime et paisible. Elle dispose d\'un grill privé, d\'une vue sur l\'allée de palmiers centenaires illuminée et sur un délicat chemin d\'eau avec pierres et plantes, traversé par un petit pont plein de charme. Pensée pour deux personnes, elle est entièrement équipée avec parking privé couvert.',
          cap: 'Capacité : 2 personnes'
        },
        {
          name: 'Unité El Jardín',
          desc: 'Elle se distingue par ses vastes galeries avec grill privé et ses baies vitrées offrant une vue panoramique sur les champs ouverts. Un espace idéal pour profiter en toute intimité des couchers de soleil de Colonia, entouré de calme et de nature. Parfaite pour les couples ou petits groupes.',
          cap: 'Capacité : 2 à 3 personnes'
        },
        {
          name: 'Unité Las Glicinas',
          desc: 'De grandes baies vitrées donnent sur l\'allée de palmiers illuminée et une terrasse privée surélevée offre une vue à 360° sur le lac, la cascade et les pergolas couvertes de glycines. Une unité conçue pour une expérience intime et spéciale, considérée comme la plus romantique du lieu.',
          cap: 'Capacité : 2 à 4 personnes'
        }
      ]
    },
    experiences: {
      label: 'Pourquoi nous choisir',
      title: 'Des expériences qui <em>transforment</em>',
      subtitle: 'Chaque moment est pensé pour vous faire vivre quelque chose d\'unique.',
      cards: [
        { title: 'Piscine avec vue sur la campagne', desc: 'Piscine chauffée en saison avec deck en bois naturel intégré au paysage et vue panoramique sur la campagne uruguayenne.' },
        { title: 'Activités en plein air', desc: 'Balades entre les palmiers, feux de camp nocturnes, observation des oiseaux et promenades à travers la campagne.' },
        { title: 'Déconnexion réelle', desc: 'Sans bruit, sans précipitation, juste vous et la nature. Wi‑Fi optionnel pour choisir quand vous reconnecter.' }
      ]
    },
    process: {
      label: 'Votre escapade',
      title: 'Comment <em>réserver</em>',
      subtitle: 'En quatre étapes simples, vous profitez de l\'expérience en unités de design la plus exclusive de Colonia.',
      steps: [
        { title: 'Choisissez vos dates', desc: 'Consultez les disponibilités et choisissez l\'escapade idéale pour vous.' },
        { title: 'Réservez en ligne', desc: 'Confirmez votre séjour avec un acompte de 50% par virement bancaire ou en espèces au check-in.' },
        { title: 'Nous préparons tout', desc: 'Nous personnalisons votre expérience, de l\'ambiance de l\'unité à chaque détail du séjour.' },
        { title: 'Profitez', desc: 'Check-in, détente et nature pure. Nous nous occupons de tout pour que vous n\'ayez qu\'à profiter.' }
      ]
    },
    form: {
      title: 'Vérifier la disponibilité',
      name: 'Nom complet', email: 'Email', phone: 'Téléphone / WhatsApp', checkin: 'Date d\'arrivée', nights: 'Nombre de nuits', unit: 'Unité préférée', message: 'Message (optionnel)',
      phName: 'Votre nom', phEmail: 'votre@email.com', phPhone: '+33 6 12 34 56 78', phMessage: 'Parlez-nous de votre escapade idéale...',
      errName: 'Veuillez saisir votre nom', errEmail: 'Veuillez saisir un email valide', errPhone: 'Veuillez saisir un numéro valide', errCheckin: 'Veuillez sélectionner une date', errNights: 'Veuillez sélectionner les nuits',
      nightsOptions: ['Sélectionner...', '1 nuit', '2 nuits', '3 nuits', '4 nuits', '5 nuits', '6 nuits', '7 nuits'],
      unitOptions: ['Sans préférence', 'Unité Las Rosas', 'Unité El Jardín', 'Unité Las Glicinas'],
      submit: 'Envoyer la demande', sending: 'Envoi...',
      successTitle: 'Demande envoyée', successText: 'Merci pour votre intérêt. Nous vous répondrons rapidement par email ou WhatsApp.',
      infoTitle: 'Informations de contact', infoLabels: ['Localisation', 'WhatsApp', 'Email', 'Horaires']
    },
    footer: {
      desc: 'Unités design parmi des palmiers centenaires et la lavande à Colonia, Uruguay. Trois unités indépendantes où la nature et le confort se rencontrent.',
      navHeading: 'Navigation', unitsHeading: 'Unités', contactHeading: 'Contact',
      navLinks: ['Accueil', 'À propos', 'Unités', 'Expériences', 'Galerie', 'Contact'],
      unitLinks: ['Unité Las Rosas', 'Unité El Jardín', 'Unité Las Glicinas'],
      rights: 'Tous droits réservés.'
    },
    whatsapp: { tooltip: 'Discutez avec nous', message: 'Bonjour ! Je souhaite vérifier la disponibilité à Entre Palmeras y Lavandas' }
  };

  TRANSLATIONS.it.metaTitle = 'Entre Palmeras y Lavandas - Unita di Design a Colonia, Uruguay';
  TRANSLATIONS.it.metaDescription = 'Unita di design tra palme secolari e lavande a Colonia, Uruguay. Tre unita indipendenti dove natura e comfort si incontrano.';
  TRANSLATIONS.it.preloaderDetecting = 'Rilevamento paese e lingua...';
  TRANSLATIONS.it.about = {
    label: 'La nostra storia',
    title: 'Dove la <em>natura</em> abbraccia.',
    p1: 'Entre Palmeras y Lavandas nasce dal sogno della sua creatrice: dare vita a uno spazio dove il design non compete con la natura, ma la celebra. A Colonia, in Uruguay, abbiamo trasformato unità contemporanee pensate per integrarsi nel paesaggio.',
    p2: 'Circondate da palme secolari, campi di lavanda e cieli stellati, ogni dettaglio è curato perché la tua unica preoccupazione sia scegliere se guardare il tramonto dall\'amaca o dalla piscina.',
    features: [
      { title: 'Design sostenibile', desc: 'Unità di design contemporaneo, con interior curato e materiali nobili, pensate per integrarsi con l\'ambiente.' },
      { title: 'Natura immersiva', desc: 'Fiori e fauna autoctona, palme secolari e cieli infiniti invitano a rallentare.' },
      { title: 'Privacy totale', desc: 'Solo tre unità indipendenti, per massima tranquillità e un\'esperienza senza interferenze.' }
    ]
  };
  TRANSLATIONS.it.units = {
    label: 'I nostri spazi',
    title: 'Tre unità di <em>design</em>',
    subtitle: 'Ogni unità è stata trasformata con cura artigianale in uno spazio unico.',
    cards: [
      { name: 'Unità Las Rosas', desc: 'Circondata da rose Iceberg, offre comfort completo per un soggiorno intimo e tranquillo. Include griglia privata, vista sul viale di palme illuminate e su un delicato percorso d\'acqua con piccolo ponte. Completamente attrezzata per due persone, con parcheggio coperto privato.', cap: 'Capacità: 2 persone' },
      { name: 'Unità El Jardín', desc: 'Ampie gallerie con griglia privata e finestre panoramiche sui campi aperti. Ideale per coppie o piccoli gruppi in cerca di calma e natura.', cap: 'Capacità: 2 a 3 persone' },
      { name: 'Unità Las Glicinas', desc: 'Grandi finestre con vista sul viale di palme illuminate e terrazza privata sopraelevata con vista a 360° su lago, cascata e pergolati di glicine. L\'unità più romantica del luogo.', cap: 'Capacità: 2 a 4 persone' }
    ]
  };
  TRANSLATIONS.it.experiences = {
    label: 'Perché sceglierci',
    title: 'Esperienze che <em>trasformano</em>',
    subtitle: 'Ogni momento è pensato per farti vivere qualcosa di unico.',
    cards: [
      { title: 'Piscina con vista campagna', desc: 'Piscina riscaldata in stagione con deck in legno naturale integrato nel paesaggio.' },
      { title: 'Attività all\'aria aperta', desc: 'Passeggiate tra le palme, falò serali, birdwatching e percorsi in campagna.' },
      { title: 'Disconnessione reale', desc: 'Niente rumore, niente fretta: solo te e la natura. Wi-Fi opzionale.' }
    ]
  };
  TRANSLATIONS.it.process = {
    label: 'La tua fuga',
    title: 'Come <em>prenotare</em>',
    subtitle: 'In quattro semplici passi vivi l\'esperienza più esclusiva di Colonia.',
    steps: [
      { title: 'Scegli la data', desc: 'Controlla disponibilità e scegli la fuga ideale per te.' },
      { title: 'Prenota online', desc: 'Conferma con caparra del 50% tramite bonifico o contanti al check-in.' },
      { title: 'Prepariamo tutto', desc: 'Personalizziamo la tua esperienza: dall\'atmosfera dell\'unità a ogni dettaglio.' },
      { title: 'Goditi il soggiorno', desc: 'Check-in, relax e natura pura. Noi ci occupiamo di tutto.' }
    ]
  };
  TRANSLATIONS.it.form = {
    title: 'Verifica disponibilità',
    name: 'Nome completo', email: 'Email', phone: 'Telefono / WhatsApp', checkin: 'Data check-in', nights: 'Numero di notti', unit: 'Unità preferita', message: 'Messaggio (opzionale)',
    phName: 'Il tuo nome', phEmail: 'tuo@email.com', phPhone: '+39 333 123 4567', phMessage: 'Raccontaci la tua fuga ideale...',
    errName: 'Inserisci il tuo nome', errEmail: 'Inserisci una email valida', errPhone: 'Inserisci un numero valido', errCheckin: 'Seleziona una data', errNights: 'Seleziona le notti',
    nightsOptions: ['Seleziona...', '1 notte', '2 notti', '3 notti', '4 notti', '5 notti', '6 notti', '7 notti'],
    unitOptions: ['Nessuna preferenza', 'Unità Las Rosas', 'Unità El Jardín', 'Unità Las Glicinas'],
    submit: 'Invia richiesta', sending: 'Invio...',
    successTitle: 'Richiesta inviata', successText: 'Grazie per l\'interesse. Ti risponderemo presto via email o WhatsApp.',
    infoTitle: 'Informazioni di contatto', infoLabels: ['Posizione', 'WhatsApp', 'Email', 'Orari']
  };
  TRANSLATIONS.it.footer = {
    desc: 'Unità di design tra palme secolari e lavande, Colonia, Uruguay. Tre unità indipendenti dove natura e comfort si incontrano.',
    navHeading: 'Navigazione', unitsHeading: 'Unità', contactHeading: 'Contatto',
    navLinks: ['Home', 'Chi siamo', 'Unità', 'Esperienze', 'Galleria', 'Contatto'],
    unitLinks: ['Unità Las Rosas', 'Unità El Jardín', 'Unità Las Glicinas'],
    rights: 'Tutti i diritti riservati.'
  };
  TRANSLATIONS.it.whatsapp = { tooltip: 'Chatta con noi', message: 'Ciao! Vorrei verificare la disponibilità in Entre Palmeras y Lavandas' };

  TRANSLATIONS.de.metaTitle = 'Entre Palmeras y Lavandas - Design-Unterkünfte in Colonia, Uruguay';
  TRANSLATIONS.de.metaDescription = 'Design-Unterkünfte zwischen alten Palmen und Lavendel in Colonia, Uruguay. Drei unabhängige Einheiten, in denen Natur und Komfort zusammenfinden.';
  TRANSLATIONS.de.preloaderDetecting = 'Land und Sprache werden erkannt...';
  TRANSLATIONS.de.about = {
    label: 'Unsere Geschichte',
    title: 'Wo die <em>Natur</em> dich umarmt.',
    p1: 'Entre Palmeras y Lavandas entstand aus dem Traum seiner Gründerin: einen Ort zu schaffen, an dem Design nicht mit der Natur konkurriert, sondern sie feiert. In Colonia, Uruguay, haben wir moderne Einheiten geschaffen, die sich in die Landschaft integrieren.',
    p2: 'Umgeben von alten Palmen, Lavendelfeldern und sternklarem Himmel ist jedes Detail so gestaltet, dass nur eine Frage bleibt: Sonnenuntergang in der Hängematte oder am Pool?',
    features: [
      { title: 'Nachhaltiges Design', desc: 'Zeitgenössische Einheiten mit sorgfältigem Interior und hochwertigen Materialien.' },
      { title: 'Natur pur', desc: 'Einheimische Flora und Fauna, jahrhundertealte Palmen und weite Himmel laden zum Entschleunigen ein.' },
      { title: 'Absolute Privatsphäre', desc: 'Nur drei unabhängige Einheiten für maximale Ruhe und eine ungestörte Erfahrung.' }
    ]
  };
  TRANSLATIONS.de.units = {
    label: 'Unsere Räume',
    title: 'Drei <em>Design</em>-Einheiten',
    subtitle: 'Jede Einheit wurde mit handwerklicher Sorgfalt in einen einzigartigen Ort verwandelt.',
    cards: [
      { name: 'Einheit Las Rosas', desc: 'Umgeben von Iceberg-Rosen, mit privatem Grill, Blick auf die beleuchtete Palmenallee und einen feinen Wasserweg mit kleiner Brücke. Voll ausgestattet für zwei Personen, mit überdachtem Privatparkplatz.', cap: 'Kapazität: 2 Personen' },
      { name: 'Einheit El Jardín', desc: 'Großzügige Galerien mit eigenem Grill und Panoramafenstern auf offene Felder. Ideal für Paare oder kleine Gruppen.', cap: 'Kapazität: 2 bis 3 Personen' },
      { name: 'Einheit Las Glicinas', desc: 'Große Fenster und erhöhte private Terrasse mit 360°-Blick auf See, Wasserfall und mit Glyzinien bewachsene Pergolen. Die romantischste Einheit des Anwesens.', cap: 'Kapazität: 2 bis 4 Personen' }
    ]
  };
  TRANSLATIONS.de.experiences = {
    label: 'Warum wir',
    title: 'Erlebnisse, die <em>verändern</em>',
    subtitle: 'Jeder Moment ist so gestaltet, dass er einzigartig bleibt.',
    cards: [
      { title: 'Pool mit Landblick', desc: 'Saisonal beheizter Pool mit Holzdeck und Panorama über die uruguayische Landschaft.' },
      { title: 'Aktivitäten im Freien', desc: 'Spaziergänge zwischen Palmen, Lagerfeuer, Vogelbeobachtung und Naturwege.' },
      { title: 'Echte Auszeit', desc: 'Kein Lärm, keine Eile: nur du und die Natur. WLAN optional.' }
    ]
  };
  TRANSLATIONS.de.process = {
    label: 'Deine Auszeit',
    title: 'So <em>buchst</em> du',
    subtitle: 'In vier einfachen Schritten zur exklusivsten Erfahrung in Colonia.',
    steps: [
      { title: 'Datum wählen', desc: 'Verfügbarkeit prüfen und idealen Zeitraum wählen.' },
      { title: 'Online buchen', desc: 'Mit 50% Anzahlung per Überweisung oder bar beim Check-in bestätigen.' },
      { title: 'Wir bereiten alles vor', desc: 'Von der Atmosphäre der Einheit bis zu jedem kleinen Detail.' },
      { title: 'Genießen', desc: 'Check-in, Entspannung und Natur pur. Wir kümmern uns um den Rest.' }
    ]
  };
  TRANSLATIONS.de.form = {
    title: 'Verfügbarkeit anfragen',
    name: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon / WhatsApp', checkin: 'Check-in-Datum', nights: 'Anzahl Nächte', unit: 'Bevorzugte Einheit', message: 'Nachricht (optional)',
    phName: 'Dein Name', phEmail: 'dein@email.com', phPhone: '+49 170 1234567', phMessage: 'Erzähl uns von deiner idealen Auszeit...',
    errName: 'Bitte Namen eingeben', errEmail: 'Bitte gültige E-Mail eingeben', errPhone: 'Bitte gültige Telefonnummer eingeben', errCheckin: 'Bitte Datum wählen', errNights: 'Bitte Nächte wählen',
    nightsOptions: ['Auswählen...', '1 Nacht', '2 Nächte', '3 Nächte', '4 Nächte', '5 Nächte', '6 Nächte', '7 Nächte'],
    unitOptions: ['Keine Präferenz', 'Einheit Las Rosas', 'Einheit El Jardín', 'Einheit Las Glicinas'],
    submit: 'Anfrage senden', sending: 'Wird gesendet...',
    successTitle: 'Anfrage gesendet', successText: 'Danke für dein Interesse. Wir antworten dir in Kürze per E-Mail oder WhatsApp.',
    infoTitle: 'Kontaktinformationen', infoLabels: ['Standort', 'WhatsApp', 'E-Mail', 'Zeiten']
  };
  TRANSLATIONS.de.footer = {
    desc: 'Design-Unterkünfte zwischen alten Palmen und Lavendel in Colonia, Uruguay. Drei unabhängige Einheiten, in denen Natur und Komfort zusammenfinden.',
    navHeading: 'Navigation', unitsHeading: 'Einheiten', contactHeading: 'Kontakt',
    navLinks: ['Start', 'Über uns', 'Einheiten', 'Erlebnisse', 'Galerie', 'Kontakt'],
    unitLinks: ['Einheit Las Rosas', 'Einheit El Jardín', 'Einheit Las Glicinas'],
    rights: 'Alle Rechte vorbehalten.'
  };
  TRANSLATIONS.de.whatsapp = { tooltip: 'Chatte mit uns', message: 'Hallo! Ich möchte die Verfügbarkeit bei Entre Palmeras y Lavandas prüfen' };

  TRANSLATIONS.sv.metaTitle = 'Entre Palmeras y Lavandas - Designboenden i Colonia, Uruguay';
  TRANSLATIONS.sv.metaDescription = 'Designboenden bland hundraåriga palmer och lavendel i Colonia, Uruguay. Tre fristående enheter där natur och komfort möts.';
  TRANSLATIONS.sv.preloaderDetecting = 'Identifierar land och språk...';
  TRANSLATIONS.sv.preloaderReady = 'Välkommen, gäst från {country}.';
  TRANSLATIONS.sv.about = {
    label: 'Vår historia',
    title: 'Där <em>naturen</em> omfamnar.',
    p1: 'Entre Palmeras y Lavandas föddes ur en dröm: en plats där design inte konkurrerar med naturen utan hyllar den. I Colonia, Uruguay, skapade vi moderna enheter som smälter in i landskapet.',
    p2: 'Omgivna av hundraåriga palmer, lavendelfält och stjärnklara himlar är varje detalj utformad för total ro.',
    features: [
      { title: 'Hållbar design', desc: 'Samtida enheter med genomtänkt inredning och naturmaterial.' },
      { title: 'Nära naturen', desc: 'Inhemsk flora och fauna, palmer och oändliga himlar får tempot att sjunka.' },
      { title: 'Total avskildhet', desc: 'Endast tre fristående enheter för maximal lugn och integritet.' }
    ]
  };
  TRANSLATIONS.sv.units = {
    label: 'Våra utrymmen',
    title: 'Tre <em>design</em>enheter',
    subtitle: 'Varje enhet har varsamt förvandlats till en unik plats med samtida arkitektur och landsbygdens värme.',
    cards: [
      { name: 'Enhet Las Rosas', desc: 'Omgiven av Iceberg-rosor med privat grill, utsikt mot den upplysta palmallén och en liten vattenstig med bro. Fullt utrustad för två personer och privat carport.', cap: 'Kapacitet: 2 personer' },
      { name: 'Enhet El Jardín', desc: 'Rymliga verandor med egen grill och panoramafönster mot öppna fält. Perfekt för par eller små grupper.', cap: 'Kapacitet: 2 till 3 personer' },
      { name: 'Enhet Las Glicinas', desc: 'Stora fönster och privat upphöjd terrass med 360° utsikt över sjö, vattenfall och pergolor med blåregn. Den mest romantiska enheten.', cap: 'Kapacitet: 2 till 4 personer' }
    ]
  };
  TRANSLATIONS.sv.experiences = {
    label: 'Varför välja oss',
    title: 'Upplevelser som <em>förändrar</em>',
    subtitle: 'Varje ögonblick är skapat för något unikt.',
    cards: [
      { title: 'Pool med utsikt', desc: 'Säsongsuppvärmd pool med trädeck och panoramavy över landskapet.' },
      { title: 'Utomhusaktiviteter', desc: 'Promenader bland palmer, kvällseldar, fågelskådning och naturturer.' },
      { title: 'Äkta nedkoppling', desc: 'Inget buller, ingen stress. Bara du och naturen. Wi‑Fi valfritt.' }
    ]
  };
  TRANSLATIONS.sv.process = {
    label: 'Din getaway',
    title: 'Så <em>bokar</em> du',
    subtitle: 'I fyra enkla steg är du på plats och njuter.',
    steps: [
      { title: 'Välj datum', desc: 'Kontrollera tillgänglighet och välj din perfekta vistelse.' },
      { title: 'Boka online', desc: 'Bekräfta med 50% handpenning via banköverföring eller kontant vid incheckning.' },
      { title: 'Vi förbereder allt', desc: 'Vi skräddarsyr upplevelsen från atmosfär till detaljer.' },
      { title: 'Njut', desc: 'Check-in, avkoppling och natur. Vi tar hand om resten.' }
    ]
  };
  TRANSLATIONS.sv.form = {
    title: 'Kontrollera tillgänglighet',
    name: 'Fullständigt namn', email: 'E-post', phone: 'Telefon / WhatsApp', checkin: 'Incheckningsdatum', nights: 'Antal nätter', unit: 'Föredragen enhet', message: 'Meddelande (valfritt)',
    phName: 'Ditt namn', phEmail: 'din@email.com', phPhone: '+46 70 123 45 67', phMessage: 'Berätta om din idealiska getaway...',
    errName: 'Ange ditt namn', errEmail: 'Ange en giltig e-post', errPhone: 'Ange ett giltigt telefonnummer', errCheckin: 'Välj ett datum', errNights: 'Välj antal nätter',
    nightsOptions: ['Välj...', '1 natt', '2 nätter', '3 nätter', '4 nätter', '5 nätter', '6 nätter', '7 nätter'],
    unitOptions: ['Ingen preferens', 'Enhet Las Rosas', 'Enhet El Jardín', 'Enhet Las Glicinas'],
    submit: 'Skicka förfrågan', sending: 'Skickar...',
    successTitle: 'Förfrågan skickad', successText: 'Tack för ditt intresse. Vi svarar snart via e-post eller WhatsApp.',
    infoTitle: 'Kontaktinformation', infoLabels: ['Plats', 'WhatsApp', 'E-post', 'Tider']
  };
  TRANSLATIONS.sv.footer = {
    desc: 'Designboenden bland hundraåriga palmer och lavendel i Colonia, Uruguay. Tre fristående enheter där natur och komfort möts.',
    navHeading: 'Navigering', unitsHeading: 'Enheter', contactHeading: 'Kontakt',
    navLinks: ['Hem', 'Om oss', 'Enheter', 'Upplevelser', 'Galleri', 'Kontakt'],
    unitLinks: ['Enhet Las Rosas', 'Enhet El Jardín', 'Enhet Las Glicinas'],
    rights: 'Alla rättigheter förbehållna.'
  };
  TRANSLATIONS.sv.whatsapp = { tooltip: 'Chatta med oss', message: 'Hej! Jag vill kontrollera tillgänglighet hos Entre Palmeras y Lavandas' };

  TRANSLATIONS.da.metaTitle = 'Entre Palmeras y Lavandas - Designenheder i Colonia, Uruguay';
  TRANSLATIONS.da.metaDescription = 'Designenheder mellem gamle palmer og lavendel i Colonia, Uruguay. Tre uafhængige enheder hvor natur og komfort mødes.';
  TRANSLATIONS.da.preloaderDetecting = 'Finder land og sprog...';
  TRANSLATIONS.da.about = {
    label: 'Vores historie',
    title: 'Hvor <em>naturen</em> omfavner.',
    p1: 'Entre Palmeras y Lavandas blev skabt ud fra en drøm: et sted hvor design ikke konkurrerer med naturen, men fejrer den. I Colonia, Uruguay, skabte vi moderne enheder i harmoni med omgivelserne.',
    p2: 'Omringet af gamle palmer, lavendelmarker og stjernehimmel er alt designet til ro og nærvær.',
    features: [
      { title: 'Bæredygtigt design', desc: 'Moderne enheder med nøje udvalgt indretning og naturlige materialer.' },
      { title: 'Naturen tæt på', desc: 'Blomster, lokal fauna, palmer og åbne himle inviterer til et lavere tempo.' },
      { title: 'Total privatliv', desc: 'Kun tre uafhængige enheder for maksimal ro.' }
    ]
  };
  TRANSLATIONS.da.units = {
    label: 'Vores steder',
    title: 'Tre <em>design</em>enheder',
    subtitle: 'Hver enhed er skabt med håndværksmæssig omsorg.',
    cards: [
      { name: 'Enhed Las Rosas', desc: 'Omgivet af Iceberg-roser med privat grill, udsigt til oplyst palmeallé og en lille vandsti med bro. Fuldt udstyret til to personer med privat overdækket parkering.', cap: 'Kapacitet: 2 personer' },
      { name: 'Enhed El Jardín', desc: 'Store gallerier med egen grill og panoramavinduer mod åbne marker. Ideel til par eller små grupper.', cap: 'Kapacitet: 2 til 3 personer' },
      { name: 'Enhed Las Glicinas', desc: 'Store vinduer og privat hævet terrasse med 360° udsigt over sø, vandfald og pergolaer med blåregn. Den mest romantiske enhed.', cap: 'Kapacitet: 2 til 4 personer' }
    ]
  };
  TRANSLATIONS.da.experiences = {
    label: 'Hvorfor vælge os',
    title: 'Oplevelser der <em>forandrer</em>',
    subtitle: 'Hvert øjeblik er skabt til noget unikt.',
    cards: [
      { title: 'Pool med udsigt', desc: 'Sæsonopvarmet pool med naturligt trædæk og panoramaudsigt.' },
      { title: 'Aktiviteter i naturen', desc: 'Gåture mellem palmer, aftenbål, fuglekiggeri og ture i landskabet.' },
      { title: 'Ægte frakobling', desc: 'Ingen støj, ingen stress. Kun dig og naturen. Wi‑Fi er valgfrit.' }
    ]
  };
  TRANSLATIONS.da.process = {
    label: 'Din getaway',
    title: 'Sådan <em>booker</em> du',
    subtitle: 'På fire enkle trin er du klar til opholdet.',
    steps: [
      { title: 'Vælg dato', desc: 'Tjek tilgængelighed og vælg den perfekte periode.' },
      { title: 'Book online', desc: 'Bekræft med 50% depositum via bankoverførsel eller kontant ved check-in.' },
      { title: 'Vi forbereder alt', desc: 'Vi skræddersyr din oplevelse ned til mindste detalje.' },
      { title: 'Nyd opholdet', desc: 'Check-in, afslapning og ren natur. Vi klarer resten.' }
    ]
  };
  TRANSLATIONS.da.form = {
    title: 'Tjek tilgængelighed',
    name: 'Fulde navn', email: 'Email', phone: 'Telefon / WhatsApp', checkin: 'Check-in dato', nights: 'Antal nætter', unit: 'Foretrukken enhed', message: 'Besked (valgfri)',
    phName: 'Dit navn', phEmail: 'din@email.com', phPhone: '+45 20 12 34 56', phMessage: 'Fortæl os om din ideelle getaway...',
    errName: 'Indtast dit navn', errEmail: 'Indtast en gyldig email', errPhone: 'Indtast et gyldigt telefonnummer', errCheckin: 'Vælg en dato', errNights: 'Vælg antal nætter',
    nightsOptions: ['Vælg...', '1 nat', '2 nætter', '3 nætter', '4 nætter', '5 nætter', '6 nætter', '7 nætter'],
    unitOptions: ['Ingen præference', 'Enhed Las Rosas', 'Enhed El Jardín', 'Enhed Las Glicinas'],
    submit: 'Send forespørgsel', sending: 'Sender...',
    successTitle: 'Forespørgsel sendt', successText: 'Tak for din interesse. Vi svarer snart via email eller WhatsApp.',
    infoTitle: 'Kontaktoplysninger', infoLabels: ['Placering', 'WhatsApp', 'Email', 'Tider']
  };
  TRANSLATIONS.da.footer = {
    desc: 'Designenheder mellem gamle palmer og lavendel i Colonia, Uruguay. Tre uafhængige enheder hvor natur og komfort mødes.',
    navHeading: 'Navigation', unitsHeading: 'Enheder', contactHeading: 'Kontakt',
    navLinks: ['Hjem', 'Om os', 'Enheder', 'Oplevelser', 'Galleri', 'Kontakt'],
    unitLinks: ['Enhed Las Rosas', 'Enhed El Jardín', 'Enhed Las Glicinas'],
    rights: 'Alle rettigheder forbeholdes.'
  };
  TRANSLATIONS.da.whatsapp = { tooltip: 'Chat med os', message: 'Hej! Jeg vil gerne tjekke tilgængelighed hos Entre Palmeras y Lavandas' };

  TRANSLATIONS.ru.metaTitle = 'Entre Palmeras y Lavandas - Дизайнерские дома в Колонии, Уругвай';
  TRANSLATIONS.ru.metaDescription = 'Дизайнерские дома среди вековых пальм и лаванды в Колонии, Уругвай. Три независимых дома, где встречаются природа и комфорт.';
  TRANSLATIONS.ru.preloaderDetecting = 'Определяем страну и язык...';
  TRANSLATIONS.ru.about = {
    label: 'Наша история',
    title: 'Где <em>природа</em> обнимает.',
    p1: 'Entre Palmeras y Lavandas родился из мечты создательницы: создать место, где дизайн не спорит с природой, а подчеркивает ее. В Колонии, Уругвай, мы создали современные дома, гармонично встроенные в окружение.',
    p2: 'Вековые пальмы, поля лаванды и звездное небо создают атмосферу, где можно замедлиться и восстановиться.',
    features: [
      { title: 'Устойчивый дизайн', desc: 'Современные дома с продуманным интерьером и благородными материалами.' },
      { title: 'Погружение в природу', desc: 'Цветы, местная фауна, пальмы и бескрайнее небо приглашают расслабиться.' },
      { title: 'Полная приватность', desc: 'Только три независимых дома для максимального уединения.' }
    ]
  };
  TRANSLATIONS.ru.units = {
    label: 'Наши пространства',
    title: 'Три дизайнерских <em>дома</em>',
    subtitle: 'Каждый дом создан вручную как уникальное сочетание архитектуры и уюта уругвайской природы.',
    cards: [
      { name: 'Дом Las Rosas', desc: 'Окружен розами Iceberg. Приватное барбекю, вид на освещенную аллею пальм и водную дорожку с маленьким мостиком. Для двух гостей, полностью оборудован, с крытой парковкой.', cap: 'Вместимость: 2 гостя' },
      { name: 'Дом El Jardín', desc: 'Просторные галереи с собственной зоной гриля и панорамные окна на открытые поля. Идеально для пар или небольших групп.', cap: 'Вместимость: 2-3 гостя' },
      { name: 'Дом Las Glicinas', desc: 'Большие окна и приподнятая частная терраса с обзором 360° на озеро, водопад и перголы с глицинией. Самый романтичный дом.', cap: 'Вместимость: 2-4 гостя' }
    ]
  };
  TRANSLATIONS.ru.experiences = {
    label: 'Почему выбирают нас',
    title: 'Впечатления, которые <em>меняют</em>',
    subtitle: 'Каждый момент здесь создан как особенный.',
    cards: [
      { title: 'Бассейн с видом на поля', desc: 'Сезонно подогреваемый бассейн с деревянной террасой и панорамным видом.' },
      { title: 'Активности на природе', desc: 'Прогулки среди пальм, вечерние костры, наблюдение за птицами и маршруты по полям.' },
      { title: 'Настоящее отключение', desc: 'Без шума и спешки, только вы и природа. Wi‑Fi по желанию.' }
    ]
  };
  TRANSLATIONS.ru.process = {
    label: 'Ваш побег',
    title: 'Как <em>забронировать</em>',
    subtitle: 'Четыре простых шага до вашего идеального отдыха.',
    steps: [
      { title: 'Выберите дату', desc: 'Проверьте доступность и выберите удобный период.' },
      { title: 'Забронируйте онлайн', desc: 'Подтвердите бронирование предоплатой 50%.' },
      { title: 'Мы все подготовим', desc: 'Подготовим атмосферу дома и детали под ваш отдых.' },
      { title: 'Наслаждайтесь', desc: 'Заезд, расслабление и природа. Обо всем остальном позаботимся мы.' }
    ]
  };
  TRANSLATIONS.ru.form = {
    title: 'Узнать доступность',
    name: 'Полное имя', email: 'Email', phone: 'Телефон / WhatsApp', checkin: 'Дата заезда', nights: 'Количество ночей', unit: 'Предпочтительный дом', message: 'Сообщение (необязательно)',
    phName: 'Ваше имя', phEmail: 'you@email.com', phPhone: '+7 999 123 45 67', phMessage: 'Расскажите о вашем идеальном отдыхе...',
    errName: 'Введите имя', errEmail: 'Введите корректный email', errPhone: 'Введите корректный номер', errCheckin: 'Выберите дату', errNights: 'Выберите количество ночей',
    nightsOptions: ['Выбрать...', '1 ночь', '2 ночи', '3 ночи', '4 ночи', '5 ночей', '6 ночей', '7 ночей'],
    unitOptions: ['Без предпочтений', 'Дом Las Rosas', 'Дом El Jardín', 'Дом Las Glicinas'],
    submit: 'Отправить запрос', sending: 'Отправка...',
    successTitle: 'Запрос отправлен', successText: 'Спасибо за интерес. Мы скоро ответим по email или WhatsApp.',
    infoTitle: 'Контактная информация', infoLabels: ['Локация', 'WhatsApp', 'Email', 'График']
  };
  TRANSLATIONS.ru.footer = {
    desc: 'Дизайнерские дома среди вековых пальм и лаванды в Колонии, Уругвай. Три независимых дома, где встречаются природа и комфорт.',
    navHeading: 'Навигация', unitsHeading: 'Дома', contactHeading: 'Контакт',
    navLinks: ['Главная', 'О нас', 'Дома', 'Впечатления', 'Галерея', 'Контакт'],
    unitLinks: ['Дом Las Rosas', 'Дом El Jardín', 'Дом Las Glicinas'],
    rights: 'Все права защищены.'
  };
  TRANSLATIONS.ru.whatsapp = { tooltip: 'Напишите нам', message: 'Здравствуйте! Хочу уточнить доступность в Entre Palmeras y Lavandas' };

  TRANSLATIONS.zh.metaTitle = 'Entre Palmeras y Lavandas - 乌拉圭科洛尼亚设计独栋';
  TRANSLATIONS.zh.metaDescription = '位于乌拉圭科洛尼亚，百年棕榈与薰衣草之间的设计独栋。三套独立单元，让自然与舒适相遇。';
  TRANSLATIONS.zh.preloaderDetecting = '正在识别国家与语言...';
  TRANSLATIONS.zh.about = {
    label: '我们的故事',
    title: '<em>自然</em>拥抱你的地方。',
    p1: 'Entre Palmeras y Lavandas 源于创始人的梦想：打造一个让设计与自然共生、彼此成就的空间。我们在乌拉圭科洛尼亚，将当代设计单元与环境和谐融合。',
    p2: '百年棕榈、薰衣草田与星空环绕，每一个细节都被细致打磨，让你只需决定：在吊床还是泳池边看日落。',
    features: [
      { title: '可持续设计', desc: '当代设计单元，精选材质与精心室内设计，融入自然环境。' },
      { title: '沉浸式自然', desc: '本地花卉与动物、百年棕榈与开阔天空，邀请你放慢节奏。' },
      { title: '绝对私密', desc: '仅三套独立单元，安静不受打扰。' }
    ]
  };
  TRANSLATIONS.zh.units = {
    label: '我们的空间',
    title: '三套 <em>设计</em>单元',
    subtitle: '每套单元都以匠心打造，结合当代建筑与乌拉圭乡野温度。',
    cards: [
      { name: 'Las Rosas 单元', desc: '被 Iceberg 玫瑰环绕，私享烧烤区，可眺望灯光棕榈步道与带小桥的水景小径。适合两位住客，配套齐全，含私家有顶车位。', cap: '容量：2 人' },
      { name: 'El Jardín 单元', desc: '拥有宽敞廊道与私享烧烤区，大面积窗景直面开阔田野。适合情侣或小型同行。', cap: '容量：2-3 人' },
      { name: 'Las Glicinas 单元', desc: '大窗景与私家高位露台，可 360° 欣赏湖泊、瀑布与紫藤廊架。这里也是最浪漫的单元。', cap: '容量：2-4 人' }
    ]
  };
  TRANSLATIONS.zh.experiences = {
    label: '为什么选择我们',
    title: '能够 <em>改变状态</em> 的体验',
    subtitle: '每一个瞬间都被设计成独一无二。',
    cards: [
      { title: '田野景观泳池', desc: '季节性恒温泳池，木质平台与自然景观融合。' },
      { title: '户外活动', desc: '棕榈步行、夜间篝火、观鸟与田野漫游。' },
      { title: '真正断联', desc: '远离噪音与匆忙，只剩你与自然。Wi‑Fi 可按需开启。' }
    ]
  };
  TRANSLATIONS.zh.process = {
    label: '你的逃逸假期',
    title: '如何 <em>预订</em>',
    subtitle: '四个简单步骤，即可开启科洛尼亚的高端露营体验。',
    steps: [
      { title: '选择日期', desc: '查看可用日期并选择合适行程。' },
      { title: '在线预订', desc: '支付 50% 订金即可确认。' },
      { title: '我们为你准备', desc: '从空间氛围到细节体验，提前为你安排好。' },
      { title: '安心享受', desc: '入住、放松、亲近自然，其余交给我们。' }
    ]
  };
  TRANSLATIONS.zh.form = {
    title: '查询可订日期',
    name: '姓名', email: '邮箱', phone: '电话 / WhatsApp', checkin: '入住日期', nights: '入住晚数', unit: '偏好房型', message: '留言（可选）',
    phName: '你的名字', phEmail: 'you@email.com', phPhone: '+86 138 0000 0000', phMessage: '告诉我们你理想中的假期...',
    errName: '请输入姓名', errEmail: '请输入有效邮箱', errPhone: '请输入有效电话', errCheckin: '请选择日期', errNights: '请选择晚数',
    nightsOptions: ['请选择...', '1 晚', '2 晚', '3 晚', '4 晚', '5 晚', '6 晚', '7 晚'],
    unitOptions: ['无偏好', 'Las Rosas 单元', 'El Jardín 单元', 'Las Glicinas 单元'],
    submit: '发送咨询', sending: '发送中...',
    successTitle: '咨询已发送', successText: '感谢你的关注，我们将通过邮箱或 WhatsApp 尽快回复。',
    infoTitle: '联系信息', infoLabels: ['位置', 'WhatsApp', '邮箱', '时间']
  };
  TRANSLATIONS.zh.footer = {
    desc: '乌拉圭科洛尼亚，百年棕榈与薰衣草之间的设计独栋。三套独立单元，让自然与舒适相遇。',
    navHeading: '导航', unitsHeading: '房型', contactHeading: '联系',
    navLinks: ['首页', '关于我们', '房型', '体验', '画廊', '联系'],
    unitLinks: ['Las Rosas 单元', 'El Jardín 单元', 'Las Glicinas 单元'],
    rights: '保留所有权利。'
  };
  TRANSLATIONS.zh.whatsapp = { tooltip: '与我们聊天', message: '你好！我想咨询 Entre Palmeras y Lavandas 的可订日期' };

  TRANSLATIONS.ja.metaTitle = 'Entre Palmeras y Lavandas - ウルグアイ・コロニアのデザインユニット';
  TRANSLATIONS.ja.metaDescription = 'ウルグアイ・コロニア、樹齢あるヤシとラベンダーに囲まれたデザインユニット。自然と快適さが調和する独立型3ユニット。';
  TRANSLATIONS.ja.preloaderDetecting = '国と言語を判定しています...';
  TRANSLATIONS.ja.about = {
    label: '私たちの物語',
    title: '<em>自然</em>に抱かれる場所。',
    p1: 'Entre Palmeras y Lavandas は、デザインが自然と競うのではなく称える場所をつくりたいという想いから生まれました。ウルグアイ・コロニアで、環境に調和する現代的なユニットを整えました。',
    p2: '樹齢あるヤシ、ラベンダー畑、星空に囲まれ、細部まで丁寧に整えています。',
    features: [
      { title: 'サステナブルデザイン', desc: '上質な素材と丁寧なインテリアで、環境に溶け込む現代的なユニット。' },
      { title: '自然への没入', desc: '在来の花と生き物、古いヤシ、広い空が心をゆるめます。' },
      { title: '完全なプライバシー', desc: '3つの独立ユニットのみ。静けさを大切にした滞在。' }
    ]
  };
  TRANSLATIONS.ja.units = {
    label: 'ユニット紹介',
    title: '3つの <em>デザイン</em>ユニット',
    subtitle: '各ユニットは職人的な丁寧さで仕上げられています。',
    cards: [
      { name: 'Las Rosas ユニット', desc: 'Icebergローズに囲まれた静かなユニット。専用グリル、ライトアップされたヤシの小径の眺め、小さな橋のある水景。2名向け、設備完備、屋根付き専用駐車場付き。', cap: '定員：2名' },
      { name: 'El Jardín ユニット', desc: '広いギャラリーと専用グリル、開放的な田園を望む大きな窓。カップルや少人数グループに最適です。', cap: '定員：2〜3名' },
      { name: 'Las Glicinas ユニット', desc: '大きな窓と高台の専用テラスから、湖・滝・藤のパーゴラを360°で楽しめる最もロマンチックなユニット。', cap: '定員：2〜4名' }
    ]
  };
  TRANSLATIONS.ja.experiences = {
    label: '選ばれる理由',
    title: '心を <em>整える</em> 体験',
    subtitle: 'ここでの時間は、どこにもない体験になるよう設計されています。',
    cards: [
      { title: '景色を望むプール', desc: '季節限定の温水プールと自然に溶け込むウッドデッキ。' },
      { title: 'アウトドア体験', desc: 'ヤシ並木の散策、夜の焚き火、バードウォッチング。' },
      { title: '本当のオフライン', desc: '騒音も急ぎもない時間。Wi‑Fi は必要なときだけ。' }
    ]
  };
  TRANSLATIONS.ja.process = {
    label: 'あなたのエスケープ',
    title: '<em>予約</em>の流れ',
    subtitle: '4つのステップで、コロニアの特別な体験へ。',
    steps: [
      { title: '日程を選ぶ', desc: '空き状況を確認して、最適な日程を選択。' },
      { title: 'オンライン予約', desc: '50%のデポジットで予約確定。' },
      { title: '私たちが準備', desc: '空間演出から細部まで、滞在を整えます。' },
      { title: '楽しむ', desc: 'チェックインして、自然の中でゆっくり。' }
    ]
  };
  TRANSLATIONS.ja.form = {
    title: '空き状況を確認',
    name: 'お名前', email: 'メール', phone: '電話 / WhatsApp', checkin: 'チェックイン日', nights: '泊数', unit: '希望ユニット', message: 'メッセージ（任意）',
    phName: 'お名前', phEmail: 'you@email.com', phPhone: '+81 90 1234 5678', phMessage: '理想の滞在について教えてください...',
    errName: 'お名前を入力してください', errEmail: '有効なメールを入力してください', errPhone: '有効な電話番号を入力してください', errCheckin: '日付を選択してください', errNights: '泊数を選択してください',
    nightsOptions: ['選択してください...', '1泊', '2泊', '3泊', '4泊', '5泊', '6泊', '7泊'],
    unitOptions: ['希望なし', 'Las Rosas ユニット', 'El Jardín ユニット', 'Las Glicinas ユニット'],
    submit: '問い合わせ送信', sending: '送信中...',
    successTitle: '送信完了', successText: 'お問い合わせありがとうございます。メールまたはWhatsAppでご連絡します。',
    infoTitle: '連絡先情報', infoLabels: ['所在地', 'WhatsApp', 'メール', '時間']
  };
  TRANSLATIONS.ja.footer = {
    desc: 'ウルグアイ・コロニア、百年のヤシとラベンダーに囲まれたデザインユニット。自然と快適さが調和する独立型3ユニット。',
    navHeading: 'ナビゲーション', unitsHeading: 'ユニット', contactHeading: 'お問い合わせ',
    navLinks: ['ホーム', '私たちについて', 'ユニット', '体験', 'ギャラリー', 'お問い合わせ'],
    unitLinks: ['Las Rosas ユニット', 'El Jardín ユニット', 'Las Glicinas ユニット'],
    rights: 'All rights reserved.'
  };
  TRANSLATIONS.ja.whatsapp = { tooltip: 'チャットで相談', message: 'こんにちは。Entre Palmeras y Lavandas の空き状況を確認したいです' };

  var COUNTRY_TO_LANG = {
    AR: 'es', BO: 'es', CL: 'es', CO: 'es', CR: 'es', CU: 'es', DO: 'es', EC: 'es', ES: 'es', GT: 'es', HN: 'es', MX: 'es', NI: 'es', PA: 'es', PE: 'es', PR: 'es', PY: 'es', SV: 'es', UY: 'es', VE: 'es',
    BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt', GW: 'pt', ST: 'pt', TL: 'pt',
    IT: 'it', SM: 'it', VA: 'it',
    DE: 'de', AT: 'de', CH: 'de', LI: 'de',
    FR: 'fr', BE: 'fr', MC: 'fr', LU: 'fr',
    SE: 'sv',
    DK: 'da', GL: 'da', FO: 'da',
    RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
    CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh', SG: 'zh',
    JP: 'ja',
    US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en'
  };
  var LANG_TO_FLAG_COUNTRY = {
    es: 'ES',
    pt: 'BR',
    en: 'GB',
    fr: 'FR',
    it: 'IT',
    de: 'DE',
    sv: 'SE',
    da: 'DK',
    ru: 'RU',
    zh: 'CN',
    ja: 'JP'
  };
  var LANG_LABELS = {
    es: 'Español',
    pt: 'Português',
    en: 'English',
    fr: 'Français',
    it: 'Italiano',
    de: 'Deutsch',
    sv: 'Svenska',
    da: 'Dansk',
    ru: 'Русский',
    zh: '中文',
    ja: '日本語'
  };

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
    if (code === 'no' || code === 'nb' || code === 'nn') code = 'da';
    if (code === 'jp') code = 'ja';
    if (code === 'cn') code = 'zh';
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
    var base = merge(BASE_EN, TRANSLATIONS.es || {});
    if (code === 'en') return BASE_EN;
    if (code === 'es') return base;
    return merge(BASE_EN, TRANSLATIONS[code] || {});
  }

  function flagFromCountry(countryCode) {
    var code = normalizeCountry(countryCode);
    if (!code) return '🌍';
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
        el.textContent = fallback || '🌐';
      });
      el.appendChild(img);
    } else {
      el.textContent = fallback || '🌐';
    }
  }

  function themeLabel(theme, lang) {
    var code = normalizeLang(lang) || 'es';
    var isDark = theme === 'dark';
    var labels = {
      es: isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
      pt: isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro',
      en: isDark ? 'Switch to light mode' : 'Switch to dark mode',
      fr: isDark ? 'Passer en mode clair' : 'Passer en mode sombre',
      it: isDark ? 'Passa alla modalità chiara' : 'Passa alla modalità scura',
      de: isDark ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln',
      sv: isDark ? 'Byt till ljust läge' : 'Byt till mörkt läge',
      da: isDark ? 'Skift til lys tilstand' : 'Skift til mørk tilstand',
      ru: isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему',
      zh: isDark ? '切换到浅色模式' : '切换到深色模式',
      ja: isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'
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
      try {
        hour = new Date().getHours();
      } catch (e) {
        hour = 12;
      }
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
    } catch (e) {
      return null;
    }
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
    setStoredThemeState({
      manualTheme: nextTheme,
      autoThemeAtSet: autoTheme
    });
  }

  function setThemeColorMeta(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute('content', theme === 'dark' ? '#0f1712' : '#2d5016');
  }

  function updateThemeToggleUI(theme) {
    var iconEl = document.getElementById('themeToggleIcon');
    var buttonEl = document.getElementById('themeToggle');
    if (iconEl) iconEl.textContent = theme === 'dark' ? '☀️' : '🌙';
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
    if (state && state.manualTheme) {
      return;
    }
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
    var href = 'https://wa.me/59892077212?text=' + encodeURIComponent(message);
    document.querySelectorAll('a[href*="wa.me/59892077212"]').forEach(function(link) {
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
    setText('.nav-links .nav-link[href="#nosotros"]', pack.nav.about);
    setText('.nav-links .nav-link[href="#alojamientos"]', pack.nav.units);
    setText('.nav-links .nav-link[href="#experiencias"]', pack.nav.experiences);
    setText('.nav-links .nav-link[href="#galeria"]', pack.nav.gallery);
    setText('.nav-links .nav-link[href="#contacto"]', pack.nav.contact);
    setText('.nav-links .nav-cta', pack.nav.book);
    setAttr('#navHamburger', 'aria-label', pack.nav.menuAria || BASE_EN.nav.menuAria);
    setAttr('#languageSelect', 'aria-label', pack.nav.langAria || BASE_EN.nav.langAria);
    setAttr('#langTrigger', 'aria-label', pack.nav.langAria || BASE_EN.nav.langAria);
    setAttr('#languageMenu', 'aria-label', pack.nav.langAria || BASE_EN.nav.langAria);

    var mobileLinks = document.querySelectorAll('#navMobile a');
    if (mobileLinks.length >= 7) {
      setText(mobileLinks[0], pack.nav.home);
      setText(mobileLinks[1], pack.nav.about);
      setText(mobileLinks[2], pack.nav.units);
      setText(mobileLinks[3], pack.nav.experiences);
      setText(mobileLinks[4], pack.nav.gallery);
      setText(mobileLinks[5], pack.nav.contact);
      setText(mobileLinks[6], pack.nav.book);
    }

    setIconText('.hero-badge', pack.hero.badge);
    setHTML('.hero-title', pack.hero.title);
    setText('.hero-subtitle', pack.hero.subtitle);
    setIconText('.hero-buttons .btn-primary', pack.hero.primary);
    setText('.hero-buttons .btn-outline', pack.hero.secondary);
    setText('.hero-scroll span', pack.hero.scroll);

    setListText('.stat-label', [pack.stats.units, pack.stats.guests, pack.stats.rating, pack.stats.nature]);

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

    setIconText('#alojamientos .section-label', pack.units.label);
    setHTML('#alojamientos .section-title', pack.units.title);
    setText('#alojamientos .section-subtitle', pack.units.subtitle);
    var serviceNames = document.querySelectorAll('.service-name');
    var serviceDescs = document.querySelectorAll('.service-desc');
    var serviceCaps = document.querySelectorAll('.service-capacity');
    pack.units.cards.forEach(function(card, i) {
      if (serviceNames[i]) serviceNames[i].textContent = card.name;
      if (serviceDescs[i]) serviceDescs[i].textContent = card.desc;
      if (serviceCaps[i]) setIconText(serviceCaps[i], card.cap);
    });

    setIconText('#experiencias .section-label', pack.experiences.label);
    setHTML('#experiencias .section-title', pack.experiences.title);
    setText('#experiencias .section-subtitle', pack.experiences.subtitle);
    var experienceTitles = document.querySelectorAll('.experience-title');
    var experienceDescs = document.querySelectorAll('.experience-desc');
    pack.experiences.cards.forEach(function(card, i) {
      if (experienceTitles[i]) experienceTitles[i].textContent = card.title;
      if (experienceDescs[i]) experienceDescs[i].textContent = card.desc;
    });

    setIconText('#proceso .section-label', pack.process.label);
    setHTML('#proceso .section-title', pack.process.title);
    setText('#proceso .section-subtitle', pack.process.subtitle);
    var timelineTitles = document.querySelectorAll('.timeline-title');
    var timelineDescs = document.querySelectorAll('.timeline-desc');
    pack.process.steps.forEach(function(step, i) {
      if (timelineTitles[i]) timelineTitles[i].textContent = step.title;
      if (timelineDescs[i]) timelineDescs[i].textContent = step.desc;
    });
    setText('.contact-form-title', pack.form.title);
    setText('label[for="nombre"]', pack.form.name);
    setText('label[for="email"]', pack.form.email);
    setText('label[for="telefono"]', pack.form.phone);
    setText('label[for="checkin"]', pack.form.checkin);
    setText('label[for="noches"]', pack.form.nights);
    setText('label[for="alojamiento"]', pack.form.unit);
    setText('label[for="mensaje"]', pack.form.message);
    setAttr('#nombre', 'placeholder', pack.form.phName);
    setAttr('#email', 'placeholder', pack.form.phEmail);
    setAttr('#telefono', 'placeholder', pack.form.phPhone);
    setAttr('#mensaje', 'placeholder', pack.form.phMessage);
    setText('#errorNombre', pack.form.errName);
    setText('#errorEmail', pack.form.errEmail);
    setText('#errorTelefono', pack.form.errPhone);
    setText('#errorCheckin', pack.form.errCheckin);
    setText('#errorNoches', pack.form.errNights);
    setText('#noches option[value=""]', pack.form.nightsOptions[0]);
    setText('#noches option[value="1"]', pack.form.nightsOptions[1]);
    setText('#noches option[value="2"]', pack.form.nightsOptions[2]);
    setText('#noches option[value="3"]', pack.form.nightsOptions[3]);
    setText('#noches option[value="4"]', pack.form.nightsOptions[4]);
    setText('#noches option[value="5"]', pack.form.nightsOptions[5]);
    setText('#noches option[value="6"]', pack.form.nightsOptions[6]);
    setText('#noches option[value="7"]', pack.form.nightsOptions[7]);
    setText('#alojamiento option[value=""]', pack.form.unitOptions[0]);
    setText('#alojamiento option[value="unidad-rosas"]', pack.form.unitOptions[1]);
    setText('#alojamiento option[value="unidad-jardin"]', pack.form.unitOptions[2]);
    setText('#alojamiento option[value="unidad-glicinas"]', pack.form.unitOptions[3]);
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
    setText('.footer-bottom span', '© 2026 Entre Palmeras y Lavandas. ' + pack.footer.rights);

    setText('.whatsapp-tooltip', pack.whatsapp.tooltip);
    setWhatsAppMessage(pack.whatsapp.message);

    var select = document.getElementById('languageSelect');
    if (select) select.value = code;
    setFlagVisual('#langIcon', getLanguageFlagCountry(code, countryCode), pack.flag || '🌐');
    refreshLanguageMenuFlags(countryCode);
    syncLanguageMenuSelection(code);
    setFlagVisual('#preloaderFlag', countryCode, pack.flag || '🌐');
    setText('#preloaderCountry', countryCode ? (pack.preloaderReady || BASE_EN.preloaderReady).replace('{country}', countryName(countryCode, code)) : (pack.preloaderDetecting || BASE_EN.preloaderDetecting));
    updateThemeToggleUI(currentTheme || detectThemePreference());
  }

  function clearStoredLangPreference() {
    try { localStorage.removeItem(PREF_KEY); } catch (e) {}
  }

  function getCachedCountry() {
    try {
      var cached = JSON.parse(localStorage.getItem(GEO_KEY) || 'null');
      if (!cached || !cached.countryCode || !cached.timestamp) return '';
      if ((Date.now() - cached.timestamp) > GEO_TTL) return '';
      return normalizeCountry(cached.countryCode);
    } catch (e) {
      return '';
    }
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
      }).catch(function() {
        return next();
      });
    }

    if (cached) {
      return Promise.resolve(cached);
    }

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
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (e) {}
    if (tz.indexOf('America/Montevideo') === 0 || tz.indexOf('Europe/Madrid') === 0 || tz.indexOf('America/Argentina') === 0 || tz.indexOf('America/Santiago') === 0 || tz.indexOf('America/Lima') === 0 || tz.indexOf('America/Bogota') === 0 || tz.indexOf('America/Mexico_City') === 0) return 'es';
    if (tz.indexOf('America/Sao_Paulo') === 0 || tz.indexOf('Europe/Lisbon') === 0) return 'pt';
    if (tz.indexOf('Europe/Paris') === 0 || tz.indexOf('Europe/Brussels') === 0 || tz.indexOf('Europe/Monaco') === 0 || tz.indexOf('Europe/Luxembourg') === 0) return 'fr';
    if (tz.indexOf('Europe/Rome') === 0) return 'it';
    if (tz.indexOf('Europe/Berlin') === 0 || tz.indexOf('Europe/Vienna') === 0 || tz.indexOf('Europe/Zurich') === 0) return 'de';
    if (tz.indexOf('Europe/Stockholm') === 0) return 'sv';
    if (tz.indexOf('Europe/Copenhagen') === 0) return 'da';
    if (tz.indexOf('Europe/Moscow') === 0) return 'ru';
    if (tz.indexOf('Asia/Shanghai') === 0 || tz.indexOf('Asia/Hong_Kong') === 0 || tz.indexOf('Asia/Taipei') === 0 || tz.indexOf('Asia/Singapore') === 0) return 'zh';
    if (tz.indexOf('Asia/Tokyo') === 0) return 'ja';
    return 'en';
  }

  function detectCountryByTimezone() {
    var tz = '';
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (e) {}
    if (tz.indexOf('America/Montevideo') === 0) return 'UY';
    if (tz.indexOf('America/Sao_Paulo') === 0) return 'BR';
    if (tz.indexOf('America/Asuncion') === 0) return 'PY';
    if (tz.indexOf('Europe/Paris') === 0) return 'FR';
    if (tz.indexOf('Europe/Brussels') === 0) return 'BE';
    if (tz.indexOf('Europe/Rome') === 0) return 'IT';
    if (tz.indexOf('Europe/Madrid') === 0) return 'ES';
    if (tz.indexOf('Europe/Berlin') === 0) return 'DE';
    if (tz.indexOf('Europe/Stockholm') === 0) return 'SE';
    if (tz.indexOf('Europe/Copenhagen') === 0) return 'DK';
    if (tz.indexOf('Europe/Moscow') === 0) return 'RU';
    if (tz.indexOf('Asia/Shanghai') === 0 || tz.indexOf('Asia/Hong_Kong') === 0 || tz.indexOf('Asia/Taipei') === 0) return 'CN';
    if (tz.indexOf('Asia/Tokyo') === 0) return 'JP';
    if (tz.indexOf('America/New_York') === 0 || tz.indexOf('America/Chicago') === 0 || tz.indexOf('America/Denver') === 0 || tz.indexOf('America/Los_Angeles') === 0) return 'US';
    return '';
  }

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
      setFlagVisual(flagEl, getLanguageFlagCountry(langCode, countryCode), '🌐');
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
      setFlagVisual(flag, getLanguageFlagCountry(langCode, detectedCountryCode), '🌐');

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
    setFlagVisual('#preloaderFlag', detectedCountryCode, '🌍');
    syncAutoThemeByCountry(detectedCountryCode);
    setText('#preloaderCountry', (TRANSLATIONS.es && TRANSLATIONS.es.preloaderDetecting) || BASE_EN.preloaderDetecting);

    return detectCountryByIP().then(function(countryCode) {
      var resolvedCountryCode = normalizeCountry(countryCode) || detectCountryByTimezone() || detectedCountryCode || '';
      detectedCountryCode = resolvedCountryCode;
      syncAutoThemeByCountry(resolvedCountryCode);
      var ipLang = COUNTRY_TO_LANG[normalizeCountry(resolvedCountryCode)] || '';
      var fallbackLang = detectLanguageByBrowser();
      applyLanguage(ipLang || fallbackLang || 'en', { countryCode: resolvedCountryCode });
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
      var nextLang = normalizeLang(this.value) || 'en';
      applyLanguage(nextLang, { countryCode: detectedCountryCode });
      setLanguageMenuOpen(false);
    });
  }
})();

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
  // TRADUCCIONES - BIODANZA ALMA EN MOVIMIENTO
  // =====================================================

  var BASE_EN = {
    flag: '\u{1F1EC}\u{1F1E7}',
    metaTitle: 'Alma en Movimiento - Biodanza Academy in Mendoza, Argentina',
    metaDescription: 'Biodanza academy in Mendoza Capital, Argentina. Awaken your essence through dance, music and connection. Weekly classes, intensive workshops and biodanza for children with Florencia Serruya.',
    preloaderDetecting: 'Detecting country and language...',
    preloaderReady: 'Welcome, guest from {country}.',
    brandSub: 'Biodanza',
    nav: { home: 'Home', about: 'About', units: 'Modalities', experiences: 'Benefits', gallery: 'Gallery', contact: 'Contact', book: 'Contact', menuAria: 'Open navigation menu', langAria: 'Select language' },
    hero: {
      badge: 'Transformation through movement',
      title: 'Awaken your essence with <em>Biodanza</em>',
      subtitle: 'Biodanza academy in Mendoza Capital, Argentina. A space of authentic connection where music, movement and community invite you to live fully.',
      primary: 'Explore classes',
      secondary: 'What is Biodanza',
      scroll: 'Discover more'
    },
    stats: { units: 'Years of experience', guests: 'Transformed students', rating: 'Average rating', nature: 'Passion & connection' },
    about: {
      label: 'Our story',
      title: 'Where the <em>soul</em> finds itself.',
      p1: 'Alma en Movimiento was born from Florencia Serruya\'s deep love for Biodanza and its transformative power. As a certified facilitator with over 8 years of experience, Florencia has created a space where each person can reconnect with their most authentic essence through movement, music and human connection.',
      p2: 'In Mendoza Capital, our academy has become a refuge for those seeking more than a dance class: a path towards vitality, genuine expression and belonging to a community that celebrates life in all its forms.',
      features: [
        { title: 'Authentic connection', desc: 'We create safe spaces where you can be yourself, express yourself freely and connect from the heart with others and with your deepest essence.' },
        { title: 'Personal transformation', desc: 'Biodanza is a human development system that integrates music, movement and encounter to awaken your potential for life and expression.' },
        { title: 'Loving community', desc: 'You become part of a warm and welcoming group that celebrates each process, respects each timing and shares the joy of living fully.' }
      ]
    },
    units: {
      label: 'Our modalities',
      title: 'Ways to <em>experience</em>',
      subtitle: 'We offer different spaces to encounter Biodanza, adapted to your needs and life rhythms. Each modality is a gateway to your transformation.',
      cards: [
        {
          name: 'Weekly Classes',
          desc: 'Our regular meeting space where each week we experience Biodanza as a group. Through movement exercises, carefully selected music and the warmth of the group, we travel a progressive path of self-knowledge and transformation. Ideal for those seeking sustained commitment to their personal development.',
          cap: 'Duration: 2 hours weekly'
        },
        {
          name: 'Intensive Workshops',
          desc: 'Deep immersion experiences in specific Biodanza themes. These special half-day or full-day gatherings allow us to explore with greater depth aspects such as creativity, affectivity, vitality or identity. An opportunity to experience significant transformations in a short time.',
          cap: 'Frequency: Once a month'
        },
        {
          name: 'Biodanza for Children',
          desc: 'A space specially designed for children to explore movement, creativity and connection with others in a playful and affectionate way. Through play and music, we accompany their emotional development, spontaneous expression and ability to bond with joy and respect. Children discover their own vitality in a safe and loving environment.',
          cap: 'Ages: 5 to 12 years'
        }
      ]
    },
    experiences: {
      label: 'Benefits of Biodanza',
      title: 'What you will <em>experience</em>',
      subtitle: 'Biodanza invites you to discover deep aspects of yourself and develop your human potential in all its dimensions.',
      cards: [
        { title: 'Deep connection', desc: 'Learn to connect authentically with yourself and with others. Biodanza creates safe spaces where you can be who you really are, without masks or judgments, strengthening genuine and meaningful bonds.' },
        { title: 'Vitality and well-being', desc: 'Awaken your vital energy through conscious movement. Improve your physical and emotional health, reduce stress and recover the pleasure of inhabiting your body with joy and fullness.' },
        { title: 'Community and belonging', desc: 'Become part of a warm and welcoming group where each person is valued. Share a growth path with others who, like you, seek to live with more authenticity, joy and love.' },
        { title: 'Creative expression', desc: 'Free your creativity and personal expression through spontaneous movement. Discover new ways to communicate, feel and manifest your uniqueness in the world.' }
      ]
    },
    process: {
      label: 'Your path',
      title: 'How to <em>begin</em>',
      subtitle: 'In four simple steps you begin your transformation journey with Biodanza in Mendoza.',
      steps: [
        { title: 'Learn about Biodanza', desc: 'Contact us via WhatsApp, Instagram or email. We tell you all about Biodanza, our modalities and answer all your questions.' },
        { title: 'Try a free class', desc: 'Your first class is free. Come experience Biodanza, meet the group and feel the energy of the encounter. No commitment.' },
        { title: 'Enroll and begin', desc: 'If you feel it\'s for you, choose the modality that best suits your rhythm and complete your enrollment. We accompany you at every step.' },
        { title: 'Experience and transform', desc: 'Begin your process of self-knowledge and transformation. Each class is an opportunity to connect with your essence and celebrate life.' }
      ]
    },
    form: {
      title: 'Contact us',
      name: 'Full name', email: 'Email', phone: 'Phone / WhatsApp', checkin: 'Modality of interest', nights: 'Modality of interest', unit: 'Modality of interest', message: 'Message (optional)',
      phName: 'Your name', phEmail: 'you@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Tell us about your interest in Biodanza, questions or comments...',
      errName: 'Please enter your name', errEmail: 'Please enter a valid email', errPhone: 'Please enter a valid phone', errCheckin: 'Please select a modality', errNights: 'Please select a modality',
      nightsOptions: ['Select...', 'Weekly Classes', 'Intensive Workshops', 'Biodanza for Children', 'General inquiry'],
      unitOptions: ['Select...', 'Weekly Classes', 'Intensive Workshops', 'Biodanza for Children', 'General inquiry'],
      submit: 'Send inquiry', sending: 'Sending...', successTitle: 'Inquiry sent', successText: 'Thank you for your interest in Biodanza. We will reply shortly by email or WhatsApp.',
      infoTitle: 'Contact information', infoLabels: ['Location', 'WhatsApp', 'Email', 'Instagram']
    },
    footer: {
      desc: 'Biodanza academy in Mendoza Capital, Argentina. A space of authentic connection where music, movement and community invite you to live fully.',
      navHeading: 'Navigation', unitsHeading: 'Modalities', contactHeading: 'Contact',
      navLinks: ['Home', 'About', 'Modalities', 'Benefits', 'Gallery', 'Contact'],
      unitLinks: ['Weekly Classes', 'Intensive Workshops', 'Biodanza for Children'],
      rights: 'All rights reserved.'
    },
    whatsapp: { tooltip: 'Contact us on WhatsApp', message: 'Hi! I would like to learn more about Biodanza at Alma en Movimiento' }
  };

  var TRANSLATIONS = {
    es: {
      flag: '\u{1F1E6}\u{1F1F7}',
      metaTitle: 'Alma en Movimiento - Academia de Biodanza en Mendoza, Argentina',
      metaDescription: 'Academia de Biodanza en Mendoza Capital, Argentina. Despert\u00e1 tu esencia a trav\u00e9s de la danza, la m\u00fasica y la conexi\u00f3n. Clases semanales, talleres y biodanza para ni\u00f1os con Florencia Serruya.',
      preloaderDetecting: 'Detectando pa\u00eds e idioma...',
      preloaderReady: 'Bienvenido, visitante de {country}.',
      brandSub: 'Biodanza',
      nav: { home: 'Inicio', about: 'Nosotros', units: 'Modalidades', experiences: 'Beneficios', gallery: 'Galer\u00eda', contact: 'Contacto', book: 'Contacto', menuAria: 'Abrir men\u00fa de navegaci\u00f3n', langAria: 'Seleccionar idioma' },
      hero: {
        badge: 'Transformaci\u00f3n a trav\u00e9s del movimiento',
        title: 'Despert\u00e1 tu esencia con <em>Biodanza</em>',
        subtitle: 'Academia de Biodanza en Mendoza Capital, Argentina. Un espacio de conexi\u00f3n aut\u00e9ntica donde la m\u00fasica, el movimiento y la comunidad te invitan a vivir plenamente.',
        primary: 'Conocer las clases',
        secondary: 'Qu\u00e9 es Biodanza',
        scroll: 'Descubr\u00ed m\u00e1s'
      },
      stats: { units: 'A\u00f1os de experiencia', guests: 'Alumnos transformados', rating: 'Valoraci\u00f3n promedio', nature: 'Pasi\u00f3n y conexi\u00f3n' }
    },
    pt: {
      flag: '\u{1F1E7}\u{1F1F7}',
      metaTitle: 'Alma en Movimiento - Academia de Biodan\u00e7a em Mendoza, Argentina',
      metaDescription: 'Academia de Biodan\u00e7a em Mendoza Capital, Argentina. Desperte sua ess\u00eancia atrav\u00e9s da dan\u00e7a, m\u00fasica e conex\u00e3o. Aulas semanais, workshops e biodan\u00e7a para crian\u00e7as com Florencia Serruya.',
      preloaderDetecting: 'Detectando pa\u00eds e idioma...',
      preloaderReady: 'Bem-vindo, visitante de {country}.',
      brandSub: 'Biodan\u00e7a',
      nav: { home: 'In\u00edcio', about: 'Sobre', units: 'Modalidades', experiences: 'Benef\u00edcios', gallery: 'Galeria', contact: 'Contato', book: 'Contato', menuAria: 'Abrir menu de navega\u00e7\u00e3o', langAria: 'Selecionar idioma' },
      hero: {
        badge: 'Transforma\u00e7\u00e3o atrav\u00e9s do movimento',
        title: 'Desperte sua ess\u00eancia com <em>Biodan\u00e7a</em>',
        subtitle: 'Academia de Biodan\u00e7a em Mendoza Capital, Argentina. Um espa\u00e7o de conex\u00e3o aut\u00eantica onde a m\u00fasica, o movimento e a comunidade convidam voc\u00ea a viver plenamente.',
        primary: 'Conhecer as aulas',
        secondary: 'O que \u00e9 Biodan\u00e7a',
        scroll: 'Descubra mais'
      },
      stats: { units: 'Anos de experi\u00eancia', guests: 'Alunos transformados', rating: 'Avalia\u00e7\u00e3o m\u00e9dia', nature: 'Paix\u00e3o e conex\u00e3o' }
    }
  };

  // === TRADUCCIONES EXTENDIDAS - ESPAÑOL ===
  TRANSLATIONS.es.about = {
    label: 'Nuestra historia',
    title: 'Donde el <em>alma</em> se encuentra.',
    p1: 'Alma en Movimiento naci\u00f3 del profundo amor de Florencia Serruya por la Biodanza y su poder transformador. Como facilitadora certificada con m\u00e1s de 8 a\u00f1os de experiencia, Florencia ha creado un espacio donde cada persona puede reconectarse con su esencia m\u00e1s aut\u00e9ntica a trav\u00e9s del movimiento, la m\u00fasica y la conexi\u00f3n humana.',
    p2: 'En Mendoza Capital, nuestra academia se ha convertido en un refugio para quienes buscan m\u00e1s que una clase de danza: un camino hacia la vitalidad, la expresi\u00f3n genuina y la pertenencia a una comunidad que celebra la vida en todas sus formas.',
    features: [
      { title: 'Conexi\u00f3n aut\u00e9ntica', desc: 'Creamos espacios seguros donde pod\u00e9s ser vos mismo, expresarte libremente y conectar desde el coraz\u00f3n con otros y con tu esencia m\u00e1s profunda.' },
      { title: 'Transformaci\u00f3n personal', desc: 'La Biodanza es un sistema de desarrollo humano que integra m\u00fasica, movimiento y encuentro para despertar tu potencial de vida y expresi\u00f3n.' },
      { title: 'Comunidad amorosa', desc: 'Form\u00e1s parte de un grupo c\u00e1lido y acogedor que celebra cada proceso, respeta cada tiempo y comparte la alegr\u00eda de vivir en plenitud.' }
    ]
  };
  TRANSLATIONS.es.units = {
    label: 'Nuestras modalidades',
    title: 'Formas de <em>vivenciar</em>',
    subtitle: 'Ofrecemos diferentes espacios de encuentro con la Biodanza, adaptados a tus necesidades y ritmos de vida. Cada modalidad es una puerta de entrada a tu transformaci\u00f3n.',
    cards: [
      { name: 'Clases Semanales', desc: 'Nuestro espacio regular de encuentro donde cada semana vivenciamos la Biodanza en grupo. A trav\u00e9s de ejercicios de movimiento, m\u00fasica cuidadosamente seleccionada y la calidez del grupo, transitamos un camino progresivo de autoconocimiento y transformaci\u00f3n. Ideal para quienes buscan un compromiso sostenido con su desarrollo personal.', cap: 'Duraci\u00f3n: 2 horas semanales' },
      { name: 'Talleres Intensivos', desc: 'Experiencias profundas de inmersi\u00f3n en tem\u00e1ticas espec\u00edficas de Biodanza. Estos encuentros especiales de medio d\u00eda o d\u00eda completo nos permiten explorar con mayor profundidad aspectos como la creatividad, la afectividad, la vitalidad o la identidad. Una oportunidad para vivir transformaciones significativas en poco tiempo.', cap: 'Frecuencia: Una vez al mes' },
      { name: 'Biodanza para Ni\u00f1os', desc: 'Un espacio especialmente dise\u00f1ado para que ni\u00f1os y ni\u00f1as exploren el movimiento, la creatividad y la conexi\u00f3n con otros de forma l\u00fadica y afectuosa. A trav\u00e9s del juego y la m\u00fasica, acompa\u00f1amos su desarrollo emocional, su expresi\u00f3n espont\u00e1nea y su capacidad de vincularse con alegr\u00eda y respeto. Los ni\u00f1os descubren su propia vitalidad en un ambiente seguro y amoroso.', cap: 'Edades: 5 a 12 a\u00f1os' }
    ]
  };
  TRANSLATIONS.es.experiences = {
    label: 'Beneficios de Biodanza',
    title: 'Lo que <em>vas a vivir</em>',
    subtitle: 'La Biodanza te invita a descubrir aspectos profundos de vos mismo y a desarrollar tu potencial humano en todas sus dimensiones.',
    cards: [
      { title: 'Conexi\u00f3n profunda', desc: 'Aprend\u00e9 a conectarte aut\u00e9nticamente con vos mismo y con los dem\u00e1s. La Biodanza crea espacios seguros donde pod\u00e9s ser quien realmente sos, sin m\u00e1scaras ni juicios, fortaleciendo v\u00ednculos genuinos y significativos.' },
      { title: 'Vitalidad y bienestar', desc: 'Despert\u00e1 tu energ\u00eda vital a trav\u00e9s del movimiento consciente. Mejor\u00e1 tu salud f\u00edsica y emocional, reduc\u00ed el estr\u00e9s y recuper\u00e1 el placer de habitar tu cuerpo con alegr\u00eda y plenitud.' },
      { title: 'Comunidad y pertenencia', desc: 'Form\u00e1 parte de un grupo c\u00e1lido y acogedor donde cada persona es valorada. Compart\u00ed un camino de crecimiento con otros que, como vos, buscan vivir con m\u00e1s autenticidad, alegr\u00eda y amor.' },
      { title: 'Expresi\u00f3n creativa', desc: 'Liber\u00e1 tu creatividad y expresi\u00f3n personal a trav\u00e9s del movimiento espont\u00e1neo. Descubr\u00ed nuevas formas de comunicarte, de sentir y de manifestar tu singularidad en el mundo.' }
    ]
  };
  TRANSLATIONS.es.process = {
    label: 'Tu camino',
    title: 'C\u00f3mo <em>comenzar</em>',
    subtitle: 'En cuatro simples pasos comenz\u00e1s tu viaje de transformaci\u00f3n con Biodanza en Mendoza.',
    steps: [
      { title: 'Conoc\u00e9 la Biodanza', desc: 'Contactanos por WhatsApp, Instagram o email. Te contamos todo sobre la Biodanza, nuestras modalidades y respondemos todas tus dudas.' },
      { title: 'Prob\u00e1 una clase gratuita', desc: 'Tu primera clase es sin cargo. Ven\u00ed a vivenciar la Biodanza, conoc\u00e9 al grupo y sent\u00ed la energ\u00eda del encuentro. Sin compromiso.' },
      { title: 'Inscribite y comenz\u00e1', desc: 'Si sent\u00eds que es para vos, eleg\u00ed la modalidad que mejor se adapte a tu ritmo y hac\u00e9 tu inscripci\u00f3n. Te acompa\u00f1amos en cada paso.' },
      { title: 'Vivenci\u00e1 y transformate', desc: 'Empez\u00e1 tu proceso de autoconocimiento y transformaci\u00f3n. Cada clase es una oportunidad para conectar con tu esencia y celebrar la vida.' }
    ]
  };
  TRANSLATIONS.es.form = {
    title: 'Contactate con nosotros',
    name: 'Nombre completo', email: 'Email', phone: 'Tel\u00e9fono / WhatsApp', checkin: 'Modalidad de inter\u00e9s', nights: 'Modalidad de inter\u00e9s', unit: 'Modalidad de inter\u00e9s', message: 'Mensaje (opcional)',
    phName: 'Tu nombre', phEmail: 'tu@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Contanos sobre tu inter\u00e9s en Biodanza, dudas o comentarios...',
    errName: 'Ingres\u00e1 tu nombre', errEmail: 'Ingres\u00e1 un email v\u00e1lido', errPhone: 'Ingres\u00e1 un tel\u00e9fono v\u00e1lido', errCheckin: 'Seleccion\u00e1 una modalidad', errNights: 'Seleccion\u00e1 una modalidad',
    nightsOptions: ['Seleccionar...', 'Clases Semanales', 'Talleres Intensivos', 'Biodanza para Ni\u00f1os', 'Consulta General'],
    unitOptions: ['Seleccionar...', 'Clases Semanales', 'Talleres Intensivos', 'Biodanza para Ni\u00f1os', 'Consulta General'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Gracias por tu inter\u00e9s en Biodanza. Te responderemos a la brevedad por email o WhatsApp.',
    infoTitle: 'Informaci\u00f3n de contacto', infoLabels: ['Ubicaci\u00f3n', 'WhatsApp', 'Email', 'Instagram']
  };
  TRANSLATIONS.es.footer = {
    desc: 'Academia de Biodanza en Mendoza Capital, Argentina. Un espacio de conexi\u00f3n aut\u00e9ntica donde la m\u00fasica, el movimiento y la comunidad te invitan a vivir plenamente.',
    navHeading: 'Navegaci\u00f3n', unitsHeading: 'Modalidades', contactHeading: 'Contacto',
    navLinks: ['Inicio', 'Nosotros', 'Modalidades', 'Beneficios', 'Galer\u00eda', 'Contacto'],
    unitLinks: ['Clases Semanales', 'Talleres Intensivos', 'Biodanza para Ni\u00f1os'],
    rights: 'Todos los derechos reservados.'
  };
  TRANSLATIONS.es.whatsapp = { tooltip: 'Contactanos por WhatsApp', message: 'Hola! Quiero conocer m\u00e1s sobre Biodanza en Alma en Movimiento' };

  // === TRADUCCIONES EXTENDIDAS - PORTUGUÉS ===
  TRANSLATIONS.pt.about = {
    label: 'Nossa hist\u00f3ria',
    title: 'Onde a <em>alma</em> se encontra.',
    p1: 'Alma en Movimiento nasceu do profundo amor de Florencia Serruya pela Biodan\u00e7a e seu poder transformador. Como facilitadora certificada com mais de 8 anos de experi\u00eancia, Florencia criou um espa\u00e7o onde cada pessoa pode se reconectar com sua ess\u00eancia mais aut\u00eantica atrav\u00e9s do movimento, m\u00fasica e conex\u00e3o humana.',
    p2: 'Em Mendoza Capital, nossa academia se tornou um ref\u00fagio para aqueles que buscam mais do que uma aula de dan\u00e7a: um caminho para a vitalidade, express\u00e3o genu\u00edna e pertencimento a uma comunidade que celebra a vida em todas as suas formas.',
    features: [
      { title: 'Conex\u00e3o aut\u00eantica', desc: 'Criamos espa\u00e7os seguros onde voc\u00ea pode ser voc\u00ea mesmo, se expressar livremente e conectar do cora\u00e7\u00e3o com outros e com sua ess\u00eancia mais profunda.' },
      { title: 'Transforma\u00e7\u00e3o pessoal', desc: 'A Biodan\u00e7a \u00e9 um sistema de desenvolvimento humano que integra m\u00fasica, movimento e encontro para despertar seu potencial de vida e express\u00e3o.' },
      { title: 'Comunidade amorosa', desc: 'Voc\u00ea faz parte de um grupo caloroso e acolhedor que celebra cada processo, respeita cada tempo e compartilha a alegria de viver plenamente.' }
    ]
  };
  TRANSLATIONS.pt.units = {
    label: 'Nossas modalidades',
    title: 'Formas de <em>vivenciar</em>',
    subtitle: 'Oferecemos diferentes espa\u00e7os de encontro com a Biodan\u00e7a, adaptados \u00e0s suas necessidades e ritmos de vida. Cada modalidade \u00e9 uma porta de entrada para sua transforma\u00e7\u00e3o.',
    cards: [
      { name: 'Aulas Semanais', desc: 'Nosso espa\u00e7o regular de encontro onde cada semana vivenciamos a Biodan\u00e7a em grupo. Atrav\u00e9s de exerc\u00edcios de movimento, m\u00fasica cuidadosamente selecionada e o calor do grupo, percorremos um caminho progressivo de autoconhecimento e transforma\u00e7\u00e3o. Ideal para quem busca um compromisso sustentado com seu desenvolvimento pessoal.', cap: 'Dura\u00e7\u00e3o: 2 horas semanais' },
      { name: 'Workshops Intensivos', desc: 'Experi\u00eancias profundas de imers\u00e3o em temas espec\u00edficos de Biodan\u00e7a. Estes encontros especiais de meio dia ou dia completo nos permitem explorar com maior profundidade aspectos como criatividade, afetividade, vitalidade ou identidade. Uma oportunidade para viver transforma\u00e7\u00f5es significativas em pouco tempo.', cap: 'Frequ\u00eancia: Uma vez por m\u00eas' },
      { name: 'Biodan\u00e7a para Crian\u00e7as', desc: 'Um espa\u00e7o especialmente projetado para que meninos e meninas explorem o movimento, criatividade e conex\u00e3o com outros de forma l\u00fadica e afetuosa. Atrav\u00e9s do jogo e m\u00fasica, acompanhamos seu desenvolvimento emocional, express\u00e3o espont\u00e2nea e capacidade de se vincular com alegria e respeito. As crian\u00e7as descobrem sua pr\u00f3pria vitalidade em um ambiente seguro e amoroso.', cap: 'Idades: 5 a 12 anos' }
    ]
  };
  TRANSLATIONS.pt.experiences = {
    label: 'Benef\u00edcios da Biodan\u00e7a',
    title: 'O que voc\u00ea <em>vai viver</em>',
    subtitle: 'A Biodan\u00e7a convida voc\u00ea a descobrir aspectos profundos de si mesmo e desenvolver seu potencial humano em todas as suas dimens\u00f5es.',
    cards: [
      { title: 'Conex\u00e3o profunda', desc: 'Aprenda a se conectar autenticamente consigo mesmo e com os outros. A Biodan\u00e7a cria espa\u00e7os seguros onde voc\u00ea pode ser quem realmente \u00e9, sem m\u00e1scaras ou julgamentos, fortalecendo v\u00ednculos genu\u00ednos e significativos.' },
      { title: 'Vitalidade e bem-estar', desc: 'Desperte sua energia vital atrav\u00e9s do movimento consciente. Melhore sua sa\u00fade f\u00edsica e emocional, reduza o estresse e recupere o prazer de habitar seu corpo com alegria e plenitude.' },
      { title: 'Comunidade e pertencimento', desc: 'Fa\u00e7a parte de um grupo caloroso e acolhedor onde cada pessoa \u00e9 valorizada. Compartilhe um caminho de crescimento com outros que, como voc\u00ea, buscam viver com mais autenticidade, alegria e amor.' },
      { title: 'Express\u00e3o criativa', desc: 'Libere sua criatividade e express\u00e3o pessoal atrav\u00e9s do movimento espont\u00e2neo. Descubra novas formas de se comunicar, sentir e manifestar sua singularidade no mundo.' }
    ]
  };
  TRANSLATIONS.pt.process = {
    label: 'Seu caminho',
    title: 'Como <em>come\u00e7ar</em>',
    subtitle: 'Em quatro passos simples voc\u00ea come\u00e7a sua jornada de transforma\u00e7\u00e3o com Biodan\u00e7a em Mendoza.',
    steps: [
      { title: 'Conhe\u00e7a a Biodan\u00e7a', desc: 'Entre em contato por WhatsApp, Instagram ou email. Contamos tudo sobre a Biodan\u00e7a, nossas modalidades e respondemos todas as suas d\u00favidas.' },
      { title: 'Experimente uma aula gratuita', desc: 'Sua primeira aula \u00e9 sem custo. Venha vivenciar a Biodan\u00e7a, conhe\u00e7a o grupo e sinta a energia do encontro. Sem compromisso.' },
      { title: 'Inscreva-se e comece', desc: 'Se sentir que \u00e9 para voc\u00ea, escolha a modalidade que melhor se adapta ao seu ritmo e fa\u00e7a sua inscri\u00e7\u00e3o. Acompanhamos voc\u00ea em cada passo.' },
      { title: 'Vivencie e transforme-se', desc: 'Comece seu processo de autoconhecimento e transforma\u00e7\u00e3o. Cada aula \u00e9 uma oportunidade para conectar com sua ess\u00eancia e celebrar a vida.' }
    ]
  };
  TRANSLATIONS.pt.form = {
    title: 'Entre em contato conosco',
    name: 'Nome completo', email: 'Email', phone: 'Telefone / WhatsApp', checkin: 'Modalidade de interesse', nights: 'Modalidade de interesse', unit: 'Modalidade de interesse', message: 'Mensagem (opcional)',
    phName: 'Seu nome', phEmail: 'seu@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Conte-nos sobre seu interesse na Biodan\u00e7a, d\u00favidas ou coment\u00e1rios...',
    errName: 'Informe seu nome', errEmail: 'Informe um email v\u00e1lido', errPhone: 'Informe um telefone v\u00e1lido', errCheckin: 'Selecione uma modalidade', errNights: 'Selecione uma modalidade',
    nightsOptions: ['Selecionar...', 'Aulas Semanais', 'Workshops Intensivos', 'Biodan\u00e7a para Crian\u00e7as', 'Consulta Geral'],
    unitOptions: ['Selecionar...', 'Aulas Semanais', 'Workshops Intensivos', 'Biodan\u00e7a para Crian\u00e7as', 'Consulta Geral'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Obrigado pelo seu interesse na Biodan\u00e7a. Responderemos em breve por email ou WhatsApp.',
    infoTitle: 'Informa\u00e7\u00f5es de contato', infoLabels: ['Localiza\u00e7\u00e3o', 'WhatsApp', 'Email', 'Instagram']
  };
  TRANSLATIONS.pt.footer = {
    desc: 'Academia de Biodan\u00e7a em Mendoza Capital, Argentina. Um espa\u00e7o de conex\u00e3o aut\u00eantica onde a m\u00fasica, o movimento e a comunidade convidam voc\u00ea a viver plenamente.',
    navHeading: 'Navega\u00e7\u00e3o', unitsHeading: 'Modalidades', contactHeading: 'Contato',
    navLinks: ['In\u00edcio', 'Sobre', 'Modalidades', 'Benef\u00edcios', 'Galeria', 'Contato'],
    unitLinks: ['Aulas Semanais', 'Workshops Intensivos', 'Biodan\u00e7a para Crian\u00e7as'],
    rights: 'Todos os direitos reservados.'
  };
  TRANSLATIONS.pt.whatsapp = { tooltip: 'Entre em contato pelo WhatsApp', message: 'Ol\u00e1! Quero saber mais sobre Biodan\u00e7a no Alma en Movimiento' };

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

    var nochesSelect = document.getElementById('noches');
    if (nochesSelect) {
      var nochesOpts = nochesSelect.querySelectorAll('option');
      pack.form.nightsOptions.forEach(function(text, i) {
        if (nochesOpts[i]) nochesOpts[i].textContent = text;
      });
    }

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
    setText('.footer-bottom span', '\u00A9 2026 Alma en Movimiento. ' + pack.footer.rights);

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

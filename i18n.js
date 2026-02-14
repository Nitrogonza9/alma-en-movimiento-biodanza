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
      infoTitle: 'Contact information', infoLabels: ['Location', 'WhatsApp', 'Email', 'Schedule']
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
      flag: '🇦🇷',
      metaTitle: 'Alma en Movimiento - Academia de Biodanza en Mendoza, Argentina',
      metaDescription: 'Academia de Biodanza en Mendoza Capital, Argentina. Despertá tu esencia a través de la danza, la música y la conexión. Clases semanales, talleres y biodanza para niños con Florencia Serruya.',
      preloaderDetecting: 'Detectando país e idioma...',
      preloaderReady: 'Bienvenido, visitante de {country}.',
      brandSub: 'Biodanza',
      nav: { home: 'Inicio', about: 'Nosotros', units: 'Modalidades', experiences: 'Beneficios', gallery: 'Galería', contact: 'Contacto', book: 'Contacto', menuAria: 'Abrir menú de navegación', langAria: 'Seleccionar idioma' },
      hero: {
        badge: 'Transformación a través del movimiento',
        title: 'Despertá tu esencia con <em>Biodanza</em>',
        subtitle: 'Academia de Biodanza en Mendoza Capital, Argentina. Un espacio de conexión auténtica donde la música, el movimiento y la comunidad te invitan a vivir plenamente.',
        primary: 'Conocer las clases',
        secondary: 'Qué es Biodanza',
        scroll: 'Descubrí más'
      },
      stats: { units: 'Años de experiencia', guests: 'Alumnos transformados', rating: 'Valoración promedio', nature: 'Pasión y conexión' }
    },
    pt: {
      flag: '🇧🇷',
      metaTitle: 'Alma en Movimiento - Academia de Biodança em Mendoza, Argentina',
      metaDescription: 'Academia de Biodança em Mendoza Capital, Argentina. Desperte sua essência através da dança, música e conexão. Aulas semanais, workshops e biodança para crianças com Florencia Serruya.',
      preloaderDetecting: 'Detectando país e idioma...',
      preloaderReady: 'Bem-vindo, visitante de {country}.',
      brandSub: 'Biodança',
      nav: { home: 'Início', about: 'Sobre', units: 'Modalidades', experiences: 'Benefícios', gallery: 'Galeria', contact: 'Contato', book: 'Contato', menuAria: 'Abrir menu de navegação', langAria: 'Selecionar idioma' },
      hero: {
        badge: 'Transformação através do movimento',
        title: 'Desperte sua essência com <em>Biodança</em>',
        subtitle: 'Academia de Biodança em Mendoza Capital, Argentina. Um espaço de conexão autêntica onde a música, o movimento e a comunidade convidam você a viver plenamente.',
        primary: 'Conhecer as aulas',
        secondary: 'O que é Biodança',
        scroll: 'Descubra mais'
      },
      stats: { units: 'Anos de experiência', guests: 'Alunos transformados', rating: 'Avaliação média', nature: 'Paixão e conexão' }
    }
  };

  TRANSLATIONS.es.about = {
    label: 'Nuestra historia',
    title: 'Donde el <em>alma</em> se encuentra.',
    p1: 'Alma en Movimiento nació del profundo amor de Florencia Serruya por la Biodanza y su poder transformador. Como facilitadora certificada con más de 8 años de experiencia, Florencia ha creado un espacio donde cada persona puede reconectarse con su esencia más auténtica a través del movimiento, la música y la conexión humana.',
    p2: 'En Mendoza Capital, nuestra academia se ha convertido en un refugio para quienes buscan más que una clase de danza: un camino hacia la vitalidad, la expresión genuina y la pertenencia a una comunidad que celebra la vida en todas sus formas.',
    features: [
      { title: 'Conexión auténtica', desc: 'Creamos espacios seguros donde podés ser vos mismo, expresarte libremente y conectar desde el corazón con otros y con tu esencia más profunda.' },
      { title: 'Transformación personal', desc: 'La Biodanza es un sistema de desarrollo humano que integra música, movimiento y encuentro para despertar tu potencial de vida y expresión.' },
      { title: 'Comunidad amorosa', desc: 'Formás parte de un grupo cálido y acogedor que celebra cada proceso, respeta cada tiempo y comparte la alegría de vivir en plenitud.' }
    ]
  };
  TRANSLATIONS.es.units = {
    label: 'Nuestras modalidades',
    title: 'Formas de <em>vivenciar</em>',
    subtitle: 'Ofrecemos diferentes espacios de encuentro con la Biodanza, adaptados a tus necesidades y ritmos de vida. Cada modalidad es una puerta de entrada a tu transformación.',
    cards: [
      { name: 'Clases Semanales', desc: 'Nuestro espacio regular de encuentro donde cada semana vivenciamos la Biodanza en grupo. A través de ejercicios de movimiento, música cuidadosamente seleccionada y la calidez del grupo, transitamos un camino progresivo de autoconocimiento y transformación. Ideal para quienes buscan un compromiso sostenido con su desarrollo personal.', cap: 'Duración: 2 horas semanales' },
      { name: 'Talleres Intensivos', desc: 'Experiencias profundas de inmersión en temáticas específicas de Biodanza. Estos encuentros especiales de medio día o día completo nos permiten explorar con mayor profundidad aspectos como la creatividad, la afectividad, la vitalidad o la identidad. Una oportunidad para vivir transformaciones significativas en poco tiempo.', cap: 'Frecuencia: Una vez al mes' },
      { name: 'Biodanza para Niños', desc: 'Un espacio especialmente diseñado para que niños y niñas exploren el movimiento, la creatividad y la conexión con otros de forma lúdica y afectuosa. A través del juego y la música, acompañamos su desarrollo emocional, su expresión espontánea y su capacidad de vincularse con alegría y respeto. Los niños descubren su propia vitalidad en un ambiente seguro y amoroso.', cap: 'Edades: 5 a 12 años' }
    ]
  };
  TRANSLATIONS.es.experiences = {
    label: 'Beneficios de Biodanza',
    title: 'Lo que <em>vas a vivir</em>',
    subtitle: 'La Biodanza te invita a descubrir aspectos profundos de vos mismo y a desarrollar tu potencial humano en todas sus dimensiones.',
    cards: [
      { title: 'Conexión profunda', desc: 'Aprendé a conectarte auténticamente con vos mismo y con los demás. La Biodanza crea espacios seguros donde podés ser quien realmente sos, sin máscaras ni juicios, fortaleciendo vínculos genuinos y significativos.' },
      { title: 'Vitalidad y bienestar', desc: 'Despertá tu energía vital a través del movimiento consciente. Mejorá tu salud física y emocional, reducí el estrés y recuperá el placer de habitar tu cuerpo con alegría y plenitud.' },
      { title: 'Comunidad y pertenencia', desc: 'Formá parte de un grupo cálido y acogedor donde cada persona es valorada. Compartí un camino de crecimiento con otros que, como vos, buscan vivir con más autenticidad, alegría y amor.' },
      { title: 'Expresión creativa', desc: 'Liberá tu creatividad y expresión personal a través del movimiento espontáneo. Descubrí nuevas formas de comunicarte, de sentir y de manifestar tu singularidad en el mundo.' }
    ]
  };
  TRANSLATIONS.es.process = {
    label: 'Tu camino',
    title: 'Cómo <em>comenzar</em>',
    subtitle: 'En cuatro simples pasos comenzás tu viaje de transformación con Biodanza en Mendoza.',
    steps: [
      { title: 'Conocé la Biodanza', desc: 'Contactanos por WhatsApp, Instagram o email. Te contamos todo sobre la Biodanza, nuestras modalidades y respondemos todas tus dudas.' },
      { title: 'Probá una clase gratuita', desc: 'Tu primera clase es sin cargo. Vení a vivenciar la Biodanza, conocé al grupo y sentí la energía del encuentro. Sin compromiso.' },
      { title: 'Inscribite y comenzá', desc: 'Si sentís que es para vos, elegí la modalidad que mejor se adapte a tu ritmo y hacé tu inscripción. Te acompañamos en cada paso.' },
      { title: 'Vivenciá y transformate', desc: 'Empezá tu proceso de autoconocimiento y transformación. Cada clase es una oportunidad para conectar con tu esencia y celebrar la vida.' }
    ]
  };
  TRANSLATIONS.es.form = {
    title: 'Contactate con nosotros',
    name: 'Nombre completo', email: 'Email', phone: 'Teléfono / WhatsApp', checkin: 'Modalidad de interés', nights: 'Modalidad de interés', unit: 'Modalidad de interés', message: 'Mensaje (opcional)',
    phName: 'Tu nombre', phEmail: 'tu@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Contanos sobre tu interés en Biodanza, dudas o comentarios...',
    errName: 'Ingresá tu nombre', errEmail: 'Ingresá un email válido', errPhone: 'Ingresá un teléfono válido', errCheckin: 'Seleccioná una modalidad', errNights: 'Seleccioná una modalidad',
    nightsOptions: ['Seleccionar...', 'Clases Semanales', 'Talleres Intensivos', 'Biodanza para Niños', 'Consulta General'],
    unitOptions: ['Seleccionar...', 'Clases Semanales', 'Talleres Intensivos', 'Biodanza para Niños', 'Consulta General'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Gracias por tu interés en Biodanza. Te responderemos a la brevedad por email o WhatsApp.',
    infoTitle: 'Información de contacto', infoLabels: ['Ubicación', 'WhatsApp', 'Email', 'Instagram']
  };
  TRANSLATIONS.es.footer = {
    desc: 'Academia de Biodanza en Mendoza Capital, Argentina. Un espacio de conexión auténtica donde la música, el movimiento y la comunidad te invitan a vivir plenamente.',
    navHeading: 'Navegación', unitsHeading: 'Modalidades', contactHeading: 'Contacto',
    navLinks: ['Inicio', 'Nosotros', 'Modalidades', 'Beneficios', 'Galería', 'Contacto'],
    unitLinks: ['Clases Semanales', 'Talleres Intensivos', 'Biodanza para Niños'],
    rights: 'Todos los derechos reservados.'
  };
  TRANSLATIONS.es.whatsapp = { tooltip: 'Contactanos por WhatsApp', message: 'Hola! Quiero conocer más sobre Biodanza en Alma en Movimiento' };

  TRANSLATIONS.pt.about = {
    label: 'Nossa história',
    title: 'Onde a <em>alma</em> se encontra.',
    p1: 'Alma en Movimiento nasceu do profundo amor de Florencia Serruya pela Biodança e seu poder transformador. Como facilitadora certificada com mais de 8 anos de experiência, Florencia criou um espaço onde cada pessoa pode se reconectar com sua essência mais autêntica através do movimento, música e conexão humana.',
    p2: 'Em Mendoza Capital, nossa academia se tornou um refúgio para aqueles que buscam mais do que uma aula de dança: um caminho para a vitalidade, expressão genuína e pertencimento a uma comunidade que celebra a vida em todas as suas formas.',
    features: [
      { title: 'Conexão autêntica', desc: 'Criamos espaços seguros onde você pode ser você mesmo, se expressar livremente e conectar do coração com outros e com sua essência mais profunda.' },
      { title: 'Transformação pessoal', desc: 'A Biodança é um sistema de desenvolvimento humano que integra música, movimento e encontro para despertar seu potencial de vida e expressão.' },
      { title: 'Comunidade amorosa', desc: 'Você faz parte de um grupo caloroso e acolhedor que celebra cada processo, respeita cada tempo e compartilha a alegria de viver plenamente.' }
    ]
  };
  TRANSLATIONS.pt.units = {
    label: 'Nossas modalidades',
    title: 'Formas de <em>vivenciar</em>',
    subtitle: 'Oferecemos diferentes espaços de encontro com a Biodança, adaptados às suas necessidades e ritmos de vida. Cada modalidade é uma porta de entrada para sua transformação.',
    cards: [
      { name: 'Aulas Semanais', desc: 'Nosso espaço regular de encontro onde cada semana vivenciamos a Biodança em grupo. Através de exercícios de movimento, música cuidadosamente selecionada e o calor do grupo, percorremos um caminho progressivo de autoconhecimento e transformação. Ideal para quem busca um compromisso sustentado com seu desenvolvimento pessoal.', cap: 'Duração: 2 horas semanais' },
      { name: 'Workshops Intensivos', desc: 'Experiências profundas de imersão em temas específicos de Biodança. Estes encontros especiais de meio dia ou dia completo nos permitem explorar com maior profundidade aspectos como criatividade, afetividade, vitalidade ou identidade. Uma oportunidade para viver transformações significativas em pouco tempo.', cap: 'Frequência: Uma vez por mês' },
      { name: 'Biodança para Crianças', desc: 'Um espaço especialmente projetado para que meninos e meninas explorem o movimento, criatividade e conexão com outros de forma lúdica e afetuosa. Através do jogo e música, acompanhamos seu desenvolvimento emocional, expressão espontânea e capacidade de se vincular com alegria e respeito. As crianças descobrem sua própria vitalidade em um ambiente seguro e amoroso.', cap: 'Idades: 5 a 12 anos' }
    ]
  };
  TRANSLATIONS.pt.experiences = {
    label: 'Benefícios da Biodança',
    title: 'O que você <em>vai viver</em>',
    subtitle: 'A Biodança convida você a descobrir aspectos profundos de si mesmo e desenvolver seu potencial humano em todas as suas dimensões.',
    cards: [
      { title: 'Conexão profunda', desc: 'Aprenda a se conectar autenticamente consigo mesmo e com os outros. A Biodança cria espaços seguros onde você pode ser quem realmente é, sem máscaras ou julgamentos, fortalecendo vínculos genuínos e significativos.' },
      { title: 'Vitalidade e bem-estar', desc: 'Desperte sua energia vital através do movimento consciente. Melhore sua saúde física e emocional, reduza o estresse e recupere o prazer de habitar seu corpo com alegria e plenitude.' },
      { title: 'Comunidade e pertencimento', desc: 'Faça parte de um grupo caloroso e acolhedor onde cada pessoa é valorizada. Compartilhe um caminho de crescimento com outros que, como você, buscam viver com mais autenticidade, alegria e amor.' },
      { title: 'Expressão criativa', desc: 'Libere sua criatividade e expressão pessoal através do movimento espontâneo. Descubra novas formas de se comunicar, sentir e manifestar sua singularidade no mundo.' }
    ]
  };
  TRANSLATIONS.pt.process = {
    label: 'Seu caminho',
    title: 'Como <em>começar</em>',
    subtitle: 'Em quatro passos simples você começa sua jornada de transformação com Biodança em Mendoza.',
    steps: [
      { title: 'Conheça a Biodança', desc: 'Entre em contato por WhatsApp, Instagram ou email. Contamos tudo sobre a Biodança, nossas modalidades e respondemos todas as suas dúvidas.' },
      { title: 'Experimente uma aula gratuita', desc: 'Sua primeira aula é sem custo. Venha vivenciar a Biodança, conheça o grupo e sinta a energia do encontro. Sem compromisso.' },
      { title: 'Inscreva-se e comece', desc: 'Se sentir que é para você, escolha a modalidade que melhor se adapta ao seu ritmo e faça sua inscrição. Acompanhamos você em cada passo.' },
      { title: 'Vivencie e transforme-se', desc: 'Comece seu processo de autoconhecimento e transformação. Cada aula é uma oportunidade para conectar com sua essência e celebrar a vida.' }
    ]
  };
  TRANSLATIONS.pt.form = {
    title: 'Entre em contato conosco',
    name: 'Nome completo', email: 'Email', phone: 'Telefone / WhatsApp', checkin: 'Modalidade de interesse', nights: 'Modalidade de interesse', unit: 'Modalidade de interesse', message: 'Mensagem (opcional)',
    phName: 'Seu nome', phEmail: 'seu@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Conte-nos sobre seu interesse na Biodança, dúvidas ou comentários...',
    errName: 'Informe seu nome', errEmail: 'Informe um email válido', errPhone: 'Informe um telefone válido', errCheckin: 'Selecione uma modalidade', errNights: 'Selecione uma modalidade',
    nightsOptions: ['Selecionar...', 'Aulas Semanais', 'Workshops Intensivos', 'Biodança para Crianças', 'Consulta Geral'],
    unitOptions: ['Selecionar...', 'Aulas Semanais', 'Workshops Intensivos', 'Biodança para Crianças', 'Consulta Geral'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Obrigado pelo seu interesse na Biodança. Responderemos em breve por email ou WhatsApp.',
    infoTitle: 'Informações de contato', infoLabels: ['Localização', 'WhatsApp', 'Email', 'Instagram']
  };
  TRANSLATIONS.pt.footer = {
    desc: 'Academia de Biodança em Mendoza Capital, Argentina. Um espaço de conexão autêntica onde a música, o movimento e a comunidade convidam você a viver plenamente.',
    navHeading: 'Navegação', unitsHeading: 'Modalidades', contactHeading: 'Contato',
    navLinks: ['Início', 'Sobre', 'Modalidades', 'Benefícios', 'Galeria', 'Contato'],
    unitLinks: ['Aulas Semanais', 'Workshops Intensivos', 'Biodança para Crianças'],
    rights: 'Todos os direitos reservados.'
  };
  TRANSLATIONS.pt.whatsapp = { tooltip: 'Entre em contato pelo WhatsApp', message: 'Olá! Quero saber mais sobre Biodança no Alma en Movimiento' };

  // ===== REST OF THE i18n SYSTEM (unchanged logic) =====

  var countryToLang = {
    AR: 'es', UY: 'es', CL: 'es', PE: 'es', CO: 'es', MX: 'es', ES: 'es', VE: 'es', EC: 'es', BO: 'es', PY: 'es',
    BR: 'pt', PT: 'pt',
    US: 'en', CA: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en',
    FR: 'en', DE: 'en', IT: 'en', NL: 'en', BE: 'en', SE: 'en', DK: 'en', NO: 'en', FI: 'en',
    JP: 'en', CN: 'en', KR: 'en', IN: 'en', RU: 'en'
  };

  var countryNames = {
    AR: { es: 'Argentina', pt: 'Argentina', en: 'Argentina' },
    UY: { es: 'Uruguay', pt: 'Uruguai', en: 'Uruguay' },
    BR: { es: 'Brasil', pt: 'Brasil', en: 'Brazil' },
    CL: { es: 'Chile', pt: 'Chile', en: 'Chile' },
    PE: { es: 'Perú', pt: 'Peru', en: 'Peru' },
    CO: { es: 'Colombia', pt: 'Colômbia', en: 'Colombia' },
    MX: { es: 'México', pt: 'México', en: 'Mexico' },
    ES: { es: 'España', pt: 'Espanha', en: 'Spain' },
    US: { es: 'Estados Unidos', pt: 'Estados Unidos', en: 'United States' },
    CA: { es: 'Canadá', pt: 'Canadá', en: 'Canada' },
    GB: { es: 'Reino Unido', pt: 'Reino Unido', en: 'United Kingdom' },
    PT: { es: 'Portugal', pt: 'Portugal', en: 'Portugal' },
    FR: { es: 'Francia', pt: 'França', en: 'France' },
    DE: { es: 'Alemania', pt: 'Alemanha', en: 'Germany' },
    IT: { es: 'Italia', pt: 'Itália', en: 'Italy' }
  };

  function merge(base, override) {
    var result = {};
    for (var k in base) { if (base.hasOwnProperty(k)) result[k] = base[k]; }
    if (!override) return result;
    for (var k2 in override) {
      if (!override.hasOwnProperty(k2)) continue;
      if (typeof override[k2] === 'object' && !Array.isArray(override[k2]) && override[k2] !== null) {
        result[k2] = merge(result[k2] || {}, override[k2]);
      } else {
        result[k2] = override[k2];
      }
    }
    return result;
  }

  function getLang() {
    try {
      var pref = localStorage.getItem(PREF_KEY);
      if (pref && SUPPORTED_LANGS.indexOf(pref) >= 0) return pref;
    } catch (e) {}
    if (detectedCountryCode && countryToLang[detectedCountryCode]) {
      return countryToLang[detectedCountryCode];
    }
    try {
      var nav = window.navigator.language || window.navigator.userLanguage || '';
      var code = nav.split('-')[0].toLowerCase();
      if (SUPPORTED_LANGS.indexOf(code) >= 0) return code;
    } catch (e) {}
    return 'es';
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(PREF_KEY, lang);
    } catch (e) {}
  }

  function getTranslations(lang) {
    if (!lang || SUPPORTED_LANGS.indexOf(lang) < 0) lang = 'es';
    return merge(BASE_EN, TRANSLATIONS[lang] || {});
  }

  function translate(path, lang, replacements) {
    var t = getTranslations(lang);
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (!t) return path;
      t = t[parts[i]];
    }
    var str = t || path;
    if (replacements) {
      for (var key in replacements) {
        if (replacements.hasOwnProperty(key)) {
          str = String(str).replace(new RegExp('\\{' + key + '\\}', 'g'), replacements[key]);
        }
      }
    }
    return str;
  }

  function applyTranslations() {
    var lang = getLang();
    var t = getTranslations(lang);
    document.documentElement.lang = lang;
    var title = t.metaTitle || BASE_EN.metaTitle;
    var desc = t.metaDescription || BASE_EN.metaDescription;
    document.title = title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    var twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    var twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', desc);
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-i18n');
      if (!key) continue;
      var val = translate(key, lang);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        var type = el.getAttribute('type');
        if (type === 'submit' || type === 'button') {
          el.value = val;
        } else {
          el.placeholder = val;
        }
      } else {
        el.innerHTML = val;
      }
    }
  }

  function buildLangSelector() {
    var container = document.getElementById('langSelector');
    if (!container) return;
    container.innerHTML = '';
    var currentLang = getLang();
    for (var i = 0; i < SUPPORTED_LANGS.length; i++) {
      var code = SUPPORTED_LANGS[i];
      var t = getTranslations(code);
      var flag = t.flag || '🌐';
      var btn = document.createElement('button');
      btn.className = 'lang-btn' + (code === currentLang ? ' lang-btn-active' : '');
      btn.setAttribute('data-lang', code);
      btn.setAttribute('aria-label', 'Select ' + code.toUpperCase());
      btn.textContent = flag;
      btn.addEventListener('click', function(e) {
        var lang = this.getAttribute('data-lang');
        saveLang(lang);
        applyTranslations();
        buildLangSelector();
      });
      container.appendChild(btn);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyTranslations();
      buildLangSelector();
    });
  } else {
    applyTranslations();
    buildLangSelector();
  }

  window.__i18n = {
    translate: translate,
    getLang: getLang,
    saveLang: saveLang,
    getTranslations: getTranslations,
    applyTranslations: applyTranslations,
    buildLangSelector: buildLangSelector
  };

})();

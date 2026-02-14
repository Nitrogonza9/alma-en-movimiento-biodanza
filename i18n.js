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
    nav: { home: 'Home', about: 'About', units: 'Workshops', experiences: 'Benefits', gallery: 'Gallery', contact: 'Contact', book: 'Contact', menuAria: 'Open navigation menu', langAria: 'Select language' },
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
      subtitle: 'We offer different spaces to encounter Biodanza, adapted to your needs and life rhythms. Each workshop is a gateway to your transformation.',
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
        { title: 'Enroll and begin', desc: 'If you feel it\'s for you, choose the workshop that best suits your rhythm and complete your enrollment. We accompany you at every step.' },
        { title: 'Experience and transform', desc: 'Begin your process of self-knowledge and transformation. Each class is an opportunity to connect with your essence and celebrate life.' }
      ]
    },
    form: {
      title: 'Contact us',
      name: 'Full name', email: 'Email', phone: 'Phone / WhatsApp', checkin: 'Modality of interest', nights: 'Modality of interest', unit: 'Modality of interest', message: 'Message (optional)',
      phName: 'Your name', phEmail: 'you@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Tell us about your interest in Biodanza, questions or comments...',
      errName: 'Please enter your name', errEmail: 'Please enter a valid email', errPhone: 'Please enter a valid phone', errCheckin: 'Please select a workshop', errNights: 'Please select a workshop',
      nightsOptions: ['Select...', 'Weekly Classes', 'Intensive Workshops', 'Biodanza for Children', 'General inquiry'],
      unitOptions: ['Select...', 'Weekly Classes', 'Intensive Workshops', 'Biodanza for Children', 'General inquiry'],
      submit: 'Send inquiry', sending: 'Sending...', successTitle: 'Inquiry sent', successText: 'Thank you for your interest in Biodanza. We will reply shortly by email or WhatsApp.',
      infoTitle: 'Contact information', infoLabels: ['Location', 'WhatsApp', 'Email', 'Schedule']
    },
    footer: {
      desc: 'Biodanza academy in Mendoza Capital, Argentina. A space of authentic connection where music, movement and community invite you to live fully.',
      navHeading: 'Navigation', unitsHeading: 'Workshops', contactHeading: 'Contact',
      navLinks: ['Home', 'About', 'Workshops', 'Benefits', 'Gallery', 'Contact'],
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
      nav: { home: 'Inicio', about: 'Nosotros', units: 'Talleres', experiences: 'Beneficios', gallery: 'Galería', contact: 'Contacto', book: 'Contacto', menuAria: 'Abrir menú de navegación', langAria: 'Seleccionar idioma' },
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
      nav: { home: 'Início', about: 'Sobre', units: 'Talleres', experiences: 'Benefícios', gallery: 'Galeria', contact: 'Contato', book: 'Contato', menuAria: 'Abrir menu de navegação', langAria: 'Selecionar idioma' },
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
    label: 'Nuestras talleres',
    title: 'Formas de <em>vivenciar</em>',
    subtitle: 'Ofrecemos diferentes espacios de encuentro con la Biodanza, adaptados a tus necesidades y ritmos de vida. Cada taller es una puerta de entrada a tu transformación.',
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
      { title: 'Conocé la Biodanza', desc: 'Contactanos por WhatsApp, Instagram o email. Te contamos todo sobre la Biodanza, nuestras talleres y respondemos todas tus dudas.' },
      { title: 'Probá una clase gratuita', desc: 'Tu primera clase es sin cargo. Vení a vivenciar la Biodanza, conocé al grupo y sentí la energía del encuentro. Sin compromiso.' },
      { title: 'Inscribite y comenzá', desc: 'Si sentís que es para vos, elegí la taller que mejor se adapte a tu ritmo y hacé tu inscripción. Te acompañamos en cada paso.' },
      { title: 'Vivenciá y transformate', desc: 'Empezá tu proceso de autoconocimiento y transformación. Cada clase es una oportunidad para conectar con tu esencia y celebrar la vida.' }
    ]
  };
  TRANSLATIONS.es.form = {
    title: 'Contactate con nosotros',
    name: 'Nombre completo', email: 'Email', phone: 'Teléfono / WhatsApp', checkin: 'Taller de interés', nights: 'Taller de interés', unit: 'Taller de interés', message: 'Mensaje (opcional)',
    phName: 'Tu nombre', phEmail: 'tu@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Contanos sobre tu interés en Biodanza, dudas o comentarios...',
    errName: 'Ingresá tu nombre', errEmail: 'Ingresá un email válido', errPhone: 'Ingresá un teléfono válido', errCheckin: 'Seleccioná una taller', errNights: 'Seleccioná una taller',
    nightsOptions: ['Seleccionar...', 'Clases Semanales', 'Talleres Intensivos', 'Biodanza para Niños', 'Consulta General'],
    unitOptions: ['Seleccionar...', 'Clases Semanales', 'Talleres Intensivos', 'Biodanza para Niños', 'Consulta General'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Gracias por tu interés en Biodanza. Te responderemos a la brevedad por email o WhatsApp.',
    infoTitle: 'Información de contacto', infoLabels: ['Ubicación', 'WhatsApp', 'Email', 'Instagram']
  };
  TRANSLATIONS.es.footer = {
    desc: 'Academia de Biodanza en Mendoza Capital, Argentina. Un espacio de conexión auténtica donde la música, el movimiento y la comunidad te invitan a vivir plenamente.',
    navHeading: 'Navegación', unitsHeading: 'Talleres', contactHeading: 'Contacto',
    navLinks: ['Inicio', 'Nosotros', 'Talleres', 'Beneficios', 'Galería', 'Contacto'],
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
    label: 'Nossas talleres',
    title: 'Formas de <em>vivenciar</em>',
    subtitle: 'Oferecemos diferentes espaços de encontro com a Biodança, adaptados às suas necessidades e ritmos de vida. Cada tallere é uma porta de entrada para sua transformação.',
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
      { title: 'Conheça a Biodança', desc: 'Entre em contato por WhatsApp, Instagram ou email. Contamos tudo sobre a Biodança, nossas talleres e respondemos todas as suas dúvidas.' },
      { title: 'Experimente uma aula gratuita', desc: 'Sua primeira aula é sem custo. Venha vivenciar a Biodança, conheça o grupo e sinta a energia do encontro. Sem compromisso.' },
      { title: 'Inscreva-se e comece', desc: 'Se sentir que é para você, escolha a tallere que melhor se adapta ao seu ritmo e faça sua inscrição. Acompanhamos você em cada passo.' },
      { title: 'Vivencie e transforme-se', desc: 'Comece seu processo de autoconhecimento e transformação. Cada aula é uma oportunidade para conectar com sua essência e celebrar a vida.' }
    ]
  };
  TRANSLATIONS.pt.form = {
    title: 'Entre em contato conosco',
    name: 'Nome completo', email: 'Email', phone: 'Telefone / WhatsApp', checkin: 'Tallere de interesse', nights: 'Tallere de interesse', unit: 'Tallere de interesse', message: 'Mensagem (opcional)',
    phName: 'Seu nome', phEmail: 'seu@email.com', phPhone: '+54 9 261 123 4567', phMessage: 'Conte-nos sobre seu interesse na Biodança, dúvidas ou comentários...',
    errName: 'Informe seu nome', errEmail: 'Informe um email válido', errPhone: 'Informe um telefone válido', errCheckin: 'Selecione uma tallere', errNights: 'Selecione uma tallere',
    nightsOptions: ['Selecionar...', 'Aulas Semanais', 'Workshops Intensivos', 'Biodança para Crianças', 'Consulta Geral'],
    unitOptions: ['Selecionar...', 'Aulas Semanais', 'Workshops Intensivos', 'Biodança para Crianças', 'Consulta Geral'],
    submit: 'Enviar consulta', sending: 'Enviando...',
    successTitle: 'Consulta enviada', successText: 'Obrigado pelo seu interesse na Biodança. Responderemos em breve por email ou WhatsApp.',
    infoTitle: 'Informações de contato', infoLabels: ['Localização', 'WhatsApp', 'Email', 'Instagram']
  };
  TRANSLATIONS.pt.footer = {
    desc: 'Academia de Biodança em Mendoza Capital, Argentina. Um espaço de conexão autêntica onde a música, o movimento e a comunidade convidam você a viver plenamente.',
    navHeading: 'Navegação', unitsHeading: 'Talleres', contactHeading: 'Contato',
    navLinks: ['Início', 'Sobre', 'Talleres', 'Benefícios', 'Galeria', 'Contato'],
    unitLinks: ['Aulas Semanais', 'Workshops Intensivos', 'Biodança para Crianças'],
    rights: 'Todos os direitos reservados.'
  };
  TRANSLATIONS.pt.whatsapp = { tooltip: 'Entre em contato pelo WhatsApp', message: 'Olá! Quero saber mais sobre Biodança no Alma en Movimiento' };

  // ===== REST OF THE i18n SYSTEM (unchanged logic) =====

  TRANSLATIONS.pt.about = {
    label: 'Nossa história',
    title: 'Onde a <em>natureza</em> abraça.',
    p1: 'Alma en Movimiento nasceu do sonho de sua criadora: criar um espaço onde o design não compete com a natureza, mas a celebra. Em Colonia, Uruguai, transformamos talleres contemporâneas para integrar-se ao entorno.',
    p2: 'Cercadas por palmeiras centenárias, campos de lavanda e céus estrelados, cada detalhe é cuidado para que sua única preocupação seja escolher se verá o pôr do sol na rede ou na piscina.',
    features: [
      { title: 'Design sustentável', desc: 'Talleres de design contemporâneo com interiores cuidados e materiais nobres, pensadas para integrar-se ao ambiente.' },
      { title: 'Natureza imersiva', desc: 'Flores e fauna nativa, palmeiras centenárias e céus infinitos convidam você a desacelerar.' },
      { title: 'Privacidade total', desc: 'Apenas três talleres independentes para máxima tranquilidade.' }
    ]
  };
  TRANSLATIONS.pt.units = {
    label: 'Nossos espaços',
    title: 'Três talleres de <em>design</em>',
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
    desc: 'Talleres de design entre palmeiras centenárias e lavandas em Colonia, Uruguai. Três talleres independentes onde natureza e conforto se encontram.',
    navHeading: 'Navegação', unitsHeading: 'Talleres', contactHeading: 'Contato',
    navLinks: ['Início', 'Sobre', 'Talleres', 'Experiências', 'Galería', 'Contato'],
    unitLinks: ['Unidade Las Rosas', 'Unidade El Jardín', 'Unidade Las Glicinas'],
    rights: 'Todos os direitos reservados.'
  };
  TRANSLATIONS.pt.whatsapp = { tooltip: 'Fale com a gente', message: 'Olá! Quero consultar disponibilidade em Alma en Movimiento' };

  TRANSLATIONS.fr = {
    flag: '🇫🇷',
    metaTitle: 'Alma en Movimiento - Unités design à Colonia, Uruguay',
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
      p1: 'Alma en Movimiento est né du rêve de sa créatrice : donner vie à un espace où le design ne rivalise pas avec la nature, mais la célèbre. À Colonia, en Uruguay, nous avons transformé des unités de design contemporain pensées pour s\'intégrer au paysage.',
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
    whatsapp: { tooltip: 'Discutez avec nous', message: 'Bonjour ! Je souhaite vérifier la disponibilité à Alma en Movimiento' }
  };

  TRANSLATIONS.it.metaTitle = 'Alma en Movimiento - Unita di Design a Colonia, Uruguay';
  TRANSLATIONS.it.metaDescription = 'Unita di design tra palme secolari e lavande a Colonia, Uruguay. Tre unita indipendenti dove natura e comfort si incontrano.';
  TRANSLATIONS.it.preloaderDetecting = 'Rilevamento paese e lingua...';
  TRANSLATIONS.it.about = {
    label: 'La nostra storia',
    title: 'Dove la <em>natura</em> abbraccia.',
    p1: 'Alma en Movimiento nasce dal sogno della sua creatrice: dare vita a uno spazio dove il design non compete con la natura, ma la celebra. A Colonia, in Uruguay, abbiamo trasformato unità contemporanee pensate per integrarsi nel paesaggio.',
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
  TRANSLATIONS.it.whatsapp = { tooltip: 'Chatta con noi', message: 'Ciao! Vorrei verificare la disponibilità in Alma en Movimiento' };

  TRANSLATIONS.de.metaTitle = 'Alma en Movimiento - Design-Unterkünfte in Colonia, Uruguay';
  TRANSLATIONS.de.metaDescription = 'Design-Unterkünfte zwischen alten Palmen und Lavendel in Colonia, Uruguay. Drei unabhängige Einheiten, in denen Natur und Komfort zusammenfinden.';
  TRANSLATIONS.de.preloaderDetecting = 'Land und Sprache werden erkannt...';
  TRANSLATIONS.de.about = {
    label: 'Unsere Geschichte',
    title: 'Wo die <em>Natur</em> dich umarmt.',
    p1: 'Alma en Movimiento entstand aus dem Traum seiner Gründerin: einen Ort zu schaffen, an dem Design nicht mit der Natur konkurriert, sondern sie feiert. In Colonia, Uruguay, haben wir moderne Einheiten geschaffen, die sich in die Landschaft integrieren.',
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
  TRANSLATIONS.de.whatsapp = { tooltip: 'Chatte mit uns', message: 'Hallo! Ich möchte die Verfügbarkeit bei Alma en Movimiento prüfen' };

  TRANSLATIONS.sv.metaTitle = 'Alma en Movimiento - Designboenden i Colonia, Uruguay';
  TRANSLATIONS.sv.metaDescription = 'Designboenden bland hundraåriga palmer och lavendel i Colonia, Uruguay. Tre fristående enheter där natur och komfort möts.';
  TRANSLATIONS.sv.preloaderDetecting = 'Identifierar land och språk...';
  TRANSLATIONS.sv.preloaderReady = 'Välkommen, gäst från {country}.';
  TRANSLATIONS.sv.about = {
    label: 'Vår historia',
    title: 'Där <em>naturen</em> omfamnar.',
    p1: 'Alma en Movimiento föddes ur en dröm: en plats där design inte konkurrerar med naturen utan hyllar den. I Colonia, Uruguay, skapade vi moderna enheter som smälter in i landskapet.',
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
  TRANSLATIONS.sv.whatsapp = { tooltip: 'Chatta med oss', message: 'Hej! Jag vill kontrollera tillgänglighet hos Alma en Movimiento' };

  TRANSLATIONS.da.metaTitle = 'Alma en Movimiento - Designenheder i Colonia, Uruguay';
  TRANSLATIONS.da.metaDescription = 'Designenheder mellem gamle palmer og lavendel i Colonia, Uruguay. Tre uafhængige enheder hvor natur og komfort mødes.';
  TRANSLATIONS.da.preloaderDetecting = 'Finder land og sprog...';
  TRANSLATIONS.da.about = {
    label: 'Vores historie',
    title: 'Hvor <em>naturen</em> omfavner.',
    p1: 'Alma en Movimiento blev skabt ud fra en drøm: et sted hvor design ikke konkurrerer med naturen, men fejrer den. I Colonia, Uruguay, skabte vi moderne enheder i harmoni med omgivelserne.',
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
  TRANSLATIONS.da.whatsapp = { tooltip: 'Chat med os', message: 'Hej! Jeg vil gerne tjekke tilgængelighed hos Alma en Movimiento' };

  TRANSLATIONS.ru.metaTitle = 'Alma en Movimiento - Дизайнерские дома в Колонии, Уругвай';
  TRANSLATIONS.ru.metaDescription = 'Дизайнерские дома среди вековых пальм и лаванды в Колонии, Уругвай. Три независимых дома, где встречаются природа и комфорт.';
  TRANSLATIONS.ru.preloaderDetecting = 'Определяем страну и язык...';
  TRANSLATIONS.ru.about = {
    label: 'Наша история',
    title: 'Где <em>природа</em> обнимает.',
    p1: 'Alma en Movimiento родился из мечты создательницы: создать место, где дизайн не спорит с природой, а подчеркивает ее. В Колонии, Уругвай, мы создали современные дома, гармонично встроенные в окружение.',
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
  TRANSLATIONS.ru.whatsapp = { tooltip: 'Напишите нам', message: 'Здравствуйте! Хочу уточнить доступность в Alma en Movimiento' };

  TRANSLATIONS.zh.metaTitle = 'Alma en Movimiento - 乌拉圭科洛尼亚设计独栋';
  TRANSLATIONS.zh.metaDescription = '位于乌拉圭科洛尼亚，百年棕榈与薰衣草之间的设计独栋。三套独立单元，让自然与舒适相遇。';
  TRANSLATIONS.zh.preloaderDetecting = '正在识别国家与语言...';
  TRANSLATIONS.zh.about = {
    label: '我们的故事',
    title: '<em>自然</em>拥抱你的地方。',
    p1: 'Alma en Movimiento 源于创始人的梦想：打造一个让设计与自然共生、彼此成就的空间。我们在乌拉圭科洛尼亚，将当代设计单元与环境和谐融合。',
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
  TRANSLATIONS.zh.whatsapp = { tooltip: '与我们聊天', message: '你好！我想咨询 Alma en Movimiento 的可订日期' };

  TRANSLATIONS.ja.metaTitle = 'Alma en Movimiento - ウルグアイ・コロニアのデザインユニット';
  TRANSLATIONS.ja.metaDescription = 'ウルグアイ・コロニア、樹齢あるヤシとラベンダーに囲まれたデザインユニット。自然と快適さが調和する独立型3ユニット。';
  TRANSLATIONS.ja.preloaderDetecting = '国と言語を判定しています...';
  TRANSLATIONS.ja.about = {
    label: '私たちの物語',
    title: '<em>自然</em>に抱かれる場所。',
    p1: 'Alma en Movimiento は、デザインが自然と競うのではなく称える場所をつくりたいという想いから生まれました。ウルグアイ・コロニアで、環境に調和する現代的なユニットを整えました。',
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
  TRANSLATIONS.ja.whatsapp = { tooltip: 'チャットで相談', message: 'こんにちは。Alma en Movimiento の空き状況を確認したいです' };

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
    setText('.footer-bottom span', '© 2026 Alma en Movimiento. ' + pack.footer.rights);

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

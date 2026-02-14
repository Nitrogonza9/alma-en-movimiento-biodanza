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

import { SafeIcon } from './components/SafeIcon';
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronRight,
  Star,
  Users,
  Zap,
  Trophy,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  Shield,
  Target,
  Heart
} from 'lucide-react'

// Utility for class merging
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

// Web3Forms Handler Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e, accessKey) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        e.target.reset();
      } else {
        setIsError(true);
        setErrorMessage(data.message || 'Что-то пошло не так');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Ошибка сети. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
  };

  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm };
};

// Scroll Animation Hook
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'О нас', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Отзывы', href: '#testimonials' },
    { name: 'Контакты', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent"
    )}>
      <nav className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <SafeIcon name="shield" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">ProService</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105">
              Начать проект
            </button>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <SafeIcon name={isMobileMenuOpen ? "x" : "menu"} size={24} />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block py-3 text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all">
                Начать проект
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-6 border border-blue-600/30">
            Профессиональные решения для бизнеса
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
            Создаем <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">будущее</span><br />
            вашего бизнеса
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Мы предлагаем комплексные решения для развития вашего бизнеса. От стратегии до внедрения — ваш успех — наша цель.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-blue-600/50 flex items-center justify-center gap-2"
            >
              Начать проект
              <SafeIcon name="arrow-right" size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm border border-white/20"
            >
              Узнать больше
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: "10+", label: "Лет опыта" },
            { number: "500+", label: "Проектов" },
            { number: "98%", label: "Довольных клиентов" },
            { number: "24/7", label: "Поддержка" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-black text-blue-500 mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="about" ref={ref} className="py-24 px-4 md:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-6 border border-blue-600/30">
              О компании
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Мы создаем <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">цифровое будущее</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Наша компания специализируется на предоставлении высококачественных услуг для бизнеса любого масштаба. Мы объединяем инновационные технологии с проверенным опытом.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              С момента основания мы успешно реализовали более 500 проектов для клиентов из различных отраслей. Наша миссия — помогать бизнесу расти и развиваться в цифровую эпоху.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Индивидуальный подход</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Современные технологии</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span>Круглосуточная поддержка</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-600/20">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team working"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-slate-900 p-6 rounded-2xl border border-gray-800 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <SafeIcon name="users" size={24} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">500+</div>
                  <div className="text-gray-400 text-sm">Довольных клиентов</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const { ref, isInView } = useScrollAnimation();

  const services = [
    {
      icon: 'target',
      title: 'Стратегическое планирование',
      description: 'Разработка комплексных стратегий для достижения ваших бизнес-целей с учетом рыночных тенденций.',
      features: ['Анализ рынка', 'Конкурентная разведка', 'Дорожная карта']
    },
    {
      icon: 'zap',
      title: 'Цифровая трансформация',
      description: 'Внедрение современных технологий для оптимизации процессов и повышения эффективности вашего бизнеса.',
      features: ['Автоматизация', 'Облачные решения', 'Интеграция систем']
    },
    {
      icon: 'shield',
      title: 'Кибербезопасность',
      description: 'Комплексная защита ваших данных и инфраструктуры от современных киберугроз.',
      features: ['Аудит безопасности', 'Защита данных', 'Мониторинг 24/7']
    },
    {
      icon: 'users',
      title: 'Консалтинг и поддержка',
      description: 'Профессиональные консультации и круглосуточная поддержка ваших проектов.',
      features: ['Персональный менеджер', 'Поддержка 24/7', 'Обучение команды']
    }
  ];

  return (
    <section id="services" ref={ref} className="py-24 px-4 md:px-6 bg-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-6 border border-blue-600/30">
            Наши услуги
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Комплексные <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">решения</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Мы предлагаем широкий спектр профессиональных услуг для развития и защиты вашего бизнеса
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-gray-800 hover:border-blue-600/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <SafeIcon name={service.icon} size={28} className="text-white" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                    <SafeIcon name="arrow-right" size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full border border-gray-700">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const { ref, isInView } = useScrollAnimation();

  const testimonials = [
    {
      name: "Александр Петров",
      role: "CEO, ТехноСтарт",
      content: "Отличная работа! Команда профессионалов помогла нам увеличить эффективность бизнес-процессов на 40%. Рекомендую всем!",
      rating: 5
    },
    {
      name: "Елена Смирнова",
      role: "Директор, МодаГрупп",
      content: "Сотрудничество превзошло все ожидания. Внимательное отношение к деталям и оперативная поддержка на всех этапах проекта.",
      rating: 5
    },
    {
      name: "Михаил Иванов",
      role: "Основатель, ФинСофт",
      content: "Профессиональный подход и глубокая экспертиза в отрасли. Помогли оптимизировать затраты и вывести продукт на новый уровень.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" ref={ref} className="py-24 px-4 md:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-600/20 text-purple-400 text-sm font-medium mb-6 border border-purple-600/30">
            Отзывы клиентов
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Что говорят <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">наши клиенты</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Мы гордимся доверием наших клиентов и их успехами
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-gray-800 hover:border-purple-600/50 transition-all duration-300 relative"
            >
              <div className="absolute top-6 right-6 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <SafeIcon key={i} name="star" size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {testimonial.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>

              <p className="text-gray-400 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section with Web3Forms
const ContactSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler();
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Replace with your Web3Forms Access Key from https://web3forms.com

  const contactInfo = [
    { icon: 'phone', label: 'Телефон', value: '+7 (999) 123-45-67' },
    { icon: 'mail', label: 'Email', value: 'info@proservice.ru' },
    { icon: 'map-pin', label: 'Адрес', value: 'Москва, ул. Примерная, 123' },
    { icon: 'clock', label: 'Режим работы', value: 'Пн-Пт: 9:00 - 18:00' }
  ];

  return (
    <section id="contact" ref={ref} className="py-24 px-4 md:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-6 border border-blue-600/30">
            Свяжитесь с нами
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Готовы начать <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">сотрудничество?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Заполните форму ниже, и мы свяжемся с вами в ближайшее время
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-gray-800 hover:border-blue-600/50 transition-colors">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <SafeIcon name={item.icon} size={20} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">{item.label}</div>
                  <div className="text-white font-semibold">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-gray-800">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Ваше имя</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Иван Иванов"
                          required
                          className="w-full px-4 py-3 bg-slate-950 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="ivan@example.com"
                          required
                          className="w-full px-4 py-3 bg-slate-950 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Тема</label>
                      <select
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-slate-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="">Выберите тему</option>
                        <option value="consultation">Консультация</option>
                        <option value="project">Разработка проекта</option>
                        <option value="support">Техническая поддержка</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Сообщение</label>
                      <textarea
                        name="message"
                        placeholder="Расскажите о вашем проекте..."
                        rows="4"
                        required
                        className="w-full px-4 py-3 bg-slate-950 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      ></textarea>
                    </div>

                    {isError && (
                      <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Отправка...
                        </>
                      ) : (
                        <>
                          <SafeIcon name="send" size={20} />
                          Отправить сообщение
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="text-center py-12"
                  >
                    <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <SafeIcon name="check-circle" size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-blue-500 hover:text-blue-400 font-semibold transition-colors"
                    >
                      Отправить еще сообщение
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-gray-900 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <SafeIcon name="shield" size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-white">ProService</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Профессиональные решения для вашего бизнеса. Мы помогаем компаниям расти и развиваться с 2014 года.
              </p>
              <div className="flex gap-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <SafeIcon name={social === 'twitter' ? 'send' : social === 'facebook' ? 'users' : social === 'instagram' ? 'camera' : 'users'} size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Навигация</h4>
              <ul className="space-y-3">
                {['О нас', 'Услуги', 'Отзывы', 'Контакты'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Контакты</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400">
                  <SafeIcon name="phone" size={16} className="text-blue-500" />
                  <span>+7 (999) 123-45-67</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <SafeIcon name="mail" size={16} className="text-blue-500" />
                  <span>info@proservice.ru</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <SafeIcon name="map-pin" size={16} className="text-blue-500" />
                  <span>Москва, ул. Примерная, 123</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 ProService. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
import React, { useState } from 'react';
import { Home, Wrench, Image, HelpCircle, MessageCircle, Phone, Mail, MapPin, Star, ArrowRight, Menu, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const onSubmit = async (data: any) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: 'info@polerowanie-szyb.pl'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsEmailSent(true);
      reset();
      setTimeout(() => setIsEmailSent(false), 5000);
    } catch (error) {
      alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
    }
  };

  const navItems = [
    { name: 'O nas', href: '#o-nas' },
    { name: 'Usługi', href: '#uslugi' },
    { name: 'Realizacje', href: '#projekty' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Opinie', href: '#opinie' },
    { name: 'Kontakt', href: '#kontakt' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="text-2xl font-bold text-primary">BudGood</a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-bold text-gray-700 hover:text-primary hover:underline hover:underline-offset-8 hover:font-bold transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6580378/pexels-photo-6580378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Wnętrze remontowane"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">BudGood</h1>
            <p className="text-2xl md:text-3xl mb-8 max-w-2xl">Profesjonalne remonty i wykończenia wnętrz w najwyższym standardzie</p>
            <a 
              href="#kontakt"
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Darmowa wycena <ArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* O nas */}
      <section className="py-20 bg-gray-50" id="o-nas">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">O nas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jesteśmy zespołem doświadczonych specjalistów, którzy z pasją podchodzą do każdego projektu remontowego i wykończeniowego.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Doświadczenie</h3>
              <p className="text-gray-600">Ponad 10 lat doświadczenia w branży remontowo-budowlanej</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Profesjonalizm</h3>
              <p className="text-gray-600">Wykwalifikowana kadra i najwyższej jakości materiały</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wsparcie</h3>
              <p className="text-gray-600">Kompleksowa obsługa i doradztwo na każdym etapie realizacji</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usługi */}
      <section className="py-20 bg-[#0a403a]" id="uslugi">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white font-bold mb-4">Nasze usługi</h2>
            <p className="text-white max-w-2xl mx-auto text-[#7f9896]">
              Oferujemy szeroki zakres usług remontowych i wykończeniowych, dostosowanych do potrzeb naszych klientów.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Remonty mieszkań",
                description: "Kompleksowe remonty mieszkań od A do Z",
                icon: <Home className="w-6 h-6" />
              },
              {
                title: "Wykończenia wnętrz",
                description: "Profesjonalne wykończenia pod klucz",
                icon: <Image className="w-6 h-6" />
              },
              {
                title: "Instalacje",
                description: "Instalacje elektryczne i hydrauliczne",
                icon: <Wrench className="w-6 h-6" />
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projekty */}
      <section className="py-20 bg-gray-50" id="projekty">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nasze realizacje</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Zobacz przykłady naszych ostatnich projektów i przekonaj się o jakości naszych usług.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                title: "Apartament w Warszawie",
                description: "Kompleksowy remont 120m²"
              },
              {
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                title: "Mieszkanie na Mokotowie",
                description: "Wykończenie pod klucz 80m²"
              },
              {
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                title: "Dom jednorodzinny",
                description: "Remont generalny 200m²"
              },
              {
                image: "https://images.pexels.com/photos/8146148/pexels-photo-8146148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                title: "Łazienka Premium",
                description: "Kompleksowy remont łazienki 15m²"
              },
              {
                image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                title: "Kuchnia Nowoczesna",
                description: "Modernizacja kuchni 25m²"
              },
              {
                image: "https://images.pexels.com/photos/29394580/pexels-photo-29394580/free-photo-of-modern-lobby-with-brown-leather-sofa-and-decor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                title: "Biuro Open Space",
                description: "Adaptacja przestrzeni biurowej 150m²"
              }
            ].map((project, index) => (
              <a 
                href="#kontakt" 
                key={index}
                onMouseMove={handleMouseMove}
                className="group relative block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div 
                  className="opacity-0 group-hover:opacity-100 transition-opacity fixed pointer-events-none z-50 bg-primary text-white px-4 py-2 rounded-lg whitespace-nowrap"
                  style={{ 
                    left: `${tooltipPosition.x + 10}px`, 
                    top: `${tooltipPosition.y + 10}px` 
                  }}
                >
                  Darmowa wycena
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0a403a]" id="faq">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Często zadawane pytania</h2>
            <p className="text-[#7f9896] max-w-2xl mx-auto">
              Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Jak długo trwa standardowy remont?",
                answer: "Czas trwania remontu zależy od zakresu prac. Standardowy remont mieszkania trwa od 2 do 4 tygodni."
              },
              {
                question: "Czy zapewniacie materiały?",
                answer: "Tak, możemy dostarczyć wszystkie niezbędne materiały lub pracować z materiałami dostarczonymi przez klienta."
              },
              {
                question: "Czy udzielacie gwarancji na wykonane prace?",
                answer: "Tak, na wszystkie wykonane przez nas prace udzielamy gwarancji."
              },
              {
                question: "Jak wygląda proces wyceny?",
                answer: "Proces wyceny rozpoczyna się od bezpłatnej konsultacji i oględzin miejsca remontu."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opinie */}
      <section className="py-20 bg-[#072623]" id="opinie">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Opinie klientów</h2>
            <p className="text-[#7f9896] max-w-2xl mx-auto">
              Zobacz, co mówią o nas nasi klienci.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jan Kowalski",
                content: "Profesjonalna firma, terminowa realizacja i świetna jakość wykonania.",
                rating: 5
              },
              {
                name: "Anna Nowak",
                content: "Jestem bardzo zadowolona z efektu końcowego. Polecam!",
                rating: 5
              },
              {
                name: "Piotr Wiśniewski",
                content: "Świetna komunikacja i profesjonalne podejście do klienta.",
                rating: 5
              }
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-secondary" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.content}</p>
                <p className="font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="py-20" id="kontakt">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Skontaktuj się z nami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami, aby omówić Twój projekt.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Imię i nazwisko</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                  {errors.name && <span className="text-red-500 text-sm">To pole jest wymagane</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                  />
                  {errors.email && <span className="text-red-500 text-sm">Wprowadź poprawny adres email</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Wiadomość</label>
                  <textarea
                    {...register('message', { required: true })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  ></textarea>
                  {errors.message && <span className="text-red-500 text-sm">To pole jest wymagane</span>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Wyślij wiadomość
                </button>
                {isEmailSent && (
                  <div className="text-green-600 text-center py-2">
                    Wiadomość została wysłana pomyślnie!
                  </div>
                )}
              </form>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-primary mr-2" />
                <a href="tel:+48222900004" className="hover:text-primary transition-colors">+ 48 222 900 004</a>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-primary mr-2" />
                <span>ul. Baletowa 84A, 02-867 Warszawa</span>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Godziny otwarcia</h3>
                <p>Poniedziałek - Piątek: 8:00 - 18:00</p>
                <p>Sobota: 9:00 - 14:00</p>
                <p>Niedziela: Zamknięte</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a403a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">BudGood</h3>
              <p className="text-gray-400">
                Profesjonalne usługi remontowe i wykończeniowe dla Twojego domu i biznesu.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Szybki kontakt</h4>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <a href="tel:+48222900004" className="hover:underline hover:underline-offset-8 transition-colors">+ 48 222 900 004</a>
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <a href="mailto:info@budgood.pl" className="hover:underline hover:underline-offset-8 transition-colors">info@budgood.pl</a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Godziny pracy</h4>
              <p className="text-gray-400">Poniedziałek - Piątek: 8:00 - 18:00</p>
              <p className="text-gray-400">Sobota: 9:00 - 14:00</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BudGood. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
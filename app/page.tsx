'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Building2, CheckCircle, Clock, HandshakeIcon, Heart, Home as HomeIcon, Mail, MapPin, Menu, Phone, Star, PenTool as Tool, Trophy, Users, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useToast } from "@/components/ui/use-toast";
import { Logo } from '@/components/logo';
import cn from 'classnames';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { User } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Imię jest za krótkie').max(50),
  email: z.string().email('Nieprawidłowy adres email'),
  phone: z.string().regex(/^\+?[0-9]{9,12}$/, 'Nieprawidłowy numer telefonu'),
  message: z.string().min(10, 'Wiadomość jest za krótka').max(500),
});

type FormData = z.infer<typeof formSchema>;

const FadeInSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-1000',
        inView ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Wiadomość wysłana',
          description: 'Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.',
        });
        reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: 'Błąd',
        description: error.message || 'Przepraszamy, nie udało się wysłać wiadomości. Spróbuj ponownie później.',
        variant: 'destructive',
      });
    }
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+48222900004';
  };

  const menuItems = [
    { href: '#about', label: 'O nas' },
    { href: '#services', label: 'Usługi' },
    { href: '#projects', label: 'Projekty' },
    { href: '#faq', label: 'FAQ' },
    { href: '#reviews', label: 'Opinie' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Logo />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-[#09403A] transition-colors text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Button 
                size="lg"
                className="bg-[#09403A] hover:bg-[#09403A]/90 text-white font-medium px-6"
                asChild
              >
                <a href="#contact">Zamów konsultację</a>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-[#09403A] transition-colors py-2 text-base font-medium border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button 
                    size="lg"
                    className="bg-[#09403A] hover:bg-[#09403A]/90 text-white font-medium mt-4"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <a href="#contact">Zamów konsultację</a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#09403A] text-white py-20 mt-[80px] h-screen">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <FadeInSection>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Profesjonalne remonty mieszkań i domów w Polsce
                </h1>
                <p className="text-lg mb-8 text-muted-foreground">
                  Kompleksowe usługi remontowe z gwarancją jakości. Zaufaj profesjonalistom z wieloletnim doświadczeniem.
                </p>
                <Button
                  onClick={handleCallClick}
                  className="w-full md:w-auto bg-white text-black hover:bg-white hover:text-black hover:scale-110 transition-all duration-300" 
                  size="lg"
                >
                  Bezpłatna wycena
                </Button>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="relative h-[400px] flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d"
                  alt="Remont wnętrza"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">O firmie BudGood</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <FadeInSection>
              <div className="relative h-[300px]">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
                  alt="Nasza firma"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeInSection>
            <FadeInSection>
              <div>
                <p className="text-lg mb-6">
                  BudGood to firma z wieloletnim doświadczeniem w branży remontowo-budowlanej.
                  Specjalizujemy się w kompleksowych remontach mieszkań, domów i lokali użytkowych.
                  Nasz zespół składa się z wykwalifikowanych specjalistów, którzy z pasją podchodzą
                  do każdego projektu.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary" />
                    <span>10+ lat doświadczenia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-primary" />
                    <span>500+ zadowolonych klientów</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tool className="text-primary" />
                    <span>Profesjonalny sprzęt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="text-primary" />
                    <span>Gwarancja jakości</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nasze usługi</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: HomeIcon,
                title: 'Remonty mieszkań',
                description: 'Kompleksowe remonty mieszkań od A do Z',
              },
              {
                icon: Tool,
                title: 'Wykończenia wnętrz',
                description: 'Profesjonalne wykończenia pod klucz',
              },
              {
                icon: Building2,
                title: 'Remonty biur',
                description: 'Modernizacja przestrzeni biurowych',
              },
            ].map((service, index) => (
              <FadeInSection key={index}>
                <Card className="p-6">
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Dlaczego my?</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Terminowość',
                description: 'Dotrzymujemy terminów',
              },
              {
                icon: Star,
                title: 'Jakość',
                description: 'Najwyższa jakość wykonania',
              },
              {
                icon: HandshakeIcon,
                title: 'Profesjonalizm',
                description: 'Wykwalifikowana kadra',
              },
              {
                icon: Heart,
                title: 'Zadowolenie',
                description: 'Gwarancja satysfakcji',
              },
            ].map((item, index) => (
              <FadeInSection key={index}>
                <Card className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <item.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nasze realizacje</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <FadeInSection key={index}>
                <div 
                  className="relative h-[250px] flex items-center justify-center"
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={`/images/projects/project-${index + 1}.jpg`}
                    alt={`Projekt ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={`/images/projects/project-${selectedImage + 1}.jpg`}
              alt={`Projekt ${selectedImage + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Najczęściej zadawane pytania</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Odpowiedzi na pytania dotyczące remontów mieszkań, biur i lokali komercyjnych
            </p>
          </FadeInSection>
          
          {/* Schema.org FAQ микроразметка */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Jakie usługi remontowe oferujecie?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oferujemy kompleksowe usługi remontowe: remonty mieszkań pod klucz, modernizację biur, adaptację lokali użytkowych, wykończenia wnętrz, instalacje elektryczne i hydrauliczne, malowanie, układanie płytek, parkietów i paneli, montaż sufitów podwieszanych oraz prace wykończeniowe."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Czy wykonujecie remonty w starym budownictwie?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, specjalizujemy się w remontach zarówno nowych, jak i starych budynków. Mamy doświadczenie w renowacji kamienic, modernizacji instalacji w starym budownictwie oraz dostosowywaniu historycznych wnętrz do współczesnych standardów, z zachowaniem ich unikalnego charakteru."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Jak wygląda proces realizacji remontu?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Proces rozpoczyna się od bezpłatnej konsultacji i wyceny. Następnie przygotowujemy szczegółowy projekt i harmonogram prac. Podczas remontu zapewniamy stały nadzór, regularne aktualizacje postępu prac oraz dbamy o zachowanie czystości. Każdy etap kończy się odbiorem częściowym."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Czy pomagacie w wyborze materiałów wykończeniowych?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, oferujemy profesjonalne doradztwo w zakresie doboru materiałów wykończeniowych. Współpracujemy z najlepszymi dostawcami w Polsce, co pozwala nam oferować wysokiej jakości materiały w konkurencyjnych cenach. Pomagamy w wyborze rozwiązań dopasowanych do budżetu i oczekiwań."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Czy zapewniacie gwarancję na wykonane prace remontowe?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, na wszystkie wykonane przez nas prace remontowe udzielamy pełnej gwarancji. Pracujemy tylko z certyfikowanymi materiałami i doświadczonymi fachowcami. Zapewniamy również serwis pogwarancyjny i wsparcie techniczne po zakończeniu remontu."
                  }
                }
              ]
            })
          }} />

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="item-1" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 text-lg font-medium hover:text-[#09403A]">
                  Jakie usługi remontowe oferujecie?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  Oferujemy kompleksowe usługi remontowe: remonty mieszkań pod klucz, modernizację biur, 
                  adaptację lokali użytkowych, wykończenia wnętrz, instalacje elektryczne i hydrauliczne, 
                  malowanie, układanie płytek, parkietów i paneli, montaż sufitów podwieszanych oraz prace wykończeniowe.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 text-lg font-medium hover:text-[#09403A]">
                  Czy wykonujecie remonty w starym budownictwie?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  Tak, specjalizujemy się w remontach zarówno nowych, jak i starych budynków. Mamy doświadczenie 
                  w renowacji kamienic, modernizacji instalacji w starym budownictwie oraz dostosowywaniu 
                  historycznych wnętrz do współczesnych standardów, z zachowaniem ich unikalnego charakteru.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 text-lg font-medium hover:text-[#09403A]">
                  Jak wygląda proces realizacji remontu?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  Proces rozpoczyna się od bezpłatnej konsultacji i wyceny. Następnie przygotowujemy szczegółowy 
                  projekt i harmonogram prac. Podczas remontu zapewniamy stały nadzór, regularne aktualizacje 
                  postępu prac oraz dbamy o zachowanie czystości. Każdy etap kończy się odbiorem częściowym.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 text-lg font-medium hover:text-[#09403A]">
                  Czy pomagacie w wyborze materiałów wykończeniowych?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  Tak, oferujemy profesjonalne doradztwo w zakresie doboru materiałów wykończeniowych. 
                  Współpracujemy z najlepszymi dostawcami w Polsce, co pozwala nam oferować wysokiej jakości 
                  materiały w konkurencyjnych cenach. Pomagamy w wyborze rozwiązań dopasowanych do budżetu i oczekiwań.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <AccordionTrigger className="px-6 text-lg font-medium hover:text-[#09403A]">
                  Czy zapewniacie gwarancję na wykonane prace remontowe?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  Tak, na wszystkie wykonane przez nas prace remontowe udzielamy pełnej gwarancji. Pracujemy 
                  tylko z certyfikowanymi materiałami i doświadczonymi fachowcami. Zapewniamy również serwis 
                  pogwarancyjny i wsparcie techniczne po zakończeniu remontu.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Opinie naszych klientów</h2>
            <p className="text-gray-600 text-center mb-12">
              Zobacz, co mówią o nas nasi klienci
            </p>
          </FadeInSection>

          <div className="relative max-w-[1400px] mx-auto">
            
            
            <div className="flex animate-scroll gap-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex gap-6 shrink-0">
                  <Card className="w-[350px] shrink-0 p-6 hover:border-primary/20 transition-colors">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Anna Kowalska</p>
                          <p className="text-sm text-gray-500">Remont mieszkania, Warszawa</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-[#09403A]" fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-gray-600 flex-grow">
                        "Jestem bardzo zadowolona z usług tej firmy. Profesjonalne podejście, terminowość i dbałość o detale. 
                        Remont został wykonany perfekcyjnie, a efekt końcowy przeszedł moje oczekiwania."
                      </p>
                    </div>
                  </Card>

                  <Card className="w-[350px] shrink-0 p-6 hover:border-primary/20 transition-colors">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Piotr Nowak</p>
                          <p className="text-sm text-gray-500">Remont biura, Kraków</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-[#09403A]" fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-gray-600 flex-grow">
                        "Współpraca na najwyższym poziomie. Ekipa remontowa była bardzo kompetentna i pomocna. 
                        Szczególnie doceniam doradztwo w wyborze materiałów i elastyczne podejście do zmian w projekcie."
                      </p>
                    </div>
                  </Card>

                  <Card className="w-[350px] shrink-0 p-6 hover:border-primary/20 transition-colors">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Marek Wiśniewski</p>
                          <p className="text-sm text-gray-500">Remont kuchni i łazienki, Gdańsk</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-[#09403A]" fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-gray-600 flex-grow">
                        "Świetna firma remontowa! Terminowo wykonane prace, profesjonalna obsługa i konkurencyjne ceny. 
                        Polecam każdemu, kto szuka solidnej ekipy remontowej."
                      </p>
                    </div>
                  </Card>

                  <Card className="w-[350px] shrink-0 p-6 hover:border-primary/20 transition-colors">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Katarzyna Lewandowska</p>
                          <p className="text-sm text-gray-500">Remont salonu, Wrocław</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-[#09403A]" fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-gray-600 flex-grow">
                        "Jestem pod wrażeniem jakości wykonanych prac. Ekipa była punktualna, czysta i bardzo dokładna. 
                        Remont przebiegł sprawnie i bez żadnych problemów."
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-[#072623] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Nasi partnerzy</h2>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            {[
              { id: 1, ext: 'webp' },
              { id: 2, ext: 'png' },
              { id: 3, ext: 'png' },
              { id: 4, ext: 'jpg' },
            ].map((partner) => (
              <FadeInSection 
                key={partner.id}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: partner.id * 0.1 }}
                  className="h-[120px] flex items-center justify-center"
                >
                  <Image
                    src={`/images/partners/${partner.id}.${partner.ext}`}
                    alt={`Partner ${partner.id}`}
                    width={200}
                    height={100}
                    className="max-h-[80px] w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                  />
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-[#09403A] text-white">
  <div className="container mx-auto px-4">
    <FadeInSection>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Kontakt</h2>
    </FadeInSection>
    <div className="grid md:grid-cols-2 gap-8">
      <FadeInSection>
        <div>
          <h3 className="text-2xl font-semibold mb-6">Dane kontaktowe</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="text-primary" />
              <a href="tel:+48222900004">+ 48 222 900 004</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" />
              <span>al. Jana Pawła II 23, 01-031 Warszawa</span>
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Imię i nazwisko"
              {...register('name')}
              aria-label="Imię i nazwisko"
              required
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register('email')}
              aria-label="Email"
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Telefon"
              {...register('phone')}
              aria-label="Telefon"
              required
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Textarea
              placeholder="Wiadomość"
              {...register('message')}
              aria-label="Wiadomość"
              required
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-[#072623] hover:text-white"
            size="lg"
          >
            Wyślij wiadomość
          </Button>
        </form>
      </FadeInSection>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-[#072623] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-8 w-8" />
                <span className="text-2xl font-bold">BudGood</span>
              </div>
              <p>Profesjonalne usługi remontowe w całej Polsce</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Szybki kontakt</h3>
              <div className="space-y-2">
                <a href="tel:+48222900004">Tel: +48 222 900 004</a>
                {/* <p>Email: kontakt@budgood.pl</p> */}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Godziny pracy</h3>
              <div className="space-y-2">
                <p>Pon-Pt: 8:00 - 18:00</p>
                <p>Sob: 9:00 - 14:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p> 2025 BudGood. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
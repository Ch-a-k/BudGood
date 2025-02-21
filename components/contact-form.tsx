'use client'; // Указываем, что это клиентский компонент

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'; // Предполагаю, что вы используете shadcn/ui
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FadeInSection } from '@/components/fade-in-section'; // Ваш компонент анимации
import { Phone, MapPin } from 'lucide-react'; // Иконки

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export { ContactForm };

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Sending data:', data);
      const response = await fetch('/api/send-telegram', {
        method: 'POST', // Явно указываем POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error(errorData.error || 'Failed to send message');
      }

      const result = await response.json();
      console.log('Success result:', result);
      alert('Wiadomość wysłana pomyślnie!');
      reset(); // Очищаем форму после успешной отправки
    } catch (error) {
      console.error('Error details:', error);
      alert('Błąd podczas wysyłania wiadomości. Sprawdź konsolę po więcej szczegółów.');
    }
  };

  return (
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
                  {...register('name', { required: 'To pole jest wymagane' })}
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
                  {...register('email', {
                    required: 'To pole jest wymagane',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Podaj poprawny email',
                    },
                  })}
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
                  {...register('phone', { required: 'To pole jest wymagane' })}
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
                  {...register('message', { required: 'To pole jest wymagane' })}
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
  );
}
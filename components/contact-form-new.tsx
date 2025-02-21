'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contactFormSchema } from "@/schema/contact";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactFormNew() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Форматируем сообщение для WhatsApp
      const whatsappMessage = `
*Nowa wiadomość*
*Imię:* ${values.name}
*Email:* ${values.email}
*Telefon:* ${values.phone}
*Wiadomość:* ${values.message}
      `.trim();

      // Номер телефона для WhatsApp (без +)
      const phoneNumber = "48506195869"; // Замените на ваш номер
      
      // Создаем URL для WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Открываем WhatsApp в новом окне
      window.open(whatsappUrl, '_blank');
      
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Formularz kontaktowy</h2>
        <p className="mb-8 text-center text-gray-600">
          Chętnie odpowiemy na Twoje pytania. Wypełnij poniższy formularz.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Imię
            </label>
            <input
              {...form.register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Wprowadź swoje imię"
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              {...form.register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Wprowadź swój email"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Telefon
            </label>
            <input
              {...form.register("phone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Wprowadź swój numer telefonu"
            />
            {form.formState.errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Wiadomość
            </label>
            <textarea
              {...form.register("message")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows={4}
              placeholder="Wprowadź swoją wiadomość"
            />
            {form.formState.errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <FaWhatsapp className="text-xl" />
            <span>Wyślij przez WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
}

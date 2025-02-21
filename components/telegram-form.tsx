'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function TelegramForm() {
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
        cache: 'no-store'
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Wiadomość wysłana pomyślnie!');
        setUserInput({ name: '', email: '', message: '' });
      } else {
        const error = await response.json();
        console.error('Error:', error);
        toast.error(error.message || 'Nie udało się wysłać wiadomości.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Błąd podczas wysyłania wiadomości.');
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Kontakt</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Imię i Nazwisko:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInput.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInput.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Wiadomość:
              </label>
              <textarea
                id="message"
                name="message"
                value={userInput.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Wyślij wiadomość
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

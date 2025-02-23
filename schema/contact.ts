import { z } from "zod";

export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Imię musi mieć co najmniej 2 znaki." })
        .max(50, { message: "Imię nie może przekraczać 50 znaków." }),
    email: z
        .string()
        .email({ message: "Proszę podać prawidłowy adres email." })
        .min(5, { message: "Email musi mieć co najmniej 5 znaków." })
        .max(50, { message: "Email nie może przekraczać 50 znaków." }),
    phone: z
        .string()
        .min(9, { message: "Numer telefonu musi mieć co najmniej 9 znaków." })
        .max(15, { message: "Numer telefonu nie może przekraczać 15 znaków." })
        .regex(/^[0-9+\-\s()]*$/, { message: "Nieprawidłowy format numeru telefonu." }),
    message: z
        .string()
        .min(2, { message: "Wiadomość musi mieć co najmniej 2 znaki." })
        .max(500, { message: "Wiadomość nie może przekraczać 500 znaków." }),
});

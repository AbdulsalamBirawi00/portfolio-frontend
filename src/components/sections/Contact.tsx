"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { staggerContainer, fadeInLeft, fadeInRight } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { ContactInfoData } from "@/types";

const DEFAULT_CONTACT: ContactInfoData = {
  email: "abdalsalamalbirawi@gmail.com",
  phone: "+963 932583562",
  linkedin: "https://linkedin.com/in/abdalsalam-albirawi",
  github: "",
};

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactProps {
  data?: ContactInfoData | null;
}

export default function Contact({ data }: ContactProps) {
  const info = data ?? DEFAULT_CONTACT;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (formData: ContactForm) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const contactItems = [
    {
      Icon: Mail,
      label: "Email",
      value: info.email,
      href: `mailto:${info.email}`,
    },
    {
      Icon: Phone,
      label: "Phone",
      value: info.phone,
      href: `tel:${info.phone.replace(/\s/g, "")}`,
    },
    {
      Icon: FaLinkedinIn,
      label: "LinkedIn",
      value: "abdalsalam-albirawi",
      href: info.linkedin,
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-space-deep/50" />
      <div className="absolute inset-0 bg-nebula-gradient opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          label="Transmission Center"
          title="Open a Channel"
          subtitle="Send a signal through the cosmos — I respond within one orbit"
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left: Contact info */}
          <motion.div variants={fadeInLeft} className="space-y-6">
            <p className="font-mono text-space-cyan text-xs tracking-[0.3em] uppercase mb-8">
              {"// Communication Channels"}
            </p>

            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 bg-space-black/40 border border-space-glow/20 rounded-xl hover:border-space-glow/50 hover:bg-space-glow/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-space-glow/10 border border-space-glow/30 flex items-center justify-center group-hover:border-space-glow group-hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all duration-300 text-space-glow">
                  <item.Icon size={20} />
                </div>
                <div>
                  <p className="font-mono text-space-star/50 text-xs uppercase tracking-widest">
                    {item.label}
                  </p>
                  <p className="text-space-star text-sm group-hover:text-space-cyan transition-colors">
                    {item.value}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto text-space-star/30 group-hover:text-space-cyan group-hover:translate-x-1 transition-all"
                />
              </a>
            ))}

            {/* Availability note */}
            <div className="mt-8 p-4 bg-space-glow/5 border border-space-glow/20 rounded-xl flex gap-3">
              <Sparkles size={16} className="text-space-glow flex-shrink-0 mt-0.5" />
              <p className="font-mono text-space-star/50 text-xs leading-relaxed">
                Available for freelance projects, full-time roles, and exciting
                collaborations across the universe.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={fadeInRight}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="font-mono text-space-star/50 text-xs tracking-widest uppercase block mb-2">
                  Astronaut Name
                </label>
                <input
                  {...register("name")}
                  placeholder="Your full name"
                  className="w-full bg-space-black/60 border border-space-glow/20 rounded-xl px-4 py-3 text-space-star text-sm font-mono focus:outline-none focus:border-space-glow focus:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all duration-300 placeholder-space-star/20"
                />
                {errors.name && (
                  <p className="mt-1 text-red-400 text-xs font-mono">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-space-star/50 text-xs tracking-widest uppercase block mb-2">
                  Signal Frequency (Email)
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-space-black/60 border border-space-glow/20 rounded-xl px-4 py-3 text-space-star text-sm font-mono focus:outline-none focus:border-space-glow focus:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all duration-300 placeholder-space-star/20"
                />
                {errors.email && (
                  <p className="mt-1 text-red-400 text-xs font-mono">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-space-star/50 text-xs tracking-widest uppercase block mb-2">
                  Transmission Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Your message to mission control..."
                  className="w-full bg-space-black/60 border border-space-glow/20 rounded-xl px-4 py-3 text-space-star text-sm font-mono focus:outline-none focus:border-space-glow focus:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all duration-300 placeholder-space-star/20 resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-red-400 text-xs font-mono">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant={status === "success" ? "secondary" : "primary"}
                disabled={status === "sending"}
                className="w-full justify-center"
              >
                {status === "idle" && (
                  <>
                    <Send size={15} />
                    Launch Transmission
                  </>
                )}
                {status === "sending" && (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Transmitting...
                  </>
                )}
                {status === "success" && (
                  <>
                    <CheckCircle size={15} />
                    Transmission Received!
                  </>
                )}
                {status === "error" && (
                  <>
                    <AlertTriangle size={15} />
                    Signal Lost — Retry
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

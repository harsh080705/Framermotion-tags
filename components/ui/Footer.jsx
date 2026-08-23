'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import ContactCanvas from '../canvas/ContactCanvas';
import ContactForm from './ContactForm';
import StaggerButton from './StaggerButton';

const SOCIALS = [
  {
    label: 'GitHub',
    href: '#',
    icon: <Github size={16} />,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: <Linkedin size={16} />,
  },
  {
    label: 'Twitter',
    href: '#',
    icon: <Twitter size={16} />,
  },
  {
    label: 'Email',
    href: 'mailto:hello@example.com',
    icon: <Mail size={16} />,
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/5 bg-transparent"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_70%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-2 md:px-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col"
        >
          <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-md md:h-[440px]">
            <ContactCanvas />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Let&apos;s connect
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map((social) => (
                <StaggerButton
                  key={social.label}
                  href={social.href}
                  text={social.label}
                  variant="secondary"
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={social.label}
                  className="!px-4 !py-2 text-xs"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Get in touch
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Let&apos;s build something{' '}
              <span className="gradient-text">together</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Have a project in mind or just want to say hi? Drop me a message
              and I&apos;ll get back to you shortly.
            </p>
          </div>

          <ContactForm />
        </motion.div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-zinc-500 sm:flex-row md:px-12">
          <p>
            © {new Date().getFullYear()} Your Name. Built with Next.js, R3F &
            Framer Motion.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <a
              href="#"
              className="transition-colors hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

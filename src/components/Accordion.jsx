import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 0.61, 0.36, 1]

function PlusIcon({ isOpen }) {
  return (
    <span className="relative flex h-6 w-6 flex-none items-center justify-center">
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="text-sahara-gold"
      >
        <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.3" />
        <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.3" />
      </motion.svg>
    </span>
  )
}

function AccordionItem({ question, answer, isOpen, onToggle, isFirst }) {
  return (
    <div className={`border-b border-line-soft ${isFirst ? 'border-t border-desert-night' : ''}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-8 py-8 text-start"
      >
        <span className="font-serif text-xl font-normal leading-snug text-desert-night transition-colors duration-base ease-out group-hover:text-sahara-gold md:text-2xl">
          {question}
        </span>
        <PlusIcon isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.35, ease: EASE } }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] pb-9 text-base leading-relaxed text-night-soft">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          isFirst={i === 0}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
        />
      ))}
    </div>
  )
}

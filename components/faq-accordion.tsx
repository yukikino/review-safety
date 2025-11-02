'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="card overflow-hidden">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left p-5 flex items-start gap-4 transition-colors hover:bg-gray-50"
          >
            <span
              className="flex-shrink-0 text-xl transition-transform"
              style={{
                transform: openIndex === index ? 'rotate(90deg)' : 'rotate(0deg)',
                color: 'var(--primary-blue)',
              }}
            >
              ▶
            </span>
            <div className="flex-1">
              <h3 className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                {faq.question}
              </h3>
            </div>
          </button>
          {openIndex === index && (
            <div
              className="px-5 pb-5 pl-14 animate-fadeInUp"
              style={{ color: 'var(--foreground-muted)' }}
            >
              <p className="leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

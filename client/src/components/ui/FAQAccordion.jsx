import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items, allowMultiple = false }) {
  const [openIndexes, setOpenIndexes] = useState([0]); // first open by default

  const toggleIndex = (index) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="space-y-3.5 max-w-4xl xl:max-w-5xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-primary/40 shadow-card-soft ring-1 ring-primary/20'
                : 'bg-white/80 border-slate-200 hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              aria-expanded={isOpen}
            >
              <span className="font-heading font-semibold text-base sm:text-lg text-navy-900 pr-4">
                {item.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-navy-900'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-content-muted leading-relaxed border-t border-slate-100">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

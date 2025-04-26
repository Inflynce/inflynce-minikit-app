import React from 'react';
import HowItWorksContent from '@/components/dialogs/HowItWorksContent';
import FAQContent from '@/components/dialogs/FAQContent';
import AboutContent from '@/components/dialogs/AboutContent';
import ContactContent from '@/components/dialogs/ContactContent';

export interface DialogContentType {
  title: string;
  content: React.ReactNode;
}

export const getDialogContent = (type: string): DialogContentType => {
  switch (type) {
    case 'how-it-works':
      return {
        title: 'How It Works',
        content: <HowItWorksContent />,
      };
    case 'faq':
      return {
        title: 'Frequently Asked Questions',
        content: <FAQContent />,
      };
    case 'about':
      return {
        title: 'About',
        content: <AboutContent />,
      };
    case 'contact':
      return {
        title: 'Contact Us',
        content: <ContactContent />,
      };
    default:
      return {
        title: '',
        content: null,
      };
  }
};

// Standard menu items that can be reused
export const standardMenuItems = [
  // { label: 'How it works?', key: 'how-it-works' },
  { label: 'FAQ', key: 'faq' },
  { label: 'About', key: 'about' },
  { label: 'Contact', key: 'contact' },
];

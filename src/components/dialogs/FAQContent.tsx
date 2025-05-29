import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const InflyncePointsInfo = () => {
  return (
    <Typography variant="body2">
      Inflynce Points are off-chain reputation units that reflect your daily contribution on
      Farcaster. Each day, 1,000 IPs are distributed to users based on their Mindshare Score. You
      can use IP to unlock Partner Tasks, claim rewards and access exclusive opportunities within
      the protocol.
    </Typography>
  );
};

const FAQContent: React.FC = () => {
  const faqs = [
    {
      question: 'What is Inflynce Protocol?',
      answer: (
        <Typography variant="body2">
          Inflynce is a coordination layer that helps onchain projects reach real users by scoring
          and filtering social behavior across Farcaster.
        </Typography>
      ),
    },
    {
      question: 'What does Inflynce measure?',
      answer: (
        <Typography variant="body2">
          We track real-time engagement like follows, recasts, replies and likes to score users
          based on authentic activity, not hype.
        </Typography>
      ),
    },
    {
      question: 'What is Mindshare Score?',
      answer: (
        <Typography variant="body2">
          Mindshare is a percentile-based influence score that reflects how relevant and active a
          user is across Farcaster compared to others.
        </Typography>
      ),
    },
    {
      question: 'What are Inflynce Points (IP)?',
      answer: (
        <Typography variant="body2">
          Inflynce Points are non-transferable units earned daily based on your Mindshare Score. You
          use them to join Partner Tasks and unlock rewards.
        </Typography>
      ),
    },
    {
      question: 'What are Partner Tasks?',
      answer: (
        <Typography variant="body2">
          Partner Tasks are campaigns created by Farcaster-native projects. Complete simple actions
          like following, liking or minting to earn NFTs or tokens.
        </Typography>
      ),
    },
    {
      question: 'Who can create these tasks?',
      answer: (
        <Typography variant="body2">
          Any project, community or app can launch tasks via Inflynce after subscribing. We provide
          targeting tools, filters and anti-bot protection.
        </Typography>
      ),
    },
    {
      question: 'What makes Inflynce Sybil-resistant?',
      answer: (
        <Typography variant="body2">
          We filter all user activity through Mindshare history and NFT ownership, reducing bots and
          farming.
        </Typography>
      ),
    },
    {
      question: 'How do I benefit as a user?',
      answer: (
        <Typography variant="body2">
          You gain IP, improve your visibility, qualify for exclusive tasks and earn NFTs from real
          projects, just by showing up and contributing.
        </Typography>
      ),
    },
    {
      question: 'How do I benefit as a project?',
      answer: (
        <Typography variant="body2">
          You reach verified users, automate distribution, track engagement and launch
          airdrop-friendly tasks - all without building your own system.
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ p: 0 }}>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{faq.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQContent;

import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const InflyncePointsInfo = () => {
  return (
    <Typography variant="body2">
      Inflynce Points are off-chain units used within the protocol's economy. Every day, 1,000 IPs
      are distributed to users based on their mindshare performance. You can earn more by completing
      daily tasks and winning predictions.
    </Typography>
  );
};

const FAQContent: React.FC = () => {
  const faqs = [
    {
      question: 'What is Inflynce Protocol?',
      answer: (
        <Typography variant="body2">
          Inflynce Protocol is a decentralized coordination layer for social influence. Instead of
          trading tokens, you engage with real behavior: predicting which users' reputations will
          rise or fall - powered by our AI-driven Mindshare Algorithm.
        </Typography>
      ),
    },
    {
      question: 'How are mindshare scores calculated?',
      answer: (
        <Typography variant="body2">
          We use a proprietary scoring model that analyzes post quality and engagement patterns.
          Each action (like, repost, mention) feeds into our AI engine to calculate a real-time,
          percentile-based influence score.
        </Typography>
      ),
    },
    {
      question: 'What are Inflynce Points (IP)?',
      answer: <InflyncePointsInfo />,
    },
    {
      question: 'What can I do with IP?',
      answer: (
        <Typography variant="body2">
          You use IP to predict on other users. If you believe someone is gaining influence, you
          boost them. If not, you fade them. Each prediction costs IP but smart predictors earn more
          when their predictions align with real outcomes.
        </Typography>
      ),
    },
    {
      question: 'What is "Prediction" at Inflynce?',
      answer: (
        <>
          <Typography variant="body2">
            At Inflynce, a prediction is a reputation forecast. You're not voting based on
            popularity - you're signaling who you believe will rise or fall in influence based on
            real engagement trends.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            When you use Inflynce Points (IP) to predict someone's momentum, you're actively shaping
            visibility across the network.
          </Typography>
          <Typography variant="body2" component="div">
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>Boosting means you believe their mindshare will grow.</li>
              <li>Fading means you expect their influence to decline.</li>
            </ul>
          </Typography>
          <Typography variant="body2">
            Smart predictions earn you more IP. Inaccurate ones cost you. It's not a popularity
            contest. It's a social reputation market - powered by behavior, not hype.
          </Typography>
        </>
      ),
    },
    {
      question: 'How does "Prediction" work?',
      answer: (
        <>
          <Typography variant="body2">
            Predict Reputation. Earn Inflynce Points. Shape Visibility.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>a. Watch the Signals</strong>
          </Typography>
          <Typography variant="body2">
            Every user on Farcaster has a live Mindshare Score, calculated by our AI engine. The
            score reflects real-time engagement, content quality and interaction velocity across the
            network. You can explore heatmaps, trend charts and leaderboards - all updating
            continuously.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>b. Make a Prediction</strong>
          </Typography>
          <Typography variant="body2">
            Use your Inflynce Points (IP) to boost or fade any user based on their current
            performance.
          </Typography>
          <Typography variant="body2" component="div">
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>Boost = You believe their mindshare will increase</li>
              <li>Fade = You believe their visibility will decline</li>
            </ul>
          </Typography>
          <Typography variant="body2">
            You choose how much IP to commit. The more accurate your predictions, the more IP you
            earn. Predictions are open every Monday to Wednesday, forecasting who will rise or fall
            in the 7-day cycle ahead.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>c. Let the Network Move</strong>
          </Typography>
          <Typography variant="body2">
            Mindshare Scores evolve constantly based on verified engagement data. Your predictions
            are tracked silently in the background.
          </Typography>
          <Typography variant="body2">Each week, you'll be able to review:</Typography>
          <Typography variant="body2" component="div">
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>Who you boosted or faded</li>
              <li>Whether they moved in the direction you predicted</li>
              <li>How much IP you earned from accurate calls</li>
            </ul>
          </Typography>
          <Typography variant="body2">
            At the end of each cycle, scores are finalized - and users on the winning side share
            rewards from the losing pool.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>d. Earn & Climb</strong>
          </Typography>
          <Typography variant="body2">
            Successful predictions increase your own predictor reputation and reward you with bonus
            Inflynce Points. You can use earned IP to climb the leaderboard, complete quests and
            make bolder moves in the next round.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This isn't a financial bet, it's a reputation economy where accuracy earns visibility.
            Every action moves the social graph and shapes who gets seen.
          </Typography>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="body1" gutterBottom>
        Frequently asked questions about Social Mindshare Prediction:
      </Typography>

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

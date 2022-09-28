import { useState } from 'react';

import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';

import styles from './Feedback.module.css';

export default function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const btnName = { good, neutral, bad };

  const onButtonClick = buttonName => {
    switch (buttonName) {
      case 'good':
        setGood(s => s + 1);
        break;

      case 'neutral':
        setNeutral(s => s + 1);
        break;

      case 'bad':
        setBad(s => s + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const values = [good, neutral, bad];
    return values.reduce((previousValue, number) => {
      return previousValue + number;
    }, 0);
  };

  const total = countTotalFeedback();

  const countPositiveFeedbackPercentage = () => {
    return Math.round(good / (total / 100));
  };

  return (
    <div className={styles.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onButtonClick={onButtonClick}
          buttonName={Object.keys(btnName)}
        />
      </Section>
      <Section title="Statistics">
        {!Boolean(total) && <Notification message="There is no feedback" />}
        {Boolean(total) && (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
}

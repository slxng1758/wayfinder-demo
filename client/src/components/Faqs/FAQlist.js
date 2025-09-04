import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import FAQItem from './FAQitem';
import { CircularProgress, Alert, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Papa from 'papaparse';

const speakText = (text, lang) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'en-US';
    speechSynthesis.speak(utterance);
  } else {
    alert('Sorry, your browser does not support text-to-speech.');
  }
};

function FAQList() {
  const { site } = useParams(); // birchmount or centenary
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en-US');
  const faqRefs = useRef([]);

  useEffect(() => {
    const loadFAQData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/data/${site}_faq.csv`);

        if (!response.ok) {
          throw new Error(`Failed to fetch FAQ data: ${response.statusText}`);
        }

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false,
          delimiter: ',',
          complete: (results) => {
            if (results.errors.length) {
              setError('Error parsing FAQ data');
              setLoading(false);
              return;
            }

            const processedData = results.data
              .map(row => {
                const cleanedRow = {};
                Object.keys(row).forEach(key => {
                  const cleanKey = key.trim();
                  cleanedRow[cleanKey] = row[key];
                });

                if (cleanedRow.answer) {
                  cleanedRow.answer = cleanedRow.answer.replace(/\\n/g, '\n');
                }

                return {
                  question: cleanedRow.question || '',
                  answer: cleanedRow.answer || '',
                  image: cleanedRow.image?.trim() || null
                };
              })
              .filter(item => item.question.trim());

            setFaqData(processedData);
            setLoading(false);
          },
          error: () => {
            setError('Error parsing CSV file');
            setLoading(false);
          }
        });
      } catch (e) {
        setError(`Error loading FAQ data: ${e.message}`);
        setLoading(false);
      }
    };

    loadFAQData();
  }, [site]);

  useEffect(() => {
    const combo = document.querySelector('.goog-te-combo');

    if (combo) {
      const updateLangFromGoogle = () => {
        const langMap = {
          en: 'en-US',
          es: 'es-ES',
          fr: 'fr-FR',
          de: 'de-DE',
          zh: 'zh-CN',
          hi: 'hi-IN',
          ar: 'ar-SA'
        };
        setLanguage(langMap[combo.value] || 'en-US');
      };

      updateLangFromGoogle();
      combo.addEventListener('change', updateLangFromGoogle);
      return () => combo.removeEventListener('change', updateLangFromGoogle);
    }
  }, []);

  const handleSpeak = (index) => {
    const node = faqRefs.current[index];
    if (node) {
      const translatedText = node.innerText;
      speakText(translatedText, language);
    }
  };

  if (loading) {
    return (
      <div className="faq-list">
        <div className="title-container">
          <h1 className="title">Frequently Asked Questions</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="faq-list">
        <div className="title-container">
          <h1 className="title">Frequently Asked Questions</h1>
        </div>
        <Alert severity="error" style={{ margin: '20px' }}>
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="faq-list">
      <div className="title-container">
        <h1 className="title">Frequently Asked Questions</h1>
      </div>

      {faqData.map((faq, index) => (
        <div 
          key={index} 
          style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
        >
          <div ref={(el) => faqRefs.current[index] = el} style={{ flex: 1 }}>
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              image={faq.image}
              isFirst={index === 0}
              isLast={index === faqData.length - 1}
            />
          </div>
          <IconButton
            onClick={() => handleSpeak(index)}
            aria-label="read aloud"
          >
            <VolumeUpIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export default FAQList;

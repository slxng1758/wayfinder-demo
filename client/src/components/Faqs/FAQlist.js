import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FAQItem from './FAQitem';
import { CircularProgress, Alert } from '@mui/material';
import Papa from 'papaparse';

function FAQList() {
  const { site } = useParams();      // get birchmount or centenary
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

            const processedData = results.data.map(row => {
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
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          image={faq.image}
          isFirst={index === 0}
          isLast={index === faqData.length - 1}
        />
      ))}
    </div>
  );
}

export default FAQList;

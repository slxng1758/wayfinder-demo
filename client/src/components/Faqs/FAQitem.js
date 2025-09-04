import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQItem({ question, answer, image, isFirst, isLast }) {
  // function to render text with line breaks
  const renderTextWithLineBreaks = (text) => {
    if (!text) return '';
    
    return text.split('\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <Accordion 
      disableGutters
      sx={{
        borderRadius: isFirst ? '8px 8px 0 0 !important' : isLast ? '0 0 8px 8px !important' : '0 !important',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight="600">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <Typography style={{ marginBottom: image ? '16px' : '0' }}>
            {renderTextWithLineBreaks(answer)}
          </Typography>
          {image && (
            <img 
              src={image} 
              alt="FAQ image" 
              className="faq-image"
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginTop: '8px',
                borderRadius: '4px'
              }}
            />
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default FAQItem;
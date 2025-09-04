import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import Typography from '@mui/material/Typography';
import './style.css';

//This class creates the accordion menu, using MUI accordion menu api

const AccordionMenu = (props) => {    
    //destructuring the props
    const {info, startIdx, endIdx, filteredInfo, index} = props;

    //add all the indices of objects (referring to the huge array of objects in index.js)
    //the way menu items are displayed is by index from the huge array of objects
    const indices = [];
    for(let i = startIdx; i <= endIdx; i++) {
        indices.push(i);
    }    

    //used to render the "\n" in the object description as an actual line break
    const renderDescription = (description) => {
        return { __html: description.replace(/\n/g, '<br>') };
    }


    //if the tab index is 7, meaning that user has clicked on the "all" tab, return EVERY DIRECTORY
    // 1) this is shown by using filteredInfo.map
    // 2) if the tab index != 7, only return the tabs that have been added into the "indices" array
    return (
        <> 
        {index === 7? 
              <>
              {filteredInfo.map(unit => (
                <Accordion disableGutters key={unit.name}> 
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"    
                >
                    {unit.name}
                </AccordionSummary>
                <AccordionDetails>
                    <div dangerouslySetInnerHTML={renderDescription(unit.description)} />
                    <img src={unit.image} alt= {unit.name + "image"} className="mapImage"></img>
                </AccordionDetails>
              </Accordion>
              ))}
            </>
        :
        <>
        {indices.map(idx => (
            <Accordion disableGutters key={idx}> 
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"    
                >
                
                <Typography fontWeight="600">{info[idx].name}</Typography>    
                </AccordionSummary>
                <AccordionDetails>
                    <div dangerouslySetInnerHTML={renderDescription(info[idx].description)} />
                    <img src={info[idx].image} alt= {info[idx].name + "image"} className="map-image"></img>
                </AccordionDetails>
            </Accordion>
        ))}
        </>
    }
    </>
    );
}
export default AccordionMenu

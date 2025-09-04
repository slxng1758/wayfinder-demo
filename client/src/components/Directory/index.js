//imports
import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccordionMenu from './accordion';
import SearchBar from './searchbar';
import Papa from 'papaparse';
import Fuse from 'fuse.js'

// Gets ranges of indices for each letter group
function getLetterRangeIndices(directory, startLetter, endLetter) {

  // Makes comparison case insensitive
  const startLetterLower = startLetter.toLowerCase();
  const endLetterLower = endLetter.toLowerCase();

// Filter the directory: Find items starting with letters between startLetter and endLetter
  const filteredItems = directory.filter(item => {
    const firstLetter = item.name[0].toLowerCase();
    return firstLetter >= startLetterLower && firstLetter <= endLetterLower;
  });

  if (filteredItems.length === 0) {
    return { startIdx: -1, endIdx: -1 };
  }

  // Get the start index 
  const startIdx = directory.indexOf(filteredItems[0]);

  // Get the end index 
  const endIdx = directory.indexOf(filteredItems[filteredItems.length - 1]);

  return { startIdx, endIdx };
}

// Letter groups for range (Hard Coded)
const letterGroups = [
  ['A', 'D'],
  ['E', 'H'],
  ['I', 'L'],
  ['M', 'N'],
  ['O', 'R'],
  ['S', 'Z'],
  ['0', '9'],
  ['0', 'Z'],
];

// Tab functionality
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props; // Array destructuring for props

//from MUI, defines props and accessibility
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
{/* Tabs are defined by the index*/}
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Sets the expected (required) prop types for the tab panel.
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// MAIN CLASS COMPONENT
class Directory extends React.Component {
  state = {
    tabIndex: 0, // Default
    searchInput: '',
    isEnglish: true, // Sets default language to English
    csvData: null,
    filteredDirectoryIndices: [],
  };

// isEnglish? Language states
  componentDidMount() {
// Initialize language detection
    this.updateLanguageState();
    this.loadCSVData();

// Observe changes to the `lang` attribute on <html>
    this.observer = new MutationObserver(() => {
      this.updateLanguageState();
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  componentWillUnmount() {
// Cleanup observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

// Updates 'isEnglish' state based on the `lang` attribute on <html>
  updateLanguageState = () => {
    const lang = document.documentElement.lang;
    this.setState({ isEnglish: lang === "en" });
  };

  // Sets the value to newValue
  handleChange = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  handleSearchChange = (input) => {
    const { csvData } = this.state; // Access csvData from the component's state

    this.setState({ tabIndex: 8, searchInput: input }); // Set tabIndex to 9 for the "All" tab and update searchInput

    // Use Fuse.js for typo-tolerant search
    const fuse = new Fuse(csvData, {
      keys: ['name'], // Search by name property
      threshold: 0.3 // tolerence threshold (How fuzzy the search is) Lower values = more strict, higher values = more fuzzy
    });

    //  Use Fuse.js to perform the search to get items that match the input
    const filteredDirectoryIndices = input
      ? fuse.search(input).map(result => result.item)
      : csvData;

    this.setState({ filteredDirectoryIndices });
  };

// Loads csv data using papaparse directly
  loadCSVData = () => {
    const { site } = this.props; // Access the site from props
    const csvPath = `/data/${site}_data.csv`; // Dynamically changes which data is read based on which site

    // Fetch the CSV file
    fetch(csvPath)
      .then((response) => response.text()) // Convert response to text
      .then((csvString) => {
        // Use Papa.parse directly
        Papa.parse(csvString, {
          header: true, // Use the first row as header
          skipEmptyLines: true, // Skip empty lines
          complete: (results) => {
            // Sort the results by name alphabetically
            const sortedData = results.data.sort((a, b) => {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              return nameA.localeCompare(nameB);
            });
            
            // Update the state with the sorted data
            this.setState({ 
              csvData: results.data, // Set the parsed CSV data to state
              filteredDirectoryIndices: results.data // Initialize filteredDirectoryIndices with all items
            });
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  };

  render() {
    const { tabIndex, isEnglish, csvData, filteredDirectoryIndices } = this.state;

    const activeDirectory = csvData
      ? [...csvData].sort((a, b) => { // Sort name alphabetically using a shallow copy of csvData
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return nameA.localeCompare(nameB);
        })
      : [];

    const importantDirectoryItems = activeDirectory.filter((item) => item.important === 'TRUE'); // Filter important items from the directory

    // Dynamically generate index group
    const indexList = letterGroups.map(([startLetter, endLetter]) =>
      getLetterRangeIndices(activeDirectory, startLetter, endLetter)
    );

    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
          <div className="directories-title">
            <h1 className="title">Directories</h1>
          </div>

          {isEnglish && <SearchBar info={activeDirectory} onSearchChange={this.handleSearchChange} />}
        </div>

        {isEnglish && ( // English tabs (all tabs included)
          <Box sx={{ width: '100%' }}>
            <div className="notranslate">
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={this.handleChange} variant="scrollable" scrollButtons="auto"
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#48beb0', // Change the color of the indicator
                    },
                    '& .MuiTab-root': {
                      '&.Mui-selected': {
                        color: '#48beb0', // Change the color for selected
                      },
                    },
                  }}
                  aria-label="Alphabetical quick tabbing system for directory"
                >
                  <Tab label="★" />
                  <Tab label="A-D" />
                  <Tab label="E-H" />
                  <Tab label="I-L" />
                  <Tab label="M-N" />
                  <Tab label="O-R" />
                  <Tab label="S-Z" />
                  <Tab label="Units" />
                  <Tab label="All" />
                </Tabs>
              </Box>
            </div>
            

            {/* Tab for * (index 0) */}
            {tabIndex === 0 && (
              <CustomTabPanel value={tabIndex} index={0}>
                <AccordionMenu info={importantDirectoryItems} startIdx={0} endIdx={importantDirectoryItems.length - 1} />
              </CustomTabPanel>
            )}

            {/*A-D / S-Z indices 0-5 */}
            {indexList.slice(0, 6).map((range, idx) =>
              range.startIdx !== -1 && range.endIdx !== -1 ? (
                <CustomTabPanel key={idx + 1 } value={tabIndex} index={idx + 1}>
                  <AccordionMenu info={activeDirectory} startIdx={range.startIdx} endIdx={range.endIdx} />
                </CustomTabPanel>
              ) : null
            )}

            {/* Has to find a letter directly followed by a number for Units*/}
            {tabIndex === 7 && (
              <CustomTabPanel value={tabIndex} index={7}>
                <AccordionMenu
                  info={activeDirectory.filter((item) => /\d[A-Za-z]/.test(item.name))}
                  startIdx={0}
                  endIdx={activeDirectory.filter((item) => /\d[A-Za-z]/.test(item.name)).length - 1}
                />
              </CustomTabPanel>
            )}

            {/* Tab for All (index 7) */}
            {tabIndex === 8 && (
              <CustomTabPanel value={tabIndex} index={8}>
                <AccordionMenu info={filteredDirectoryIndices} startIdx={0} endIdx={filteredDirectoryIndices.length - 1} />
              </CustomTabPanel>
            )}
          </Box>
        )}

        {/* Non English table */}
        {!isEnglish && (
          <Box sx={{ width: '100%' }}>
            <CustomTabPanel value={tabIndex} index={0}>
            {/* Content for tab index 0 */}
              <AccordionMenu info={importantDirectoryItems} startIdx={0} endIdx={importantDirectoryItems.length - 1} />
            </CustomTabPanel>
          </Box>
        )}
      </>
    );
  }
}

export default Directory;

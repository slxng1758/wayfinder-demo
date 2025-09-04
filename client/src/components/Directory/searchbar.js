import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

//creates a search bar function component
const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const { info, onSearchChange } = props; //destructuring the props

  //triggered whenever use types in the textfield (onChange is built in react event triggered whenever the value of an input field changes)
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value); //updates the state which causes the component to re-render (happens with react components)
    onSearchChange(e.target.value);
  };


  //styles and handles the search input
  return (
    <div>
    <TextField 
        id="outlined-basic" 
        label="Find Hospital Unit/Department" 
        variant="outlined" 
        onChange={handleChange} 
        value={searchInput}
        sx={{
          zIndex: 0,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#48beb0', // Default border color
            },
            '&:hover fieldset': {
              borderColor: '#48beb0', // Border color when hovering
            },
            '&.Mui-focused fieldset': {
              borderColor: '#48beb0', // Border color when focused
            },
          },
        }}
            InputProps={{
        startAdornment: <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>,
        }}

        style={{width: '60vw'}}

        />
    </div>
  );
};

export default SearchBar;


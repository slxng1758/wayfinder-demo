import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import './style.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { dividerClasses } from '@mui/material';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 500,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '& .MuiTypography-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      // border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.2,
  transition: theme.transitions.create('opacity'),
}));



class Landing extends Component {
  render() {
    const { images } = this.props;
    return (
      <div className="outside-box">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', position: 'absolute', left: '0',}}>
          {images.map((image) => (
            <ImageButton
              className="notranslate"
            focusRipple
              key={image.title}
              style={{
                width: `${100/images.length}%`,
                // height: 'calc(100vh - 126px)',
                height: window.innerWidth < 599 ? 'calc(50vh - 95px)' : 'calc(100vh - 126px)',
              }}
              onClick={() => this.props.navigate(image.url)}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.srcPath})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="h5"
                  color="black"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
       </div>
    )
  }
}

export default withRouter(Landing);
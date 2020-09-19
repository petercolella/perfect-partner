import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useArrowFade from '../../hooks/useArrowFade';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

const useStyles = makeStyles(theme => ({
  arrows: {
    color: 'white'
  }
}));

const StyledKeyboardArrowLeft = withStyles(theme => ({
  root: {
    marginLeft: '-0.5em'
  }
}))(KeyboardArrowLeft);

const HorizontalScrollArrows = () => {
  const matches = useMediaQuery('(max-width:770px)');
  const [arrowOneFade, arrowTwoFade, arrowThreeFade] = useArrowFade(
    matches,
    200
  );

  const classes = useStyles();

  return (
    <>
      {matches && (
        <Typography align="right" className={classes.arrows} variant="h4">
          <Fade in={arrowOneFade} timeout={1000}>
            <StyledKeyboardArrowLeft fontSize="inherit" />
          </Fade>
          <Fade in={arrowTwoFade} timeout={1000}>
            <StyledKeyboardArrowLeft fontSize="inherit" />
          </Fade>
          <Fade in={arrowThreeFade} timeout={1000}>
            <StyledKeyboardArrowLeft fontSize="inherit" />
          </Fade>
        </Typography>
      )}
    </>
  );
};

export default HorizontalScrollArrows;

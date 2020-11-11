import { Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const ButtonTest = ({title}) => {
    return (
        <div>
            <Button variant="contained" color="primary">
                {title}
            </Button>
        </div>
    );
};

ButtonTest.propTypes = {
    /** @ignore */
    /** The name of the button to click. */
    title: PropTypes.string.isRequired,
  };
  

export default ButtonTest;
import React from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ImgURLInput = styled(Input)({
  color: 'black',
  cursor: 'pointer',
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'row',
  width: '80%',
  minHeight: '100px',
});

const StyledFormControl = styled(FormControl)({
  flex: '1 0 auto',
  maxWidth: 'calc(100% - 108px)',
});

const StyledButton = styled(Button)({
  minWidth: '108px',
  marginTop: '16px',
  minHeight: '36px',
  maxHeight: '36px',
});

const ImgAdditionForm = ({ bookId, imgAddition: formState }) => {
  const handleChange = (e) => {
    console.log('input.value: ', e.target.value);
    formState.updateImgURL(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    formState.addImage(bookId);
  };
  console.log('rendered');
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledFormControl error={formState.isErrorState}>
        <InputLabel htmlFor="image-url-input">Image URL</InputLabel>
        <ImgURLInput
          id="image-url-input"
          value={formState.imgURL}
          onChange={handleChange}
          type="text"
        />
        {
          formState.isErrorState
            ? <FormHelperText id="component-error-text">{formState.errorMessage}</FormHelperText>
            : null
        }
      </StyledFormControl>
      <StyledButton color="secondary" type="submit">
        {
          formState.postingInProgress
            ? <CircularProgress size={20} />
            : <Typography>Add Image</Typography>
        }
      </StyledButton>
    </StyledForm>
  );
};


ImgAdditionForm.propTypes = {
  bookId: PropTypes.string.isRequired,
  imgAddition: PropTypes.shape({}).isRequired,
};

export default inject('imgAddition')(observer(ImgAdditionForm));

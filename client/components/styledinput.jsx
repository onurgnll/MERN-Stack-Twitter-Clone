/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';

const StyledInput = styled('input')({
  border: 'none', // Native input border'i kaldır
  minWidth: 0, // Native input genişliğini kaldır
  outline: 0, // Native input çerçevesini kaldır
  padding: 0, // Native input iç boşluğunu kaldır
  paddingTop: '1em',
  flex: 1,
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  textOverflow: 'ellipsis',
  '&::placeholder': {
    opacity: 0,
    transition: '0.1s ease-out',
  },
  '&:focus::placeholder': {
    opacity: 1,
  },
  '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
    top: '0.5rem',
    fontSize: '0.75rem',
  },
  '&:focus ~ label': {
    color: 'var(--Input-focusedHighlight)',
  },
  '&:-webkit-autofill': {
    alignSelf: 'stretch', // Kök yuvasının yüksekliğini doldurmak için
  },
  '&:-webkit-autofill:not(* + &)': {
    marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
    paddingInlineStart: 'var(--Input-paddingInline)',
    borderTopLeftRadius:
      'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    borderBottomLeftRadius:
      'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
  },
});

const StyledLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  lineHeight: 1,
  top: 'calc((var(--Input-minHeight) - 1em) / 2)',
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));

const InnerInput = React.forwardRef(function InnerInput(props, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledInput key={id} {...props} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>{props.label}</StyledLabel>
    </React.Fragment>
  );
});

export default function FloatingLabelInput({ inputValue, onInputChange, type, placeholder, label }) {



  return (
    <Input
      slots={{ input: InnerInput }}
      slotProps={{ input: { placeholder: placeholder, type: type, value: inputValue, label: label } }}
      onChange={onInputChange}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
      }}
    />
  );
}
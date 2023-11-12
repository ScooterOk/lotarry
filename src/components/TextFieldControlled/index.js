import React, { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, Typography } from '@mui/material';
import InputMask from 'react-input-mask';

const TextFieldControlled = forwardRef((props, ref) => {
  const {
    control,
    name,
    label,
    errors,
    rules,
    onFocus,
    onBlur,
    placeholder = '',
    fullWidth = true,
    layout = 'vertical',
    color = 'shades.500',
    type = 'text',
    required = false,
    labelSpacing = 1,
    mask,
    maskPlaceholder = '',
    trigger,
    multiline = false,
    minRows = 4,
    maxRows = 4,
    disabled = false,
    readOnly = false,
    size = 'medium',
  } = props;

  const getError = (errors, name) => {
    const keys = name.split('.');
    let value = errors;
    for (let key of keys) {
      if (!value || typeof value !== 'object' || !(key in value)) {
        return undefined;
      }
      value = value[key];
    }
    return value;
  };

  return (
    <Controller
      name={name}
      control={control}
      {...(rules && { rules })}
      render={({ field }) => (
        <FormControl
          fullWidth={fullWidth}
          disabled={disabled}
          {...(layout === 'horizontal' && {
            sx: {
              flexDirection: 'row',
              alignItems: 'center',
            },
          })}
        >
          {!!label && (
            <InputLabel
              shrink
              required={required}
              sx={{
                position: 'static',
                transform: 'none',
                fontSize: 14,
                lineHeight: '20px',
                color,
                mb: layout === 'vertical' ? labelSpacing / 2 : 0,
                mr: layout === 'horizontal' ? labelSpacing : 0,
                flexShrink: 0,
              }}
            >
              {label}
            </InputLabel>
          )}
          {mask ? (
            <InputMask mask={mask} {...field} ref={ref} maskPlaceholder={maskPlaceholder} readOnly={readOnly}>
              <OutlinedInput error={!!getError(errors, name)} placeholder={placeholder} fullWidth={fullWidth} type={type} size={size} />
            </InputMask>
          ) : (
            <OutlinedInput
              ref={ref}
              {...field}
              error={!!getError(errors, name)}
              placeholder={placeholder}
              fullWidth={fullWidth}
              onFocus={(e) => {
                if (onFocus) onFocus(e);
              }}
              onBlur={(e) => {
                field.onBlur(e);
                if (onBlur) onBlur(e);
              }}
              type={type}
              onChange={(e) => {
                field.onChange(e.currentTarget.value);
                if (trigger) trigger(name);
              }}
              multiline={multiline}
              minRows={minRows}
              maxRows={maxRows}
              size={size}
            />
          )}

          {!!getError(errors, name)?.message && (
            <FormHelperText
            // sx={{
            //   width: 1,
            //   position: 'absolute',
            //   left: '100%',
            //   top: 6,
            // }}
            >
              <Typography variant={'hint'} color={'error.main'}>
                {getError(errors, name)?.message}
              </Typography>
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
});

TextFieldControlled.displayName = 'TextFieldControlled';
export default TextFieldControlled;

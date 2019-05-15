import * as React from 'react';
import styled from 'styled-components';
import { ILabelProps, ISharedFormProps } from '../Shared/index'

type InputType = 'text' | 'password' | 'email' | 'number'

export interface ITextFieldProps extends ILabelProps, ISharedFormProps {
  id?: string;
  multiline?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  type?: InputType;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Input = styled.input`
  /* font-size: 1.5em; */
`;

export const TextField = (props: ITextFieldProps) => {
  const inputProps = {
    // ...props,
    // height: props.height || 'm',
    // labelWidth: props.labelWidth || 'm',
    // type: props.type || 'text',
    value: props.value || '',
    // width: props.width || 'm',
    onChange: props.onChange,
  }

  return (
    <input {...inputProps} />
  )
}


import * as React from 'react';

export interface ILabelProps {
  label?: string;
  labelWidth?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'fill' | number;
}

export interface ISharedFormProps {
  height?: 'xs' | 's' | 'm' | 'l' | 'xl' | number;
  disabled?: boolean;
}

export interface ITextFieldProps extends ILabelProps, ISharedFormProps {
  id?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  name?: string;
  multiline?: boolean;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  value?: string;
  autoFocuse?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

export class TextField extends React.Component<ITextFieldProps> {
  public render() {
    const props = {
      ...this.props,
      type: this.props.type || 'text',
      value: this.props.value || '',
    }
    return (
      <input {...props}/>
    )
  }
}

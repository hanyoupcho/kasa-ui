export type HeightType = 'xs' | 's' | 'm' | 'l' | 'xl' | number
export type WidthType = 'xs' | 's' | 'm' | 'l' | 'xl' | 'fill' | number

export interface ILabelProps {
  label?: string;
  labelWidth?: WidthType
}

export interface ISharedFormProps {
  autoFocus?: boolean
  defaultValue?: string
  disabled?: boolean
  height?: HeightType
  name?: string;
  placeholder?: string
  required?: boolean
  value?: string;
  width?: WidthType
}
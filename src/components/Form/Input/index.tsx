import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps {
  label: string;
  name: string;
  register:any;
  type: string;
}

const Input = ({ label, type, register, name }:IInputProps) => (
    <fieldset>
      <StyledTextField label={label} type={type} {...register(name)} />
      <StyledParagraph fontColor='red'>Erro</StyledParagraph>
    </fieldset>
  )

export default Input;

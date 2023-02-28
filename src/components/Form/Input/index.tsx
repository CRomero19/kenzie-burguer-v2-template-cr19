import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps {
  label: string;
  name: string;
  register:any;
  type: string;
  errors:any;
}

const Input = ({ label, type, register, errors, name }:IInputProps) => {

  console.log(errors)
    return(
      <fieldset>
      <StyledTextField label={label} type={type} {...register(name)} />
      
    </fieldset>
    )

}

export default Input;

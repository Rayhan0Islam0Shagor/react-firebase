import { FC } from 'react';

interface IProps {
  errors: string[];
}

const Errors: FC<IProps> = ({ errors }) => {
  return (
    <ul>
      {errors?.map((err) => (
        <li key={err}>{err}</li>
      ))}
    </ul>
  );
};

export default Errors;

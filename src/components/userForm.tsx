
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import './components.css';

interface UserFormData {
  name: string;
  phone: string;
  email: string;
}

const UserForm: React.FC = () => {
  const { control, handleSubmit } = useForm<UserFormData>();

  const onSubmit = (data: UserFormData) => {
    localStorage.setItem('userDetails', JSON.stringify(data));
    window.location.href = '/second-page';
  };

  //on load of this page clear localstorage.
  React.useEffect(() => {
    localStorage.removeItem('userDetails');
  }, []);


  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Form Page</h1>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {['name', 'phone', 'email'].map((field) => (
          <Controller
            key={field}
            name={field as keyof UserFormData}
            control={control}
            defaultValue=""
            rules={{ required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                margin="normal"
              />
            )}
          />
        ))}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </>
  );
};

export default UserForm;

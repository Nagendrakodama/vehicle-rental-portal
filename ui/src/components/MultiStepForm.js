import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const steps = [
  'What is your name?',
  'Number of wheels',
  'Type of vehicle',
  'Specific Model',
  'Date range picker'
];

const MultiStepForm = () => {
  const { control, handleSubmit, watch, reset } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const wheels = watch('wheels');
  const selectedType = watch('selectedType');

 

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post('/api/book', data);
      alert('Booking successful!');
      reset();
      setActiveStep(0);
    } catch (error) {
      alert('Error while booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="First Name" required margin="normal" />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Last Name" required margin="normal" />
              )}
            />
          </>
        );
      case 1:
        return (
          <Controller
            name="wheels"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
                <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
              </RadioGroup>
            )}
          />
        );
      case 2:
        return (
          <Controller
            name="selectedType"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                {vehicleTypes.map(type => (
                  <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                ))}
              </RadioGroup>
            )}
          />
        );
      case 3:
        return (
          <Controller
            name="selectedModel"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                {models.map(model => (
                  <FormControlLabel key={model} value={model} control={<Radio />} label={model} />
                ))}
              </RadioGroup>
            )}
          />
        );
      case 4:
        return (
          <>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                  margin="normal"
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                  margin="normal"
                />
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {renderStepContent()}
          <div>
            {activeStep > 0 && (
              <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            ) : (
              <Button type="button" onClick={() => setActiveStep(activeStep + 1)}>
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;

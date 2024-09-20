
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

const MultiStepForm = ({ onFormCompletion }) => {
  const { control, handleSubmit, watch, reset } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const wheels = watch('wheels');
  const selectedType = watch('selectedType');

  const nextClick = () => {
    const nextStep = activeStep + 1;
    setActiveStep(activeStep + 1);

    if (activeStep == 1) {
      const fetchVehicleTypes = async () => {
        const response = await axios.get(`http://localhost:3000/api/vehiclestypes/wheels/${wheels}`);
        setVehicleTypes(response.data);
      };
      fetchVehicleTypes();
    }

    if (activeStep == 2) {
      const fetchModels = async () => {
        const response = await axios.get(`http://localhost:3000/api/vehicles/${selectedType}`);
        setModels(response.data);
      };
      fetchModels();
    }
  }


  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/booking', {
        firstName: data.firstName,
        lastName: data.lastName,
        vehicleId: +data.selectedModel,
        startDate: data.startDate,
        endDate: data.endDate
      });
      alert('Booking successful!');
      onFormCompletion(false);
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
                <div class="flex flex-col">
                  <label class="leading-loose">First Name</label>
                  <TextField class="border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" {...field} required margin="normal" />
                </div>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div class="flex flex-col">
                  <label class="leading-loose">Last Name</label>
                  <TextField {...field} class="border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" required margin="normal" />
                </div>
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
                  <FormControlLabel key={type.id} value={type.id} control={<Radio />} label={type.name} />
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
                  <FormControlLabel key={model.id} value={model.id} control={<Radio />} label={model.name} />
                ))}
              </RadioGroup>
            )}
          />
        );
      case 4:
        return (
          <div className='flex flex-col'>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <label class="leading-loose">Start Date</label>
                  <TextField class="border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    {...field}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                    margin="normal"
                  />
                </div>
              )}
            />
            <Controller
              name="endDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  <label class="leading-loose">End Date</label>
                  <TextField class="border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    {...field}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                    margin="normal"
                  />
                </div>
              )}
            />
          </div>
        );
      default:
        return null;
    } 
  };

  return (
    <div className='min-h-dvh flex flex-col'>
      <div className='steeper'>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className='mx-auto grow grid place-items-center'>
        <div className='min-w-96 px-4 py-10 bg-white shadow-sm rounded sm:p-10 '>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col justify-center'>

              <div>
                {renderStepContent()}
                <div className='mt-4'>
                  {activeStep > 0 && (
                    <Button className='secondary_btn' onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button className='flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none primary_btn' type="submit" disabled={loading}>
                      {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                  ) : (
                    <Button className='flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none primary_btn' type="button" onClick={nextClick}>
                      Next
                    </Button>
                  )}
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;


import React, {useState} from 'react';
import MultiStepForm from './components/MultiStepForm';
import BookingList from './components/BookingList';


const App = () => {
  const [isForm, setIsForm] = useState(true);

  const handleFormCompletion = (value) => {
    debugger;
    setIsForm(value);
  };
  
  return (
    <div className='min-h-screen'>
      {isForm ? (
        <MultiStepForm onFormCompletion={handleFormCompletion} />
      ) : (
        <BookingList setShowForm={handleFormCompletion} />
      )}
    </div>
  );
};

export default App;

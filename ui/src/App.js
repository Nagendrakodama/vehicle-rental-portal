
import React, {useState} from 'react';
import MultiStepForm from './components/MultiStepForm';
import BookingList from './components/BookingList';


const App = () => {
  const [isForm, setIsForm] = useState(true);

  const handleFormCompletion = () => {
    setIsForm(false);
  };
  
  return (
    <div className='min-h-screen'>
      {isForm ? (
        <MultiStepForm onFormCompletion={handleFormCompletion} />
      ) : (
        <BookingList />
      )}
    </div>
  );
};

export default App;

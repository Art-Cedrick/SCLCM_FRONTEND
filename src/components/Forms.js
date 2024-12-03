import { React, useContext } from 'react';
import CareerTracking from './AllForms/CareerTracking';
import ConferenceForm from './AllForms/ConferenceForm';
import IndividualRecordForm from './AllForms/IndividualRecordForm';
import RoutineInterview from './AllForms/RoutineInterview';
import { ActiveFormContext } from '../context/SelectedFormProvider';
import { useEffect } from 'react';

const Forms = () => {

  const { councilorActiveForm, setCouncilorActiveForm, pathname} = useContext(ActiveFormContext)

  useEffect(()=>{
    setCouncilorActiveForm('individual_record_form')
  }, [pathname])


  return (
    <div>

      {/* Render forms based on the selected option from the dropdown */}
      {councilorActiveForm === 'individual_record_form' && <IndividualRecordForm />}
      {councilorActiveForm === 'routine_interview' && <RoutineInterview />}
      {councilorActiveForm === 'careertracking' && <CareerTracking />}
      {councilorActiveForm === 'conferenceform' && <ConferenceForm />}

    </div>
  )
}

export default Forms
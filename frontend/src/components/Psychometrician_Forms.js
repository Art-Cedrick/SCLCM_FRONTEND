import {React, useContext, useEffect, useState} from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grade7 from './AllForms/Grade7';
import Grade2 from './AllForms/Grade2';
import Kinder from './AllForms/Kinder';
import Grade1 from './AllForms/Grade1';
import Grade3 from './AllForms/Grade3';
import Grade4 from './AllForms/Grade4';
import Grade5 from './AllForms/Grade5';
import Grade6 from './AllForms/Grade6';
import Grade8 from './AllForms/Grade8';
import Grade9 from './AllForms/Grade9';
import Grade10 from './AllForms/Grade10';
import Grade11 from './AllForms/Grade11';
import Grade12 from './AllForms/Grade12';
import FirstYear from './AllForms/FirstYear';
import SecondYear from './AllForms/SecondYear';
import ThirdYear from './AllForms/ThirdYear';
import FourthYear from './AllForms/FourthYear';
import CareerTrackingTable from './AllForms/Tables/CareerTrackingTable';
import RoutineInterviewTable from './AllForms/Tables/RoutineInterviewTable';
import ConferenceFormTable from './AllForms/Tables/ConferenceFormTable';
import { ActiveFormContext, formOptions } from '../context/SelectedFormProvider';

const Psychometrician_Forms = () => {

  const { activeForm, setActiveForm, pathname} = useContext(ActiveFormContext)

  useEffect(()=>{
    setActiveForm('grade_seven')
  }, [pathname])


  return (
    <div>
      {activeForm === 'kinder' && <Kinder />}
      {activeForm === 'grade_one' && <Grade1 />}
      {activeForm === 'grade_three' && <Grade3 />}
      {activeForm === 'grade_four' && <Grade4 />}
      {activeForm === 'grade_five' && <Grade5 />}
      {activeForm === 'grade_six' && <Grade6 />}
      {activeForm === 'grade_eight' && <Grade8 />}
      {activeForm === 'grade_nine' && <Grade9/>}
      {activeForm === 'grade_ten' && <Grade10 />}
      {activeForm === 'grade_eleven' && <Grade11 />}
      {activeForm === 'grade_twelve' && <Grade12 />}
      {activeForm === 'first_year' && <FirstYear />}
      {activeForm === 'second_year' && <SecondYear />}
      {activeForm === 'third_year' && <ThirdYear />}
      {activeForm === 'fourth_year' && <FourthYear/>}
      {activeForm === 'grade_seven' && <Grade7 />}
      {activeForm === 'grade_two' && <Grade2 />}
      {activeForm === 'grade_eleven' && <Grade11 />}
      {activeForm === 'routine_interview' && <RoutineInterviewTable />}
      {activeForm === 'careertracking' && <CareerTrackingTable />}
      {activeForm === 'conferenceform' && <ConferenceFormTable />}

    </div>
  )
}

export default Psychometrician_Forms
import {React, useContext, useEffect, useState} from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grade7Table from './AllForms/Tables/Grade7Table';
import Grade1Table from './AllForms/Tables/Grade1Table';
import Grade3Table from './AllForms/Tables/Grade3Table';
import Grade4Table from './AllForms/Tables/Grade4Table';
import Grade5Table from './AllForms/Tables/Grade5Table';
import Grade8Table from './AllForms/Tables/Grade8Table';
import Grade9Table from './AllForms/Tables/Grade9Table';
import Grade10Table from './AllForms/Tables/Grade10Table';
import Grade11Table from './AllForms/Tables/Grade11Table';
import Grade12Table from './AllForms/Tables/Grade12Table';
import FirstYearTable from './AllForms/Tables/FirstYearTable';
import SecondYearTable from './AllForms/Tables/SecondYearTable';
import ThirdYearTable from './AllForms/Tables/ThirdYearTable';
import FourthYearTable from './AllForms/Tables/FourthYearTable';
import CareerTrackingTable from './AllForms/Tables/CareerTrackingTable';
import RoutineInterviewTable from './AllForms/Tables/RoutineInterviewTable';
import ConferenceFormTable from './AllForms/Tables/ConferenceFormTable';
import KinderTable from './AllForms/Tables/KinderTable';
import Grade6Table from './AllForms/Tables/Grade6Table';
import Grade2Table from './AllForms/Tables/Grade2Table';
import { ActiveFormContext } from '../context/SelectedFormProvider';

const Psychometrician_Table = () => {


  const { activeForm, setActiveForm, pathname} = useContext(ActiveFormContext)

  useEffect(()=>{
    setActiveForm('grade_seven')
  }, [pathname])

  return (
    <div>
  
      {/* Render forms based on the selected option from the dropdown */}
      {activeForm === 'kinder' && <KinderTable />}
      {activeForm === 'grade_one' && <Grade1Table />}
      {activeForm === 'grade_three' && <Grade3Table />}
      {activeForm === 'grade_four' && <Grade4Table />}
      {activeForm === 'grade_five' && <Grade5Table />}
      {activeForm === 'grade_six' && <Grade6Table />}
      {activeForm === 'grade_eight' && <Grade8Table />}
      {activeForm === 'grade_nine' && <Grade9Table/>}
      {activeForm === 'grade_ten' && <Grade10Table />}
      {activeForm === 'grade_eleven' && <Grade11Table />}
      {activeForm === 'grade_twelve' && <Grade12Table />}
      {activeForm === 'first_year' && <FirstYearTable />}
      {activeForm === 'second_year' && <SecondYearTable />}
      {activeForm === 'third_year' && <ThirdYearTable />}
      {activeForm === 'fourth_year' && <FourthYearTable/>}
      {activeForm === 'grade_seven' && <Grade7Table />}
      {activeForm === 'grade_two' && <Grade2Table />}
      {activeForm === 'routine_interview' && <RoutineInterviewTable />}
      {activeForm === 'careertracking' && <CareerTrackingTable />}
      {activeForm === 'conferenceform' && <ConferenceFormTable />}

    </div>
  )
}

export default Psychometrician_Table
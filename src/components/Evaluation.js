import { React, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SCLCMGUIDANCECLASSEVALUATION from './AllForms/SCLCMGUIDANCECLASSEVALUATION';
import MS_ImpactEvaluation from './AllForms/MS_ ImpactEvaluation';
import MSCounselingServiceEvaluation from './AllForms/MSCounselingServiceEvaluation';

const Evaluation = () => {

  const [activeForm, setActiveForm] = useState('guidanceclassevaluation');

  const formOptions = [
    { value: 'guidanceclassevaluation', label: 'Guidance Class Evaluation' },
    { value: 'impactevaluation', label: 'Impact Evaluation' },
    { value: 'counselingserviceevaluation', label: 'Counseling Service Evaluation' },
  ]



  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '60px' }}>
        {formOptions.map((option) => (
          <div key={option.value} onClick={() => setActiveForm(option.value)} style={{ marginRight: '20px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center ', backgroundColor: activeForm === option.value ? '#1976d214' : 'white', cursor: 'pointer', color: activeForm === option.value ? '#1976d2' : 'black', fontWeight: 'bold', width: '100%'   }}>
            {option.label}
          </div>
        ))}
      </div>
      {/* Render forms based on the selected option from the dropdown */}
      {activeForm === 'guidanceclassevaluation' && <SCLCMGUIDANCECLASSEVALUATION />}
      {activeForm === 'impactevaluation' && <MS_ImpactEvaluation />}
      {activeForm === 'counselingserviceevaluation' && <MSCounselingServiceEvaluation />}
    </div>
  )
}

export default Evaluation
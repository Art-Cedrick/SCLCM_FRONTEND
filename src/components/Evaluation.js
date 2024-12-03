import {React, useState} from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SCLCMGUIDANCECLASSEVALUATION from './AllForms/SCLCMGUIDANCECLASSEVALUATION';
import MS_ImpactEvaluation from './AllForms/MS_ ImpactEvaluation';
import MSCounselingServiceEvaluation from './AllForms/MSCounselingServiceEvaluation';

const Evaluation = () => {

  const [activeForm, setActiveForm] = useState('guidanceclassevaluation');

  const formOptions = [
    {value: 'guidanceclassevaluation', label: 'Guidance Class Evaluation'},
    {value: 'impactevaluation', label: 'Impact Evaluation'},
    {value: 'counselingserviceevaluation', label: 'Counseling Service Evaluation'},
  ]

  return (
    <div>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
      <InputLabel>Select Form</InputLabel>
        <Select
          label='Select Form'
          value={activeForm}
          onChange={(e) => setActiveForm(e.target.value)} // Update the state based on selection
          style={{width: "300px"}}
        >
          {/* Map through form options to create menu items */}
          {formOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Render forms based on the selected option from the dropdown */}
      {activeForm === 'guidanceclassevaluation' && <SCLCMGUIDANCECLASSEVALUATION />}
      {activeForm === 'impactevaluation' && <MS_ImpactEvaluation />}
      {activeForm === 'counselingserviceevaluation' && <MSCounselingServiceEvaluation />}
    </div>
  )
}

export default Evaluation
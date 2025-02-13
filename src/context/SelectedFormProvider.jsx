import React, { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ActiveFormContext = createContext();

export const formOptions = [
  { value: "kinder", label: "Kinder" },
  { value: "grade_one", label: "Grade One" },
  { value: "grade_two", label: "Grade Two" },
  { value: "grade_three", label: "Grade Three" },
  { value: "grade_four", label: "Grade Four" },
  { value: "grade_five", label: "Grade Five" },
  { value: "grade_six", label: "Grade Six" },
  { value: "grade_seven", label: "Grade Seven" },
  { value: "grade_eight", label: "Grade Eight" },
  { value: "grade_nine", label: "Grade Nine" },
  { value: "grade_ten", label: "Grade Ten" },
  { value: "grade_eleven", label: "Grade Eleven" },
  { value: "grade_twelve", label: "Grade Twelve" },
  { value: "first_year", label: "First Year" },
  { value: "second_year", label: "Second Year" },
  { value: "third_year", label: "Third Year" },
  { value: "fourth_year", label: "Fourth Year" },
  { value: "MS_ImpactEvaluationTable", label: "MS Impact Evaluation Table" },
  { value: "MSCounselingServiceTable", label: "Counseling Service Evaluation " },
  { value: "SCLCMGCETable", label: "Guidance Class Evaluation" },
    // {value: 'routine_interview', label: 'Routine Interview'},
    // {value: 'careertracking', label: 'Career Tracking'},
    // {value: 'conferenceform', label: 'Conference Form'},
  ]  

  export const councilorFormOptions = [
    {value: 'individual_record_form', label: 'Individual Record Form'},
    {value: 'routine_interview', label: 'Routine Interview'},
    {value: 'careertracking', label: 'Career Tracking'},
    {value: 'conferenceform', label: 'Conference Form'},
  ]

export const ActiveFormProvider = ({ children }) => {
  
  const location = useLocation();
  const pathname = location.pathname;
  const [activeForm, setActiveForm] = useState('grade_seven');
  const [councilorActiveForm, setCouncilorActiveForm] = useState('individual_record_form');
  console.log(pathname);
  const filteredFormOptions = pathname === "/psychometrician/psychometrician_forms"
  ? formOptions.filter(option => !["MS_ImpactEvaluationTable", "MSCounselingServiceTable", "SCLCMGCETable"].includes(option.value))
  : formOptions;

  console.log(filteredFormOptions);

  return (
    <ActiveFormContext.Provider value={{ activeForm, setActiveForm, pathname, councilorActiveForm, setCouncilorActiveForm, filteredFormOptions }}>
      {children}
    </ActiveFormContext.Provider>
  );
};

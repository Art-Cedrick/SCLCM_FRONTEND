import { Breadcrumbs, Button, Dialog, DialogContent, DialogTitle, Link, Typography } from '@mui/material';
import { FilePlus2 } from 'lucide-react';
import { React, useContext, useEffect, useState } from 'react';
import { ActiveFormContext } from '../context/SelectedFormProvider';
import Grade7 from './AllForms/Grade7';
import CareerTrackingTable from './AllForms/Tables/CareerTrackingTable';
import ConferenceFormTable from './AllForms/Tables/ConferenceFormTable';
import FirstYearTable from './AllForms/Tables/FirstYearTable';
import FourthYearTable from './AllForms/Tables/FourthYearTable';
import Grade10Table from './AllForms/Tables/Grade10Table';
import Grade11Table from './AllForms/Tables/Grade11Table';
import Grade12Table from './AllForms/Tables/Grade12Table';
import Grade1Table from './AllForms/Tables/Grade1Table';
import Grade2Table from './AllForms/Tables/Grade2Table';
import Grade3Table from './AllForms/Tables/Grade3Table';
import Grade4Table from './AllForms/Tables/Grade4Table';
import Grade5Table from './AllForms/Tables/Grade5Table';
import Grade6Table from './AllForms/Tables/Grade6Table';
import Grade7Table from './AllForms/Tables/Grade7Table';
import Grade8Table from './AllForms/Tables/Grade8Table';
import Grade9Table from './AllForms/Tables/Grade9Table';
import KinderTable from './AllForms/Tables/KinderTable';
import RoutineInterviewTable from './AllForms/Tables/RoutineInterviewTable';
import SecondYearTable from './AllForms/Tables/SecondYearTable';
import ThirdYearTable from './AllForms/Tables/ThirdYearTable';
import Grade1 from './AllForms/Grade1';
import Grade3 from './AllForms/Grade3';
import Grade4 from './AllForms/Grade4';
import Grade5 from './AllForms/Grade5';
import Grade12 from './AllForms/Grade12';
import Grade11 from './AllForms/Grade11';
import Grade10 from './AllForms/Grade10';
import Grade9 from './AllForms/Grade9';
import Grade8 from './AllForms/Grade8';
import Grade6 from './AllForms/Grade6';
import Grade2 from './AllForms/Grade2';
import Kinder from './AllForms/Kinder';
import SecondYear from './AllForms/SecondYear';
import FirstYear from './AllForms/FirstYear';
import FourthYear from './AllForms/FourthYear';
import ThirdYear from './AllForms/ThirdYear';
import getTitle from '../utils/getTitle';
import SCLCMGCETable from './AllForms/Tables/SCLCMGCETable';
import MS_ImpactEvaluationTable from './AllForms/Tables/MS_ImpactEvaluationTable';
import MSCounselingServiceTable from './AllForms/Tables/MSCounselingServiceTable';
import SCLCMGUIDANCECLASSEVALUATION from './AllForms/SCLCMGUIDANCECLASSEVALUATION';
import MS_ImpactEvaluation from './AllForms/MS_ ImpactEvaluation';
import MSCounselingServiceEvaluation from './AllForms/MSCounselingServiceEvaluation';

const Psychometrician_Table = () => {

  const { activeForm, setActiveForm, pathname } = useContext(ActiveFormContext)


  const [editData, setEdit] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (row) => {
    setEdit(row.original);
    setOpen(true);
  };

  const handleOpenForm = () => {
    setEdit(null);
    setOpen(true);
  }

  const handleClose = () => {
    setEdit(null);
    setOpen(false);
  };

  useEffect(() => {
    setActiveForm('grade_seven')
  }, [pathname])


  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{ paddingBottom: '16px' }}>
        <Link underline="hover" color="inherit" href="/psychometrician/dashboard">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href=""
        >
          Records
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{getTitle(activeForm)}</Typography>
      </Breadcrumbs>
      <div style={{
        position: "relative",
      }}>

        <div style={{
          position: "absolute",
          left: 8,
          top: 8,
          zIndex: 2,
          display: "flex",
        }}>
          <Button variant="contained" color="primary" size="small" onClick={handleOpenForm}> <FilePlus2 size={14} style={{ marginRight: '6px' }} /> Add NEW</Button>
        </div>


        {/* Render forms based on the selected option from the dropdown */}
        {activeForm === 'kinder' && <KinderTable />}
        {activeForm === 'grade_one' && <Grade1Table />}
        {activeForm === 'grade_three' && <Grade3Table />}
        {activeForm === 'grade_four' && <Grade4Table />}
        {activeForm === 'grade_five' && <Grade5Table />}
        {activeForm === 'grade_six' && <Grade6Table />}
        {activeForm === 'grade_eight' && <Grade8Table />}
        {activeForm === 'grade_nine' && <Grade9Table />}
        {activeForm === 'grade_ten' && <Grade10Table />}
        {activeForm === 'grade_eleven' && <Grade11Table />}
        {activeForm === 'grade_twelve' && <Grade12Table />}
        {activeForm === 'first_year' && <FirstYearTable />}
        {activeForm === 'second_year' && <SecondYearTable />}
        {activeForm === 'third_year' && <ThirdYearTable />}
        {activeForm === 'fourth_year' && <FourthYearTable />}
        {activeForm === 'grade_seven' && <Grade7Table />}
        {activeForm === 'grade_two' && <Grade2Table />}
        {activeForm === 'routine_interview' && <RoutineInterviewTable />}
        {activeForm === 'careertracking' && <CareerTrackingTable />}
        {activeForm === 'conferenceform' && <ConferenceFormTable />}
        {activeForm === 'guidanceclassevaluation' && <SCLCMGCETable />}
        {activeForm === 'impactevaluation' && <MS_ImpactEvaluationTable />}
        {activeForm === 'counselingserviceevaluation' && <MSCounselingServiceTable />}


        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle style={{ fontWeight: 'bold' }}> {`New ${getTitle(activeForm)} Form`}</DialogTitle>
          <DialogContent>
            {/* <Grade7 initialData={editData} onClose={handleClose} /> */}
            {activeForm === 'kinder' && <Kinder />}
            {activeForm === 'grade_one' && <Grade1 />}
            {activeForm === 'grade_two' && <Grade2 />}
            {activeForm === 'grade_three' && <Grade3 />}
            {activeForm === 'grade_four' && <Grade4 />}
            {activeForm === 'grade_five' && <Grade5 />}
            {activeForm === 'grade_six' && <Grade6 />}
            {activeForm === 'grade_seven' && <Grade7 />}
            {activeForm === 'grade_eight' && <Grade8 />}
            {activeForm === 'grade_nine' && <Grade9 />}
            {activeForm === 'grade_ten' && <Grade10 />}
            {activeForm === 'grade_eleven' && <Grade11 />}
            {activeForm === 'grade_twelve' && <Grade12 />}
            {activeForm === 'first_year' && <FirstYear />}
            {activeForm === 'second_year' && <SecondYear />}
            {activeForm === 'third_year' && <ThirdYear />}
            {activeForm === 'fourth_year' && <FourthYear />}
            {activeForm === 'guidanceclassevaluation' && <SCLCMGUIDANCECLASSEVALUATION />}
            {activeForm === 'impactevaluation' && <MS_ImpactEvaluation />}
            {activeForm === 'counselingserviceevaluation' && <MSCounselingServiceEvaluation />}

          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Psychometrician_Table
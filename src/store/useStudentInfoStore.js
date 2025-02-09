import { create } from "zustand";

// Sample data
// "sr_code": "24-02191",
//   "profile": "24-09473 - student",
//   "lastname": "Mayonnaise",
//   "firstname": "Lady",
//   "middlename": "Choice",
//   "year": "Grade 9",
//   "section": "St. Micheal",
//   "completeAddress": "1234 Elm Street Apt 5B Springfield, IL 62704 United States",
//   "fatherName": "Nolan Carlito",
//   "fatherOccupation": "Rapper",
//   "fatherContactNumber": "09291849921",
//   "fatherEmailAddress": "rapp.nolan@gmail.com",
//   "motherName": "Eveready Bobbie",
//   "motherOccupation": "Artist",
//   "motherContactNumber": "0992918221",
//   "motherEmailAddress": "ever.ready_bobbie@gmail.com",
//   "parents": "Living Together",
//   "living_with": "Both Parents",
//   "relationship": "",
//   "club": "uwu"

export const useStudentInfoStore = create((set) => ({
    studentInfo: {
        sr_code: "",
        profile: "",
        lastname: "",
        firstname: "",
        middlename: "",
        year: "",
        section: "",
        completeAddress: "",
        fatherName: "",
        fatherOccupation: "",
        fatherContactNumber: "",
        fatherEmailAddress: "",
        motherName: "",
        motherOccupation: "",
        motherContactNumber: "",
        motherEmailAddress: "",
        parents: "",
        living_with: "",
        relationship: "",
        club: ""
    },
    setStudentInfo: (studentInfo) => set({ studentInfo }),
}));

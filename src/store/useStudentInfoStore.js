import { create } from "zustand";

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

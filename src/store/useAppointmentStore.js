import { create } from "zustand";
import AxiosInstance from "../components/AllForms/Axios";
export const useAppointmentStore = create((set, get) => ({
    appointments: [],
    setAppointments: (appointments) => set({ appointments }),
    isLoading: false,
    status: "idle" || "success" || "error",
    selectedAppointment: {
        id: "",
        title: "",
        name: "",
        grade: "",
        section: "",
        start: "",
        end: "",
    },
    setSelectedAppointment: (selectedAppointment) => set({ selectedAppointment }),
    messagePrompt: {

        title: "",
        message: "",
    },    
    fetchAppointments: async () => {

        set({ isLoading: true, status: "idle" });
        
        // Dummy Data
        try{ 
            const response = await AxiosInstance.get("list-counselor/appointment/", {
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
              });
            //   console.log(response.data);
            const formattedDataResponse = response.data.map(appointment => ({
                id: appointment.id,
                title: appointment.purpose,
                name: appointment.name, 
                grade: appointment.grade,
                section: appointment.section,
                start: new Date(appointment.time_in_date),
                end: new Date(appointment.time_out_date)
            }));
            // console.log(formattedDataResponse);
            set({ appointments: formattedDataResponse, isLoading: false, status: "success", messagePrompt: { title: "Success", message: "Appointments fetched successfully" } });
        // setTimeout(() => {
        //     set({
        //         appointments: [
        //             {
        //                 id: 1,
        //                 title: "Appointment 1",
        //                 sr_code: "SR-001",
        //                 name: "John Doe",
        //                 grade: "Grade 12",
        //                 section: "A",
        //                 start: new Date(),
        //                 end: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
        //             },
        //             {
        //                 id: 2,
        //                 title: "Appointment 2",
        //                 sr_code: "SR-002",
        //                 name: "Jane Doe",
        //                 grade: "Grade 11",
        //                 section: "B",
        //                 start: new Date(),
        //                 end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        //             }
        //         ]
        //     })
        // }, 1000)
        set({ isLoading: false, status: "success", messagePrompt: { title: "Success", message: "Appointments fetched successfully" } });

        }catch(error){
            set({ isLoading: false, status: "error", messagePrompt: { title: "Error", message: error.response.data.message } });
        }
    },

    handleDelete: async (id) => {
        set({ isLoading: true, status: "idle" });
        try{
            const updatedAppointments = get().appointments.filter(apt => apt.id !== id);
            set({ appointments: updatedAppointments, isLoading: false, status: "success", messagePrompt: { title: "Success", message: "Appointment deleted successfully" } });
            return;
        }catch(error){
            set({ isLoading: false, status: "error", messagePrompt: { title: "Error", message: error.response.data.message } });
            return;
        }
    },


    addAppointment: async (appointment) => {
    
        set({ isLoading: true, status: "idle" });
        // const appointmentDate = new Date(appointment["time-in-date"].$d); 
        // const start = appointmentDate.toISOString(); 
        // const end = new Date(appointment["time-out-date"].$d).toISOString();

        
        const formattedAppointment = {
            sr_code: appointment.sr_code,
            name: appointment.name,
            purpose: appointment.title,
            grade: appointment.grade,
            section: appointment.section,
            time_in_date: new Date(appointment.start).toISOString(),  
            time_out_date: new Date(appointment.end).toISOString()
        };
        

        try{
            await AxiosInstance.post("counselor/appointment/", formattedAppointment, {
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
            });

            set({ appointments: [...get().appointments, formattedAppointment], isLoading: false, status: "success", messagePrompt: { title: "Success", message: "Appointment added successfully" } });
            console.log(get().appointments);
            return;
        }catch(error){
            set({ isLoading: false, status: "error", messagePrompt: { title: "Error", message: error.response.data.message } });
            return;
        }
    
    }    
}))
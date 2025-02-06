import { create } from "zustand";

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

        // set({ isLoading: true, status: "idle" });
        // const response = await AxiosInstance.get("api/appointment/", {
        //     headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        //   });


        // Dummy Data
        try{ 
            
        setTimeout(() => {
            set({
                appointments: [
                    {
                        id: 1,
                        title: "Appointment 1",
                        start: new Date(),
                        end: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
                    },
                    {
                        id: 2,
                        title: "Appointment 2",
                        start: new Date(),
                        end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                    }
                ]
            })
        }, 1000)
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
        console.log("Raw Appointment Data:", appointment);
    
        set({ isLoading: true, status: "idle" });
    
        try {
            // Extract and format the date fields properly
            const appointmentDate = new Date(appointment["time-in-date"].$d); 
            const start = appointmentDate.toISOString(); // Convert to proper format
            const end = new Date(appointment["time-out-date"].$d).toISOString();
    
            // Create a properly structured appointment object
            const formattedAppointment = {
                sr_code: appointment.sr_code,
                name: appointment.name,
                purpose: appointment.purpose,
                grade: appointment.grade,
                section: appointment.section,
                start, // Properly formatted ISO string
                end,
            };
    
            console.log("Formatted Appointment:", formattedAppointment);
    
            // Get existing appointments for that day
            const existingAppointments = get().appointments.filter(apt => {
                const aptDate = new Date(apt.start);
                return (
                    aptDate.getFullYear() === appointmentDate.getFullYear() &&
                    aptDate.getMonth() === appointmentDate.getMonth() &&
                    aptDate.getDate() === appointmentDate.getDate()
                );
            });
    
            // Check for time conflicts
            const hasConflict = existingAppointments.some(apt => {
                const newStart = new Date(start).getTime();
                const newEnd = new Date(end).getTime();
                const aptStart = new Date(apt.start).getTime();
                const aptEnd = new Date(apt.end).getTime();
    
                return (
                    (newStart >= aptStart && newStart < aptEnd) || // New appointment starts during existing
                    (newEnd > aptStart && newEnd <= aptEnd) ||     // New appointment ends during existing
                    (newStart <= aptStart && newEnd >= aptEnd)     // New appointment completely overlaps existing
                );
            });
    
            if (hasConflict) {
                set({ 
                    isLoading: false, 
                    status: "error", 
                    messagePrompt: { 
                        title: "Booking Conflict", 
                        message: "This time slot conflicts with an existing appointment" 
                    }
                });
                return;
            }
    
            // If no conflicts, add the appointment
            const updatedAppointments = [...get().appointments, formattedAppointment];
    
            set({ 
                appointments: updatedAppointments,
                isLoading: false,
                status: "success",
                messagePrompt: { 
                    title: "Success", 
                    message: "Appointment scheduled successfully" 
                }
            });
            
        } catch (error) {
            set({ 
                isLoading: false, 
                status: "error", 
                messagePrompt: { 
                    title: "Error", 
                    message: error.response?.data?.message || "An error occurred" 
                } 
            });
        }
    }    
}))
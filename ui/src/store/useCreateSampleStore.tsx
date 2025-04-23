import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from 'sonner';
type SampleDataType = {
    _id: string,
    surName: string;
    otherNames: string;
    age: string;
    gender: "male" | "female";
    hospitalNumber: string;
    occupation: string;
    sampleInformation: "serum" | "plasma" | "blood" | "protein";
    sampleStatus: "accepted" | "rejected";
    recieptNumber: string;
    patientType: "Out Patient" | "In Patient";
    ward: "femaleSurgicalWard" | "maleSurgicalWard" | "ENT" | "MOPD" | "A&E" | "O&G" | "GOPD";
    requestersInformation: {
        requestingDoctor: string;
        consultant: string;
    };
    testType: string[];
    dateOfSpecimen?: string;
    createdAt?: Date;
    updatedAt?: Date;
};


interface SampleStoreState {
    isSubmitingSample: boolean;
    submitSample: (formData: object, nextStep: () => void) => Promise<void>
    sampleId: string | null
    sampleIdContainer: {}
    fetchSamples: (page: number, limit: number, params: {}) => Promise<void>
    sampleData: SampleDataType[]
    totalPages: number
    singleSampleData: SampleDataType | null
    fetchSample: (id: string) => Promise<void>
    editSample: (formData: object, id: string) => Promise<boolean | undefined>
    editingModal: boolean
    searchSample:(query:string)=> Promise<void>
    deleteSample:(id:string)=> Promise<boolean | undefined>
    isDeletingSample:boolean
    results:SampleDataType[] | null
}

export const useCreateSampleStore = create<SampleStoreState>((set) => ({
    isSubmitingSample: false,
    sampleData: [],
    results:[],
    sampleId: null,
    sampleIdContainer: {},
    totalPages: 1,
    singleSampleData: null,
    editingModal: false,
    isDeletingSample:false,
    submitSample: async (formData: object, nextStep: () => void) => {
        try {
            set({ isSubmitingSample: true })
            const response = await axiosInstance.post("/sample/register-sample", formData);
            const { sampleId } = response.data;
            set({ sampleId, isSubmitingSample: false });
            nextStep();
            console.log(sampleId);
        } catch (err) {
            console.log(err)
        }

    },
    editSample: async (formData: object, id: string) => {
        set({ editingModal: true })
        try {
            const response = await axiosInstance.patch(`/sample/update-sample/${id}`, formData)
            set((state) => ({ ...state, singleSampleData: response.data.sample }))
            set({ editingModal: true })
            toast.success(response.data.message);
            return true
        } catch (err) {
            console.log(err)
            if (err instanceof Error) {
                toast.error((err as any).response.data.message)
            }
            return false
        } finally {
            set({ editingModal: false })
        }
    },
    fetchSamples: async (page: number, limit: number, params: {}) => {
        try {
            const response = await axiosInstance.get("/sample/samples", {
                params: { page, limit, ...params }
            });
            set({ sampleData: response.data.data });
            set({ totalPages: response.data.totalPages });
            console.log(response);

        } catch (error) {
            console.log(error);
        }

    },
    fetchSample: async (id: string) => {
        try {
            const response = await axiosInstance.get(`/sample/sample/${id}`);
            console.log(response);
            set((state) => ({ ...state, singleSampleData: response.data.sample }));

        } catch (error) {
            console.log(error);
        }
    },
    searchSample: async (query: string) => {
        try {
            const response = await axiosInstance.get(`/sample/search?query=${query}`);
            console.log(response)
            set({results:response.data.data});

        }catch(err){
            console.log(err)
            if(err instanceof Error){
                toast.error((err as any ).response.data.message)
            }
        }
    },
    deleteSample: async(id:string) =>{
        set({isDeletingSample:true})
        console.log(id)
        try {
            
            const response = await axiosInstance.delete(`/sample/delete-sample/${id}`);
            console.log(response)
            set((state)=> ({...state,sampleData:state.sampleData.filter((sample)=> sample._id !== id)}))
            toast.success(response.data.message);
            set({isDeletingSample:false})
            return true;
        } catch (error) {
            console.log(error)
            if(error instanceof Error){
                toast.error((error as any).response.data.message);
                set({isDeletingSample:false})
            }else{
                toast.error("Something went wrong")
                set({isDeletingSample:false})
            }
            return false;
        } finally{
            set({isDeletingSample:false})
        }
    }
}))
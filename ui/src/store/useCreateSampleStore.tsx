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


interface IssueType {
    _id:string
    sampleNumber:string
    issueType:string
    priorityLevel:string
    issue:string 
    email:string

}

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
    isLoading: boolean 
    createIssue:(formData:object)=> Promise<boolean | undefined>
    isCreatingIssue:boolean
    submitSuccess:boolean
    fetchingIssue:boolean
    fetchIssues: () => Promise<void>
    fetchReports:(query:string) => Promise<void>
    isGettingReportsQuery:boolean
    reports:IssueType[]
    searchReports:IssueType[]
    clearSearchResults: () => void
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
    isLoading:false,
    isCreatingIssue:false,
    submitSuccess:false,
    fetchingIssue:false,
    isGettingReportsQuery:false,
    reports:[],
    searchReports:[],
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
            if (err instanceof Error) {
                toast.error((err as any).response.data.message)
            }
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

        set({isLoading:true})
        try {
            const response = await axiosInstance.get("/sample/samples", {
                params: { page, limit, ...params }
            });
            set({ sampleData: response.data.data });
            set({ totalPages: response.data.totalPages });
            console.log(response);
            set({isLoading:false})

        } catch (err) {
          
            if (err instanceof Error) {
                console.log((err as any).response.message)
                toast.error((err as any).response.data.message)
            }
            set({isLoading:false})
        }

    },
    fetchSample: async (id: string) => {
        set ({ isLoading: true })
        try {
            const response = await axiosInstance.get(`/sample/sample/${id}`);
            console.log(response);
            set((state) => ({ ...state, singleSampleData: response.data.sample }));
            set({ isLoading: false })
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
    },
    createIssue:async(formData:object) => {
        set({isCreatingIssue:true})
        try{

            const response = await axiosInstance.post("/sample/create-issue", formData);
            console.log(response)
            toast.success(response.data.message);
            set({isCreatingIssue:false})
            set({submitSuccess:true})
            return true
        }catch(err){
            set({isCreatingIssue:false})
            if(err instanceof Error){
                toast.error((err as any).response.data.message)
            }else{  
                toast.error("Something went wrong")
            }
        }finally{
            set({isCreatingIssue:false})
        }
    },

    fetchIssues:async () => {
        try {
            set({fetchingIssue:true})
            const response = await axiosInstance.get("/sample/issues");
            set({reports:response.data.data})
            set({fetchingIssue:false});

        } catch (error) {
            if(error instanceof Error){
                toast.error(error.message);
            }
        }finally{
            set({fetchingIssue:false})
        }
    },
    fetchReports:async(query:string)=> {
        set({isGettingReportsQuery: true})
        try{
            const response = await axiosInstance.get(`/sample/reports?search=${query}`);
            set({searchReports:response.data.issues})
            set({isGettingReportsQuery:false})
        }catch(error){
            if(error instanceof Error){
                toast.error(error.message)
            }
            set({isGettingReportsQuery:false})
        }finally{
            set({isGettingReportsQuery:false})
        }
  
        
    }, 
    clearSearchResults:() => {
        set({searchReports:[]})
    }
}))
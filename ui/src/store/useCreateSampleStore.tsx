import {create} from "zustand";
import { axiosInstance } from "@/lib/axios";

type SampleDataType = {
    _id:string,
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
    submitSample:(formData:object, nextStep:() => void)=>Promise<void>
    sampleId:string | null 
    sampleIdContainer:{}
    fetchSamples:(page:number, limit:number, params:{}) => Promise<void>
    sampleData:SampleDataType[]
    totalPages:number
    singleSampleData:SampleDataType | null
    fetchSample:(id:string) => Promise<void>
}

export const useCreateSampleStore = create<SampleStoreState>((set)=> ({
    isSubmitingSample:false,
    sampleData:[],
    sampleId:null,
    sampleIdContainer:{},
    totalPages:1,
    singleSampleData:null,
    submitSample:async(formData:object, nextStep:()=> void)=> {
        try{
            set({isSubmitingSample:true})
            const response = await axiosInstance.post("/sample/register-sample", formData);
            const {sampleId} = response.data;
            set({sampleId,isSubmitingSample:false});
            nextStep();
            console.log(sampleId);
        }catch(err){
            console.log(err)
        }

    },
    fetchSamples:async(page:number, limit:number, params:{})=> {
        try {
            const response = await axiosInstance.get("/sample/samples", {
                params:{page,limit, ...params}
            });
            set({sampleData:response.data.data});
            set({totalPages:response.data.totalPages});
            console.log(response);

        } catch (error) {
            console.log(error);
        }
      
    },
    fetchSample:async(id:string) =>{
        try {
            const response  = await axiosInstance.get(`/sample/sample/${id}`);
            console.log(response);
            set((state) => ({ ...state, singleSampleData: response.data.sample }));
            
        } catch (error) {
            console.log(error);
        }
    }
}))
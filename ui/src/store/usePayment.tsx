import {create} from 'zustand'
import { axiosInstance } from "@/lib/axios";
import { toast } from 'sonner';

interface PaymentStore {
    inititalizingPayment: boolean
    paymentUrl: string | null
    initializePayment: (formData:object)=> Promise<boolean | string>
    verifyPayment:(reference:string | string[]) => Promise<void>
    message:string | null
    isVerifyingPayment:boolean

}

export const usePaymentStore = create<PaymentStore>((set)=> ({
    paymentUrl: null,
    inititalizingPayment:false,
    message:null,
    isVerifyingPayment:false,
    initializePayment: async (formData:object) =>{
        try {
            set({inititalizingPayment:true})
            const response = await axiosInstance.post("/payment/initialize-payment", formData);
            set({inititalizingPayment:false});
            console.log(response.data.authorizationUrl)
            return response.data.authorizationUrl;
          
        } catch (err) {
            console.log(err)
            if (err instanceof Error) {
                toast.error((err as any).response.data.message)
            }
            set({inititalizingPayment:false })
        
        } finally{
            set({inititalizingPayment:false})
        }
      
    },

    verifyPayment: async (reference) => {
        try{
            set({isVerifyingPayment:true})
            const response = await axiosInstance.get(`/payment/verify/${reference}`);
            if(response.data.success === true){
                set({message:response.data.message})
                set({isVerifyingPayment:false})

            }

        }catch(err){
          if(err instanceof Error){
            toast.error((err as any).response.data.message)
            
          }

          set({isVerifyingPayment:false})
        } finally{
            set({isVerifyingPayment:false})
        }
   
    }
    
}))
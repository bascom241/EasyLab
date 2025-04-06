import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

interface AuthState {
    checkingAuth: boolean
    isSignUp: boolean
    isLogin: boolean
    isVerifyingEmail:boolean
    authUser: null | string
    signUp: (formData: object, nextStep: () => void) => Promise<void>
    checkAuth: () => Promise<void>
    login: (formData: object, router: any) => Promise<void>
    logout:(router:any) => Promise<void>
    verifyEmail:(data:object,router:any) => Promise<void>

}
export const useAuthStore = create<AuthState>((set) => ({
    checkingAuth: true,
    isSignUp: false,
    isLogin: false,
    authUser: null,

    isVerifyingEmail:false,
    signUp: async (formData: object, nextStep) => {

        try {
            set({ isSignUp: true })
            const response = await axiosInstance.post('/create-account', formData);
            set({authUser:response.data});
            nextStep();
            console.log(response)
        } catch (err) {
            set({ isSignUp: false })
            console.log(err)
        }

    },

    login: async (formData: object,router) => {
        set({isLogin:true})
        try{
            const response = await axiosInstance.post("/login", formData);
            set({authUser:response.data})
            router.push("/dashboard")
            toast.success(response.data.message)
            console.log(response.data.message)
           
        }catch(err){
            set({isLogin:false})
            console.log(err)
            if(err instanceof Error){
                toast.error((err as any).response.data.message)
            }
        }
    },

    logout:async(router:any)=> {
        try {
            const response = await axiosInstance.get("/logout");
            toast.error(response.data.message)
            router.push("/login")
            set({authUser:null});
           
        } catch (error) {
           if(error instanceof Error){
            toast.error((error as any).response.data.message);
           } else {
            toast.error("Something went wrong");
           }
        }
    }
    ,
    verifyEmail:async(data:object,router:any) => {
        set({isVerifyingEmail:true})
        try{
            console.log(data)
            const response = await axiosInstance.post("/verify-email", data);
           
            console.log(response.data.message);
            router.push("/dashboard")
            set({isVerifyingEmail:false})
        }catch(err){
            set({isVerifyingEmail:false})
            if (err instanceof Error) {
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }
        }finally {
            set({ isVerifyingEmail: false });
        }
    },

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/check-auth");
            set({ authUser: response.data.user });
        } catch (err) {
            set({ checkingAuth: false });
        }
    }


}))


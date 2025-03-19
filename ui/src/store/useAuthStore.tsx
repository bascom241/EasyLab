import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';


interface AuthState {
    checkingAuth: boolean
    isSignUp: boolean
    isLogin: boolean
    authUser: null | string
    signUp: (formData: object, nextStep: () => void) => Promise<void>
    checkAuth: () => Promise<void>
    login: (formData: object, router: any) => Promise<void>

}
export const useAuthStore = create<AuthState>((set) => ({
    checkingAuth: true,
    isSignUp: false,
    isLogin: false,
    authUser: null,


    signUp: async (formData: object, nextStep) => {

        try {
            set({ isSignUp: true })
            const response = await axiosInstance.post('/create-account', formData);
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
            router.push("/home")
            console.log(response.data.message)
           
        }catch(err){
            set({isLogin:false})
            console.log(err)
        }
    },

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/check-auth");
            set({ authUser: response.data.user })
        } catch (err) {
            set({ checkingAuth: false });
        }
    }


}))


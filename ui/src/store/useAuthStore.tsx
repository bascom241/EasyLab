import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import { form } from 'framer-motion/client';
interface AuthUser {
    _id:string
    fullName:string
    email:string
    phoneNumber:string
    facilityName:string
    departmentName:string
    role?:string
}
interface AuthState {
    checkingAuth: boolean
    isSignUp: boolean
    isLogin: boolean
    isVerifyingEmail: boolean
    authUser: AuthUser | null
    signUp: (formData: object, nextStep: () => void) => Promise<void>
    checkAuth: () => Promise<void>
    login: (formData: object, router: any) => Promise<void>
    logout: (router: any) => Promise<void>
    verifyEmail: (data: object, router: any) => Promise<void>
    editingUser: boolean,
    editProfile: (formData: object, id: string) => Promise<void>

}
export const useAuthStore = create<AuthState>((set) => ({
    checkingAuth: true,
    isSignUp: false,
    isLogin: false,
    authUser: null,
    editingUser: false,
    isVerifyingEmail: false,
    signUp: async (formData: object, nextStep) => {

        console.log("signingUp");
        try {
            set({ isSignUp: true })
            const response = await axiosInstance.post('/create-account', formData);
            set({ authUser: response.data });
            nextStep();
            console.log(response)
        } catch (err) {
            if(err instanceof Error){
                toast.error((err as any).response.message);
            }
            set({ isSignUp: false })
            console.log(err)
        }

    },

    login: async (formData: object, router) => {
        set({ isLogin: true })
        
        try {
            const response = await axiosInstance.post("/login", formData);
            set({ authUser: response.data })
            set({isLogin:false});
            router.push("/dashboard")
            toast.success(response.data.message)
         

        } catch (err) {
            set({ isLogin: false })
            console.log(err)
            if (err instanceof Error) {
                toast.error((err as any).response.data.message)
            }
        }
    },

    logout: async (router: any) => {
        try {
            const response = await axiosInstance.get("/logout");
            toast.success(response.data.message)
            router.push("/login")
            set({ authUser: null });

        } catch (error) {
            if (error instanceof Error) {
                toast.error((error as any).response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }
    ,
    verifyEmail: async (data: object, router: any) => {
        set({ isVerifyingEmail: true })
        try {
            console.log(data)
            const response = await axiosInstance.post("/verify-email", data);

            console.log(response.data.message);
            router.push("/dashboard")
            set({ isVerifyingEmail: false })
        } catch (err) {
            set({ isVerifyingEmail: false })
            if (err instanceof Error) {
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }
        } finally {
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
    },
    editProfile: async (formData: object, id: string) => {
        set({editingUser:true})
        try {
            const response = await axiosInstance.put(`/edit-user/${id}`,formData);
            set({editingUser:false});
            toast.success(response.data.message)
            
        } catch (error) {
            console.log(error);
            if(error instanceof Error){
                toast.error((error as any).response.data.message)
            }
        }finally{
            set({editingUser:false})
        }
    }


}))


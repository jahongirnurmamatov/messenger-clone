"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  useEffect(()=>{
    if(session?.status==='authenticated'){
      router.push('/users')
    }
  },[session?.status]);


  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    if (variant === "REGISTER") {
      axios.post('/api/register',data)
      .catch(()=>toast.error('Something went wrong'))
      .then(()=>signIn('credentials',data))
      .finally(()=>setIsloading(false))
    }
    if (variant === "LOGIN") {
      signIn('credentials',{
        ...data,
        redirect:false
      })
      .then((callback)=>{
        if(callback?.error){
          toast.error('Invalid credentials');
        }
        if(callback?.ok && !callback?.error){
          toast.success('Logged in');
        }
      })
      .finally(()=>setIsloading(false));
    }
  };
  const socialAction = (action: string) => {
    setIsloading(true);
    
    signIn(action,{redirect:false})
    .then((callback)=>{
      if(callback?.error){
        toast.error('Invalid credentials')
      }
      if(callback?.ok && !callback?.error){
        toast.success('Logged in!');
      }
    })
    .finally(()=>setIsloading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow-lg sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              register={register}
              id="name"
              errors={errors}
              disabled={isloading}
            />
          )}
          <Input
            label="Email address"
            register={register}
            id="email"
            errors={errors}
            disabled={isloading}
          />
          <Input
            label="Password"
            register={register}
            id="password"
            errors={errors}
            disabled={isloading}
          />
          <div className="">
            <Button disabled={isloading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div className="">
            {variant === "LOGIN"
              ? "New to messenger?"
              : "Already have an account?"}
          </div>
          <div className="cursor-pointer underline" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

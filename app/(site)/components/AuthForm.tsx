"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("REGISTER");
  const [isloading, setIsloading] = useState(false);

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
      //axios register
    }
    if (variant === "LOGIN") {
      //next signin
    }
  };
  const socialAction = (action: string) => {
    setIsloading(true);
    //next social sign in
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow-lg sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant ==='REGISTER' &&(
            <Input label="Name" register={register} id="name" errors={errors} />
          )}
          <Input label="Email address" register={register} id="email" errors={errors} />
          <Input label="Password" register={register} id="password" errors={errors} />
          <div className="">
            <Button>Test</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

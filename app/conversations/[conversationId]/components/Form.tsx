"use client";

import useConversation from "@/app/hooks/useConversations";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit:SubmitHandler<FieldValues> = (data)=>{
    setValue('message','',{shouldValidate:true});
    axios.post(`/api/messages`,{
        ...data,
        conversationId
    })
  } 
  return (
    <div className="py-4 px-4 bg-white items-center flex gap-2 lg:gap-4 w-full border-t">
        <HiPhoto  className="text-sky-500" size={30}/>
        <form 
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}>
            <MessageInput
             id='message' register={register}
             required
             errors={errors}
             placeholder='Write a message here'
            />
        </form>
    </div>
  );
};

export default Form;

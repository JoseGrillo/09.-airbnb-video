"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast"; //1.29.56
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  //ESTADO DEL FORMULARIO
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    //  1:09:22 del video
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!"); //para mensaje
        registerModal.onClose(); //cierro pantalla de registrar
        loginModal.onOpen(); // se abre pantalla de login
      })
      .catch((error) => {
        //console.log("el error en registro fue ", error.response.data.error);
        toast.error(error.response.data.error); //para mensaje
        // console.log("error registermodal", error);
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  };

  //cerrar y abrir ventana de  registro y Login

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bienvenido a Airbnb" subtitle="¡Crea una cuenta!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // Enlaces de google y github
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}} // signIn("google")
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")} //() => {}
      />
      <div
        className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
      >
        <p>
          ¿Ya tienes una cuenta?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            {" "}
            Login
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading} //se desactiva si esta cargando
      isOpen={registerModal.isOpen}
      title="Registro"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)} //funcion de envio
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;

"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal(); //variable de estados  3-18-08

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  //watch, //Este método observará las entradas especificadas y devolverá sus valores. Es útil para representar el valor de entrada y para determinar qué representar por condición.
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  //3.34.51
  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc"); //4.30.17  cloudinary

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        //4.04.10
        ssr: false,
      }),
    [location]
  );

  //3.35.25         creo qcaptura lso valores del formulario
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    //3.22.34
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  //Ejecutar llamada a la API
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //4.38.02
    if (step !== STEPS.PRICE) {
      //PRICE = 5
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data) //llamado a la API  (CREAR)
      .then(() => {
        toast.success("Anuncio creado!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Algo salió mal.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Nombre de la ETIQUETA DE LOS PASOS
  const actionLabel = useMemo(() => {
    //PRICE = 5
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    //CATEGORY = 0,
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  ////////////////
  // contenido dinamico
  /////////////
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="¿Cuál de estos describe mejor tu lugar?" //Titulo
        subtitle="Elige una categoría" //sub titulo
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {/* //Mapear las categorias */}
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  /////////  enum STEPS ////////////

  //LOCATION = 1,   3.38.27
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿donde esta ubicado tu inmueble?"
          subtitle="¡Ayuda a los invitados a encontrarte!"
        />
        <CountrySelect //3.40.05
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  //INFO = 2,
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Comparte algunos conceptos básicos sobre tu inmueble"
          subtitle="¿Qué comodidades tienes?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Invitados"
          subtitle="Cuantos invitados permites?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Habitaciones"
          subtitle="cuantas habitaciones tienes?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Baños"
          subtitle="¿Cuántos baños tienes??"
        />
      </div>
    );
  }

  //IMAGES = 3,
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Agrega una foto de tu inmueble"
          subtitle="¡Muestra a los invitados cómo se ve tu inmueble!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  //DESCRIPTION = 4,      4.33.18
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Cómo describirías tu lugar?"
          subtitle="Corto y agradable funciona mejor!"
        />
        <Input
          id="title"
          label="Titulo"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Descripción"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  //PRICE = 5,
  if (step === STEPS.PRICE) {
    //4.36.00
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ahora, establece tu precio"
          subtitle="¿Cuánto cobras por noche?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;

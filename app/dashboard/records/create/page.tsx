"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function CreateRecord() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState("");
  const [appraisedValue, setAppraisedValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ID: id,
        Type: type,
        Size: parseInt(size),
        Owner: firstName + " " + lastName,
        OwnerContact: contact,
        OwnerId: ownerId,
        State: state,
        City: district,
        Pin: pin,
        AppraisedValue: parseInt(appraisedValue),
      }),
    }).then((res) => {
      if (res.ok) {
        router.push("/dashboard/records");
      } else {
        console.log("Record not created");
      }
    });
  };

  return (
    <motion.div className="h-screen w-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border-solid border-[1px] border-zinc-800">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Create new record
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Fill in the details to create a new record.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Shadow"
                type="text"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Pro"
                type="text"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="recordId">Record ID</Label>
            <Input
              id="recordId"
              placeholder="LAND-1234-5678"
              type="text"
              onChange={e => setId(e.target.value)}
              value={id}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="type">Property type</Label>
            <Input
              id="type"
              placeholder="LAND / PLOT / HOUSE"
              type="text"
              onChange={e => setType(e.target.value)}
              value={type}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="ownerId">Owner ID</Label>
            <Input
              id="ownerId"
              placeholder="OWNER-1234"
              type="text"
              onChange={e => setOwnerId(e.target.value)}
              value={ownerId}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="ownerId">Contact</Label>
            <Input
              id="contact"
              placeholder="+91 1234567890"
              type="phone"
              onChange={e => setContact(e.target.value)}
              value={contact}
            />
          </LabelInputContainer>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                placeholder="District"
                type="text"
                onChange={e => setDistrict(e.target.value)}
                value={district}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                type="text"
                onChange={e => setState(e.target.value)}
                value={state}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="pin">Pin code</Label>
              <Input
                id="pin"
                placeholder="PIN"
                type="text"
                onChange={e => setPin(e.target.value)}
                value={pin}
              />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                placeholder="100"
                type="text"
                onChange={e => setSize(e.target.value)}
                value={size}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="appraisedValue">Appraised value</Label>
              <Input
                id="appraisedValue"
                placeholder="100,000"
                type="text"
                onChange={e => setAppraisedValue(e.target.value)}
                value={appraisedValue}
              />
            </LabelInputContainer>
          </div>
          <button
            className="bg-gradient-to-br relative group/btn border-zinc-800 border-[1.5px] from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

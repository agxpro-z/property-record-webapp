import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { LandRecord } from "../model/land-record";
import {
  IconUser,
  IconEdit,
  IconPhone,
  IconRuler,
  IconTrashX,
  IconIdBadge,
  IconHomeRibbon,
  IconCurrencyRupee,
  IconCurrentLocation,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function SpotlightCard({ record }: { record: LandRecord }) {
  return (
    <CardSpotlight className="h-96 w-96">
      <div className="flex flex-row items-center justify-between">
        <div className="text-xl font-bold font-mono tracking-wide relative z-20 mt-2 text-white">
          {record.ID}
        </div>

        <div className="flex flex-row items-center gap-1 z-50">
          <Edit record={record} />
          <Delete recordId={record.ID} />
        </div>
      </div>
      <div className="text-neutral-200 mt-4 relative z-20">
        <ul className="list-none mt-2">
          <Step title={record.Owner}>
            <IconUser />
          </Step>
          <Step title={record.OwnerId}>
            <IconIdBadge />
          </Step>
          <Step title={`+91-${record.OwnerContact}`}>
            <IconPhone />
          </Step>
          <hr className="h-px bg-zinc-300 dark:bg-zinc-800 border-0 mt-2 mb-4" />
          <li className="flex gap-2 items-start pb-1">
            <IconRuler />
            <p className="text-white">{record.Size} m&sup2;</p>
          </li>
          <Step title={formatCurrency(record.AppraisedValue)}>
            <IconCurrencyRupee />
          </Step>
          <hr className="h-px bg-zinc-800 dark:bg-zinc-800 border-0 mt-2 mb-4" />
          <Step title={record.Type}>
            <IconHomeRibbon />
          </Step>
          <Step title={`${record.District}, ${record.State} - ${record.Pin}`}>
            <IconCurrentLocation />
          </Step>
        </ul>
      </div>
      {/* <p className="text-neutral-300 mt-4 relative z-20 text-sm">
      </p> */}
    </CardSpotlight>
  );
}

export const Edit = ({ record }: { record: LandRecord }) => {
  const [owner, setOwner] = useState(record.Owner);
  const [ownerId, setOwnerId] = useState(record.OwnerId);
  const [ownerContact, setOwnerContact] = useState(record.OwnerContact);
  const [appraisedValue, setAppraisedValue] = useState(record.AppraisedValue);
  const [type, setType] = useState(record.Type);

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/assets/${record.ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ID: record.ID,
        Type: type,
        Size: record.Size,
        Owner: owner,
        OwnerId: ownerId,
        OwnerContact: ownerContact,
        State: record.State,
        City: record.District,
        Pin: record.Pin,
        AppraisedValue: appraisedValue,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsOpen(false);
        router.refresh();
      } else {
        console.log("Record not updated");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <DialogTrigger asChild>
        <IconEdit className="hover:text-blue-500 hover:scale-105 ease-in-out duration-200 transition" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            Edit the details of the record.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerName" className="col-span-1 text-right">
              Owner name
            </Label>
            <input
              id="ownerName"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="col-span-3 flex h-10 w-full border-solid border-zinc-700 border-[1px] bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                disabled:cursor-not-allowed disabled:opacity-50
                dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                group-hover/input:shadow-none transition duration-400"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerId" className="text-right">
              Owner ID
            </Label>
            <input
              id="ownerId"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="col-span-3 flex h-10 w-full border-solid border-zinc-700 border-[1px] bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                disabled:cursor-not-allowed disabled:opacity-50
                dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                group-hover/input:shadow-none transition duration-400"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerContact" className="text-right">
              Contact
            </Label>
            <input
              id="ownerContact"
              value={ownerContact}
              onChange={(e) => setOwnerContact(e.target.value)}
              className="col-span-3 flex h-10 w-full border-solid border-zinc-700 border-[1px] bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                disabled:cursor-not-allowed disabled:opacity-50
                dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                group-hover/input:shadow-none transition duration-400"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="col-span-3 flex h-10 w-full border-solid border-zinc-700 border-[1px] bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                disabled:cursor-not-allowed disabled:opacity-50
                dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                group-hover/input:shadow-none transition duration-400"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="appraisedValue" className="text-right">
              Appraised value
            </Label>
            <input
              id="appraisedValue"
              value={appraisedValue}
              onChange={(e) => setAppraisedValue(Number(e.target.value))}
              className="col-span-3 flex h-10 w-full border-solid border-zinc-700 border-[1px] bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                disabled:cursor-not-allowed disabled:opacity-50
                dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                group-hover/input:shadow-none transition duration-400"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="w-28 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const Delete = ({ recordId }: { recordId: string }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/assets/${recordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        setIsOpen(false);
        router.refresh();
      } else {
        console.log("Record not deleted");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={e => setIsOpen(e)}>
      <DialogTrigger asChild>
        <IconTrashX className="hover:text-red-500 hover:scale-105 ease-in-out duration-200 transition" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete your record transaction. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="shadow-[0_4px_14px_0_rgb(255,50,50,39%)] hover:shadow-[0_6px_20px_rgba(255,50,40,23%)] hover:bg-[#c01f2c] px-8 py-2 bg-[#d11a2a] rounded-md text-white font-light transition duration-200 ease-linear"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export const Step = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <li className="flex gap-2 items-start pb-1">
      {children}
      <p className="text-white">{title}</p>
    </li>
  );
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  }).slice(1);
};

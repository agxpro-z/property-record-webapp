import { CardSpotlight } from "@/components/ui/card-spotlight";
import { LandRecord } from "../model/land-record";
import {
  IconUser,
  IconPhone,
  IconRuler,
  IconIdBadge,
  IconHomeRibbon,
  IconCurrencyRupee,
  IconCurrentLocation,
} from "@tabler/icons-react";
import React from "react";

export default function SpotlightCard({ record }: { record: LandRecord }) {
  console.log(record);
  return (
    <CardSpotlight className="h-96 w-96">
      <p className="text-xl font-bold font-mono tracking-wide relative z-20 mt-2 text-white">
        {record.ID}
      </p>
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
          <li className="flex gap-2 items-start pb-1">
            <IconRuler />
            <p className="text-white">{record.Size} m&sup2;</p>
          </li>
          <Step title={formatCurrency(record.AppraisedValue)}>
            <IconCurrencyRupee />
          </Step>
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

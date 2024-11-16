"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "@/app/components/SpotlightCard";
import { LandRecord } from "@/app/model/land-record";

export default function Records() {
  const [records, setRecords] = useState<LandRecord[]>([]);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/assets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((records) => {
          setRecords(records);
          console.log(records);
        });
        console.log("Assets fetched");
      } else {
        console.log("Assets not fetched");
      }
    }).catch((err) => {
      console.log(err);
    });
    console.log("Dashboard");
  }, []);

  return (
    <>
      <motion.div
        className={(records.length === 0 ? "items-center " : "") + "flex flex-row h-full flex-wrap justify-center gap-4 py-20 mb-8"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {records.length === 0 || records[0] === undefined
          ? <h1 className="text-2xl font-medium">No records found.</h1>
          : records.map((record) => (
            <SpotlightCard key={record.ID} record={record} />
          ))
        }
      </motion.div>
    </>
  );
}

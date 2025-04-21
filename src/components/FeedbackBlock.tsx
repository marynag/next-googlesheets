import { RowData, getData } from "@/hooks/useDataSend";
import React, { useEffect, useState } from "react";
import { Spinner } from "./Spinner";

export const FeedbackBlock = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getData();
      setLoading(false);
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-3 overflow-scroll mb-5 w-full">
      {loading && <Spinner />}
      {data.map((item, index) => (
        <div
          key={index}
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 "
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
            {item.firstName} {item.lastName}
          </h5>
          <h3 className="mb-2 text-md tracking-tight text-gray-500 ">
            {item.email}
          </h3>
          <p className="font-normal text-gray-700 ">{item.message}</p>
        </div>
      ))}
    </div>
  );
};

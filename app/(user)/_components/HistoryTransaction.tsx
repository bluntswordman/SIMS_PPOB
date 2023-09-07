"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAxios } from "@global/libs/axios";
import { AppDispatch, RootState } from "@global/store";
import { getHistoryTransactionModule } from "@global/store/features/transactionSlice";
import { formatdate } from "@global/libs/formater";

const HistoryTransaction = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { history, hasMore } = useSelector(
    (state: RootState) => state.transaction
  );

  const [offset, setOffset] = useState(0);
  const limit = 5;

  const axios = useAxios();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.token) {
      dispatch(getHistoryTransactionModule({ limit, offset }));
    }
  }, [session?.token, dispatch, axios, limit, offset]);

  const handleNextPage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      setOffset((prevOffset) => prevOffset + limit);
    },
    [limit]
  );

  console.log(history);

  return (
    <>
      <div className="flex flex-col space-y-5">
        {history.map((transaction: any, index: number) => (
          <div
            key={index}
            className="px-4 py-2 border w-full rounded-lg grid-cols-2 grid gap-1"
          >
            <div className="col-span-1 flex flex-col space-y-1.5">
              <h6
                className={`font-semibold inline-flex items-center ${
                  transaction.transaction_type === "TOPUP"
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                <span className="mr-3">
                  {transaction.transaction_type === "TOPUP" ? "+" : "-"}
                </span>
                {transaction.total_amount}
              </h6>
              <p className="text-xs text-gray-400">
                {`${formatdate(transaction.created_on).replace(
                  /pukul/g,
                  "\t"
                )} WIB`}
              </p>
            </div>
            <div className="col-span-1 flex justify-end items-start">
              <p className="text-sm text-gray-500">{transaction.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-fit flex justify-center">
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className="w-fit h-fit text-center text-gray-900 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default HistoryTransaction;

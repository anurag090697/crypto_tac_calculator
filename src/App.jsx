/** @format */

import { FaAngleDown } from "react-icons/fa";
import logo from "../public/koinx.svg";
import { IoMdCheckmark } from "react-icons/io";
// import flag from "../public/Flag.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [selectedType, setSelectedType] = useState("shortTerm");
  const [taxData, setTaxData] = useState({
    purchasePrice: "",
    salePrice: "",
    expenses: "",
    annualIncome: 18200,
    capitalGains: "",
    longTermDiscount: 0,
    taxAmount: 0,
  });

  const taxrateobj = {
    18200: "0%",
    45000: "Nil + 19% of excess over $18,200",
    120000: "$5,092 + 32.5% of excessover $45,000",
    180000: "$29,467 + 37% of excess over $120,000",
    180001: "$51,667 + 45 % of excess over $180,000",
  };

  const handleTypeChange = (e, type) => {
    e.preventDefault();
    setSelectedType(type);
  };
  useEffect(() => {
    const gains = taxData.salePrice - taxData.purchasePrice - taxData.expenses;

    const discount = selectedType === "longTerm" ? gains / 2 : 0;
    if (taxData.purchasePrice && taxData.salePrice) {
      let tm = taxData;
      tm.capitalGains = gains;
      tm.longTermDiscount = discount;
      setTaxData((prev) => ({ ...tm }));
    }

    calculateTax();
  }, [
    taxData.purchasePrice,
    taxData.salePrice,
    taxData.expenses,
    selectedType,
    taxData.annualIncome,
  ]);

  const calculateTax = () => {
    let taxAmount = 0;
    const income =
      selectedType === "longTerm"
        ? taxData.capitalGains / 2
        : taxData.capitalGains;

    if (taxData.annualIncome <= 18200) {
      taxAmount = 0;
    } else if (taxData.annualIncome <= 45000) {
      taxAmount = income * 0.19;
    } else if (taxData.annualIncome <= 120000) {
      taxAmount = income * 0.325;
    } else if (taxData.annualIncome <= 180000) {
      taxAmount = income * 0.37;
    } else {
      taxAmount = income * 0.45;
    }
    let tm = taxData;
    tm.taxAmount = taxAmount;
    setTaxData((prev) => ({ ...tm }));
  };

  return (
    <div className='container w-full bg-gray-200'>
      <header className='w-full p-3 bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-around'>
        <img src={logo} alt='' className='w-28' />
        <div className='flex items-center justify-center gap-2 text-white font-medium text-lg'>
          <button className='hover:bg-slate-900 hover:text-sky-600 px-2 py-1 rounded-xl flex items-center justify-center gap-1'>
            Products <FaAngleDown />
          </button>
          <button className='hover:bg-slate-900 hover:text-sky-600 px-2 py-1 rounded-xl flex items-center justify-center gap-1'>
            Resource Center <FaAngleDown />
          </button>
          <button className='hover:bg-slate-900 hover:text-sky-600 px-2 py-1 rounded-xl flex items-center justify-center gap-1'>
            Free Crypto Tools <FaAngleDown />
          </button>
          <button className='hover:bg-slate-900 hover:text-sky-600 px-2 py-1 rounded-xl flex items-center justify-center gap-1'>
            Pricing <FaAngleDown />
          </button>
          <button className='bg-blue-500 p-2 rounded-lg'>Get Started</button>
        </div>
      </header>
      <div className='bg-white px-4 pb-10'>
        <h1 className='text-3xl w-fit mx-auto py-4 font-medium'>
          Free Crypto Tax Calculator Australia
        </h1>
        <div action='' className='w-1/2 mx-auto grid grid-cols-4  select-none'>
          <div className='text-gray-800 flex gap-2 items-center justify-center col-span-4'>
            <label htmlFor=''>Financial Year</label>
            <select
              name=''
              id=''
              className='px-2 py-1 bg-slate-200 rounded-lg border w-44 hover:border-slate-800 font-medium focus:border-blue-500 outline-blue-500'
            >
              <option value=''>FY 2023-24</option>
            </select>
            <label htmlFor=''>Country</label>
            <select
              name=''
              id=''
              className='px-2 py-1 bg-slate-200 rounded-lg border w-44 hover:border-slate-800 font-medium focus:border-blue-500 outline-blue-500'
            >
              <option value=''>Australia</option>
            </select>
          </div>
          <hr className='col-span-4 my-4' />
          <div className='col-span-2 flex flex-col gap-4 items-start justify-center'>
            <div className='relative'>
              <label htmlFor=''>Enter purchase price of Crypto</label>
              <input
                type='number'
                placeholder='Enter Amount...'
                value={taxData.purchasePrice}
                onChange={(e) =>
                  setTaxData((prev) => ({
                    ...prev,
                    purchasePrice: Number(e.target.value),
                  }))
                }
                className='rounded-md px-8 w-72 py-3 border outline-blue-500 text-xl my-1 bg-slate-200'
              />
              <span className='absolute left-2 text-2xl bottom-4 text-slate-700 font-medium'>
                $
              </span>
            </div>
            <div className='relative flex flex-col '>
              <label htmlFor=''>Enter your Expenses</label>
              <input
                type='number'
                value={taxData.expenses}
                placeholder='Enter Amount...'
                onChange={(e) =>
                  setTaxData((prev) => ({
                    ...prev,
                    expenses: Number(e.target.value),
                  }))
                }
                className='rounded-md w-72 px-8 py-3 border outline-blue-500 text-xl my-1 bg-slate-200'
              />
              <span className='absolute left-2 text-2xl bottom-4 text-slate-700 font-medium'>
                $
              </span>
            </div>
            <div className='relative flex flex-col items-start justify-center w-full'>
              <label htmlFor=''>Select your Annual Income</label>
              <select
                name='taxrate'
                onChange={(e) =>
                  setTaxData((prev) => ({
                    ...prev,
                    annualIncome: Number(e.target.value),
                  }))
                }
                id=''
                className='p-2 text-lg w-72 bg-slate-200 rounded-lg border hover:border-slate-800 font-medium focus:border-blue-500 outline-blue-500'
              >
                <option value={18200}>$ 0 - $ 18,200</option>
                <option value={45000}>$ 18,201 - $ 45,000</option>
                <option value={120000}>$ 45,001 - $ 120,000</option>
                <option value={180000}>$ 120,001 - $ 180,000</option>
                <option value={180001}>$ 180,001+</option>
              </select>
            </div>
            {selectedType === "shortTerm" ? (
              ""
            ) : (
              <div className='relative flex flex-col'>
                <label htmlFor=''>Capital gains amount</label>
                <input
                  type='number'
                  value={taxData.capitalGains}
                  readOnly
                  //   onChange={(e) =>
                  //     setTaxData({ ...taxData, capitalGains: e.target.value })
                  //   }
                  className='rounded-md px-8 w-72 py-3 border outline-blue-500 text-xl my-1 bg-slate-200'
                />
                <span className='absolute left-2 text-2xl bottom-4 text-slate-700 font-medium'>
                  $
                </span>
              </div>
            )}
            <div className='w-72 bg-green-100 flex flex-col items-center justify-center gap-1 rounded-md font-medium py-6'>
              <p className='w-fit text-sm'>Net capital gains tax amount</p>
              <h3 className='h-6 text-green-600 text-2xl'>
                ${" "}
                {selectedType === "shortTerm"
                  ? taxData.capitalGains
                  : taxData.capitalGains - taxData.longTermDiscount}
              </h3>
            </div>
          </div>
          <div className='col-span-2 flex flex-col gap-4 items-start justify-start'>
            <div className='relative flex flex-col  items-start justify-center'>
              <label htmlFor=''>Enter sale price of Crypto</label>
              <input
                type='number'
                value={taxData.salePrice}
                placeholder='Enter Amount...'
                onChange={(e) =>
                  setTaxData((prev) => ({
                    ...prev,
                    salePrice: Number(e.target.value),
                  }))
                }
                className='rounded-md px-8 py-3 border w-72 outline-blue-500 text-xl my-1 bg-slate-200'
              />
              <span className='absolute left-2 text-2xl bottom-4 text-slate-700 font-medium'>
                $
              </span>
            </div>
            <div className='flex flex-wrap gap-2 font-medium text-lg'>
              <label htmlFor='' className='w-full font-normal text-base'>
                Investment Type
              </label>
              <button
                className={`px-1 py-2 flex items-center justify-around border rounded w-1/3 ${
                  selectedType === "shortTerm"
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-700"
                }`}
                onClick={(e) => handleTypeChange(e, "shortTerm")}
              >
                Short Term
                <IoMdCheckmark
                  className={`${
                    selectedType === "shortTerm" ? "" : "text-transparent"
                  }`}
                />
              </button>
              <button
                className={`px-1 py-2 flex items-center justify-around border rounded w-1/3${
                  selectedType === "longTerm"
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-700"
                }`}
                onClick={(e) => handleTypeChange(e, "longTerm")}
              >
                Long Term
                <IoMdCheckmark
                  className={`${
                    selectedType === "shortTerm" ? "text-transparent" : ""
                  }`}
                />
              </button>
            </div>

            <div className='relative flex flex-col py-3'>
              <p>Tax Rate</p>
              <p className='h-7'>{taxrateobj[taxData.annualIncome]}</p>
            </div>

            {selectedType === "shortTerm" ? (
              ""
            ) : (
              <div className='relative flex flex-col'>
                <label htmlFor=''>Discount for long term gains </label>
                <input
                  type='number'
                  readOnly
                  value={
                    selectedType === "shortTerm"
                      ? taxData.capitalGains
                      : taxData.capitalGains / 2
                  }
                  //   onChange={(e) =>
                  //     setTaxData({ ...taxData, longTermDiscount: e.target.value })
                  //   }
                  className='rounded-md px-8 w-72 py-3 border outline-blue-500 text-xl my-1 bg-slate-200'
                />
                <span className='absolute left-2 text-2xl bottom-4 text-slate-700 font-medium'>
                  $
                </span>
              </div>
            )}
            <div className='w-72 bg-blue-100 flex flex-col items-center justify-center gap-1 rounded-md font-medium py-6'>
              <p className='w-fit text-sm'>Crypto Tax You Need To Pay*</p>
              <h3 className='h-6 text-blue-600 text-2xl'>
                {" "}
                $ {taxData.taxAmount}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

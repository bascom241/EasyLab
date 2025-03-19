import React from 'react'

const SampleForm3 = () => {
    return (
        <main className="bg-white w-2/3 flex flex-col gap-2 py-3 px-6">
            <h1>Sample Details</h1>
            <div className="flex w-full">
                <select
                  className= "w-1/3 bg-neutral-200 px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] text-xs h-full"
                >
                    <option value="filter">Filter</option>
                    <option value="Alphabetically">Alphabetically</option>
                    <option value="category">Category</option>
                </select> 
                <input
                    placeholder='Search Text'
                    className=" w-full bg-white px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] text-xs h-full"
                />
                <input
                    type='submit'
                    value='Submit'
                    className= " w-1/3 bg-blue-300 px-3 py-2 border border-neutral-200 focus:outline-none focus:border-[#01368B] text-xs h-full cursor-pointer"
                />
            </div>
        </main>
    )
}

export default SampleForm3

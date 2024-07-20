import React, { useState } from 'react'
import person from '../assets/person.svg'
import search from '../assets/search.svg'
import logout from '../assets/logout.svg'

const SideBar = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const openSideBar=()=>{
        setShowSideBar(true);
    }

    const CloseSideBar=()=>{
            setShowSideBar(false);
    }

    const data = [
        {
            name: "analysis 1"
        },
        {
            name: "analysis 2"
        },
        {
            name: "analysis 3"
        },
        {
            name: "analysis 4"
        },
        {
            name: "analysis 5"
        },
        {
            name: "analysis 6"
        },
        {
            name: "analysis 7"
        },
        {
            name: "analysis 8"
        },
        {
            name: "analysis 9"
        },
        {
            name: "analysis 10"
        },
        {
            name: "analysis 11"
        },
        {
            name: "analysis 12"
        },
        {
            name: "analysis 13"
        },
        {
            name: "analysis 14"
        },
        {
            name: "analysis 15"
        },
        {
            name: "analysis 16"
        },
        {
            name: "analysis 17"
        },
        {
            name: "analysis 18"
        },

    ]

    return (
        <div className='bg-[#141419] flex flex-col items-center h-[100vh] px-5 justify-between cursor-pointer sidebar-container' onMouseEnter={openSideBar} onMouseLeave={CloseSideBar}>
            <div className='flex gap-3 items-center mt-5'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#21212deb] flex justify-center items-center'>
                    <img src={person} alt="person" className='w-[36px] h-[36px] ' />
                </div>
                {
                    showSideBar &&
                    <h4 className='text-2xl font-semibold font-Prompt text-[#65D16E]'>Username</h4>
                }
            </div>
            
            {
                showSideBar &&
                <>
                    <div className='flex '>
                        <div className='flex border-2 border-[#65D16E] items-center px-[19px] w-[250px] h-[50px] rounded-lg mt-[45px]'>
                            <input type="text" className='border-none font-Prompt bg-transparent py-2 w-[180px] text-[#F0F0F0D1] ' placeholder='Search' />
                            <img src={search} alt="" className='w-[24px] h-[24px] cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 overflow-y-auto my-[40px] pr-3'>
                        {
                            data.map((data, ind) => (
                                <div className='bg-[#21212deb] rounded-2xl flex items-center px-[10px] w-[200px] py-1' key={ind}>
                                    <p className='font-Prompt text-xl text-[#F0F0F0D1]'>{data.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </>
            }


            <div className='flex gap-3 items-center mb-5'>
                <div className='w-[60px] h-[60px] rounded-full bg-[#21212deb] flex justify-center items-center'>
                    <img src={logout} alt="person" className='w-[24px] h-[24px] ' />
                </div>
                {
                    showSideBar &&
                     <h4 className='text-2xl font-semibold font-Prompt text-[#65D16E]'>Log Out</h4>
                }
            </div>
        </div>
    )
}

export default SideBar

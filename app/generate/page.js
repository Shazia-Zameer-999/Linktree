// // "use client"
// // import React, { useState } from 'react'
// // import { ToastContainer, toast } from 'react-toastify';
// // import { useSearchParams } from 'next/navigation';


// // const GenerateForm = () => {
// //     const searchParams = useSearchParams();
// //     const [handle, sethandle] = useState(searchParams.get('handle') || "")
// //     const [pic, setpic] = useState("")
// //     const [bio, setbio] = useState("")
// //     const [links, setlinks] = useState([{ linktext: "", link: "" }])

// //     const handleChange = (index, link, linktext) => {
// //         setlinks((initialLinks) => {
// //             return initialLinks.map((item, i) => {
// //                 if (i === index) {
// //                     return { linktext, link }
// //                 }
// //                 else {
// //                     return item
// //                 }
// //             })

// //         })
// //     }

// //     const addLink = () => {

// //         setlinks([...links, { linktext: "", link: "" }])
// //         console.log(links)
// //     }


// //     const submitLinks = async (handle, links, pic) => {


// //         const filteredLinks = links.filter(link => {
// //             const linkTextFilled = link.linktext && link.linktext.trim() !== "";
// //             const linkUrlFilled = link.link && link.link.trim() !== "";
// //             return linkTextFilled && linkUrlFilled; 
// //         });


// //         if (filteredLinks.length === 0) {
// //             toast.error("Please provide at least one complete link (with both text and a URL).");

// //         }

// //         const myHeaders = new Headers();
// //         myHeaders.append("Content-Type", "application/json");

// //         const raw = JSON.stringify({
// //             "handle": handle.toLowerCase().trim(),
// //             "links": filteredLinks, 
// //             "pic": pic.trim(),
// //             "bio": bio.trim()
// //         });

// //         console.log("Submitting this clean data:", raw);

// //         const requestOptions = {
// //             method: "POST",
// //             headers: myHeaders,
// //             body: raw,
// //             redirect: "follow"
// //         };

// //         try {
// //             const r = await fetch("/api/add", requestOptions);
// //             const result = await r.json();

// //             if (r.ok && result.success) {
// //                 toast.success(result.message);
// //                 setlinks([]);
// //                 setpic("");
// //                 sethandle("");
// //                 setbio("");

// //             } else {
// //                 toast.error(result.message || "An unknown error occurred.");
// //             }
// //         } catch (error) {
// //             toast.error("Failed to connect to the server.");
// //             console.error("Submission Error:", error);
// //         }
// //     }
// //     const handleLinkChange = (index, event) => {
// //         const { name, value } = event.target;
// //         const newLinks = links.map((link, i) => {
// //             if (i === index) {
// //                 return { ...link, [name]: value };
// //             }
// //             return link;
// //         });
// //         setlinks(newLinks);
// //     };


// //     return (
// //         <>
// //             <ToastContainer />
// //             <div className="bg-[#d5a334] min-h-screen grid min-[900px]:grid-cols-2 grid-cols-1 gap-5">
// //                 <div className="col1 pt-[15vh] flex flex-col items-center justify-center gap-8 text-[#3a3939] max-[400px]:px-3">
// //                     <h1 className='text-4xl font-bold'>Create your LinkTree!</h1>
// //                     <div className='flex flex-col gap-5 '>
// //                         <h2 className='font-semibold text-2xl max-[400px]:px-3'>Step 1: Claim your Handle</h2>
// //                         <div>
// //                             <input value={handle} onChange={e => { sethandle(e.target.value) }} className='bg-white py-3 pr-35  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Choose a handle' />
// //                         </div>
// //                         <h2 className='font-semibold text-2xl max-[400px]:px-3 '>Step 2: Add Links</h2>
// //                         {links && links.map((item, index) => {
// //                             return <div key={index} className='flex  min-[490px]:gap-5 gap-2 '>
// //                                 <input value={item.linktext} onChange={e => handleChange(index, item.link, e.target.value)} className='bg-white py-3 min-[490px]:px-4 max-[400px]:w-40 pl-1 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter link text' />

// //                                 <input value={item.link} onChange={e => handleChange(index, e.target.value, item.linktext)} className='bg-white py-3 min-[490px]:px-4 max-[400px]:w-40 pl-1 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter link' />
// //                             </div>
// //                         })}

// //                         <button onClick={() => addLink()} className='max-[400px]:px-3 font-bold text-white   bg-[#201f1f] rounded-xl py-2 cursor-pointer max-[490px]:w-83'>+ Add Link</button>



// //                         <h2 className='font-semibold text-2xl'>Step 3: Add heading and your picture</h2>
// //                         <div className='flex flex-col gap-4' >
// //                             <input value={bio} onChange={e => { setbio(e.target.value) }} className='bg-white py-3 pr-40  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter your bio' />
// //                             <input value={pic} onChange={e => { setpic(e.target.value) }} className='bg-white py-3 pr-40  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter link to your Picture' />

// //                         </div>
// //                         <button disabled={pic === "" || handle === "" || links.every(l => l.linktext === "" || l.link === "")} onClick={() => { submitLinks(handle, links, pic) }} className='px-2 font-bold text-white   bg-[#201f1f] rounded-xl p-2 cursor-pointer disabled:bg-slate-500'>Create your Linktree</button>

// //                     </div>


// //                 </div>

// //                 <div className="col2 w-full h-screen">
// //                     <img className='h-full' src="/generate_page.png" alt="Generate your links" />
// //                 </div>
// //             </div >
// //         </>
// //     )
// // }


// // import { Suspense } from 'react';

// // export default function GeneratePage() {
// //   return (
// //     <Suspense fallback={<div>Loading page...</div>}>
// //       <GenerateForm />
// //     </Suspense>
// //   )
// // }
// "use client"
// import React, { useState, Suspense } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSearchParams, useRouter } from 'next/navigation';

// const GenerateForm = () => {
//     const searchParams = useSearchParams();
//     const router = useRouter(); 
    
//     const [handle, sethandle] = useState(searchParams.get('handle') || "")
//     const [pic, setpic] = useState("")
//     const [bio, setbio] = useState("")
//     const [links, setlinks] = useState([{ linktext: "", link: "" }])

   
//     const handleLinkChange = (index, event) => {
//         const { name, value } = event.target;
//         const newLinks = links.map((link, i) => {
//             if (i === index) {
             
//                 return { ...link, [name]: value };
//             }
//             return link;
//         });
//         setlinks(newLinks);
//     };

//     const addLink = () => {
//         setlinks([...links, { linktext: "", link: "" }])
//     }


//     const submitLinks = async (handle, links, pic) => {
        
       
//         const filteredLinks = links.filter(link => {
//             const linkTextFilled = link.linktext && link.linktext.trim() !== "";
//             const linkUrlFilled = link.link && link.link.trim() !== "";
//             return linkTextFilled && linkUrlFilled; 
//         });

       
//         if (filteredLinks.length === 0) {
//             toast.error("Please provide at least one complete link (with both text and a URL).");
//             return; 
//         }

//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const cleanHandle = handle.toLowerCase().trim();

//         const raw = JSON.stringify({
//             "handle": cleanHandle, 
//             "links": filteredLinks, 
//             "pic": pic.trim(),
//             "bio": bio.trim()
//         });

//         console.log("Submitting this clean data:", raw);

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//         };

//         try {
//             const r = await fetch("/api/add", requestOptions);
//             const result = await r.json();

//             if (r.ok && result.success) {
              
                
//                 toast.success(result.message);
                
               
                
//                 setlinks([{ linktext: "", link: "" }]);
                
//                 setpic("");
//                 sethandle("");
//                 setbio("");

               
                
//                 setTimeout(() => {
//                     router.push(`/${cleanHandle}`);
//                 }, 2000); 

//             } else {
//                 toast.error(result.message || "An unknown error occurred.");
//             }
//         } catch (error) {
//             toast.error("Failed to connect to the server.");
//             console.error("Submission Error:", error);
//         }
//     }
    
   
//     const atLeastOneLinkFilled = links.some(l => l.linktext.trim() !== "" && l.link.trim() !== "");

//     return (
//         <>
//             <ToastContainer />
//             <div className="bg-[#d5a334] min-h-screen grid min-[900px]:grid-cols-2 grid-cols-1 gap-5">
//                 <div className="col1 pt-[15vh] flex flex-col items-center justify-center gap-8 text-[#3a3939] max-[400px]:px-3">
//                     <h1 className='text-4xl font-bold'>Create your LinkTree!</h1>
//                     <div className='flex flex-col gap-5 '>
//                         <h2 className='font-semibold text-2xl max-[400px]:px-3'>Step 1: Claim your Handle</h2>
//                         <div>
//                             <input value={handle} onChange={e => { sethandle(e.target.value) }} className='bg-white py-3 pr-35  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Choose a handle' />
//                         </div>
//                         <h2 className='font-semibold text-2xl max-[400px]:px-3 '>Step 2: Add Links</h2>
//                         {links && links.map((item, index) => {
//                             return <div key={index} className='flex  min-[490px]:gap-5 gap-2 '>
                                
//                                 <input 
//                                     name="linktext" 
//                                     value={item.linktext} 
//                                     onChange={e => handleLinkChange(index, e)} 
//                                     className='bg-white py-3 min-[490px]:px-4 max-[400px]:w-40 pl-1 rounded-lg focus:outline-amber-500' 
//                                     type="text" 
//                                     placeholder='Enter link text' 
//                                 />

//                                 <input 
//                                     name="link"
//                                     value={item.link} 
//                                     onChange={e => handleLinkChange(index, e)} 
//                                     className='bg-white py-3 min-[490px]:px-4 max-[400px]:w-40 pl-1 rounded-lg focus:outline-amber-500' 
//                                     type="text" 
//                                     placeholder='Enter link' 
//                                 />
//                             </div>
//                         })}

//                         <button onClick={() => addLink()} className='max-[400px]:px-3 font-bold text-white   bg-[#201f1f] rounded-xl py-2 cursor-pointer max-[490px]:w-83'>+ Add Link</button>



//                         <h2 className='font-semibold text-2xl'>Step 3: Add heading and your picture</h2>
//                         <div className='flex flex-col gap-4' >
//                             <input value={bio} onChange={e => { setbio(e.target.value) }} className='bg-white py-3 pr-40  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter your bio' />
//                             <input value={pic} onChange={e => { setpic(e.target.value) }} className='bg-white py-3 pr-40  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter link to your Picture' />

//                         </div>
                        
                       
//                         <button 
//                             disabled={!handle || !atLeastOneLinkFilled} 
//                             onClick={() => { submitLinks(handle, links, pic) }} 
//                             className='px-2 font-bold text-white bg-[#201f1f] rounded-xl p-2 cursor-pointer disabled:bg-slate-500'
//                         >
//                             Create your Linktree
//                         </button>

//                     </div>


//                 </div>

//                 <div className="col2 w-full h-screen">
//                     <img className='h-full' src="/generate_page.png" alt="Generate your links" />
//                 </div>
//             </div >
//         </>
//     )
// }


// export default function GeneratePage() {
//   return (
//     <Suspense fallback={<div>Loading page...</div>}>
//       <GenerateForm />
//     </Suspense>
//   )
// }
// "use client"
// import React, { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import { useSearchParams } from 'next/navigation';


// const GenerateForm = () => {
//     const searchParams = useSearchParams();
//     const [handle, sethandle] = useState(searchParams.get('handle') || "")
//     const [pic, setpic] = useState("")
//     const [bio, setbio] = useState("")
//     const [links, setlinks] = useState([{ linktext: "", link: "" }])

//     const handleChange = (index, link, linktext) => {
//         setlinks((initialLinks) => {
//             return initialLinks.map((item, i) => {
//                 if (i === index) {
//                     return { linktext, link }
//                 }
//                 else {
//                     return item
//                 }
//             })

//         })
//     }

//     const addLink = () => {

//         setlinks([...links, { linktext: "", link: "" }])
//         console.log(links)
//     }


//     const submitLinks = async (handle, links, pic) => {


//         const filteredLinks = links.filter(link => {
//             const linkTextFilled = link.linktext && link.linktext.trim() !== "";
//             const linkUrlFilled = link.link && link.link.trim() !== "";
//             return linkTextFilled && linkUrlFilled; 
//         });


//         if (filteredLinks.length === 0) {
//             toast.error("Please provide at least one complete link (with both text and a URL).");

//         }

//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const raw = JSON.stringify({
//             "handle": handle.toLowerCase().trim(),
//             "links": filteredLinks, 
//             "pic": pic.trim(),
//             "bio": bio.trim()
//         });

//         console.log("Submitting this clean data:", raw);

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//         };

//         try {
//             const r = await fetch("/api/add", requestOptions);
//             const result = await r.json();

//             if (r.ok && result.success) {
//                 toast.success(result.message);
//                 setlinks([]);
//                 setpic("");
//                 sethandle("");
//                 setbio("");

//             } else {
//                 toast.error(result.message || "An unknown error occurred.");
//             }
//         } catch (error) {
//             toast.error("Failed to connect to the server.");
//             console.error("Submission Error:", error);
//         }
//     }
//     const handleLinkChange = (index, event) => {
//         const { name, value } = event.target;
//         const newLinks = links.map((link, i) => {
//             if (i === index) {
//                 return { ...link, [name]: value };
//             }
//             return link;
//         });
//         setlinks(newLinks);
//     };


//     return (
//         <>
//             <ToastContainer />
//             <div className="bg-[#d5a334] min-h-screen grid min-[900px]:grid-cols-2 grid-cols-1 gap-5">
//                 <div className="col1 pt-[15vh] flex flex-col items-center justify-center gap-8 text-[#3a3939] max-[400px]:px-3">
//                     <h1 className='text-4xl font-bold'>Create your LinkTree!</h1>
//                     <div className='flex flex-col gap-5 '>
//                         <h2 className='font-semibold text-2xl max-[400px]:px-3'>Step 1: Claim your Handle</h2>
//                         <div>
//                             <input value={handle} onChange={e => { sethandle(e.target.value) }} className='bg-white py-3 pr-35  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Choose a handle' />
//                         </div>
//                         <h2 className='font-semibold text-2xl max-[400px]:px-3 '>Step 2: Add Links</h2>
//                         {links && links.map((item, index) => {
//                             return <div key={index} className='flex  min-[490px]:gap-5 gap-2 '>
//                                 <input value={item.linktext} onChange={e => handleChange(index, item.link, e.target.value)} className='bg-white py-3 min-[490px]:px-4 max-[400px]:w-40 pl-1 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter link text' />

//                                 <input value={item.link} onChange={e => handleChange(index, e.target.value, item.linktext)} className='bg-white py-3 min-[490px]:px-4 max-[400px]:w-40 pl-1 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter link' />
//                             </div>
//                         })}

//                         <button onClick={() => addLink()} className='max-[400px]:px-3 font-bold text-white   bg-[#201f1f] rounded-xl py-2 cursor-pointer max-[490px]:w-83'>+ Add Link</button>



//                         <h2 className='font-semibold text-2xl'>Step 3: Add heading and your picture</h2>
//                         <div className='flex flex-col gap-4' >
//                             <input value={bio} onChange={e => { setbio(e.target.value) }} className='bg-white py-3 pr-40  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter your bio' />
//                             <input value={pic} onChange={e => { setpic(e.target.value) }} className='bg-white py-3 pr-40  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter link to your Picture' />

//                         </div>
//                         <button disabled={pic === "" || handle === "" || links.every(l => l.linktext === "" || l.link === "")} onClick={() => { submitLinks(handle, links, pic) }} className='px-2 font-bold text-white   bg-[#201f1f] rounded-xl p-2 cursor-pointer disabled:bg-slate-500'>Create your Linktree</button>

//                     </div>


//                 </div>

//                 <div className="col2 w-full h-screen">
//                     <img className='h-full' src="/generate_page.png" alt="Generate your links" />
//                 </div>
//             </div >
//         </>
//     )
// }


// import { Suspense } from 'react';

// export default function GeneratePage() {
//   return (
//     <Suspense fallback={<div>Loading page...</div>}>
//       <GenerateForm />
//     </Suspense>
//   )
// }
"use client"
import React, { useState, Suspense } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from 'next/navigation';

const GenerateForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter(); 
    
    const [handle, sethandle] = useState(searchParams.get('handle') || "")
    const [pic, setpic] = useState("")
    const [bio, setbio] = useState("")
    const [links, setlinks] = useState([{ linktext: "", link: "" }])

   
    const handleLinkChange = (index, event) => {
        const { name, value } = event.target;
        const newLinks = links.map((link, i) => {
            if (i === index) {
             
                return { ...link, [name]: value };
            }
            return link;
        });
        setlinks(newLinks);
    };

    const addLink = () => {
        setlinks([...links, { linktext: "", link: "" }])
    }


    const submitLinks = async (handle, links, pic) => {
        
       
        const filteredLinks = links.filter(link => {
            const linkTextFilled = link.linktext && link.linktext.trim() !== "";
            const linkUrlFilled = link.link && link.link.trim() !== "";
            return linkTextFilled && linkUrlFilled; 
        });

       
        if (filteredLinks.length === 0) {
            toast.error("Please provide at least one complete link (with both text and a URL).");
            return; 
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const cleanHandle = handle.toLowerCase().trim();

        const raw = JSON.stringify({
            "handle": cleanHandle, 
            "links": filteredLinks, 
            "pic": pic.trim(),
            "bio": bio.trim()
        });

        console.log("Submitting this clean data:", raw);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const r = await fetch("/api/add", requestOptions);
            const result = await r.json();

            if (r.ok && result.success) {
              
                
                toast.success(result.message);
                
               
                
                setlinks([{ linktext: "", link: "" }]);
                
                setpic("");
                sethandle("");
                setbio("");

               
                
                setTimeout(() => {
                    router.push(`/${cleanHandle}`);
                }, 2000); 

            } else {
                toast.error(result.message || "An unknown error occurred.");
            }
        } catch (error) {
            toast.error("Failed to connect to the server.");
            console.error("Submission Error:", error);
        }
    }
    
   
    const atLeastOneLinkFilled = links.some(l => l.linktext.trim() !== "" && l.link.trim() !== "");

    return (
        <>
            <ToastContainer />
            <div className="bg-[#d5a334] min-h-screen grid min-[900px]:grid-cols-2 grid-cols-1 gap-5">
                <div className="col1 pt-[15vh] flex flex-col items-center justify-center gap-8 text-[#3a3939] max-[400px]:px-3">
                    <h1 className='text-4xl font-bold'>Create your LinkTree!</h1>
                    <div className='flex flex-col gap-5 '>
                        <h2 className='font-semibold text-2xl max-[400px]:px-3'>Step 1: Claim your Handle</h2>
                        <div>
                            <input value={handle} onChange={e => { sethandle(e.target.value) }} className='bg-white py-3 pr-35  min-[490px]:pr-65 pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Choose a handle' />
                        </div>
                        <h2 className='font-semibold text-2xl max-[400px]:px-3 '>Step 2: Add Links</h2>
                        {links && links.map((item, index) => {
                            return <div key={index} className='flex  min-[490px]:gap-5 gap-2 '>
                                
                                <input 
                                    name="linktext" 
                                    value={item.linktext} 
                                    onChange={e => handleLinkChange(index, e)} 
                                    className='bg-white py-3 min-[490px]:px-4 max-[400px]:w-40 pl-1 rounded-lg focus:outline-amber-500' 
                                    type="text" 
                                    placeholder='Enter link text' 
                                />

                                <input 
                                    name="link"
                                    value={item.link} 
                                    onChange={e => handleLinkChange(index, e)} 
                                    className='bg-white py-3 min-[490px]:px-4 max-[400px]:w-40 pl-1 rounded-lg focus:outline-amber-500' 
                                    type="text" 
                                    placeholder='Enter link' 
                                />
                            </div>
                        })}

                        <button onClick={() => addLink()} className='max-[400px]:px-3 font-bold text-white   bg-[#201f1f] rounded-xl py-2 cursor-pointer max-[490px]:w-83'>+ Add Link</button>



                        <h2 className='font-semibold text-2xl'>Step 3: Add heading and your picture</h2>
                        <div className='flex flex-col gap-4' >
                            <input value={bio} onChange={e => { setbio(e.target.value) }} className='bg-white py-3  pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter your bio' />
                            <input value={pic} onChange={e => { setpic(e.target.value) }} className='bg-white py-3  pl-2 rounded-lg focus:outline-amber-500' type="text" placeholder='Enter link to your Picture' />

                        </div>
                        
                       
                        <button 
                            disabled={!handle || !atLeastOneLinkFilled} 
                            onClick={() => { submitLinks(handle, links, pic) }} 
                            className='px-2 font-bold text-white bg-[#201f1f] rounded-xl p-2 cursor-pointer disabled:bg-slate-500'
                        >
                            Create your Linktree
                        </button>

                    </div>


                </div>

                <div className="col2 w-full h-screen">
                    <img className='h-full' src="/generate_page.png" alt="Generate your links" />
                </div>
            </div >
        </>
    )
}


export default function GeneratePage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <GenerateForm />
    </Suspense>
  )
}

"use client"
import React, { useRef, useState, Suspense } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from 'next/navigation';

const GenerateForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter(); 
    const [handle, sethandle] = useState(searchParams.get('handle') || "")
    const [pic, setpic] = useState("")
    const [selectedImageName, setSelectedImageName] = useState("")
    const [bio, setbio] = useState("")
    const [links, setlinks] = useState([{ linktext: "", link: "" }])
    const imageInputRef = useRef(null)


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
        if (links.length >= 20) {
            toast.info("You can add up to 20 links.")
            return
        }
        setlinks([...links, { linktext: "", link: "" }])
    }

    const handlePictureUrlChange = (event) => {
        setpic(event.target.value)
        setSelectedImageName("")

        if (imageInputRef.current) {
            imageInputRef.current.value = ""
        }
    }

    const handlePictureFileChange = (event) => {
        const file = event.target.files?.[0]

        if (!file) return

        const supportedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        if (!supportedTypes.includes(file.type)) {
            toast.error("Please choose a PNG, JPG, WebP, or GIF image.")
            event.target.value = ""
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Please choose an image smaller than 2 MB.")
            event.target.value = ""
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            if (typeof reader.result === "string") {
                setpic(reader.result)
                setSelectedImageName(file.name)
            }
        }

        reader.onerror = () => {
            toast.error("The selected image could not be read.")
            event.target.value = ""
        }

        reader.readAsDataURL(file)
    }

    const removeSelectedPicture = () => {
        setpic("")
        setSelectedImageName("")

        if (imageInputRef.current) {
            imageInputRef.current.value = ""
        }
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

        const cleanHandle = handle.toLowerCase().trim().replace(/^@/, "");
        if (!/^[a-z0-9_-]{1,30}$/.test(cleanHandle)) {
            toast.error("Use 1-30 letters, numbers, underscores, or hyphens for your handle.")
            return
        }

        const raw = JSON.stringify({
            "handle": cleanHandle, 
            "links": filteredLinks, 
            "pic": pic.trim(),
            "bio": bio.trim()
        });

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
                setSelectedImageName("");
                sethandle("");
                setbio("");

                if (imageInputRef.current) {
                    imageInputRef.current.value = ""
                }

               
                
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
            <div className="grid min-h-screen grid-cols-1 items-start bg-[#d5a334] min-[900px]:grid-cols-2">
                <div className="col1 flex w-full flex-col items-center gap-7 px-4 pb-12 pt-28 text-[#3a3939] sm:px-8 sm:pb-16 sm:pt-32 min-[900px]:min-h-screen min-[900px]:justify-center min-[900px]:px-10 min-[900px]:py-32">
                    <h1 className='text-center text-3xl font-bold sm:text-4xl'>Create your LinkTree!</h1>
                    <div className='flex w-full max-w-xl flex-col gap-5'>
                        <h2 className='text-xl font-semibold sm:text-2xl'>Step 1: Claim your Handle</h2>
                        <div>
                            <input value={handle} onChange={e => { sethandle(e.target.value) }} maxLength={31} pattern="@?[a-zA-Z0-9_-]{1,30}" className='w-full rounded-lg bg-white px-3 py-3 focus:outline-amber-500' type="text" placeholder='Choose a handle' aria-label="Profile handle" />
                        </div>
                        <h2 className='text-xl font-semibold sm:text-2xl'>Step 2: Add Links</h2>
                        {links && links.map((item, index) => {
                            return <div key={index} className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
                                
                                <input 
                                    name="linktext" 
                                    value={item.linktext} 
                                    onChange={e => handleLinkChange(index, e)} 
                                    className='min-w-0 rounded-lg bg-white px-3 py-3 focus:outline-amber-500'
                                    type="text" 
                                    placeholder='Enter link text' 
                                    maxLength={80}
                                    aria-label={`Link ${index + 1} title`}
                                />

                                <input 
                                    name="link"
                                    value={item.link} 
                                    onChange={e => handleLinkChange(index, e)} 
                                    className='min-w-0 rounded-lg bg-white px-3 py-3 focus:outline-amber-500'
                                    type="text" 
                                    placeholder='example.com or https://example.com'
                                    maxLength={2048}
                                    aria-label={`Link ${index + 1} URL`}
                                />
                            </div>
                        })}

                        <button type="button" onClick={() => addLink()} disabled={links.length >= 20} className='w-full cursor-pointer rounded-xl bg-[#201f1f] px-3 py-2 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-500'>+ Add Link</button>



                        <h2 className='text-xl font-semibold sm:text-2xl'>Step 3: Add heading and your picture</h2>
                        <div className='flex flex-col gap-4' >
                            <input value={bio} onChange={e => { setbio(e.target.value) }} maxLength={160} className='w-full rounded-lg bg-white px-3 py-3 focus:outline-amber-500' type="text" placeholder='Enter your bio' aria-label="Profile bio" />
                            <input
                                value={selectedImageName ? "" : pic}
                                onChange={handlePictureUrlChange}
                                disabled={Boolean(selectedImageName)}
                                className='w-full rounded-lg bg-white px-3 py-3 focus:outline-amber-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500'
                                type="url"
                                placeholder={selectedImageName ? 'A computer image is selected' : 'Enter link to your picture'}
                                maxLength={2048}
                                aria-label="Profile picture URL"
                            />

                            <div className='flex items-center gap-2 text-xs font-semibold sm:gap-3 sm:text-sm'>
                                <span className='h-px flex-1 bg-[#3a3939]/40'></span>
                                <span className='whitespace-nowrap'>or choose from your computer</span>
                                <span className='h-px flex-1 bg-[#3a3939]/40'></span>
                            </div>

                            <label className='flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-lg bg-white px-3 py-3 focus-within:outline focus-within:outline-2 focus-within:outline-amber-500 sm:px-4'>
                                <span className='min-w-0 truncate text-sm text-gray-600'>
                                    {selectedImageName || "No image selected"}
                                </span>
                                <span className='shrink-0 rounded-md bg-[#201f1f] px-3 py-2 text-sm font-bold text-white'>
                                    Browse
                                </span>
                                <input
                                    ref={imageInputRef}
                                    onChange={handlePictureFileChange}
                                    className='sr-only'
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/gif"
                                />
                            </label>
                            {selectedImageName && (
                                <button
                                    type="button"
                                    onClick={removeSelectedPicture}
                                    className='-mt-2 self-start text-sm font-semibold underline underline-offset-2 hover:text-red-700'
                                >
                                    Remove selected image
                                </button>
                            )}
                            <p className='-mt-2 text-xs text-[#3a3939]/80'>JPG, PNG, WebP, or GIF up to 2 MB.</p>

                            {pic && (
                                <div className='flex items-center gap-3 rounded-lg bg-white/40 p-3'>
                                    <img className='h-16 w-16 rounded-full object-cover' src={pic} alt="Profile picture preview" />
                                    <span className='text-sm font-semibold'>Profile picture preview</span>
                                </div>
                            )}

                        </div>
                        

                        <button 
                            disabled={!handle || !atLeastOneLinkFilled} 
                            onClick={() => { submitLinks(handle, links, pic) }} 
                            className='w-full cursor-pointer rounded-xl bg-[#201f1f] p-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-500'
                        >
                            Create your Linktree
                        </button>

                    </div>


                </div>

                <div className="col2 sticky top-0 hidden h-screen w-full min-[900px]:block">
                    <img className='h-full w-full object-cover object-center' src="/generate_page.png" alt="Generate your links" />
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

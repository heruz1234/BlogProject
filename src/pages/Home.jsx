 import React, { useEffect, useState } from 'react'
 import { useParams } from 'react-router-dom';
import HeaderNavBar from '../components/Header'
import db from '../data/FirebaseData'
import { collection, getDocs, deleteDoc,doc } from "firebase/firestore";
import  { useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate();
    const [data, setData] =useState([])
    // const blogId = useParams()

        const delFirebaseBlog = async (item)=>{
            try{
                const res= await deleteDoc(doc(db, "Blog_DB", item.id));
                
                
            } catch (err) {
                console.log(err, 'Error occured');
                
            }
            console.log('delete item ', item.id);
            navigate('/')
            
        }




        const getFirebaseBlog = async ()=>{
            const getAllBlogsFromFirebase = await getDocs(collection(db, 'Blog_DB'));
            let allBlog = []
              getAllBlogsFromFirebase.forEach((item, index) => {
                const blogData = {
                    id: item.id,
                    img: item.data().img,
                    title: item.data().title,
                    content: item.data().content,
                    author: item.data().author
                }
                allBlog.push(blogData)
                // ... your additional logic to process the data goes here
                
            });
            setData(allBlog)
           
            
            }

       useEffect(() =>{
        getFirebaseBlog() 
      },[])
     
     return(
        <div className='bg-gray-900'>
            
            <HeaderNavBar />
            <div className="flex flex-wrap gap-y-5 justify-between mx-20 mt-20">
                {
                //what is the main purpose of the data?
                    data?.map((item, index)=>(
                 <div  key={item.id} className="bg-[#1c2841] hover:border text-white  overflow-hidden rounded-[15px] w-[100%] md:w-[45%] lg:w-[30%] min-h-[400px]">
                     <img src={item.img}  alt="" />
                      <div className="px-3 py-5 flex flex-col gap-3">
                                <h1 className='text-lg font-bold'>{item.title}</h1>
                                <p className='text-xs text-gray-300'>{item.content} <span onClick={()=>navigate(`/single_blog/${item.id}`)} className='text-xs text-blue-400 cursor-pointer'>[read more]</span></p>
                                <hr  className='border-gray-600'/>
                                <div className="flex items-center justify-between">
                                    <p className='font-bold text-[10px] uppercase'>{item.author} </p>
                                    <div className="">{item.id}
                                        <span className='pi pi-pencil bg-blue-400 p-2 rounded-full ml-2' onClick={()=>navigate("/edit_existing_blog")}></span>
                                        <span className='pi pi-trash bg-red-400 p-2 rounded-full ml-2' onClick={()=>delFirebaseBlog(item)}></span>
                                    </div>
                                </div>
                            </div>
                         </div>
                    ))
                }
            </div>
            <div className="py-10"></div>
        </div>
    )
}
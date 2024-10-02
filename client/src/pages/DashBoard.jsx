import React, { useState ,useEffect} from 'react'
import {useLocation} from "react-router-dom"
import DashSlidebar from '../components/DashSlidebar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashBoardComponent from '../components/DashBoardComponent'

function DashBoard() {
  const [tab , setTab] = useState('')
  const location = useLocation()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if (tabFormUrl) {
      setTab(tabFormUrl)
    }
  }, [location.search])
  

  return (
   <div className="min-h-screen flex flex-col sm:flex-row">
     <div className="w-full md:w-56">
      <DashSlidebar/>
    </div>
      {tab === "profile" && <DashProfile/>}
      {tab === "posts" && <DashPosts/>}
      {tab === "users" && <DashUsers/>}
      {tab === "comments" && <DashComments/>}
      {tab === "dashboard" && <DashBoardComponent/>}
   </div>
  )
}

export default DashBoard
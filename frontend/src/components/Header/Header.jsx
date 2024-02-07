import React, { setTab, useState } from 'react'
import { Link } from 'react-router-dom'
import "../Header/Header.css"
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  Search,
  SearchOutlined,
  AccountCircle,
  AccountCircleOutlined,
  
} from "@mui/icons-material"

const Header = () => {
  const [tab ,setTab] = useState(window.location.pathname);  // no effact after page reload5
  return (
    <div className="header">
      <Link to="/" onClick={()=>setTab("/")}>
       {tab === "/" ?<Home style={{color:"black"}} />:<HomeOutlined/>}
      </Link>

      <Link to="/newpost" onClick={()=>setTab("/newpost")}>
       {tab === "/newpost" ?<Add style={{color:"black"}} />:<AddOutlined/>}
      </Link>

      <Link to="/search" onClick={()=>setTab("/search")}>
       {tab === "/search" ?<Search style={{color:"black"}} />:<SearchOutlined/>}
      </Link>

      <Link to="/account" onClick={()=>setTab("/account")}>
       {tab === "/account" ?<AccountCircle style={{color:"black"}} />:<AccountCircleOutlined/>}
      </Link>
    </div>
  )
}

export default Header
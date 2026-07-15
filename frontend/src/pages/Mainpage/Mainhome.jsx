import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import ChatGPTMain from '../../components/Messagesportion.jsx'
function Mainhome() {
  return (
    <>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '25%' }}>
        <Sidebar />
      </div>
      <div style={{ width: '75%' }}>
        <ChatGPTMain />
      </div>
    </div>
          </>
  )
}

export default Mainhome

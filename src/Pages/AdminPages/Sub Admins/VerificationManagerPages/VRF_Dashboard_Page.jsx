import React from 'react'
import Ad_Manage_Restaurant_Page from '../../Ad_Manage_Restaurant_Page'
import VerificationManagerLayout from '../../../../Components/AppLayouts/VerificationManagerLayout'

const VRF_Dashboard_Page = () => {
  return (
    <VerificationManagerLayout showSidebar={true}>
      <Ad_Manage_Restaurant_Page basePath="vrf" />
    </VerificationManagerLayout>
  )
}

export default VRF_Dashboard_Page

import React from 'react'
import { withAdminAuth } from '../HOC'

function AuthenticationTestAdmin() {
    return (
        <div>This page is for Admin only</div>
    )
}

export default withAdminAuth(AuthenticationTestAdmin)
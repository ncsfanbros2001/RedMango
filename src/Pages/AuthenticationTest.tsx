import React from 'react'
import { withAuth } from '../HOC'

function AuthenticationTest() {
    return (
        <div>This page is free for all users</div>
    )
}

export default withAuth(AuthenticationTest)
import React from 'react'

function User({details}){
    if(!details){
        return <h3>Working fetching your friend&apos;s details...</h3>
    }

    return(
        <div>
            <h2>{details.id}</h2>
            <h4>{details.email}</h4>
        </div>

    )
}

export default User
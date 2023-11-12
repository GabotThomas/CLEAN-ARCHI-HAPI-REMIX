
import React from 'react';

const ErrorBoundary = ({ error }: any) => {
    return (
        <div>
            <h1>ErrorBoundary</h1>
            <p>{error.message}</p>
        </div>
    )
}

export default ErrorBoundary
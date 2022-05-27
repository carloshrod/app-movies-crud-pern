import React from 'react'

const Container = ({ title, children }) => {
    return (
        <main className="container min-vh-100">
            <div className="text-center mb-4">
                <h1>{title}</h1>
            </div>
            <div className="card row">
                <div className="card-body col-lg-12">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default Container
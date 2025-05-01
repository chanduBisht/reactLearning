import React from 'react'

export default function Inotebook() {
  return (
    <>
        <div className="container">
        <h1>Inotebook</h1>
        <div className="d-flex justify-content-end">
            <button className="btn btn-primary my-3">Add Note</button>
        </div>
        <div className="row">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Note Title</h5>
                        <p className="card-text">Note Description</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

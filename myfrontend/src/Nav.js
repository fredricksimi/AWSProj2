import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
class NavComponent extends React.Component{
    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container-fluid">
                        <p className="navbar-brand">Application</p>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavComponent;
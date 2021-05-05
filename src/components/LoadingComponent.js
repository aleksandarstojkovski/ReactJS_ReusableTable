import React, { Component } from 'react'
import '../styles/LoadingComponent.css'

class LoadingComponent extends Component {

    render() {
        if(this.props.colSpanValue>0){
            return (
                <React.Fragment>
                    <tr>
                        <td align={"center"} colSpan={this.props.colSpanValue}>
                            <div className="col-3" align="center">
                                <div className="snippet" data-title=".dot-flashing">
                                    <div className="stage">
                                        <div className="dot-flashing"></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                            <div className="col-3" align="center">
                                <div className="snippet" data-title=".dot-flashing">
                                    <div className="stage">
                                        <div className="dot-flashing"></div>
                                    </div>
                                </div>
                            </div>
                </React.Fragment>
            )
        }
    }
}
export default LoadingComponent

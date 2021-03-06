import React from "react";

class AReactComponent extends React.Component<{ children: any }> {
    render() {
        let {children} = this.props;
        return <h1 style={{color: '#0384E2'}}>
            <div style={{color: 'red'}}>This is from app 1</div>
            <div style={{color: 'red'}}>Below is injected into the component</div>
            {children}</h1>;
    }
}

export default AReactComponent;

import * as React from "react";
// import "./styles/layout/main.scss";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    state = {
        name: "Orbit",
    }

    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}! I am {this.state.name}</h1>;
    }
}
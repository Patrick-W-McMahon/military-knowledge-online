import * as React from "react";
import * as Dockable from "@hlorenzi/react-dockable";

function DockFrame() {
    // Create the base state,
    // and set up initial content
    const state = Dockable.useDockable((state) => {
        Dockable.createDockedPanel(state, state.rootPanel, Dockable.DockMode.Full,<Counter/>)
    });

    // Render the root Container element,
    // which handles all interactions on your behalf
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Dockable.Container state={ state }/>
        </div>
    );
}

// Your custom element!
function Counter() {
    const [value, setValue] = React.useState(0)
    const countUp = () => setValue(value + 1)

    const ctx = Dockable.useContentContext()
    ctx.setTitle(`Count: ${ value }`)
    ctx.setPreferredSize(300, 250)

    return (
        <div>
            { value }
            <button onClick={ countUp }>Count up!</button>
        </div>
    );
}

export default DockFrame;
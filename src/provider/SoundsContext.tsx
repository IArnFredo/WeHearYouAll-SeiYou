import { soundsContext, useSounds } from "./Sounds";

const SoundsContext: React.FC = (props) => {
    const { sounds } = useSounds()
    return (
        <soundsContext.Provider value={sounds!}>
            {props.children}
        </soundsContext.Provider>
    )
}


export default SoundsContext;
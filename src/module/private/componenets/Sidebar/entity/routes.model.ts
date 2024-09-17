export interface RoutesUI {
    name: string;
    location: string;
    state: StateUI,
    path: string
}

export interface StateUI {
    headerTitle: string;
    headerButton: string | undefined | null;
    clickFunctionProps?: FunctionProps
}

export interface FunctionProps {
    title: string;
    okText: string;
}
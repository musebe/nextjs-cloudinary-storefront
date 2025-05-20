declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > & {
            src: string;
            ar?: boolean;
            'camera-controls'?: boolean;
            'auto-rotate'?: boolean;
            poster?: string;
            style?: React.CSSProperties;
        };
    }
}
  
import 'react';
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                src: string;
                poster?: string;
                ar?: boolean;
                'camera-controls'?: boolean;
                'auto-rotate'?: boolean;
                style?: React.CSSProperties;
            };
        }
    }
}

// Data
interface ISong {
  title: string;
  artist: string;
  album: string;
  year: number;
  image: string;
}

interface IMovieDetail {
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
}

// Props

interface RenderFallbackProps<ErrorType extends Error = Error> {
  error: ErrorType;
  reset: (...args: unknown[]) => void;
}

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  onError?: (error: Error, info: { componentStack: string }) => void;
  resetKeys?: Array<unknown>;
  fallback?: ({
    error,
    reset,
  }: RenderFallbackProps) => React.ReactElement<
    unknown,
    string | React.FunctionComponent | typeof React.Component
  > | null;
}

interface IErrorBoundaryState {
  error: Error | null;
  resetKeys: unknown[];
}

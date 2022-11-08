import * as React from "react";

const initialState: IErrorBoundaryState = { error: null, resetKeys: [] };

// component
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, IErrorBoundaryState> {
  // 1. state를 initialState로 초기화
  state = initialState;

  // 2. 하위 컴포넌트에서 에러 발생 시 호출되어, 해당 error 반환하여 state 업데이트
  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  // 4. render 후, 기존의 props와 이전 props를 비교하고 서로 다르면(페이지 이동이 발생했으면) reset()
  componentDidUpdate(prevProps: IErrorBoundaryState) {
    if (this.state.error == null) return;
    if (!this.props.resetKeys) return;

    if (prevProps.resetKeys.join("") !== this.props.resetKeys.join("")) {
      this.resetErrorBoundary();
    }
  }

  // 5. 하위 컴포넌트에서 에러 발생 시, console.log(error)
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  // 3. error가 있으면 children을, 없으면 fallback을 렌더링. fallback의 인자로 error와 reset 메서드
  render() {
    const { error } = this.state;
    const { fallback, children } = this.props;

    if (error !== null) {
      if (fallback) {
        return fallback({
          error,
          reset: this.resetErrorBoundary,
        });
      }
      this.resetErrorBoundary();
    }
    return children;
  }
}

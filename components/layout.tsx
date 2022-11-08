import styled from "styled-components";
import { ErrorBoundary } from "./error/errorBoundary";
import { ErrorFallback } from "./error/errorFallback";
import { useRouter } from "next/router";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const { pathname } = useRouter();

  return (
    <>
      <PageTitle>Phantom wallet demo</PageTitle>
      <ErrorBoundary
        fallback={({ error, reset }: RenderFallbackProps) => (
          <ErrorFallback error={error} reset={reset} />
        )}
        resetKeys={[pathname]}
      >
        <main>{children}</main>
      </ErrorBoundary>
    </>
  );
};

export default Layout;

const PageTitle = styled.h1`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
`;

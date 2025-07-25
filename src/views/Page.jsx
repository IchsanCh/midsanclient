import { useEffect } from "react";

function Page({ title, children }) {
  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  return <>{children}</>;
}

export default Page;

import { Container } from "@mui/material";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export default function Layout({ children, title }: LayoutProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Container component="main" maxWidth="xs">
      {children}
    </Container>
  );
}

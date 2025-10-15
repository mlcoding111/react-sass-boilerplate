import { cn } from "@/lib/utils";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import React from "react";

type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  // Add any additional props here
  ref: React.Ref<HTMLAnchorElement>;
};

const BasicLinkComponent = ({ className, ref, ...props }: BasicLinkProps) => {
  return <a {...props} className={cn("nav-link", className)} ref={ref} />;
};

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const NavLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return (
    <CreatedLinkComponent
      activeProps={{ className: "active-nav-link" }}
      {...props}
    />
  );
};

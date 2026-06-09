import React from 'react';

export const FormGroup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const Label = ({
  children,
  htmlFor,
  className = "",
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className={className ? className : "form-label mb-1 text-sm font-medium"}
  >
    {children}
  </label>
);
// SidebarAdmin.tsx (or the relevant file)
'use client'


import React, { ReactNode } from 'react';

interface SidebarAdminProps {
  children: ReactNode;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default SidebarAdmin;

import { auth } from "@/auth";

import React from "react";

const DashboardPage = async () => {
  const session = await auth();

  console.log(session);

  return <div>DashboardPage</div>;
};

export default DashboardPage;

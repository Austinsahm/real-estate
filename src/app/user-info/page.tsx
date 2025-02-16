import { auth } from "@/auth";
import React from "react";

const UserInfo = async () => {
  const session = await auth();
  return (
    <div>
      <h1>NextAuth v5 + Next 15</h1>
      <p>User signed in with name: {session?.user?.name}</p>
    </div>
  );
};

export default UserInfo;

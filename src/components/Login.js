import React from "react";
import Button from "@mui/material/Button";
import { LoginOutlined, LoginRounded, LoginTwoTone } from "@mui/icons-material";
import { doLogin } from "@/app/actions";
const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
      <form action={doLogin}>
        <Button type="submit" variant="contained" startIcon={<LoginRounded />}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

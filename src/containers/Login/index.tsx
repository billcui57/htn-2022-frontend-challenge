import { TEvent } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import EventList from "@/components/EventList";
import GenericEventFlag from "@/components/EventFlags/GenericEventFlag";
import Typography from "@/components/Typography";
import TextInput from "@/components/Input/Text";
import Button from "@/components/Input/Button";

const LoginContainer = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginButton = () => {};

  return (
    <div className="px-4 lg:px-64 md:px-16 grid grid-cols-1 justify-items-center space-y-4">
      <TextInput
        label="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></TextInput>
      <TextInput
        label="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></TextInput>
      <Button type="primary" onClick={handleLoginButton}>
        Login
      </Button>
    </div>
  );
};

export default LoginContainer;

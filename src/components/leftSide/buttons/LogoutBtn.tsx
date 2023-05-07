import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "hooks/context/AuthContext";
import { distroyAuth } from "userAuth";
import { disconnectSocket } from "socket/socket";
import { QuerySet } from "profile-types";
import { Button } from "../style";

export default function LogoutBtn() {
  const setSigned = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function onLogout() {
    distroyAuth();
    disconnectSocket();
    if (setSigned) setSigned(false);
    const avartarSet = queryClient.getQueriesData(["avatar"]);
    (avartarSet as QuerySet).map((queryData) => {
      if (queryData[1]) return URL.revokeObjectURL(queryData[1]);
    });
    const badgeSet = queryClient.getQueriesData(["badge"]);
    (badgeSet as QuerySet).map((queryData) => {
      if (queryData[1]) return URL.revokeObjectURL(queryData[1]);
    });
    queryClient.resetQueries(["profile"]);
    queryClient.resetQueries(["avatar"]);
    queryClient.resetQueries(["list"]);
    queryClient.resetQueries(["badge"]);
    navigate("/");
  }

  return <Button onClick={onLogout}>로그아웃</Button>;
}

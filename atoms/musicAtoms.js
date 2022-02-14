import { atom } from "recoil";

export const repoState = atom({
  key: "ActiveId",
  default: "",
});

export const UserState = atom({
  key: "UserStateId",
  default: "",
});
export const endState = atom({
  key: "EndTrigger",
  default: false,
});
export const playState = atom({
  key: "PlayTrigger",
  default: false,
});
export const CancelRequest = atom({
  key: "CancelToken",
  default: "",
});
export const AutoPlayState = atom({
  key: "AutoPlay",
  default: false,
});
export const UpdateNotifier = atom({
  key: "Update",
  default: false,
});
export const DeleteNotifier = atom({
  key: "Delete",
  default: false,
});
export const cNumber = atom({
  key: "CNumber",
  default: " ",
});
export const Authenticated = atom({
  key: "Authenticated",
  default: false,
});
export const errorReceived = atom({
  key: "Error",
  default: false,
});
export const currentSongData = atom({
  key: "CurrentData",
  default: "",
});
export const abort = atom({
  key: "Abort",
  default: "",
});
export const ReceivedData = atom({
  key: "dataReceived",
  default: [],
});
export const repeatCount = atom({
  key: "Repeat",
  default: 0,
});
export const shuffleState = atom({
  key: "Shuffle",
  default: false,
});

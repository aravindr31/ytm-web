import Navbar from "../components/Navbar";
import Songs from "../components/Songs";
import Pusher from "pusher-js";
import ReactLoading from "react-loading";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Login from "../components/Login";
import axios from "axios";
import { parseCookies } from "../utils/parseCookie";
import {
  Authenticated,
  DeleteNotifier,
  endState,
  errorReceived,
  repoState,
  UpdateNotifier,
  UserState,
  ReceivedData,
  repeatCount,
  shuffleState,
} from "../atoms/musicAtoms";
import { fetchUserData } from "../utils/backendCalls";
export default function Home({ accessToken, authorized }) {
  const [end, setEnd] = useRecoilState(endState);
  const [activeId, setActiveId] = useRecoilState(repoState);
  const [update, setUpdate] = useRecoilState(UpdateNotifier);
  const [del, setDel] = useRecoilState(DeleteNotifier);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(Authenticated);
  const [data, setData] = useRecoilState(ReceivedData);
  const [mutate, setMutate] = useState("");
  const [userId, setUserId] = useRecoilState(UserState);
  const errorOccured = useRecoilValue(errorReceived);
  const repeatValue = useRecoilValue(repeatCount);
  const shuffleValue = useRecoilValue(shuffleState);

  useEffect(() => {
    if (authorized.status) {
      setIsAuthenticated(true);
      setUserId(authorized.userId);
    }
  }, [authorized]);

  const alert = useAlert();
  useEffect(async () => {
    if (isAuthenticated) {
      const receivedData = await fetchUserData(userId);
      setData(receivedData);
    }
  }, [isAuthenticated, mutate]);

  useEffect(async () => {
    const pusher = new Pusher("cbc11fe797c89e702073", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("new_songs");
    channel.bind("inserted", async ({ data }) => {
      if (!data.Eotp) {
        if (data.data) {
          if (data.data.length != 0) {
            console.log("Update Signal");
            setUpdate(true);
          } else {
            console.log("delete Signal");
            setDel(true);
          }
        } else {
          setUpdate(true);
        }
        setMutate(Math.floor(Math.random() * 100));
      }
    });
  }, []);

  useEffect(() => {
    console.log("inside end useeffect");
    if (activeId && end) {
      let currentActiveId = activeId;
      let currentIdIndex = data.findIndex(
        (data) => data.videoId == currentActiveId
      );
      let newVideoId;
      if (!shuffleValue) {
        if (parseInt(currentIdIndex) + 1 < data.length) {
          console.log("shuffle inactive");
          if (repeatValue == 2) {
            console.log("repeatOne");
            newVideoId = data[parseInt(currentIdIndex)].videoId;
          }
          if (repeatValue == 1) {
            console.log("repeat");
            newVideoId = data[parseInt(currentIdIndex) + 1].videoId;
          }
          setActiveId(newVideoId);
          setEnd(false);
        } else if (parseInt(currentIdIndex) + 1 == data.length) {
          let newVideoId = data[0].videoId;
          setActiveId(newVideoId);
          setEnd(false);
        }
      } else {
        console.log("shuffle active");
        newVideoId =
          data[
            Math.floor(
              Math.random() *
                (Math.floor(data.length) -
                  Math.ceil(parseInt(currentIdIndex))) +
                Math.ceil(parseInt(currentIdIndex))
            )
          ].videoId;
        console.log(newVideoId);
        setActiveId(newVideoId);
        setEnd(false);
      }
    }
  }, [end]);

  useEffect(async () => {
    if (del) {
      alert.show("DELETED");
      setTimeout(() => {
        setDel(false);
      }, 2500);
    }
  }, [del]);

  useEffect(() => {
    if (errorOccured) {
      alert.show("Error occurred !!", {
        type: "error",
      });
    }
  }, [errorOccured]);
  return (
    <>
      <title>YT Music</title>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <Navbar />
          {data?.map((data) => (
            <Songs key={data?.videoId} data={data} />
          ))}
          {!data && (
            <div className="absolute inset-x-0 bottom-5 rounded-md m-2 flex justify-center items-center sm:flex-row h-auto z-50">
              <ReactLoading
                type="bars"
                color="#4F46E5"
                height="5%"
                width="5%"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
export const getServerSideProps = async ({ req }) => {
  let cookie = parseCookies(req);
  let authorized = { userId: null, status: false };
  let accessToken = cookie.accessToken || null;
  if (accessToken != null) {
    const getData = await axios.get(`${process.env.SERVER}/api/validateToken`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!getData.data.error) {
      authorized = { userId: getData.data, status: true };
    }
  }
  return {
    props: {
      accessToken,
      authorized,
    },
  };
};

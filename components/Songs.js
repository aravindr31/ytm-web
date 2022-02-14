import {
  VscChromeClose,
  VscChromeMaximize,
  VscDebugStart,
  VscDebugPause,
} from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  repoState,
  endState,
  AutoPlayState,
  errorReceived,
  currentSongData,
  playState,
  ReceivedData,
  UserState,
  repeatCount,
  shuffleState,
} from "../atoms/musicAtoms";
import ReactHowler from "react-howler";
import { deleteRequest, getSongData } from "../utils/backendCalls";

function Songs({ data }) {
  const id = data?.videoId;
  const title = data?.title;
  const [play, setPlay] = useState(playState);
  const [active, setActive] = useState(true);
  const [activeId, setActiveId] = useRecoilState(repoState);
  const [stop, setStop] = useState(false);
  const [content, setContent] = useRecoilState(currentSongData);
  const [end, setEnd] = useRecoilState(endState);
  const autoPlay = useRecoilValue(repeatCount);
  const [onError, setOnError] = useRecoilState(errorReceived);
  const [loaded, setLoaded] = useState(false);
  const [alterData, setAlterData] = useRecoilState(ReceivedData);
  const user = useRecoilValue(UserState);
  const valOfShuffle = useRecoilValue(shuffleState);
  // const user = useRecoilValue(UserState);

  const playPause = () => {
    setPlay(!play);
  };
  useEffect(() => {
    if (play == true && stop == false) {
      setActiveId(id);
      setActive(true);
    }
  }, [play]);

  useEffect(() => {
    if (stop) {
      console.log(stop);
      setActive(false);
      setActiveId("");
      setContent("");
      setStop(false);
    }
  }, [stop]);

  useEffect(async () => {
    if (activeId == id) {
      console.log(active);
      let songData = await getSongData(user, id);
      setContent(songData?.data);
      setPlay(true);
    } else {
      setContent("");
      setPlay(false);
    }
    return () => {};
  }, [activeId]);

  const handleEnd = () => {
    if (autoPlay != 2) setPlay(false);
    console.log(valOfShuffle);
    if (autoPlay != (0 || 2) || valOfShuffle) setEnd(true);
  };
  const handleError = () => {
    setPlay(false);
    setStop(true);
    setOnError(true);
    if (autoPlay != 0) setEnd(true);
  };
  const handleDelete = async (vid) => {
    console.log(vid);
    const vidIndex = alterData.findIndex((data) => data.videoId == vid);
    console.log(vidIndex);
    console.log(alterData);
    const alteredData = alterData.filter((data, index) => index != vidIndex);
    deleteRequest(user, vid);
    setAlterData(alteredData);
  };
  return (
    <div
      className={` m-2 rounded flex flex-col p-2 justify-between items-center h-14 shadow-lg z-50 bg-white ${
        (activeId == id && loaded && "border-l-4 border-green-500") ||
        (activeId == id && !loaded && "border-l-4 border-[#ff0000]")
      }`}
    >
      <div className="flex grow items-center w-full group">
        {activeId == id && play ? (
          <VscDebugPause
            onClick={() => playPause(id)}
            className={`text-2xl w-10 text-blue-500 `}
          />
        ) : (
          <VscDebugStart
            onClick={() => playPause(id)}
            className="text-2xl w-10 text-blue-500"
          />
        )}
        {activeId == id && (
          <VscChromeMaximize
            onClick={() => setStop(true)}
            className="text-2xl w-10 text-red-500"
          />
        )}
        <p className="font-Raleway font-medium px-3  w-screen text-ellipsis whitespace-nowrap  overflow-hidden text-[#000] ">
          {title}
        </p>
        <VscChromeClose
          className="text-3xl text-red-600"
          onClick={() => handleDelete(id)}
        />
      </div>
      {activeId == id && content && (
        <ReactHowler
          src={content?.url}
          playing={play}
          html5={true}
          loop={autoPlay == 2 ? true : false}
          onPause={() => setPlay(false)}
          onPlay={() => setPlay(true)}
          onStop={() => setStop(true)}
          onLoad={() => setLoaded(true)}
          onEnd={() => handleEnd()}
          onLoadError={(err) => {
            if (err != null) {
              handleError();
            }
          }}
          onPlayError={(id, err) => {
            console.log(err);
            if (err != null) {
              handleError();
            }
          }}
        />
      )}
    </div>
  );
}

export default Songs;

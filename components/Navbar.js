import { useRecoilState } from "recoil";
import {
  Authenticated,
  AutoPlayState,
  repeatCount,
  shuffleState,
} from "../atoms/musicAtoms";
import { RiRepeat2Fill, RiRepeatOneFill } from "react-icons/ri";
import { MdLogout, MdShuffle } from "react-icons/md";
import Cookies from "js-cookie";

function Navbar() {
  const [enabled, setEnabled] = useRecoilState(AutoPlayState);
  const [auth, setAuth] = useRecoilState(Authenticated);
  const [repeat, setRepeat] = useRecoilState(repeatCount);
  const [shuffle, setShuffle] = useRecoilState(shuffleState);
  const handleLogout = () => {
    Cookies.remove("accessToken");
    setAuth(false);
  };
  const handleRepeat = () => {
    setRepeat(repeat >= 2 ? 0 : repeat + 1);
    setEnabled(!enabled);
  };
  return (
    <header className="rounded-md flex sm:flex-row m-2 p-2 justify-between items-center h-auto  shadow-lg sticky top-2 z-100 bg-[#0C0C1D] backdrop-filter backdrop-blur-lg bg-opacity-50">
      <div className="  flex-2 justify-center items-center w-full group">
        <h1 className="font-Raleway font-light text-4xl py-2 cursor-pointer text-[#fff]">
          YT <span className="text-[#64FFDA]">Music</span>
        </h1>
      </div>
      <div className=" flex">
        <MdShuffle
          className={
            shuffle
              ? "text-green-500 text-2xl mx-2"
              : "text-white text-2xl mx-2"
          }
          onClick={() => setShuffle(!shuffle)}
        />
        {repeat == 2 ? (
          <RiRepeatOneFill
            className="text-green-500 text-2xl  mx-2"
            onClick={() => handleRepeat()}
          />
        ) : (
          <RiRepeat2Fill
            className={`${
              (repeat == 0 && "text-white text-2xl mx-2") ||
              (repeat == 1 && "text-green-500 text-2xl mx-2")
            }`}
            onClick={() => handleRepeat()}
          />
        )}
        <MdLogout
          className="text-red-400 text-2xl mx-2"
          onClick={() => handleLogout()}
        />
      </div>
    </header>
  );
}

export default Navbar;

import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2500,
  offset: "10px",
  transition: transitions.SCALE,
};
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </RecoilRoot>
  );
}

export default MyApp;

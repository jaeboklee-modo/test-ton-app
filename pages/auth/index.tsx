// import authStore from "@/src/stores/authStore";
// import { generateEasyToken } from "@/utils/token";
// import Link from "next/link";

// // TODO 주석 해제
// // const authRequestUrl = process.env.REACT_APP_API_TON_AUTH_ENDPOINT
// const authRequestUrl = "";

// // TODO 주석 해제
// // const getTGUserId = () => {
// //   return window.Telegram.WebApp.initDataUnsafe.user !== undefined
// //     ? window.Telegram.WebApp.initDataUnsafe.user.id
// //     : "";
// // };
// const getTGUserId = () => {
//   return "123";
// };

// export const Auth = () => {
//   const isAuth = authStore((state) => state.isAuth);
//   const sessionToken = authStore(() => generateEasyToken());
//   const startPolling = authStore((state) => state.startPolling);

//   const handleLogin = (walletType: string) => {
//     const token = generateEasyToken();
//     const loginLink = `https://app.tonkeeper.com/ton-login/${authRequestUrl}/auth/ton-auth-request/${sessionToken}/${getTGUserId()}`;

//     console.log("loginLink", loginLink);

//     startPolling(token);

//     // window.open(loginLink);

//     authStore.setState({ sessionToken: sessionToken });
//   };

//   if (isAuth) {
//     return <Link href="/dashboard">Go to dashboard</Link>;
//   }

//   return (
//     <div className="page-auth">
//       <div className="name"></div>
//       <div className="title">Connect wallet</div>
//       <div className="subtitle">
//         Use a crypto wallet to participate in
//         <br /> TON DNS auction.
//       </div>
//       <div className="button-container">
//         <button
//           className="button button--large"
//           onClick={() => handleLogin("tonkeeper")}
//         >
//           Connect Tonkeeper
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Auth;

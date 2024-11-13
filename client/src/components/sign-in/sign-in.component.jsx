import GoogleIcon from "@mui/icons-material/Google";

const SignIn = () => {
  const currentUrl = new URL(window.location.href);

  const handleSignUp = () => {
    const apiUrl =
      process.env.REACT_APP_API_URL || "https://api.blueprintbarbers.co";
    window.location.href = `${apiUrl}/auth/google?path=${currentUrl.pathname}`;
  };
  return (
    <div className="bg-white rounded-lg p-10 min-w-[340px] max-w-[550px] h-60 -translate-y-20">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <p>Securely sign in to your account with Google</p>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-xl mt-4 w-full h-12"
        onClick={handleSignUp}
      >
        Sign In with Google <GoogleIcon />
      </button>
    </div>
  );
};

export default SignIn;

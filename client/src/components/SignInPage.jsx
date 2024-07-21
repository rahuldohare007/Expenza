import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    localStorage.setItem("authToken", "your_token_here");
    navigate("/dashboard");
  };

  return (
    <section className="bg-white text-5xl text-center font-bold">
      <button onClick={handleSignIn}>Sign In</button>
    </section>
  );
}

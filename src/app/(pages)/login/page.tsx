
import  {LoginOfForm} from "./_FormOfLogin/Forms/LoginOfForm";

export default function Login() {
  return (
   <>
   
    <div className="flex min-h-screen items-center justify-center ">
      {/* Card */}
      <div className="card p-8 w-full max-w-md bg-white shadow-lg rounded-xl">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="font-bold text-3xl text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm">
            Please sign in to continue to your account
          </p>
          <LoginOfForm />
        </div>
      </div>
    </div>
   </>
  );
}


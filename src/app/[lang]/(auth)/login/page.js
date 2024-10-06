import { auth } from "@/auth";
import ForgetPassAndLogin from "@/components/auth/ForgetPassAndLogin";
import SocialLAccount from "@/components/auth/SocialLAccount";

import Link from "next/link";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <ForgetPassAndLogin />

        {/* login with */}
        <SocialLAccount />
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have account?{" "}
          <Link href="/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
